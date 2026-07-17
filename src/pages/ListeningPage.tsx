import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play, Pause, Check, X, RotateCcw } from 'lucide-react';
import { cancelCzechSpeech, speakCzech } from '../components/audio/czechSpeech';
import { useAppStore } from '../stores/useAppStore';
import { Waveform, ProgressBar, XPToast } from '../components/UI/SharedComponents';
import PracticeEmptyState from '../components/practice/PracticeEmptyState';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';
import {
  getA0ListeningTargets,
  personalizeA0PracticeTarget,
  pickIntroducedPracticeTargets,
} from '../data/a0PracticePools';
import type { A0MemoryTarget } from '../data/a0MemoryPlan';
import { stableShuffle } from '../utils/stableShuffle';
import {
  appendSinglePracticeRetry,
  claimPracticeKey,
  createPracticeSessionSeed,
} from '../utils/practiceSession';

interface Question {
  id: string;
  czech: string;
  answer: string;
  options: string[];
}

function normalizeMongolian(text: string) {
  return text.toLocaleLowerCase('mn-MN').replace(/[.,?!…—-]/g, '').replace(/\s+/g, ' ').trim();
}

function makeQuestions(targets: readonly A0MemoryTarget[], sessionSeed: string): Question[] {
  const shuffled = stableShuffle(targets, `${sessionSeed}:targets`);
  return shuffled.slice(0, 10).flatMap((target) => {
    const answer = target.mongolian;
    const seen = new Set([normalizeMongolian(answer)]);
    const distractors: string[] = [];

    for (const candidate of stableShuffle(shuffled, `${sessionSeed}:${target.id}:distractors`)) {
      if (candidate.id === target.id || distractors.length >= 3) continue;
      const normalized = normalizeMongolian(candidate.mongolian);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      distractors.push(candidate.mongolian);
    }

    if (distractors.length < 2) return [];
    return [{
      id: target.id,
      czech: target.czech,
      answer,
      options: stableShuffle([answer, ...distractors], `${sessionSeed}:${target.id}:options`),
    }];
  });
}

const ListeningPage: React.FC = () => {
  const { addXP, updateSRSCard, setPage, progress, genderForm, userName } = useAppStore();
  const [sessionSeed, setSessionSeed] = useState(() => createPracticeSessionSeed('listening'));
  const baseQuestions = useMemo(() => {
    const pool = getA0ListeningTargets(genderForm, userName);
    const introduced = pickIntroducedPracticeTargets(
      pool,
      progress.introducedWords,
      10,
      `${sessionSeed}:eligible`,
    ).map((target) => personalizeA0PracticeTarget(target, userName));
    return makeQuestions(introduced, sessionSeed);
  }, [genderForm, progress.introducedWords, sessionSeed, userName]);
  const [questions, setQuestions] = useState<Question[]>(baseQuestions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const originalCountRef = useRef(baseQuestions.length);
  const attemptedRef = useRef(new Set<string>());
  const retryQueuedRef = useRef(new Set<string>());
  const rewardedRef = useRef(new Set<string>());
  const masteredRef = useRef(new Set<string>());
  const question = questions[index];

  useEffect(() => {
    cancelCzechSpeech();
    setQuestions(baseQuestions);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setPlaying(false);
    setShowXP(false);
    setScore(0);
    setFinished(false);
    originalCountRef.current = baseQuestions.length;
    attemptedRef.current.clear();
    retryQueuedRef.current.clear();
    rewardedRef.current.clear();
    masteredRef.current.clear();
  }, [baseQuestions]);

  useEffect(() => () => cancelCzechSpeech(), []);

  if (!question) {
    return (
      <PracticeEmptyState
        icon="🎧"
        onBack={() => setPage('practice')}
        onGoToLessons={() => setPage('path')}
        description="Сонсох дасгалд зөвхөн өмнө нь үзсэн Чех хэллэгүүд орно."
      />
    );
  }

  const play = () => {
    if (playing) {
      cancelCzechSpeech();
      setPlaying(false);
      return;
    }

    setPlaying(true);
    speakCzech(question.czech, { rate: 0.8, onFinished: () => setPlaying(false) });
  };

  const pick = (option: string) => {
    if (answered || !claimPracticeKey(attemptedRef.current, `${index}:${question.id}`)) return;
    const correct = option === question.answer;
    setSelected(option);
    setAnswered(true);

    if (correct) {
      if (claimPracticeKey(masteredRef.current, question.id)) setScore((value) => value + 1);
      if (claimPracticeKey(rewardedRef.current, question.id)) {
        addXP(15);
        setShowXP(true);
        window.setTimeout(() => setShowXP(false), 1100);
      }
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
    } else {
      setQuestions((current) => appendSinglePracticeRetry(current, question, retryQueuedRef.current));
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
    }
  };

  const next = () => {
    cancelCzechSpeech();
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setAnswered(false);
    setPlaying(false);
  };

  const restart = () => {
    cancelCzechSpeech();
    setSessionSeed(createPracticeSessionSeed('listening'));
  };

  if (finished) {
    const originalCount = originalCountRef.current;
    const percent = originalCount ? Math.round((score / originalCount) * 100) : 0;
    const retryCount = Math.max(0, questions.length - originalCount);
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <motion.div initial={{ scale: .75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1C1C1F', borderRadius: 28, padding: 32, textAlign: 'center', border: '1px solid #2A2A2F', width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>{percent >= 70 ? '🏆' : percent >= 40 ? '👍' : '💪'}</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>Дасгал дууслаа!</h2>
          <p style={{ fontSize: 14, color: '#A0A0A8', marginBottom: 8 }}>{score}/{originalCount} хэллэгийг зөв таньсан</p>
          {retryCount > 0 && <p style={{ fontSize: 13, color: '#606068', marginBottom: 16 }}>Алдсан {retryCount} хэллэгийг төгсгөлд нэг удаа давтлаа.</p>}
          <div style={{ marginBottom: 20 }}><ProgressBar value={score} max={originalCount} height={10} showPct color={percent >= 70 ? '#22C55E' : '#C8952A'} /></div>
          <button onClick={restart} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 14, marginBottom: 10 }}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Шинэ дасгал эхлэх</button>
          <button onClick={() => setPage('practice')} className="btn-outline" style={{ width: '100%', padding: 14, fontSize: 14 }}>Буцах</button>
        </motion.div>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];
  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#141416', padding: '16px 20px 14px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={() => { cancelCzechSpeech(); setPage('practice'); }} style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={18} color="#A0A0A8" /></button>
          <h1 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', flex: 1 }}>🎧 Сонсох дасгал</h1>
          <div style={{ background: 'rgba(200,149,42,.15)', borderRadius: 10, padding: '4px 10px', border: '1px solid rgba(200,149,42,.3)' }}><span style={{ fontSize: 13, fontWeight: 700, color: '#C8952A' }}>{index + 1}/{questions.length}</span></div>
        </div>
        <ProgressBar value={index + (answered ? 1 : 0)} max={questions.length} height={5} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ fontSize: 11, color: '#606068' }}>✓ {score} зөв</span><span style={{ fontSize: 11, color: '#606068' }}>{Math.max(0, questions.length - index - (answered ? 1 : 0))} үлдсэн</span></div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AnimatePresence>{showXP && <motion.div style={{ display: 'flex', justifyContent: 'center' }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}><XPToast xp={15} /></motion.div>}</AnimatePresence>
        <motion.div key={`${index}:${question.id}`} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#1C1C1F', borderRadius: 24, padding: 28, textAlign: 'center', border: '1px solid #2A2A2F' }}>
          <p style={{ fontSize: 13, color: '#A0A0A8', marginBottom: 16 }}>Аудио сонсоод зөв хариулгыг олно уу</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Waveform active={playing} /></div>
          <motion.button whileTap={{ scale: .92 }} onClick={play} style={{ width: 72, height: 72, borderRadius: 36, background: playing ? 'linear-gradient(135deg,#C8952A,#F5C842)' : 'rgba(200,149,42,.15)', border: `2px solid ${playing ? 'transparent' : 'rgba(200,149,42,.4)'}`, color: playing ? '#000' : '#C8952A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: playing ? '0 4px 20px rgba(200,149,42,.4)' : 'none', margin: '0 auto' }}>{playing ? <Pause size={28} /> : <Play size={28} />}</motion.button>
          {answered && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 18, fontWeight: 800, color: '#FFF', marginTop: 14 }}>{question.czech}</motion.p>}
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((option, optionIndex) => {
            const isAnswer = option === question.answer;
            const isSelected = option === selected;
            const right = answered && isAnswer;
            const wrong = answered && isSelected && !isAnswer;
            const background = right ? 'rgba(34,197,94,.12)' : wrong ? 'rgba(239,68,68,.12)' : '#1C1C1F';
            const border = right ? 'rgba(34,197,94,.5)' : wrong ? 'rgba(239,68,68,.5)' : '#2A2A2F';
            const color = right ? '#22C55E' : wrong ? '#F87171' : '#FFF';
            const labelBackground = right ? '#22C55E' : wrong ? '#EF4444' : '#242428';
            const labelColor = right ? '#000' : wrong ? '#FFF' : '#A0A0A8';
            return <motion.button key={option} whileHover={!answered ? { x: 3 } : {}} whileTap={!answered ? { scale: .97 } : {}} onClick={() => pick(option)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, background, border: `1.5px solid ${border}`, cursor: answered ? 'default' : 'pointer', textAlign: 'left', transition: 'all .15s' }}><div style={{ width: 34, height: 34, borderRadius: 10, background: labelBackground, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: labelColor, flexShrink: 0 }}>{letters[optionIndex]}</div><span style={{ flex: 1, fontSize: 14, fontWeight: 600, color }}>{option}</span>{right && <Check size={18} color="#22C55E" />}{wrong && <X size={18} color="#EF4444" />}</motion.button>;
          })}
        </div>

        {answered && <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: .97 }} onClick={next} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 14 }}>{index < questions.length - 1 ? 'Дараах асуулт →' : 'Дүн харах 🏆'}</motion.button>}
      </div>
    </div>
  );
};

export default ListeningPage;
