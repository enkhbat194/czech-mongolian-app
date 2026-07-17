import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, RotateCcw, Volume2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { speakCzech } from '../components/audio/czechSpeech';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import PracticeEmptyState from '../components/practice/PracticeEmptyState';
import { useAppStore } from '../stores/useAppStore';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';
import {
  getA0ProductionPool,
  personalizeA0PracticeTarget,
  pickIntroducedPracticeTargets,
} from '../data/a0PracticePools';
import {
  appendSinglePracticeRetry,
  claimPracticeKey,
  createPracticeSessionSeed,
} from '../utils/practiceSession';

interface Question { id: string; czech: string; mongolian: string; }

const CZECH_CHARS = ['ě', 'š', 'č', 'ř', 'ž', 'ý', 'á', 'í', 'é'];

function makeQuestions(
  introducedWords: readonly string[],
  genderForm: 'male' | 'female' | 'neutral',
  userName: string,
  sessionSeed: string,
): Question[] {
  return pickIntroducedPracticeTargets(
    getA0ProductionPool(4, genderForm, userName),
    introducedWords,
    10,
    `${sessionSeed}:targets`,
  ).map((target) => {
    const personalized = personalizeA0PracticeTarget(target, userName);
    return { id: target.id, czech: personalized.czech, mongolian: personalized.mongolian };
  });
}

const WritingPage: React.FC = () => {
  const { addXP, setPage, updateSRSCard, progress, genderForm, userName } = useAppStore();
  const [sessionSeed, setSessionSeed] = useState(() => createPracticeSessionSeed('writing'));
  const baseQuestions = useMemo(
    () => makeQuestions(progress.introducedWords, genderForm, userName, sessionSeed),
    [genderForm, progress.introducedWords, sessionSeed, userName],
  );
  const [questions, setQuestions] = useState<Question[]>(baseQuestions);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [finished, setFinished] = useState(false);
  const originalCountRef = useRef(baseQuestions.length);
  const attemptedRef = useRef(new Set<string>());
  const retryQueuedRef = useRef(new Set<string>());
  const rewardedRef = useRef(new Set<string>());
  const masteredRef = useRef(new Set<string>());
  const question = questions[index];

  useEffect(() => {
    setQuestions(baseQuestions);
    setIndex(0);
    setAnswer('');
    setChecked(false);
    setCorrect(false);
    setScore(0);
    setShowXP(false);
    setFinished(false);
    originalCountRef.current = baseQuestions.length;
    attemptedRef.current.clear();
    retryQueuedRef.current.clear();
    rewardedRef.current.clear();
    masteredRef.current.clear();
  }, [baseQuestions]);

  if (!question) {
    return (
      <PracticeEmptyState
        icon="✍️"
        onBack={() => setPage('practice')}
        onGoToLessons={() => setPage('path')}
        description="Бичих дасгалд зөвхөн өмнө нь үзсэн, өөрөө хэлэх богино Чех хэллэгүүд орно."
      />
    );
  }

  const recordResult = (isCorrect: boolean) => {
    if (checked || !claimPracticeKey(attemptedRef.current, `${index}:${question.id}`)) return;
    setCorrect(isCorrect);
    setChecked(true);

    if (isCorrect) {
      if (claimPracticeKey(masteredRef.current, question.id)) setScore((value) => value + 1);
      if (claimPracticeKey(rewardedRef.current, question.id)) {
        addXP(15);
        setShowXP(true);
        window.setTimeout(() => setShowXP(false), 1200);
      }
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
      return;
    }

    setQuestions((current) => appendSinglePracticeRetry(current, question, retryQueuedRef.current));
    if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
  };

  const check = () => {
    if (!answer.trim()) return;
    recordResult(answer.trim().toLocaleLowerCase('cs-CZ') === question.czech.toLocaleLowerCase('cs-CZ'));
  };

  const next = () => {
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setAnswer('');
    setChecked(false);
    setCorrect(false);
  };

  const restart = () => setSessionSeed(createPracticeSessionSeed('writing'));

  if (finished) {
    const originalCount = originalCountRef.current;
    const percent = originalCount ? Math.round((score / originalCount) * 100) : 0;
    const retryCount = Math.max(0, questions.length - originalCount);
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}><section style={{ width: '100%', maxWidth: 430, padding: 28, textAlign: 'center', borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}><div style={{ fontSize: 52 }}>{percent >= 70 ? '🏆' : '👍'}</div><h1 style={{ fontSize: 24 }}>Дасгал дууслаа</h1><p style={{ color: '#A0A0A8' }}>{score} / {originalCount} хэллэгийг зөв бичсэн</p>{retryCount > 0 && <p style={{ color: '#606068', fontSize: 13 }}>Алдсан {retryCount} хэллэгийг төгсгөлд нэг удаа давтлаа.</p>}<button className="btn-gold" onClick={restart} style={{ width: '100%', padding: 15, marginBottom: 10 }}><RotateCcw size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Шинэ дасгал эхлэх</button><button className="btn-outline" onClick={() => setPage('practice')} style={{ width: '100%', padding: 15 }}>Буцах</button></section></div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => setPage('practice')} style={{ border: 0, background: 'transparent', color: '#C8952A' }}><ChevronLeft size={24} /></button>
        <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: 800 }}>Бичих дасгал</p><ProgressBar value={index + (checked ? 1 : 0)} max={questions.length} height={5} /></div>
        <span style={{ color: '#A0A0A8', fontSize: 13 }}>{index + 1}/{questions.length}</span>
      </header>
      <main style={{ maxWidth: 430, margin: '0 auto', padding: 20 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={15} /></motion.div>}</AnimatePresence>
        <section style={{ padding: 22, borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <p style={{ color: '#A0A0A8', textAlign: 'center' }}>Энэ утгыг Чехээр бичнэ үү.</p>
          <p style={{ minHeight: 64, margin: '14px 0', textAlign: 'center', fontSize: 25, fontWeight: 800 }}>{question.mongolian}</p>
          {checked && <button onClick={() => speakCzech(question.czech, { rate: .8 })} style={{ margin: '0 auto 22px', width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', background: 'rgba(200,149,42,.12)', border: '1px solid rgba(200,149,42,.35)', color: '#C8952A' }}><Volume2 size={28} /></button>}
          <input value={answer} onChange={(event) => setAnswer(event.target.value)} disabled={checked} placeholder="Энд бичнэ үү..." spellCheck={false} style={{ width: '100%', boxSizing: 'border-box', padding: 16, borderRadius: 14, color: '#FFF', background: '#141416', border: `1.5px solid ${checked ? (correct ? '#22C55E' : '#EF4444') : '#C8952A'}`, fontSize: 18, outline: 'none' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 4, marginTop: 10 }}>
            {CZECH_CHARS.map((character) => <button key={character} disabled={checked} onClick={() => setAnswer((value) => value + character)} style={{ padding: '9px 0', borderRadius: 8, color: '#FFF', background: '#242428', border: '1px solid #34343A', fontSize: 15 }}>{character}</button>)}
          </div>
          {!checked ? <><button className="btn-gold" disabled={!answer.trim()} onClick={check} style={{ marginTop: 18, width: '100%', padding: 15, opacity: answer.trim() ? 1 : .5 }}>Шалгах</button><button onClick={() => recordResult(false)} style={{ marginTop: 10, width: '100%', padding: 11, borderRadius: 12, background: 'transparent', border: '1px solid #34343A', color: '#A0A0A8', cursor: 'pointer', fontSize: 13 }}>Мэдэхгүй — хариултыг харах</button></> : <><div style={{ textAlign: 'center', padding: 16, color: correct ? '#4ADE80' : '#F87171', fontWeight: 800 }}>{correct ? <><Check size={17} style={{ verticalAlign: 'middle' }} /> Зөв байна.</> : <><X size={17} style={{ verticalAlign: 'middle' }} /> Зөв хариулт: {question.czech}</>}</div><button className="btn-gold" onClick={next} style={{ width: '100%', padding: 15 }}>{index === questions.length - 1 ? 'Дуусгах' : 'Дараах'}</button></>}
        </section>
      </main>
    </div>
  );
};

export default WritingPage;
