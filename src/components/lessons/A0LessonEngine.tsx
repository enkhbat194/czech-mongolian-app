import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, Mic, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { AudioButton, ProgressBar } from '../UI/SharedComponents';
import type { CzechWord } from '../../data/czechWords';
import type { A0Exercise } from '../../data/a0FirstContact';
import type { DialogueScenario, DialogueStep } from '../../data/a0Dialogues';

type Stage = 'cards' | 'exercises' | 'microDialogue' | 'finalDialogue' | 'complete';
type Feedback = 'correct' | 'wrong' | null;
type SpeakingState = 'idle' | 'listening' | 'heard' | 'unavailable';

type MicroLessonLike = {
  id: string;
  titleMn: string;
  canDoMn: string;
  cardIds: string[];
  instructions: Record<string, string>;
  exercises: A0Exercise[];
};

type RecognitionResultLike = { 0: { transcript: string } };
type RecognitionEventLike = { results: { 0: RecognitionResultLike } };
type RecognitionErrorLike = { error: string };
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorLike) => void) | null;
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

const shell: React.CSSProperties = { background: '#0C0C0E', minHeight: '100dvh', fontFamily: 'Inter,sans-serif', color: '#FFF' };
const panel: React.CSSProperties = { background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 24, padding: 22 };

function stableShuffle<T>(items: T[], seedText: string): T[] {
  let seed = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) seed = Math.imul(seed ^ seedText.charCodeAt(index), 16777619);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 2246822507) >>> 0;
    const swapIndex = seed % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function normalizeCzech(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function speakCzech(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'cs-CZ';
  utterance.rate = 0.84;
  window.speechSynthesis.speak(utterance);
}

function responseDelay(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.min(3300, Math.max(1450, 600 + words * 280));
}

const TinyPlay: React.FC<{ text: string }> = ({ text }) => (
  <button onClick={() => speakCzech(text)} aria-label="Дахин сонсох" style={{ width: 25, height: 25, borderRadius: 13, border: '1px solid rgba(200,149,42,.42)', background: 'rgba(200,149,42,.12)', color: '#F5C842', cursor: 'pointer', fontSize: 12, lineHeight: 1, padding: 0, flexShrink: 0 }}>🔊</button>
);

const DialogueRun: React.FC<{
  scenario: DialogueScenario;
  onComplete: () => void;
  onProgress: (stepIndex: number) => void;
}> = ({ scenario, onComplete, onProgress }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ id: string; side: 'staff' | 'user'; speaker: string; czech: string; mongolian: string }>>([]);
  const [autoAudio, setAutoAudio] = useState(true);
  const timerRef = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const current = scenario.steps[stepIndex];
  const choices = useMemo(() => stableShuffle(current.choices, current.id), [current]);

  useEffect(() => {
    onProgress(stepIndex);
    const frame = window.requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current?.scrollHeight || 0, behavior: 'smooth' }));
    return () => window.cancelAnimationFrame(frame);
  }, [history.length, onProgress, stepIndex, feedback]);

  useEffect(() => {
    if (!autoAudio) return;
    const timer = window.setTimeout(() => speakCzech(current.staffCzech), 260);
    return () => window.clearTimeout(timer);
  }, [autoAudio, current.id, current.staffCzech]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const choose = (picked: string) => {
    if (feedback === 'correct') return;
    const correct = picked === current.correctId;
    setPickedId(picked);
    setFeedback(correct ? 'correct' : 'wrong');
    if (!correct) return;

    const reply = current.choices.find((item) => item.id === picked);
    if (!reply) return;

    setHistory((items) => [
      ...items,
      { id: `${current.id}-staff`, side: 'staff', speaker: current.speaker, czech: current.staffCzech, mongolian: current.staffMn },
      { id: `${current.id}-user`, side: 'user', speaker: 'Та', czech: reply.text, mongolian: reply.mongolian },
    ]);

    if (autoAudio) speakCzech(reply.text);
    timerRef.current = window.setTimeout(() => {
      if (stepIndex === scenario.steps.length - 1) onComplete();
      else {
        setStepIndex((value) => value + 1);
        setFeedback(null);
        setPickedId(null);
      }
    }, responseDelay(reply.text));
  };

  const bubble = (side: 'staff' | 'user', speaker: string, czech: string, mongolian: string, id: string) => (
    <div key={id} style={{ display: 'flex', flexDirection: side === 'staff' ? 'row' : 'row-reverse', alignItems: 'flex-end', gap: 6 }}>
      <div style={{ width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, background: side === 'staff' ? '#44526B' : '#7B5B22', border: side === 'staff' ? '1px solid #70809C' : '1px solid rgba(245,200,66,.55)' }}>{side === 'staff' ? '👩‍💼' : '🙂'}</div>
      <div style={{ maxWidth: '80%', background: side === 'staff' ? '#242428' : 'rgba(200,149,42,.16)', border: side === 'staff' ? '1px solid #34343A' : '1px solid rgba(200,149,42,.40)', borderRadius: 14, padding: '8px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}><p style={{ margin: 0, flex: 1, color: side === 'staff' ? '#A0A0A8' : '#F5C842', fontSize: 9, fontWeight: 800 }}>{speaker}</p><TinyPlay text={czech} /></div>
        <p style={{ margin: 0, color: '#FFF', fontSize: 14, fontWeight: 800, lineHeight: 1.25 }}>{czech}</p>
        <p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 11, lineHeight: 1.3 }}>{mongolian}</p>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ ...panel, padding: 12, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 9, background: 'linear-gradient(135deg,#1C1C1F,#252A34)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, background: '#44526B', border: '1px solid #70809C' }}>👩‍💼</div>
        <div style={{ flex: 1 }}><p style={{ margin: 0, color: '#FFF', fontSize: 13, fontWeight: 800 }}>{scenario.titleMn}</p><p style={{ margin: '2px 0 0', color: '#A0A0A8', fontSize: 11 }}>{scenario.contextMn}</p></div>
        <button onClick={() => setAutoAudio((value) => !value)} style={{ border: '1px solid rgba(200,149,42,.42)', borderRadius: 10, background: autoAudio ? 'rgba(200,149,42,.16)' : 'transparent', color: autoAudio ? '#F5C842' : '#A0A0A8', padding: '7px 8px', cursor: 'pointer', fontSize: 10, fontWeight: 800 }}>{autoAudio ? '🔊 Авто' : '🔇 Дуугүй'}</button>
      </div>
      <div style={panel}>
        <div ref={logRef} style={{ maxHeight: 'min(31dvh, 235px)', overflowY: 'auto', overscrollBehavior: 'contain', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {history.map((entry) => bubble(entry.side, entry.speaker, entry.czech, entry.mongolian, entry.id))}
          {feedback !== 'correct' && bubble('staff', current.speaker, current.staffCzech, current.staffMn, `${current.id}-current`)}
        </div>
        <div style={{ borderTop: '1px solid #2A2A2F', paddingTop: 12 }}>
          <p style={{ margin: '0 0 8px', color: '#C8952A', fontSize: 11, fontWeight: 800 }}>Таны хариу</p>
          <h2 style={{ margin: '0 0 12px', fontSize: 16, lineHeight: 1.35 }}>{current.promptMn}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {choices.map((item) => {
              const correct = feedback === 'correct' && item.id === current.correctId;
              const wrong = feedback === 'wrong' && item.id === pickedId;
              return <button key={item.id} onClick={() => choose(item.id)} disabled={feedback === 'correct'} style={{ textAlign: 'left', padding: '12px 13px', borderRadius: 13, color: '#FFF', fontSize: 14, lineHeight: 1.35, cursor: feedback === 'correct' ? 'default' : 'pointer', background: correct ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: correct ? '1px solid rgba(34,197,94,.6)' : wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A' }}>{item.text}</button>;
            })}
          </div>
          {feedback && <div style={{ marginTop: 11, borderRadius: 12, padding: 11, background: feedback === 'correct' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: feedback === 'correct' ? '1px solid rgba(34,197,94,.35)' : '1px solid rgba(239,68,68,.35)' }}><p style={{ margin: 0, color: feedback === 'correct' ? '#4ADE80' : '#F87171', fontWeight: 800, fontSize: 13 }}>{feedback === 'correct' ? 'Зөв. Яриа үргэлжилж байна…' : 'Буруу. Дахин оролдоорой.'}</p>{feedback === 'correct' && <p style={{ margin: '4px 0 0', color: '#D1D1D6', fontSize: 12, lineHeight: 1.4 }}>{current.feedbackMn}</p>}</div>}
        </div>
      </div>
    </>
  );
};

const A0LessonEngine: React.FC<{ config: A0LessonEngineConfig }> = ({ config }) => {
  const { setPage, markWordLearned, updateSRSCard, completeLesson, unlockNextLesson, addXP, addMinutes, updateStreak } = useAppStore();
  const [stage, setStage] = useState<Stage>('cards');
  const [microIndex, setMicroIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [orderedTokens, setOrderedTokens] = useState<string[]>([]);
  const [typedText, setTypedText] = useState('');
  const [dialogueStep, setDialogueStep] = useState(0);
  const [speakingState, setSpeakingState] = useState<SpeakingState>('idle');
  const [heardText, setHeardText] = useState('');
  const [complete, setComplete] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const speakingTimerRef = useRef<number | null>(null);

  const currentMicro = config.microLessons[microIndex];
  const currentCard = currentMicro ? config.getCard(currentMicro.cardIds[cardIndex]) : null;
  const currentExercise = currentMicro?.exercises[exerciseIndex] ?? null;
  const currentMicroDialogue = currentMicro ? config.microDialogues[currentMicro.id] : null;

  const totalSteps = useMemo(() => {
    const microTotal = config.microLessons.reduce((sum, micro) => sum + micro.cardIds.length + micro.exercises.length + (config.microDialogues[micro.id]?.steps.length || 0), 0);
    return microTotal + config.finalDialogue.steps.length;
  }, [config]);

  const completedSteps = useMemo(() => {
    const before = config.microLessons.slice(0, microIndex).reduce((sum, micro) => sum + micro.cardIds.length + micro.exercises.length + (config.microDialogues[micro.id]?.steps.length || 0), 0);
    if (stage === 'cards') return before + cardIndex;
    if (stage === 'exercises' && currentMicro) return before + currentMicro.cardIds.length + exerciseIndex;
    if (stage === 'microDialogue' && currentMicro) return before + currentMicro.cardIds.length + currentMicro.exercises.length + dialogueStep;
    if (stage === 'finalDialogue') return totalSteps - config.finalDialogue.steps.length + dialogueStep;
    return totalSteps;
  }, [cardIndex, config, currentMicro, dialogueStep, exerciseIndex, microIndex, stage, totalSteps]);

  const answerChoices = useMemo(() => {
    if (!currentExercise || (currentExercise.type !== 'choice' && currentExercise.type !== 'fillBlank')) return [];
    return stableShuffle(currentExercise.choices, currentExercise.id);
  }, [currentExercise]);

  useEffect(() => () => {
    recognitionRef.current?.abort();
    if (speakingTimerRef.current) window.clearTimeout(speakingTimerRef.current);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (speakingState !== 'heard' || !currentMicro) return;
    speakingTimerRef.current = window.setTimeout(() => nextCard(), 1250);
    return () => { if (speakingTimerRef.current) window.clearTimeout(speakingTimerRef.current); };
  }, [speakingState, currentMicro, cardIndex]);

  const resetExercise = () => {
    setChoice(null);
    setFeedback(null);
    setOrderedTokens([]);
    setTypedText('');
  };

  const resetSpeaking = () => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    if (speakingTimerRef.current) window.clearTimeout(speakingTimerRef.current);
    speakingTimerRef.current = null;
    setSpeakingState('idle');
    setHeardText('');
  };

  const nextCard = () => {
    if (!currentMicro) return;
    resetSpeaking();
    if (cardIndex < currentMicro.cardIds.length - 1) {
      setCardIndex((value) => value + 1);
      setShowMeaning(false);
      return;
    }
    setStage('exercises');
    setExerciseIndex(0);
    resetExercise();
  };

  const afterExercises = () => {
    if (currentMicroDialogue) {
      setDialogueStep(0);
      setStage('microDialogue');
      return;
    }
    afterMicroDialogue();
  };

  const nextExercise = () => {
    if (!currentMicro) return;
    if (exerciseIndex < currentMicro.exercises.length - 1) {
      setExerciseIndex((value) => value + 1);
      resetExercise();
      return;
    }
    afterExercises();
  };

  const afterMicroDialogue = () => {
    if (microIndex < config.microLessons.length - 1) {
      setMicroIndex((value) => value + 1);
      setCardIndex(0);
      setShowMeaning(false);
      setDialogueStep(0);
      resetExercise();
      resetSpeaking();
      setStage('cards');
      return;
    }
    setDialogueStep(0);
    setStage('finalDialogue');
  };

  const startSpeaking = () => {
    if (!currentCard || speakingState === 'listening') return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeakingState('unavailable');
      setHeardText('Энэ browser Чех яриа танихыг дэмжихгүй байна. Chrome ашиглаарай.');
      return;
    }

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = 'cs-CZ';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => { setHeardText(''); setSpeakingState('listening'); };
    recognition.onresult = (event) => { setHeardText(event.results[0][0].transcript); setSpeakingState('heard'); };
    recognition.onerror = (event) => {
      const permission = event.error === 'not-allowed' || event.error === 'service-not-allowed';
      setSpeakingState('unavailable');
      setHeardText(permission ? 'Микрофоны зөвшөөрөл олгогдоогүй. Address bar дээрх микрофоны дүрсээр Allow болго.' : 'Яриа танигдсангүй. Дахин хэлээд үзээрэй.');
    };
    recognition.onend = () => { recognitionRef.current = null; };
    try { recognition.start(); } catch { setSpeakingState('unavailable'); setHeardText('Микрофон эхэлсэнгүй. Дахин оролдоорой.'); }
  };

  const chooseExercise = (correctId: string, pickedId: string) => {
    setChoice(pickedId);
    setFeedback(pickedId === correctId ? 'correct' : 'wrong');
  };

  const addToken = (token: string) => {
    if (!currentExercise || currentExercise.type !== 'order' || feedback === 'correct') return;
    if (orderedTokens.length >= currentExercise.tokens.length) return;
    const next = [...orderedTokens, token];
    setOrderedTokens(next);
    if (next.length === currentExercise.tokens.length) setFeedback(next.join(' ') === currentExercise.expectedText ? 'correct' : 'wrong');
  };

  const submitTyping = () => {
    if (!currentExercise || currentExercise.type !== 'typing') return;
    const correct = normalizeCzech(typedText) === normalizeCzech(currentExercise.targetText);
    setFeedback(correct ? 'correct' : 'wrong');
  };

  const finishLesson = () => {
    if (complete) return;
    config.cards.forEach((card) => { markWordLearned(card.id); updateSRSCard(card.id, 4); });
    addXP(config.xpReward);
    addMinutes(config.durationMinutes);
    updateStreak();
    completeLesson(config.lessonId);
    unlockNextLesson(config.lessonId);
    setComplete(true);
    setStage('complete');
  };

  const feedbackBox = (text: string) => {
    if (!feedback) return null;
    const correct = feedback === 'correct';
    return <div style={{ marginTop: 12, borderRadius: 12, padding: 11, background: correct ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: correct ? '1px solid rgba(34,197,94,.35)' : '1px solid rgba(239,68,68,.35)' }}><p style={{ margin: 0, color: correct ? '#4ADE80' : '#F87171', fontWeight: 800, fontSize: 13 }}>{correct ? 'Зөв.' : 'Буруу. Дахин оролдоорой.'}</p>{correct && <p style={{ margin: '4px 0 0', color: '#D1D1D6', fontSize: 12, lineHeight: 1.4 }}>{text}</p>}</div>;
  };

  const answerStyle = (correct: boolean, wrong: boolean): React.CSSProperties => ({ textAlign: 'left', padding: '12px 13px', borderRadius: 13, color: '#FFF', fontSize: 14, lineHeight: 1.35, cursor: feedback === 'correct' ? 'default' : 'pointer', background: correct ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: correct ? '1px solid rgba(34,197,94,.6)' : wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A' });

  if (stage === 'complete') {
    return <div style={{ ...shell, display: 'flex', alignItems: 'center', padding: '24px 20px' }}><div style={{ ...panel, width: '100%', textAlign: 'center' }}><div style={{ fontSize: 58, marginBottom: 12 }}>{config.completionIcon}</div><h1 style={{ margin: '0 0 8px', fontSize: 24 }}>{config.titleMn} дууслаа</h1><p style={{ color: '#A0A0A8', lineHeight: 1.55, margin: '0 0 18px' }}>{config.completionSummaryMn}</p><div style={{ ...panel, padding: 16, textAlign: 'left', marginBottom: 16 }}><p style={{ margin: '0 0 7px', color: '#C8952A', fontWeight: 800 }}>Одоо таны ашиглаж чадах хэллэгүүд</p>{config.completionPhrases.map((text) => <p key={text} style={{ margin: '6px 0', color: '#FFF' }}>✓ {text}</p>)}</div><button onClick={() => setPage('path')} className="btn-gold" style={{ width: '100%', padding: 15, fontSize: 15 }}>Хичээлийн зам руу буцах</button><button onClick={() => window.location.reload()} style={{ width: '100%', marginTop: 10, padding: 12, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer' }}><RotateCcw size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> {config.titleMn}-ыг дахин хийх</button></div></div>;
  }

  return <div style={shell}>
    <header style={{ background: '#141416', borderBottom: '1px solid #2A2A2F', padding: 'max(16px, env(safe-area-inset-top)) 20px 13px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}><button onClick={() => setPage('path')} aria-label="Буцах" style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 0, cursor: 'pointer', color: '#A0A0A8' }}><ChevronLeft size={20} /></button><div style={{ flex: 1, minWidth: 0 }}><p style={{ margin: 0, fontSize: 12, color: '#A0A0A8' }}>{config.titleMn.split(' — ')[0]} · ойролцоогоор {config.durationMinutes} минут</p><h1 style={{ margin: '2px 0 0', fontSize: 17 }}>{config.titleMn.split(' — ')[1] || config.titleMn}</h1></div><span style={{ fontSize: 12, color: '#C8952A', fontWeight: 800 }}>{Math.min(completedSteps + 1, totalSteps)}/{totalSteps}</span></div><ProgressBar value={completedSteps} max={totalSteps} height={5} /></header>
    <main style={{ maxWidth: 430, margin: '0 auto', padding: '18px 16px max(28px, env(safe-area-inset-bottom))' }}>
      {stage === 'cards' && currentCard && currentMicro && <><p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800, margin: '0 0 6px' }}>{currentMicro.titleMn}</p><p style={{ color: '#A0A0A8', fontSize: 13, margin: '0 0 16px', lineHeight: 1.45 }}>{currentMicro.canDoMn}</p><motion.div key={currentCard.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={panel}><p style={{ margin: '0 0 10px', fontSize: 12, color: '#606068' }}>Шинэ карт {cardIndex + 1}/{currentMicro.cardIds.length}</p><h2 style={{ margin: '0 0 14px', textAlign: 'center', fontSize: 'clamp(28px, 9vw, 36px)', lineHeight: 1.16, overflowWrap: 'anywhere' }}>{currentCard.czech}</h2><div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}><AudioButton word={currentCard.czech} audioFile={currentCard.audioFile} size="lg" /></div>{!showMeaning ? <button onClick={() => setShowMeaning(true)} className="btn-outline" style={{ width: '100%', padding: 13, fontSize: 14 }}>Монгол утгыг харах</button> : <div style={{ background: 'rgba(200,149,42,.10)', border: '1px solid rgba(200,149,42,.28)', borderRadius: 16, padding: 15 }}><p style={{ margin: '0 0 8px', color: '#FFF', fontSize: 19, fontWeight: 800 }}>{currentCard.mongolian}</p><p style={{ margin: 0, color: '#D1D1D6', fontSize: 13, lineHeight: 1.5 }}>{currentMicro.instructions[currentCard.id]}</p></div>}</motion.div>{showMeaning && speakingState === 'idle' && <div style={{ marginTop: 16 }}><button onClick={startSpeaking} className="btn-gold" style={{ width: '100%', padding: 15, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 9 }}><Mic size={19} /> Хэлж үзэх</button><button onClick={nextCard} style={{ width: '100%', marginTop: 9, padding: 10, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Одоохондоо алгасах</button></div>}{showMeaning && speakingState === 'listening' && <div style={{ ...panel, marginTop: 16, padding: 18, textAlign: 'center', borderColor: 'rgba(239,68,68,.45)' }}><motion.div animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 1.15, repeat: Infinity }} style={{ width: 66, height: 66, margin: '0 auto 10px', borderRadius: 33, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,.13)', border: '2px solid rgba(239,68,68,.45)' }}><Mic size={29} color="#F87171" /></motion.div><p style={{ margin: 0, color: '#F87171', fontWeight: 800 }}>Сонсож байна…</p><p style={{ margin: '6px 0 0', color: '#A0A0A8', fontSize: 12 }}>“{currentCard.czech}” гэж хэлээрэй</p></div>}{showMeaning && speakingState === 'heard' && <div style={{ ...panel, marginTop: 16, padding: 16, textAlign: 'center', borderColor: 'rgba(34,197,94,.45)', background: 'rgba(34,197,94,.10)' }}><Check size={28} color="#4ADE80" /><p style={{ margin: '6px 0 0', color: '#4ADE80', fontWeight: 800 }}>Таны яриа танигдлаа</p><p style={{ margin: '6px 0 0', color: '#D1D1D6', fontSize: 13 }}>“{heardText}”</p><p style={{ margin: '8px 0 0', color: '#A0A0A8', fontSize: 12 }}>Дараагийн карт руу шилжиж байна…</p></div>}{showMeaning && speakingState === 'unavailable' && <div style={{ ...panel, marginTop: 16, padding: 16, textAlign: 'center', borderColor: 'rgba(248,113,113,.45)', background: 'rgba(248,113,113,.08)' }}><p style={{ margin: 0, color: '#F87171', fontWeight: 800 }}>Хэлж үзэх горим ажилласангүй</p><p style={{ margin: '6px 0 0', color: '#D1D1D6', fontSize: 12, lineHeight: 1.45 }}>{heardText}</p><button onClick={startSpeaking} className="btn-outline" style={{ width: '100%', marginTop: 12, padding: 12, fontSize: 14 }}>Дахин оролдох</button><button onClick={nextCard} style={{ width: '100%', marginTop: 7, padding: 9, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer', fontSize: 13 }}>Алгасаад үргэлжлүүлэх</button></div>}</>}
      {stage === 'exercises' && currentExercise && currentMicro && <><p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800, margin: '0 0 6px' }}>{currentMicro.titleMn} · Бататгал</p><div style={panel}><p style={{ margin: '0 0 8px', color: '#A0A0A8', fontSize: 12 }}>{currentExercise.titleMn}</p><h2 style={{ margin: '0 0 14px', fontSize: 20, lineHeight: 1.35 }}>{currentExercise.promptMn}</h2>{(currentExercise.type === 'choice' || currentExercise.type === 'typing') && currentExercise.audioText && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><AudioButton word={currentExercise.audioText} size="md" /><span style={{ color: '#A0A0A8', fontSize: 13 }}>Дараад сонсоорой</span></div>}{(currentExercise.type === 'choice' || currentExercise.type === 'fillBlank') && currentExercise.promptCzech && <div style={{ background: '#242428', borderRadius: 14, padding: 14, marginBottom: 16, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>{currentExercise.promptCzech}</div>}{(currentExercise.type === 'choice' || currentExercise.type === 'fillBlank') && <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>{answerChoices.map((item) => { const picked = choice === item.id; const right = feedback === 'correct' && item.id === currentExercise.correctId; const wrong = feedback === 'wrong' && picked; return <button key={item.id} onClick={() => chooseExercise(currentExercise.correctId, item.id)} disabled={feedback === 'correct'} style={answerStyle(Boolean(right), wrong)}>{item.text}</button>; })}{feedbackBox(currentExercise.feedbackMn)}</div>}{currentExercise.type === 'order' && <div><div style={{ minHeight: 58, display: 'flex', flexWrap: 'wrap', gap: 8, padding: 10, borderRadius: 14, background: '#141416', border: '1px dashed #42424A', marginBottom: 12 }}>{orderedTokens.length === 0 && <span style={{ color: '#606068', fontSize: 13 }}>Доорх үгсийг дарааллаар нь дарна уу</span>}{orderedTokens.map((token, index) => <button key={`${token}-${index}`} onClick={() => { if (feedback !== 'correct') { setOrderedTokens((items) => items.filter((_, itemIndex) => itemIndex !== index)); setFeedback(null); } }} style={{ padding: '8px 10px', background: 'rgba(200,149,42,.16)', color: '#F5C842', border: '1px solid rgba(200,149,42,.4)', borderRadius: 10, cursor: 'pointer' }}>{token}</button>)}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{currentExercise.tokens.map((token, index) => { const used = orderedTokens.filter((item) => item === token).length > currentExercise.tokens.slice(0, index).filter((item) => item === token).length; return <button key={`${token}-${index}`} onClick={() => addToken(token)} disabled={used || feedback === 'correct'} style={{ padding: '10px 12px', borderRadius: 10, color: used ? '#606068' : '#FFF', background: '#242428', border: '1px solid #34343A', cursor: used ? 'default' : 'pointer', opacity: used ? 0.45 : 1 }}>{token}</button>; })}</div>{feedback === 'wrong' && <button onClick={resetExercise} style={{ marginTop: 12, background: 'transparent', border: 0, color: '#F5C842', cursor: 'pointer', padding: 0 }}>Дахин оролдох</button>}{feedbackBox(currentExercise.feedbackMn)}</div>}{currentExercise.type === 'typing' && <div><input value={typedText} onChange={(event) => { setTypedText(event.target.value); setFeedback(null); }} onKeyDown={(event) => { if (event.key === 'Enter') submitTyping(); }} placeholder={currentExercise.inputHint || 'Чехээр бич…'} autoCapitalize="none" autoCorrect="off" spellCheck={false} style={{ width: '100%', boxSizing: 'border-box', padding: '13px 14px', borderRadius: 14, color: '#FFF', background: '#141416', border: '1px solid #42424A', fontSize: 16, outline: 'none' }} /><button onClick={submitTyping} className="btn-outline" style={{ width: '100%', marginTop: 10, padding: 12, fontSize: 14 }}>Шалгах</button>{feedbackBox(currentExercise.feedbackMn)}</div>}</div>{feedback === 'correct' && <button onClick={nextExercise} className="btn-gold" style={{ width: '100%', marginTop: 16, padding: 15, fontSize: 15 }}>Үргэлжлүүлэх</button>}</>}
      {stage === 'microDialogue' && currentMicroDialogue && <DialogueRun scenario={currentMicroDialogue} onProgress={setDialogueStep} onComplete={afterMicroDialogue} />}
      {stage === 'finalDialogue' && <DialogueRun scenario={config.finalDialogue} onProgress={setDialogueStep} onComplete={finishLesson} />}
    </main>
  </div>;
};

export default A0LessonEngine;