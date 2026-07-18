import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Check, RotateCcw, X } from 'lucide-react';
import { speakCzech } from '../components/audio/czechSpeech';
import { useAppStore } from '../stores/useAppStore';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import PracticeEmptyState from '../components/practice/PracticeEmptyState';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';
import {
  getA0LearnerSayTargets,
  personalizeA0PracticeTarget,
  pickIntroducedPracticeTargets,
} from '../data/a0PracticePools';
import { stableShuffle } from '../utils/stableShuffle';
import {
  appendSinglePracticeRetry,
  claimPracticeKey,
  createPracticeSessionSeed,
} from '../utils/practiceSession';

interface Question {
  id: string;
  czTokens: string[];
  bank: string[];
  czFull: string;
  mnFull: string;
}

function tokenize(text: string): string[] {
  const matches = text.match(/[a-zA-ZěščřžýáíéůúťďňĚŠČŘŽÝÁÍÉŮÚŤĎŇ]+|[^\s\wěščřžýáíéůúťďňĚŠČŘŽÝÁÍÉŮÚŤĎŇ]+/g);
  return matches ? matches.filter((token) => token.trim().length > 0) : text.split(' ');
}

function formatSentence(tokens: string[]) {
  return tokens.join(' ').replace(/\s+([,.!?;:])/g, '$1');
}

function generateQuestions(
  introducedWords: readonly string[],
  genderForm: 'male' | 'female' | 'neutral',
  userName: string,
  sessionSeed: string,
): Question[] {
  const eligiblePool = getA0LearnerSayTargets(genderForm, userName).filter((target) => {
    const count = target.czech.split(' ').filter(Boolean).length;
    return count >= 2 && count <= 5;
  });
  const introducedPool = pickIntroducedPracticeTargets(
    eligiblePool,
    introducedWords,
    eligiblePool.length,
    `${sessionSeed}:eligible`,
  ).map((target) => personalizeA0PracticeTarget(target, userName));

  return stableShuffle(introducedPool, `${sessionSeed}:targets`).slice(0, 10).map((target) => {
    const tokens = tokenize(target.czech);
    const otherTokens = introducedPool
      .filter((item) => item.id !== target.id)
      .flatMap((item) => tokenize(item.czech))
      .filter((token) => token.length > 2 && /^[a-zA-Zěščřžýáíéůúťďň]+$/i.test(token))
      .filter((token) => !tokens.some((own) => own.toLocaleLowerCase('cs-CZ') === token.toLocaleLowerCase('cs-CZ')));
    const distractor = stableShuffle(otherTokens, `${sessionSeed}:${target.id}:distractors`)[0];

    return {
      id: target.id,
      czTokens: tokens,
      bank: stableShuffle([...tokens, ...(distractor ? [distractor] : [])], `${sessionSeed}:${target.id}:bank`),
      czFull: target.czech,
      mnFull: target.mongolian,
    };
  });
}

const SentenceBuilderPage: React.FC = () => {
  const { addXP, setPage, updateSRSCard, progress, genderForm, userName } = useAppStore();
  const [sessionSeed, setSessionSeed] = useState(() => createPracticeSessionSeed('sentence-builder'));
  const baseQuestions = useMemo(
    () => generateQuestions(progress.introducedWords, genderForm, userName, sessionSeed),
    [genderForm, progress.introducedWords, sessionSeed, userName],
  );
  const [questions, setQuestions] = useState<Question[]>(baseQuestions);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'question' | 'result'>('question');
  const [showXP, setShowXP] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [slots, setSlots] = useState<{ bankIndex: number; text: string }[]>([]);
  const originalCountRef = useRef(baseQuestions.length);
  const attemptedRef = useRef(new Set<string>());
  const retryQueuedRef = useRef(new Set<string>());
  const rewardedRef = useRef(new Set<string>());
  const masteredRef = useRef(new Set<string>());
  const question = questions[index];

  useEffect(() => {
    setQuestions(baseQuestions);
    setIndex(0);
    setPhase('question');
    setShowXP(false);
    setScore(0);
    setFinished(false);
    setIsCorrect(false);
    setSlots([]);
    originalCountRef.current = baseQuestions.length;
    attemptedRef.current.clear();
    retryQueuedRef.current.clear();
    rewardedRef.current.clear();
    masteredRef.current.clear();
  }, [baseQuestions]);

  if (!question) {
    return (
      <PracticeEmptyState
        icon="🧱"
        onBack={() => setPage('practice')}
        onGoToLessons={() => setPage('path')}
        description="Өгүүлбэр бүтээх дасгалд зөвхөн өмнө нь үзсэн Чех хэллэг болон үгс орно."
      />
    );
  }

  const checkAnswer = () => {
    if (phase === 'result' || slots.length === 0 || !claimPracticeKey(attemptedRef.current, `${index}:${question.id}`)) return;
    const userSentence = formatSentence(slots.map((slot) => slot.text));
    const targetSentence = formatSentence(question.czTokens);
    const correct = userSentence === targetSentence;

    setIsCorrect(correct);
    if (correct) {
      if (claimPracticeKey(masteredRef.current, question.id)) setScore((value) => value + 1);
      if (claimPracticeKey(rewardedRef.current, question.id)) {
        addXP(20);
        setShowXP(true);
        window.setTimeout(() => setShowXP(false), 1200);
      }
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
    } else {
      setQuestions((current) => appendSinglePracticeRetry(current, question, retryQueuedRef.current));
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
    }
    setPhase('result');
  };

  const next = () => {
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSlots([]);
    setIsCorrect(false);
    setPhase('question');
  };

  const restart = () => setSessionSeed(createPracticeSessionSeed('sentence-builder'));

  if (finished) {
    const originalCount = originalCountRef.current;
    const percent = originalCount ? Math.round((score / originalCount) * 100) : 0;
    const retryCount = Math.max(0, questions.length - originalCount);
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1C1C1F', borderRadius: 28, padding: 32, textAlign: 'center', border: '1px solid #2A2A2F', width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{percent >= 70 ? '🏆' : '👍'}</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#FFF', marginBottom: 6 }}>Дасгал дууслаа!</h2>
          <p style={{ fontSize: 14, color: '#A0A0A8', marginBottom: 8 }}>{score} / {originalCount} өгүүлбэрийг зөв бүтээсэн</p>
          {retryCount > 0 && <p style={{ fontSize: 13, color: '#606068', marginBottom: 20 }}>Алдсан {retryCount} өгүүлбэрийг төгсгөлд нэг удаа давтлаа.</p>}
          <button onClick={restart} className="btn-gold" style={{ width: '100%', padding: 16, fontSize: 16, marginBottom: 10 }}><RotateCcw size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Шинэ дасгал эхлэх</button>
          <button onClick={() => setPage('practice')} className="btn-outline" style={{ width: '100%', padding: 16, fontSize: 16 }}>Буцах</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setPage('practice')} style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} color="#C8952A" /></button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#A0A0A8' }}>{index + 1} / {questions.length}</span>
          <ProgressBar value={index + (phase === 'result' ? 1 : 0)} max={questions.length} height={4} color="#C8952A" />
        </div>
        <div style={{ width: 34 }} />
      </div>

      <AnimatePresence>{showXP && <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', top: 70, zIndex: 10 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><XPToast xp={20} /></motion.div>}</AnimatePresence>

      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {phase === 'question' ? (
            <motion.div key={`question-${index}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }}>
                <p style={{ fontSize: 15, color: '#FFF', marginBottom: 24, lineHeight: 1.5 }}>Үгнүүдийг зөв дарааллаар байрлуулж, өгүүлбэр бүтээнэ үү.</p>
                <p style={{ fontSize: 13, color: '#C8952A', marginBottom: 24 }}>({question.mnFull})</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
                {question.bank.map((token, bankIndex) => {
                  const used = slots.some((slot) => slot.bankIndex === bankIndex);
                  return <button key={`bank-${bankIndex}`} onClick={() => !used && setSlots((value) => [...value, { bankIndex, text: token }])} disabled={used} style={{ padding: '12px 16px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: used ? 'transparent' : '#1C1C1F', border: used ? '1.5px solid #2A2A2F' : '1.5px solid #C8952A', color: used ? 'transparent' : '#FFF', cursor: used ? 'default' : 'pointer', transition: 'all .2s' }}>{token}</button>;
                })}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', minHeight: 60, padding: 10, borderRadius: 16, border: '1.5px dashed #2A2A2F' }}>
                {slots.map((slot, slotIndex) => <motion.button key={`${slot.bankIndex}-${slotIndex}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={() => setSlots((value) => value.filter((_, currentIndex) => currentIndex !== slotIndex))} style={{ padding: '10px 14px', borderRadius: 10, fontSize: 16, fontWeight: 600, background: '#1C1C1F', border: '1px solid #C8952A', color: '#FFF', cursor: 'pointer' }}>{slot.text}</motion.button>)}
                {slots.length === 0 && <span style={{ color: '#606068', alignSelf: 'center', fontSize: 14 }}>Энд үгсээ дарааллаар нь оруулна уу</span>}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 24 }}>
                <button onClick={() => setSlots([])} className="btn-outline" style={{ flex: 1, padding: 16, fontSize: 16 }}>Сэргээх</button>
                <button onClick={checkAnswer} disabled={slots.length === 0} className="btn-gold" style={{ flex: 1.5, padding: 16, fontSize: 16, opacity: slots.length > 0 ? 1 : 0.5 }}>Шалгах</button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`result-${index}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ scale: 1, opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: 60, border: `4px solid ${isCorrect ? '#22C55E' : '#EF4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>{isCorrect ? <Check size={64} color="#22C55E" /> : <X size={64} color="#EF4444" />}</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: isCorrect ? '#22C55E' : '#EF4444', marginBottom: 16 }}>{isCorrect ? 'Зөв байна!' : 'Буруу байна!'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {!isCorrect && <p style={{ fontSize: 14, color: '#A0A0A8' }}>Зөв хариулт: <span style={{ color: '#FFF', fontWeight: 700, fontSize: 18 }}>{question.czFull}</span></p>}
                {!isCorrect && <p style={{ fontSize: 14, color: '#A0A0A8' }}>Таны бүрдүүлсэн: <span style={{ color: '#EF4444' }}>{formatSentence(slots.map((slot) => slot.text))}</span></p>}
                {isCorrect && <p style={{ fontSize: 20, color: '#FFF' }}>{question.czFull}</p>}
                <button onClick={() => speakCzech(question.czFull, { rate: 0.8 })} style={{ margin: '12px auto 0', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 99, background: 'rgba(200,149,42,.12)', border: '1px solid rgba(200,149,42,.3)', color: '#C8952A', cursor: 'pointer' }}><Volume2 size={15} /> Сонсох</button>
              </div>
              <div style={{ marginTop: 'auto', width: '100%', paddingTop: 40 }}><button onClick={next} className="btn-gold" style={{ width: '100%', padding: 18, fontSize: 16 }}>{index === questions.length - 1 ? 'Дуусгах' : 'Дараах'}</button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SentenceBuilderPage;
