import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, Mic, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { AudioButton, ProgressBar } from '../components/UI/SharedComponents';
import {
  a0NeedsCards,
  a0NeedsMicroLessons,
  a0NeedsMission,
  getA0NeedsCard,
} from '../data/a0Needs';

type Stage = 'cards' | 'exercises' | 'mission' | 'complete';
type Feedback = 'correct' | 'wrong' | null;
type PronunciationState = 'idle' | 'listening' | 'heard' | 'unavailable';

type DialogueEntry = {
  id: string;
  side: 'staff' | 'user';
  speaker: string;
  czech: string;
  mongolian: string;
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

const shell: React.CSSProperties = {
  background: '#0C0C0E',
  minHeight: '100dvh',
  fontFamily: 'Inter,sans-serif',
  color: '#FFF',
};

const panel: React.CSSProperties = {
  background: '#1C1C1F',
  border: '1px solid #2A2A2F',
  borderRadius: 24,
  padding: 22,
};

function stableShuffle<T>(items: T[], seedText: string): T[] {
  let seed = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) {
    seed = Math.imul(seed ^ seedText.charCodeAt(index), 16777619);
  }
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 2246822507) >>> 0;
    const otherIndex = seed % (index + 1);
    [result[index], result[otherIndex]] = [result[otherIndex], result[index]];
  }
  return result;
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
  return Math.min(3600, Math.max(1600, 650 + words * 300));
}

const A0NeedsPage: React.FC = () => {
  const {
    setPage,
    markWordLearned,
    updateSRSCard,
    completeLesson,
    unlockNextLesson,
    addXP,
    addMinutes,
    updateStreak,
  } = useAppStore();

  const [stage, setStage] = useState<Stage>('cards');
  const [microIndex, setMicroIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [orderedTokens, setOrderedTokens] = useState<string[]>([]);
  const [missionIndex, setMissionIndex] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueEntry[]>([]);
  const [completed, setCompleted] = useState(false);
  const [pronunciationState, setPronunciationState] = useState<PronunciationState>('idle');
  const [heardText, setHeardText] = useState('');
  const [autoDialogueAudio, setAutoDialogueAudio] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recognitionFinishedRef = useRef(false);
  const cardAdvanceTimerRef = useRef<number | null>(null);
  const dialogueTimerRef = useRef<number | null>(null);
  const spokenMissionRef = useRef<string | null>(null);

  const currentMicro = a0NeedsMicroLessons[microIndex];
  const currentCard = currentMicro ? getA0NeedsCard(currentMicro.cardIds[cardIndex]) : null;
  const currentExercise = currentMicro?.exercises[exerciseIndex] ?? null;
  const currentMission = a0NeedsMission[missionIndex];

  const totalSteps = useMemo(
    () => a0NeedsMicroLessons.reduce((sum, item) => sum + item.cardIds.length + item.exercises.length, 0) + a0NeedsMission.length,
    [],
  );

  const completedSteps = useMemo(() => {
    const earlier = a0NeedsMicroLessons
      .slice(0, microIndex)
      .reduce((sum, item) => sum + item.cardIds.length + item.exercises.length, 0);
    if (stage === 'cards') return earlier + cardIndex;
    if (stage === 'exercises' && currentMicro) return earlier + currentMicro.cardIds.length + exerciseIndex;
    if (stage === 'mission') return totalSteps - a0NeedsMission.length + missionIndex;
    return totalSteps;
  }, [cardIndex, currentMicro, exerciseIndex, microIndex, missionIndex, stage, totalSteps]);

  const exerciseChoices = useMemo(() => (
    currentExercise?.type === 'choice'
      ? stableShuffle(currentExercise.choices, currentExercise.id)
      : []
  ), [currentExercise]);

  const missionChoices = useMemo(() => (
    currentMission ? stableShuffle(currentMission.choices, currentMission.id) : []
  ), [currentMission]);

  const clearTimers = () => {
    if (cardAdvanceTimerRef.current) window.clearTimeout(cardAdvanceTimerRef.current);
    if (dialogueTimerRef.current) window.clearTimeout(dialogueTimerRef.current);
    cardAdvanceTimerRef.current = null;
    dialogueTimerRef.current = null;
  };

  useEffect(() => () => {
    clearTimers();
    recognitionRef.current?.abort();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (stage !== 'mission' || !currentMission || !autoDialogueAudio) return;
    if (spokenMissionRef.current === currentMission.id) return;
    spokenMissionRef.current = currentMission.id;
    const timer = window.setTimeout(() => speakCzech(currentMission.staffCzech), 280);
    return () => window.clearTimeout(timer);
  }, [autoDialogueAudio, currentMission, stage]);

  useEffect(() => {
    if (pronunciationState !== 'heard' || !currentMicro) return;

    cardAdvanceTimerRef.current = window.setTimeout(() => {
      setPronunciationState('idle');
      setHeardText('');
      if (cardIndex < currentMicro.cardIds.length - 1) {
        setCardIndex((value) => value + 1);
        setShowMeaning(false);
        return;
      }
      setStage('exercises');
      setExerciseIndex(0);
      setChoice(null);
      setFeedback(null);
      setOrderedTokens([]);
    }, 1250);

    return () => {
      if (cardAdvanceTimerRef.current) window.clearTimeout(cardAdvanceTimerRef.current);
    };
  }, [cardIndex, currentMicro, pronunciationState]);

  const resetAnswer = () => {
    setChoice(null);
    setFeedback(null);
    setOrderedTokens([]);
  };

  const resetPronunciation = () => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    recognitionFinishedRef.current = false;
    if (cardAdvanceTimerRef.current) window.clearTimeout(cardAdvanceTimerRef.current);
    cardAdvanceTimerRef.current = null;
    setPronunciationState('idle');
    setHeardText('');
  };

  const nextCard = () => {
    if (!currentMicro) return;
    resetPronunciation();
    if (cardIndex < currentMicro.cardIds.length - 1) {
      setCardIndex((value) => value + 1);
      setShowMeaning(false);
      return;
    }
    setStage('exercises');
    setExerciseIndex(0);
    resetAnswer();
  };

  const nextExercise = () => {
    if (!currentMicro) return;
    if (exerciseIndex < currentMicro.exercises.length - 1) {
      setExerciseIndex((value) => value + 1);
      resetAnswer();
      return;
    }
    if (microIndex < a0NeedsMicroLessons.length - 1) {
      setMicroIndex((value) => value + 1);
      setCardIndex(0);
      setShowMeaning(false);
      setStage('cards');
      resetAnswer();
      resetPronunciation();
      return;
    }
    setStage('mission');
    resetAnswer();
    spokenMissionRef.current = null;
  };

  const startPronunciation = () => {
    if (!currentCard || pronunciationState === 'listening') return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setPronunciationState('unavailable');
      setHeardText('Энэ browser Чех яриа танихыг дэмжихгүй байна. Chrome ашиглаарай.');
      return;
    }

    recognitionFinishedRef.current = false;
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = 'cs-CZ';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setHeardText('');
      setPronunciationState('listening');
    };
    recognition.onresult = (event) => {
      recognitionFinishedRef.current = true;
      setHeardText(event.results[0][0].transcript);
      setPronunciationState('heard');
    };
    recognition.onerror = (event) => {
      recognitionFinishedRef.current = true;
      const permission = event.error === 'not-allowed' || event.error === 'service-not-allowed';
      setPronunciationState('unavailable');
      setHeardText(permission
        ? 'Микрофоны зөвшөөрөл олгогдоогүй. Address bar дээрх микрофоны дүрсээр Allow болго.'
        : 'Яриа танигдсангүй. Дахин хэлээд үзээрэй.');
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      if (!recognitionFinishedRef.current) {
        setPronunciationState('unavailable');
        setHeardText('Яриа танигдсангүй. Дахин хэлээд үзээрэй.');
      }
    };
    try {
      recognition.start();
    } catch {
      setPronunciationState('unavailable');
      setHeardText('Микрофон эхэлсэнгүй. Дахин оролдоорой.');
    }
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
    if (next.length === currentExercise.tokens.length) {
      setFeedback(next.join(' ') === currentExercise.expectedText ? 'correct' : 'wrong');
    }
  };

  const removeToken = (index: number) => {
    if (feedback === 'correct') return;
    setOrderedTokens((items) => items.filter((_, itemIndex) => itemIndex !== index));
    setFeedback(null);
  };

  const finishLesson = () => {
    if (completed) return;
    a0NeedsCards.forEach((card) => {
      markWordLearned(card.id);
      updateSRSCard(card.id, 4);
    });
    addXP(140);
    addMinutes(30);
    updateStreak();
    completeLesson('l002');
    unlockNextLesson('l002');
    setCompleted(true);
    setStage('complete');
  };

  const nextMission = () => {
    if (missionIndex < a0NeedsMission.length - 1) {
      setMissionIndex((value) => value + 1);
      resetAnswer();
      return;
    }
    finishLesson();
  };

  const chooseMission = (pickedId: string) => {
    if (!currentMission || feedback === 'correct') return;
    const correct = pickedId === currentMission.correctId;
    setChoice(pickedId);
    setFeedback(correct ? 'correct' : 'wrong');
    if (!correct) return;

    const selected = currentMission.choices.find((item) => item.id === pickedId);
    if (!selected) return;
    setDialogueHistory((history) => [
      ...history,
      { id: `${currentMission.id}-staff`, side: 'staff', speaker: currentMission.speaker, czech: currentMission.staffCzech, mongolian: currentMission.staffMn },
      { id: `${currentMission.id}-user`, side: 'user', speaker: 'Та', czech: selected.text, mongolian: 'Таны сонгосон хариулт' },
    ]);

    if (autoDialogueAudio) speakCzech(selected.text);
    if (dialogueTimerRef.current) window.clearTimeout(dialogueTimerRef.current);
    dialogueTimerRef.current = window.setTimeout(() => nextMission(), responseDelay(selected.text));
  };

  const feedbackBox = (text: string) => {
    if (!feedback) return null;
    const correct = feedback === 'correct';
    return (
      <div style={{ marginTop: 14, borderRadius: 14, padding: 13, background: correct ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: correct ? '1px solid rgba(34,197,94,.35)' : '1px solid rgba(239,68,68,.35)' }}>
        <p style={{ margin: 0, color: correct ? '#4ADE80' : '#F87171', fontWeight: 800 }}>{correct ? 'Зөв.' : 'Буруу. Дахин оролдоорой.'}</p>
        {correct && <p style={{ margin: '5px 0 0', color: '#D1D1D6', fontSize: 13, lineHeight: 1.45 }}>{text}</p>}
      </div>
    );
  };

  const answerStyle = (correct: boolean, wrong: boolean): React.CSSProperties => ({
    textAlign: 'left',
    padding: '13px 14px',
    borderRadius: 14,
    color: '#FFF',
    fontSize: 15,
    cursor: feedback === 'correct' ? 'default' : 'pointer',
    background: correct ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428',
    border: correct ? '1px solid rgba(34,197,94,.6)' : wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A',
  });

  const bubble = (entry: DialogueEntry) => (
    <div key={entry.id} style={{ display: 'flex', flexDirection: entry.side === 'staff' ? 'row' : 'row-reverse', alignItems: 'flex-end', gap: 8 }}>
      <div style={{ width: 34, height: 34, borderRadius: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, background: entry.side === 'staff' ? '#44526B' : '#7B5B22', border: entry.side === 'staff' ? '1px solid #70809C' : '1px solid rgba(245,200,66,.55)' }}>
        {entry.side === 'staff' ? '👩‍💼' : '🙂'}
      </div>
      <div style={{ maxWidth: '76%', background: entry.side === 'staff' ? '#242428' : 'rgba(200,149,42,.16)', border: entry.side === 'staff' ? '1px solid #34343A' : '1px solid rgba(200,149,42,.40)', borderRadius: 16, padding: '11px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <p style={{ margin: 0, flex: 1, color: entry.side === 'staff' ? '#A0A0A8' : '#F5C842', fontSize: 11, fontWeight: 800 }}>{entry.speaker}</p>
          <AudioButton word={entry.czech} size="sm" />
        </div>
        <p style={{ margin: 0, color: '#FFF', fontWeight: 800, lineHeight: 1.35 }}>{entry.czech}</p>
        <p style={{ margin: '4px 0 0', color: '#A0A0A8', fontSize: 12, lineHeight: 1.35 }}>{entry.mongolian}</p>
      </div>
    </div>
  );

  if (stage === 'complete') {
    return (
      <div style={{ ...shell, display: 'flex', alignItems: 'center', padding: '24px 20px' }}>
        <div style={{ ...panel, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 58, marginBottom: 12 }}>🧾</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 24 }}>A0.2 дууслаа</h1>
          <p style={{ color: '#A0A0A8', lineHeight: 1.55, margin: '0 0 18px' }}>Та одоо тусламж, ус, утас хэрэгтэйгээ хэлж, хүсэлтээ илэрхийлж, мөнгө эсвэл карт байхгүйгээ тайлбарлаж чадна.</p>
          <div style={{ ...panel, padding: 16, textAlign: 'left', marginBottom: 16 }}>
            <p style={{ margin: '0 0 7px', color: '#C8952A', fontWeight: 800 }}>Одоо таны ашиглаж чадах хэллэгүүд</p>
            {['Potřebuji pomoc.','Potřebuji vodu.','Chci něco k jídlu.','Nemám kartu.','Potřebuji pomoc, prosím.'].map((text) => <p key={text} style={{ margin: '6px 0', color: '#FFF' }}>✓ {text}</p>)}
          </div>
          <button onClick={() => setPage('path')} className="btn-gold" style={{ width: '100%', padding: 15, fontSize: 15 }}>Хичээлийн зам руу буцах</button>
          <button onClick={() => window.location.reload()} style={{ width: '100%', marginTop: 10, padding: 12, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer' }}><RotateCcw size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> A0.2-ыг дахин хийх</button>
        </div>
      </div>
    );
  }

  return (
    <div style={shell}>
      <header style={{ background: '#141416', borderBottom: '1px solid #2A2A2F', padding: 'max(16px, env(safe-area-inset-top)) 20px 13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => setPage('path')} aria-label="Буцах" style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 0, cursor: 'pointer', color: '#A0A0A8' }}><ChevronLeft size={20} /></button>
          <div style={{ flex: 1, minWidth: 0 }}><p style={{ margin: 0, fontSize: 12, color: '#A0A0A8' }}>A0.2 · ойролцоогоор 30 минут</p><h1 style={{ margin: '2px 0 0', fontSize: 17 }}>Надад хэрэгтэй</h1></div>
          <span style={{ fontSize: 12, color: '#C8952A', fontWeight: 800 }}>{Math.min(completedSteps + 1, totalSteps)}/{totalSteps}</span>
        </div>
        <ProgressBar value={completedSteps} max={totalSteps} height={5} />
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '18px 16px max(28px, env(safe-area-inset-bottom))' }}>
        {stage === 'cards' && currentCard && currentMicro && (
          <>
            <p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800, margin: '0 0 6px' }}>{currentMicro.titleMn}</p>
            <p style={{ color: '#A0A0A8', fontSize: 13, margin: '0 0 16px', lineHeight: 1.45 }}>{currentMicro.canDoMn}</p>
            <motion.div key={currentCard.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={panel}>
              <p style={{ margin: '0 0 10px', fontSize: 12, color: '#606068' }}>Шинэ карт {cardIndex + 1}/{currentMicro.cardIds.length}</p>
              <h2 style={{ margin: '0 0 14px', textAlign: 'center', fontSize: 'clamp(28px, 9vw, 36px)', lineHeight: 1.16, overflowWrap: 'anywhere' }}>{currentCard.czech}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}><AudioButton word={currentCard.czech} audioFile={currentCard.audioFile} size="lg" /></div>
              {!showMeaning ? <button onClick={() => setShowMeaning(true)} className="btn-outline" style={{ width: '100%', padding: 13, fontSize: 14 }}>Монгол утгыг харах</button> : (
                <div style={{ background: 'rgba(200,149,42,.10)', border: '1px solid rgba(200,149,42,.28)', borderRadius: 16, padding: 15 }}>
                  <p style={{ margin: '0 0 8px', color: '#FFF', fontSize: 19, fontWeight: 800 }}>{currentCard.mongolian}</p>
                  <p style={{ margin: 0, color: '#D1D1D6', fontSize: 13, lineHeight: 1.5 }}>{currentMicro.instructions[currentCard.id]}</p>
                </div>
              )}
            </motion.div>

            {showMeaning && pronunciationState === 'idle' && <div style={{ marginTop: 16 }}><button onClick={startPronunciation} className="btn-gold" style={{ width: '100%', padding: 15, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 9 }}><Mic size={19} /> Хэлж үзэх</button><button onClick={nextCard} style={{ width: '100%', marginTop: 9, padding: 10, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Одоохондоо алгасах</button></div>}
            {showMeaning && pronunciationState === 'listening' && <div style={{ ...panel, marginTop: 16, padding: 18, textAlign: 'center', borderColor: 'rgba(239,68,68,.45)' }}><motion.div animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 1.15, repeat: Infinity }} style={{ width: 66, height: 66, margin: '0 auto 10px', borderRadius: 33, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,.13)', border: '2px solid rgba(239,68,68,.45)' }}><Mic size={29} color="#F87171" /></motion.div><p style={{ margin: 0, color: '#F87171', fontWeight: 800 }}>Сонсож байна…</p><p style={{ margin: '6px 0 0', color: '#A0A0A8', fontSize: 12 }}>“{currentCard.czech}” гэж хэлээрэй</p></div>}
            {showMeaning && pronunciationState === 'heard' && <div style={{ ...panel, marginTop: 16, padding: 16, textAlign: 'center', borderColor: 'rgba(34,197,94,.45)', background: 'rgba(34,197,94,.10)' }}><Check size={28} color="#4ADE80" /><p style={{ margin: '6px 0 0', color: '#4ADE80', fontWeight: 800 }}>Таны яриа танигдлаа</p><p style={{ margin: '6px 0 0', color: '#D1D1D6', fontSize: 13 }}>“{heardText}”</p><p style={{ margin: '8px 0 0', color: '#A0A0A8', fontSize: 12 }}>Дараагийн карт руу шилжиж байна…</p></div>}
            {showMeaning && pronunciationState === 'unavailable' && <div style={{ ...panel, marginTop: 16, padding: 16, textAlign: 'center', borderColor: 'rgba(248,113,113,.45)', background: 'rgba(248,113,113,.08)' }}><p style={{ margin: 0, color: '#F87171', fontWeight: 800 }}>Хэлж үзэх горим ажилласангүй</p><p style={{ margin: '6px 0 0', color: '#D1D1D6', fontSize: 12, lineHeight: 1.45 }}>{heardText}</p><button onClick={startPronunciation} className="btn-outline" style={{ width: '100%', marginTop: 12, padding: 12, fontSize: 14 }}>Дахин оролдох</button><button onClick={nextCard} style={{ width: '100%', marginTop: 7, padding: 9, border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer', fontSize: 13 }}>Алгасаад үргэлжлүүлэх</button></div>}
          </>
        )}

        {stage === 'exercises' && currentExercise && currentMicro && (
          <>
            <p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800, margin: '0 0 6px' }}>{currentMicro.titleMn} · Бататгал</p>
            <div style={panel}>
              <p style={{ margin: '0 0 8px', color: '#A0A0A8', fontSize: 12 }}>{currentExercise.titleMn}</p>
              <h2 style={{ margin: '0 0 14px', fontSize: 21, lineHeight: 1.35 }}>{currentExercise.promptMn}</h2>
              {'audioText' in currentExercise && currentExercise.audioText && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><AudioButton word={currentExercise.audioText} size="md" /><span style={{ color: '#A0A0A8', fontSize: 13 }}>Дараад сонсоорой</span></div>}
              {'promptCzech' in currentExercise && currentExercise.promptCzech && <div style={{ background: '#242428', borderRadius: 14, padding: 14, marginBottom: 16, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>{currentExercise.promptCzech}</div>}
              {currentExercise.type === 'choice' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{exerciseChoices.map((item) => { const picked = choice === item.id; const right = feedback === 'correct' && item.id === currentExercise.correctId; const wrong = feedback === 'wrong' && picked; return <button key={item.id} onClick={() => chooseExercise(currentExercise.correctId, item.id)} disabled={feedback === 'correct'} style={answerStyle(Boolean(right), wrong)}>{item.text}</button>; })}{feedbackBox(currentExercise.feedbackMn)}</div>}
              {currentExercise.type === 'order' && <div><div style={{ minHeight: 58, display: 'flex', flexWrap: 'wrap', gap: 8, padding: 10, borderRadius: 14, background: '#141416', border: '1px dashed #42424A', marginBottom: 12 }}>{orderedTokens.length === 0 && <span style={{ color: '#606068', fontSize: 13 }}>Доорх үгсийг дарааллаар нь дарна уу</span>}{orderedTokens.map((token, index) => <button key={`${token}-${index}`} onClick={() => removeToken(index)} style={{ padding: '8px 10px', background: 'rgba(200,149,42,.16)', color: '#F5C842', border: '1px solid rgba(200,149,42,.4)', borderRadius: 10, cursor: 'pointer' }}>{token}</button>)}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{currentExercise.tokens.map((token, index) => { const used = orderedTokens.filter((item) => item === token).length > currentExercise.tokens.slice(0, index).filter((item) => item === token).length; return <button key={`${token}-${index}`} onClick={() => addToken(token)} disabled={used || feedback === 'correct'} style={{ padding: '10px 12px', borderRadius: 10, color: used ? '#606068' : '#FFF', background: '#242428', border: '1px solid #34343A', cursor: used ? 'default' : 'pointer', opacity: used ? 0.45 : 1 }}>{token}</button>; })}</div>{feedback === 'wrong' && <button onClick={resetAnswer} style={{ marginTop: 12, background: 'transparent', border: 0, color: '#F5C842', cursor: 'pointer', padding: 0 }}>Дахин оролдох</button>}{feedbackBox(currentExercise.feedbackMn)}</div>}
            </div>
            {feedback === 'correct' && <button onClick={nextExercise} className="btn-gold" style={{ width: '100%', marginTop: 16, padding: 15, fontSize: 15 }}>Үргэлжлүүлэх</button>}
          </>
        )}

        {stage === 'mission' && currentMission && (
          <>
            <div style={{ ...panel, padding: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#1C1C1F,#252A34)' }}><div style={{ width: 46, height: 46, borderRadius: 23, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, background: '#44526B', border: '1px solid #70809C' }}>👩‍💼</div><div style={{ flex: 1 }}><p style={{ margin: 0, color: '#FFF', fontSize: 14, fontWeight: 800 }}>Ресепшн дээрх бодит яриа</p><p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 12 }}>Ажилтан асууна → та хариулна → яриа өөрөө үргэлжилнэ</p></div><button onClick={() => setAutoDialogueAudio((value) => !value)} style={{ border: '1px solid rgba(200,149,42,.42)', borderRadius: 10, background: autoDialogueAudio ? 'rgba(200,149,42,.16)' : 'transparent', color: autoDialogueAudio ? '#F5C842' : '#A0A0A8', padding: '8px 9px', cursor: 'pointer', fontSize: 11, fontWeight: 800 }}>{autoDialogueAudio ? '🔊 Авто дуу' : '🔇 Дуугүй'}</button></div>
            <p style={{ color: '#C8952A', fontSize: 12, fontWeight: 800, margin: '0 0 6px' }}>Харилцан ярианы даалгавар</p>
            <p style={{ color: '#A0A0A8', fontSize: 13, margin: '0 0 16px', lineHeight: 1.45 }}>Зөв хариулт сонгох бүрд таны үг ярианд орж, дараагийн асуулт автоматаар гарна.</p>
            <div style={panel}><div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>{dialogueHistory.map(bubble)}{feedback !== 'correct' && bubble({ id: `${currentMission.id}-current`, side: 'staff', speaker: currentMission.speaker, czech: currentMission.staffCzech, mongolian: currentMission.staffMn })}</div><h2 style={{ margin: '0 0 14px', fontSize: 19, lineHeight: 1.35 }}>{currentMission.promptMn}</h2><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{missionChoices.map((item) => { const picked = choice === item.id; const right = feedback === 'correct' && item.id === currentMission.correctId; const wrong = feedback === 'wrong' && picked; return <button key={item.id} onClick={() => chooseMission(item.id)} disabled={feedback === 'correct'} style={answerStyle(Boolean(right), wrong)}>{item.text}</button>; })}{feedbackBox(currentMission.feedbackMn)}</div></div>
            {feedback === 'correct' && <p style={{ textAlign: 'center', color: '#A0A0A8', fontSize: 13, margin: '14px 0 0' }}>Дараагийн асуулт руу шилжиж байна…</p>}
          </>
        )}
      </main>
    </div>
  );
};

export default A0NeedsPage;