import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, Mic, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { usePhraseMemoryStore } from '../../stores/usePhraseMemoryStore';
import { AudioButton, ProgressBar } from '../UI/SharedComponents';
import type { CzechWord } from '../../data/czechWords';
import type { A0Exercise } from '../../data/a0FirstContact';
import { getA0MatchExercise, type A0MatchExercise } from '../../data/a0MatchExercises';
import { getA0ExerciseMemoryTargetId } from '../../data/a0ExerciseMemoryMap';
import { getA0MemoryTargetByCzech } from '../../data/a0MemoryPlan';
import type { DialogueScenario } from '../../data/a0Dialogues';
import DialogueRunner from './DialogueRunner';
import { speakCzech } from '../audio/czechSpeech';
import { stableShuffle as shuffle } from '../../utils/stableShuffle';

type Stage = 'cards' | 'exercises' | 'microDialogue' | 'microReward' | 'finalDialogue' | 'complete';
type Feedback = 'correct' | 'wrong' | null;
type SpeakingState = 'idle' | 'listening' | 'heard' | 'unavailable';
type EngineExercise = A0Exercise | A0MatchExercise;

type MicroLessonLike = {
  id: string;
  titleMn: string;
  canDoMn: string;
  cardIds: string[];
  instructions: Record<string, string>;
  exercises: A0Exercise[];
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export interface A0LessonEngineConfig {
  lessonId: string;
  titleMn: string;
  durationMinutes: number;
  cards: CzechWord[];
  microLessons: MicroLessonLike[];
  getCard: (id: string) => CzechWord;
  microDialogues: Record<string, DialogueScenario>;
  finalDialogue: DialogueScenario;
  xpReward: number;
  completionIcon: string;
  completionSummaryMn: string;
  completionPhrases: string[];
}

const shell: React.CSSProperties = {
  background: '#0C0C0E',
  minHeight: '100dvh',
  color: '#FFF',
  fontFamily: 'Inter,sans-serif',
};

const panel: React.CSSProperties = {
  background: '#1C1C1F',
  border: '1px solid #2A2A2F',
  borderRadius: 22,
  padding: 18,
};

function normalize(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const MicroReward: React.FC<{ micro: MicroLessonLike; mistakes: number; onDone: () => void }> = ({ micro, mistakes, onDone }) => {
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
  const summary = stars === 3
    ? 'Маш сайн. Та энэ хэсгийн хэллэгүүдийг зөв нөхцөлд ашиглалаа.'
    : stars === 2
      ? 'Сайн. Гол санааг авлаа. Дараагийн хэсэгт эдгээр хэллэг дахин гарна.'
      : 'Суурь тавигдлаа. Дараагийн хэсэгт энэ чадварыг дахин ашиглаж бататгана.';

  return (
    <div style={{ minHeight: '68dvh', display: 'flex', alignItems: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.88, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 190, damping: 16 }} style={{ ...panel, width: '100%', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
        <motion.div animate={{ rotate: [0, -4, 4, 0], scale: [1, 1.08, 1] }} transition={{ duration: 1.1 }} style={{ fontSize: 48, marginBottom: 8 }}>✨</motion.div>
        <p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 800 }}>{micro.titleMn} · БАТАТГАЛ</p>
        <h2 style={{ margin: '8px 0 7px', fontSize: 24 }}>Баяр хүргэе</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: 31, letterSpacing: 2, margin: '8px 0 14px' }}>
          {[0, 1, 2].map((index) => <motion.span key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }} style={{ color: index < stars ? '#F5C842' : '#4A4A50' }}>{index < stars ? '★' : '☆'}</motion.span>)}
        </div>
        <p style={{ margin: '0 auto 11px', maxWidth: 300, color: '#FFF', fontSize: 16, fontWeight: 800, lineHeight: 1.42 }}>{micro.canDoMn}</p>
        <p style={{ margin: '0 0 18px', color: '#A0A0A8', fontSize: 13, lineHeight: 1.45 }}>{summary}</p>
        <button onClick={onDone} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 15 }}>Үргэлжлүүлэх</button>
      </motion.div>
    </div>
  );
};

const CompletionCelebration: React.FC<{ config: A0LessonEngineConfig; onBack: () => void }> = ({ config, onBack }) => {
  useEffect(() => {
    if ('vibrate' in navigator) navigator.vibrate?.([35, 55, 35]);
  }, []);

  const milestone = config.titleMn.split(' — ')[0];
  return (
    <div style={{ ...shell, minHeight: '100dvh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '24px 20px', position: 'relative' }}>
      {[...Array(18)].map((_, index) => <motion.span key={index} initial={{ opacity: 0, y: -60, x: 0, rotate: 0 }} animate={{ opacity: [0, 1, 1, 0], y: 520, x: (index % 2 === 0 ? 1 : -1) * (40 + (index % 5) * 25), rotate: 360 + index * 17 }} transition={{ duration: 1.6 + (index % 3) * 0.25, delay: (index % 6) * 0.08 }} style={{ position: 'absolute', left: `${8 + (index * 17) % 84}%`, top: '-18px', color: index % 3 === 0 ? '#F5C842' : index % 3 === 1 ? '#4ADE80' : '#60A5FA', fontSize: 18, pointerEvents: 'none' }}>{index % 2 === 0 ? '✦' : '●'}</motion.span>)}
      <motion.div initial={{ opacity: 0, scale: 0.82, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ ...panel, width: '100%', maxWidth: 430, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div animate={{ rotate: [0, -7, 7, 0], scale: [1, 1.08, 1] }} transition={{ duration: 1.1 }} style={{ fontSize: 64, marginBottom: 8 }}>{config.completionIcon}</motion.div>
        <p style={{ margin: 0, color: '#C8952A', fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>{milestone} · ТҮГЖЭЭ ТАЙЛАГДЛАА</p>
        <h1 style={{ margin: '8px 0 9px', fontSize: 26 }}>Хичээл дууслаа</h1>
        <p style={{ margin: '0 auto 16px', color: '#D1D1D6', lineHeight: 1.55, maxWidth: 330 }}>{config.completionSummaryMn}</p>
        <div style={{ ...panel, padding: 14, textAlign: 'left', marginBottom: 16, background: '#17171A' }}>
          <p style={{ margin: '0 0 8px', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>ТАНЫ АВЧ ЯВАХ ХЭЛЛЭГҮҮД</p>
          {config.completionPhrases.map((text) => <p key={text} style={{ margin: '6px 0', color: '#FFF', fontSize: 14 }}>✓ {text}</p>)}
        </div>
        <button onClick={onBack} className="btn-gold" style={{ width: '100%', padding: 15, fontSize: 15 }}>Хичээлийн зам руу буцах</button>
        <button onClick={() => window.location.reload()} style={{ width: '100%', marginTop: 10, padding: 10, background: 'transparent', border: 0, color: '#A0A0A8', cursor: 'pointer' }}><RotateCcw size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Дахин хийх</button>
      </motion.div>
    </div>
  );
};

const A0LessonEngineV5: React.FC<{ config: A0LessonEngineConfig }> = ({ config }) => {
  const store = useAppStore();
  const recordExposure = usePhraseMemoryStore((state) => state.recordExposure);
  const recordAttempt = usePhraseMemoryStore((state) => state.recordAttempt);

  const [stage, setStage] = useState<Stage>('cards');
  const [microIndex, setMicroIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [typed, setTyped] = useState('');
  const [selectedCzech, setSelectedCzech] = useState<string | null>(null);
  const [selectedMongolian, setSelectedMongolian] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<string[]>([]);
  const [dialogueProgress, setDialogueProgress] = useState(0);
  const [speaking, setSpeaking] = useState<SpeakingState>('idle');
  const [heard, setHeard] = useState('');
  const [microMistakes, setMicroMistakes] = useState(0);

  const speakingTimerRef = useRef<number | null>(null);
  const wrongTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const micro = config.microLessons[microIndex];
  const currentCardId = micro?.cardIds[cardIndex];
  const card = currentCardId ? config.getCard(currentCardId) : null;
  const baseExercise = micro?.exercises[exerciseIndex] ?? null;
  const baseExerciseId = baseExercise?.id;
  const exercise: EngineExercise | null = baseExercise ? getA0MatchExercise(baseExercise.id) ?? baseExercise : null;
  const microDialogue = micro ? config.microDialogues[micro.id] : null;

  const total = useMemo(
    () => config.microLessons.reduce((sum, item) => sum + item.cardIds.length + item.exercises.length + (config.microDialogues[item.id]?.steps.length || 0), 0) + config.finalDialogue.steps.length,
    [config],
  );
  const completed = useMemo(() => {
    const before = config.microLessons.slice(0, microIndex).reduce((sum, item) => sum + item.cardIds.length + item.exercises.length + (config.microDialogues[item.id]?.steps.length || 0), 0);
    if (stage === 'cards') return before + cardIndex;
    if (stage === 'exercises' && micro) return before + micro.cardIds.length + exerciseIndex;
    if (stage === 'microDialogue' && micro) return before + micro.cardIds.length + micro.exercises.length + dialogueProgress;
    if (stage === 'microReward' && micro) return before + micro.cardIds.length + micro.exercises.length + (microDialogue?.steps.length || 0);
    if (stage === 'finalDialogue') return total - config.finalDialogue.steps.length + dialogueProgress;
    return total;
  }, [cardIndex, config, dialogueProgress, exerciseIndex, micro, microDialogue?.steps.length, microIndex, stage, total]);

  const choices = useMemo(() => exercise && (exercise.type === 'choice' || exercise.type === 'fillBlank') ? shuffle(exercise.choices, exercise.id) : [], [exercise]);
  const czechPairs = useMemo(() => exercise?.type === 'match' ? shuffle(exercise.pairs, `${exercise.id}-cs`) : [], [exercise]);
  const mongolianPairs = useMemo(() => exercise?.type === 'match' ? shuffle(exercise.pairs, `${exercise.id}-mn`) : [], [exercise]);

  const trackTextExposure = useCallback((text: string) => {
    const target = getA0MemoryTargetByCzech(text);
    if (target) recordExposure(target.id);
  }, [recordExposure]);

  const trackTextAttempt = useCallback((text: string, correct: boolean) => {
    const target = getA0MemoryTargetByCzech(text);
    if (target) recordAttempt(target.id, correct);
  }, [recordAttempt]);

  const trackCurrentExerciseAttempt = useCallback((correct: boolean) => {
    if (baseExerciseId) recordAttempt(getA0ExerciseMemoryTargetId(baseExerciseId) ?? baseExerciseId, correct);
  }, [baseExerciseId, recordAttempt]);

  useEffect(() => () => {
    recognitionRef.current?.abort();
    if (speakingTimerRef.current) window.clearTimeout(speakingTimerRef.current);
    if (wrongTimerRef.current) window.clearTimeout(wrongTimerRef.current);
  }, []);

  useEffect(() => {
    if (stage !== 'cards' || !card) return;
    trackTextExposure(card.czech);
  }, [card?.czech, card?.id, stage, trackTextExposure]);

  useEffect(() => {
    if (stage !== 'exercises' || !exercise) return;
    if (baseExerciseId) {
      const targetId = getA0ExerciseMemoryTargetId(baseExerciseId);
      if (targetId) recordExposure(targetId);
    }
    if (exercise.type === 'match') exercise.pairs.forEach((pair) => trackTextExposure(pair.czech));
  }, [baseExerciseId, exercise, recordExposure, stage, trackTextExposure]);

  const addMistake = () => setMicroMistakes((value) => value + 1);

  const resetExercise = useCallback(() => {
    setFeedback(null);
    setChoice(null);
    setTokens([]);
    setTyped('');
    setSelectedCzech(null);
    setSelectedMongolian(null);
    setMatched([]);
    setWrongMatch([]);
  }, []);

  const resetSpeaking = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setSpeaking('idle');
    setHeard('');
  }, []);

  const nextCard = useCallback(() => {
    if (!micro) return;
    resetSpeaking();
    if (cardIndex < micro.cardIds.length - 1) {
      setCardIndex((value) => value + 1);
      setShowMeaning(false);
      return;
    }
    setStage('exercises');
    setExerciseIndex(0);
    resetExercise();
  }, [cardIndex, micro, resetExercise, resetSpeaking]);

  useEffect(() => {
    if (speaking !== 'heard') return;
    speakingTimerRef.current = window.setTimeout(nextCard, 1250);
    return () => { if (speakingTimerRef.current) window.clearTimeout(speakingTimerRef.current); };
  }, [nextCard, speaking]);

  const nextMicro = () => {
    if (microIndex < config.microLessons.length - 1) {
      setMicroIndex((value) => value + 1);
      setCardIndex(0);
      setShowMeaning(false);
      setDialogueProgress(0);
      setMicroMistakes(0);
      resetExercise();
      resetSpeaking();
      setStage('cards');
      return;
    }
    setDialogueProgress(0);
    setStage('finalDialogue');
  };

  const nextExercise = () => {
    if (!micro) return;
    if (exerciseIndex < micro.exercises.length - 1) {
      setExerciseIndex((value) => value + 1);
      resetExercise();
      return;
    }
    if (microDialogue) {
      setDialogueProgress(0);
      setStage('microDialogue');
      return;
    }
    setStage('microReward');
  };

  const finish = () => {
    // Lesson completion records actual study time, XP, streak, and progression.
    // Card mastery is only changed by evidence from card/exercise/dialogue attempts.
    store.addXP(config.xpReward);
    store.addMinutes(config.durationMinutes);
    store.updateStreak();
    store.completeLesson(config.lessonId);
    store.unlockNextLesson(config.lessonId);
    setStage('complete');
  };

  const startSpeaking = () => {
    if (!card || speaking === 'listening') return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeaking('unavailable');
      setHeard('Энэ browser Чех яриа танихыг дэмжихгүй байна. Chrome ашиглаарай.');
      return;
    }

    const instance = new Recognition();
    recognitionRef.current = instance;
    instance.lang = 'cs-CZ';
    instance.continuous = false;
    instance.interimResults = false;
    instance.maxAlternatives = 1;
    instance.onstart = () => { setHeard(''); setSpeaking('listening'); };
    instance.onresult = (event) => { setHeard(event.results[0][0].transcript); setSpeaking('heard'); };
    instance.onerror = (event) => {
      setSpeaking('unavailable');
      setHeard(event.error === 'not-allowed' ? 'Микрофоны зөвшөөрөл олгогдоогүй.' : 'Яриа танигдсангүй. Дахин хэлээд үзээрэй.');
    };
    instance.onend = () => { recognitionRef.current = null; };
    try { instance.start(); } catch { setSpeaking('unavailable'); setHeard('Микрофон эхэлсэнгүй.'); }
  };

  const choose = (id: string, correctId: string) => {
    const correct = id === correctId;
    setChoice(id);
    setFeedback(correct ? 'correct' : 'wrong');
    trackCurrentExerciseAttempt(correct);
    if (!correct) addMistake();
  };

  const addToken = (token: string) => {
    if (!exercise || exercise.type !== 'order' || feedback === 'correct') return;
    const next = [...tokens, token];
    setTokens(next);
    if (next.length === exercise.tokens.length) {
      const correct = next.join(' ') === exercise.expectedText;
      setFeedback(correct ? 'correct' : 'wrong');
      trackCurrentExerciseAttempt(correct);
      if (!correct) addMistake();
    }
  };

  const submitTyping = () => {
    if (exercise?.type !== 'typing') return;
    const correct = normalize(typed) === normalize(exercise.targetText);
    setFeedback(correct ? 'correct' : 'wrong');
    trackCurrentExerciseAttempt(correct);
    if (!correct) addMistake();
  };

  const tryMatch = (czechId: string, mongolianId: string) => {
    if (!exercise || exercise.type !== 'match') return;
    const pair = exercise.pairs.find((item) => item.id === czechId);
    const correct = czechId === mongolianId;
    if (pair) trackTextAttempt(pair.czech, correct);

    if (correct) {
      const next = [...matched, czechId];
      setMatched(next);
      setSelectedCzech(null);
      setSelectedMongolian(null);
      if (next.length === exercise.pairs.length) setFeedback('correct');
      return;
    }

    addMistake();
    setWrongMatch([czechId, mongolianId]);
    if (wrongTimerRef.current) window.clearTimeout(wrongTimerRef.current);
    wrongTimerRef.current = window.setTimeout(() => {
      setWrongMatch([]);
      setSelectedCzech(null);
      setSelectedMongolian(null);
    }, 650);
  };

  const chooseCzech = (id: string) => {
    if (!exercise || exercise.type !== 'match' || matched.includes(id)) return;
    const pair = exercise.pairs.find((item) => item.id === id);
    if (pair) speakCzech(pair.czech);
    if (selectedMongolian) tryMatch(id, selectedMongolian);
    else setSelectedCzech(id);
  };

  const chooseMongolian = (id: string) => {
    if (!exercise || exercise.type !== 'match' || matched.includes(id)) return;
    if (selectedCzech) tryMatch(selectedCzech, id);
    else setSelectedMongolian(id);
  };

  const feedbackBox = (message: string, success = 'Зөв.') => {
    if (!feedback) return null;
    return <div style={{ marginTop: 11, padding: 11, borderRadius: 12, background: feedback === 'correct' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: feedback === 'correct' ? '1px solid rgba(34,197,94,.35)' : '1px solid rgba(239,68,68,.35)' }}><p style={{ margin: 0, color: feedback === 'correct' ? '#4ADE80' : '#F87171', fontSize: 13, fontWeight: 800 }}>{feedback === 'correct' ? success : 'Буруу. Дахин оролдоорой.'}</p>{feedback === 'correct' && <p style={{ margin: '4px 0 0', color: '#D1D1D6', fontSize: 12 }}>{message}</p>}</div>;
  };

  const optionStyle = (right: boolean, wrong: boolean): React.CSSProperties => ({
    textAlign: 'left',
    padding: '12px 13px',
    borderRadius: 13,
    color: '#FFF',
    background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428',
    border: right ? '1px solid rgba(34,197,94,.6)' : wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A',
    cursor: feedback === 'correct' ? 'default' : 'pointer',
  });

  if (stage === 'complete') return <CompletionCelebration config={config} onBack={() => store.setPage('path')} />;

  return (
    <div style={shell}>
      <header style={{ padding: 'max(16px, env(safe-area-inset-top)) 20px 13px', background: '#141416', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
          <button onClick={() => store.setPage('path')} style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: '#242428', color: '#A0A0A8', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <div style={{ flex: 1 }}><p style={{ margin: 0, color: '#A0A0A8', fontSize: 12 }}>{config.titleMn.split(' — ')[0]} · {config.durationMinutes} минут</p><h1 style={{ margin: '2px 0 0', fontSize: 17 }}>{config.titleMn.split(' — ')[1] || config.titleMn}</h1></div>
          <span style={{ color: '#C8952A', fontSize: 12, fontWeight: 800 }}>{Math.min(completed + 1, total)}/{total}</span>
        </div>
        <ProgressBar value={completed} max={total} height={5} />
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '18px 16px 30px' }}>
        {stage === 'cards' && card && micro && <>
          <p style={{ margin: '0 0 5px', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>{micro.titleMn}</p>
          <p style={{ margin: '0 0 14px', color: '#A0A0A8', fontSize: 13 }}>{micro.canDoMn}</p>
          <motion.div key={card.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} style={panel}>
            <p style={{ margin: '0 0 10px', color: '#606068', fontSize: 12 }}>Шинэ карт {cardIndex + 1}/{micro.cardIds.length}</p>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px,9vw,36px)', margin: '0 0 14px' }}>{card.czech}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><AudioButton word={card.czech} audioFile={card.audioFile} size="lg" /></div>
            {!showMeaning ? <button onClick={() => setShowMeaning(true)} className="btn-outline" style={{ width: '100%', padding: 13 }}>Монгол утгыг харах</button> : <div style={{ padding: 14, borderRadius: 14, background: 'rgba(200,149,42,.10)', border: '1px solid rgba(200,149,42,.28)' }}><p style={{ margin: '0 0 7px', fontSize: 18, fontWeight: 800 }}>{card.mongolian}</p><p style={{ margin: 0, color: '#D1D1D6', fontSize: 13 }}>{micro.instructions[card.id]}</p></div>}
          </motion.div>
          {showMeaning && speaking === 'idle' && <div style={{ marginTop: 15 }}><button onClick={startSpeaking} className="btn-gold" style={{ width: '100%', padding: 14 }}><Mic size={18} /> Яриа таних туршилт</button><button onClick={nextCard} style={{ width: '100%', marginTop: 8, background: 'transparent', border: 0, color: '#A0A0A8', cursor: 'pointer' }}>Одоохондоо алгасах</button></div>}
          {showMeaning && speaking === 'listening' && <div style={{ ...panel, marginTop: 15, textAlign: 'center', borderColor: 'rgba(239,68,68,.45)' }}><Mic size={28} color="#F87171" /><p style={{ color: '#F87171', fontWeight: 800 }}>Яриа таньж байна…</p><p style={{ color: '#A0A0A8', fontSize: 12 }}>“{card.czech}” гэж хэлээрэй</p></div>}
          {showMeaning && speaking === 'heard' && <div style={{ ...panel, marginTop: 15, textAlign: 'center', borderColor: 'rgba(34,197,94,.45)' }}><Check color="#4ADE80" /><p style={{ color: '#4ADE80', fontWeight: 800 }}>Таны хэлсэн үг танигдлаа</p><p>“{heard}”</p><p style={{ color: '#A0A0A8', fontSize: 12 }}>Энэ нь дуудлагын үнэлгээ биш. Дараагийн карт руу шилжиж байна…</p></div>}
          {showMeaning && speaking === 'unavailable' && <div style={{ ...panel, marginTop: 15, textAlign: 'center' }}><p style={{ color: '#F87171', fontWeight: 800 }}>Яриа таних горим ажилласангүй</p><p style={{ fontSize: 12, color: '#D1D1D6' }}>{heard}</p><button onClick={startSpeaking} className="btn-outline" style={{ width: '100%', padding: 11 }}>Дахин оролдох</button><button onClick={nextCard} style={{ width: '100%', marginTop: 8, background: 'transparent', border: 0, color: '#A0A0A8', cursor: 'pointer' }}>Алгасаад үргэлжлүүлэх</button></div>}
        </>}

        {stage === 'exercises' && exercise && micro && <>
          <p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800 }}>{micro.titleMn} · Бататгал</p>
          <div style={panel}>
            <p style={{ color: '#A0A0A8', fontSize: 12 }}>{exercise.titleMn}</p>
            <h2 style={{ fontSize: 19, marginTop: 0 }}>{exercise.promptMn}</h2>
            {(exercise.type === 'choice' || exercise.type === 'typing') && exercise.audioText && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><AudioButton word={exercise.audioText} size="md" /><span style={{ color: '#A0A0A8', fontSize: 12 }}>Дараад сонсоорой</span></div>}
            {(exercise.type === 'choice' || exercise.type === 'fillBlank') && exercise.promptCzech && <div style={{ padding: 13, borderRadius: 13, background: '#242428', textAlign: 'center', fontSize: 21, fontWeight: 800, marginBottom: 12 }}>{exercise.promptCzech}</div>}
            {(exercise.type === 'choice' || exercise.type === 'fillBlank') && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{choices.map((item) => <button key={item.id} onClick={() => choose(item.id, exercise.correctId)} disabled={feedback === 'correct'} style={optionStyle(feedback === 'correct' && item.id === exercise.correctId, feedback === 'wrong' && choice === item.id)}>{item.text}</button>)}{feedbackBox(exercise.feedbackMn)}</div>}
            {exercise.type === 'order' && <div><div style={{ minHeight: 55, display: 'flex', flexWrap: 'wrap', gap: 7, padding: 9, border: '1px dashed #42424A', borderRadius: 12, marginBottom: 10 }}>{tokens.map((item, index) => <button key={`${item}-${index}`} onClick={() => { if (feedback !== 'correct') { setTokens((list) => list.filter((_, position) => position !== index)); setFeedback(null); } }} style={{ border: '1px solid rgba(200,149,42,.4)', background: 'rgba(200,149,42,.16)', color: '#F5C842', borderRadius: 9, padding: '7px 9px' }}>{item}</button>)}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{exercise.tokens.map((item, index) => { const used = tokens.filter((token) => token === item).length > exercise.tokens.slice(0, index).filter((token) => token === item).length; return <button key={`${item}-${index}`} onClick={() => addToken(item)} disabled={used || feedback === 'correct'} style={{ opacity: used ? 0.4 : 1, padding: '9px 10px', borderRadius: 9, border: '1px solid #34343A', background: '#242428', color: '#FFF' }}>{item}</button>; })}</div>{feedback === 'wrong' && <button onClick={resetExercise} style={{ marginTop: 10, color: '#F5C842', border: 0, background: 'transparent' }}>Дахин оролдох</button>}{feedbackBox(exercise.feedbackMn)}</div>}
            {exercise.type === 'typing' && <div><input value={typed} onChange={(event) => { setTyped(event.target.value); setFeedback(null); }} placeholder={exercise.inputHint || 'Чехээр бич…'} style={{ width: '100%', boxSizing: 'border-box', padding: 12, borderRadius: 12, background: '#141416', border: '1px solid #42424A', color: '#FFF' }} /><button onClick={submitTyping} className="btn-outline" style={{ width: '100%', marginTop: 9, padding: 11 }}>Шалгах</button>{feedbackBox(exercise.feedbackMn)}</div>}
            {exercise.type === 'match' && <div><p style={{ color: '#A0A0A8', fontSize: 12, marginTop: 0 }}>Зүүн талын Чех хэллэгийг дармагц аудио сонсогдоно. Дараа нь баруун талын Монгол утгыг дар.</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{czechPairs.filter((item) => !matched.includes(item.id)).map((item) => <button key={item.id} onClick={() => chooseCzech(item.id)} style={optionStyle(selectedCzech === item.id, wrongMatch.includes(item.id))}>{item.czech}<span style={{ display: 'block', marginTop: 4, color: '#F5C842', fontSize: 10 }}>🔊 сонсох</span></button>)}</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{mongolianPairs.filter((item) => !matched.includes(item.id)).map((item) => <button key={item.id} onClick={() => chooseMongolian(item.id)} style={optionStyle(selectedMongolian === item.id, wrongMatch.includes(item.id))}>{item.mongolian}</button>)}</div></div>{matched.length > 0 && feedback !== 'correct' && <p style={{ color: '#4ADE80', fontSize: 12, fontWeight: 800 }}>{matched.length}/{exercise.pairs.length} хос зөв таарлаа</p>}{feedbackBox(exercise.feedbackMn, 'Бүх хос зөв таарлаа.')}</div>}
          </div>
          {feedback === 'correct' && <button onClick={nextExercise} className="btn-gold" style={{ width: '100%', marginTop: 15, padding: 14 }}>Үргэлжлүүлэх</button>}
        </>}

        {stage === 'microDialogue' && microDialogue && <DialogueRunner scenario={microDialogue} onProgress={setDialogueProgress} onComplete={() => setStage('microReward')} onAttempt={trackTextAttempt} onExposure={trackTextExposure} onMistake={addMistake} />}
        {stage === 'microReward' && micro && <MicroReward micro={micro} mistakes={microMistakes} onDone={nextMicro} />}
        {stage === 'finalDialogue' && <DialogueRunner scenario={config.finalDialogue} onProgress={setDialogueProgress} onComplete={finish} onAttempt={trackTextAttempt} onExposure={trackTextExposure} />}
      </main>
    </div>
  );
};

export default A0LessonEngineV5;
