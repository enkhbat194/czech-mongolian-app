import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, RotateCcw, Volume2 } from 'lucide-react';
import { a0ReferenceCatalog } from '../data/a0ReferenceCatalog';
import type { DialogueScenario } from '../data/a0Dialogues';
import A0DialogueScene from '../components/lessons/A0DialogueScene';
import { useAppStore } from '../stores/useAppStore';

type Feedback = 'correct' | 'wrong' | null;
type Bubble = { id: string; side: 'staff' | 'user'; speaker: string; czech: string; mongolian: string };

function speakCzech(text: string, onDone?: () => void) {
  if (!('speechSynthesis' in window)) {
    onDone?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'cs-CZ';
  utterance.rate = 0.84;
  utterance.onend = () => onDone?.();
  utterance.onerror = () => onDone?.();
  window.speechSynthesis.speak(utterance);
}

function correctedScenario(scenario: DialogueScenario): DialogueScenario {
  return {
    ...scenario,
    steps: scenario.steps.map((step) => {
      if (step.staffCzech !== 'Mluvím rychle.') return step;
      return { ...step, staffCzech: 'Promiňte, mluvím moc rychle?', staffMn: 'Уучлаарай, би хэт хурдан ярьж байна уу?' };
    }),
  };
}

const A0DialoguePreviewPage: React.FC = () => {
  const currentLessonId = useAppStore((state) => state.currentLessonId) || 'l001';
  const setPage = useAppStore((state) => state.setPage);
  const lesson = a0ReferenceCatalog[currentLessonId as keyof typeof a0ReferenceCatalog] || a0ReferenceCatalog.l001;
  const scenario = useMemo(() => correctedScenario(lesson.finalDialogue), [lesson]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [history, setHistory] = useState<Bubble[]>([]);
  const [autoAudio, setAutoAudio] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const logRef = useRef<HTMLDivElement | null>(null);

  const step = scenario.steps[index];
  const choices = useMemo(() => [...step.choices].sort((a, b) => a.id.localeCompare(b.id)), [step]);

  useEffect(() => {
    setIndex(0);
    setFeedback(null);
    setPicked(null);
    setHistory([]);
  }, [scenario.id]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current?.scrollHeight || 0, behavior: 'smooth' }));
    return () => window.cancelAnimationFrame(frame);
  }, [history, index]);

  useEffect(() => {
    if (!autoAudio) {
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const timer = window.setTimeout(() => speakCzech(step.staffCzech, () => setIsSpeaking(false)), 250);
    return () => window.clearTimeout(timer);
  }, [autoAudio, step.id, step.staffCzech]);

  const restart = () => {
    window.speechSynthesis?.cancel();
    setIndex(0);
    setFeedback(null);
    setPicked(null);
    setHistory([]);
  };

  const choose = (id: string) => {
    if (feedback === 'correct' || isSpeaking) return;
    const correct = id === step.correctId;
    setPicked(id);
    setFeedback(correct ? 'correct' : 'wrong');
    if (!correct) return;

    const reply = step.choices.find((item) => item.id === id);
    if (!reply) return;
    setHistory((items) => [
      ...items,
      { id: `${step.id}-staff`, side: 'staff', speaker: step.speaker, czech: step.staffCzech, mongolian: step.staffMn },
      { id: `${step.id}-user`, side: 'user', speaker: 'Та', czech: reply.text, mongolian: reply.mongolian },
    ]);

    const advance = () => {
      if (index === scenario.steps.length - 1) return;
      window.setTimeout(() => {
        setIndex((value) => value + 1);
        setFeedback(null);
        setPicked(null);
      }, 360);
    };
    if (autoAudio) speakCzech(reply.text, advance);
    else advance();
  };

  const bubble = (item: Bubble) => {
    const staff = item.side === 'staff';
    return (
      <div key={item.id} style={{ display: 'flex', flexDirection: staff ? 'row' : 'row-reverse', gap: 7, alignItems: 'flex-end' }}>
        <div style={{ width: 29, height: 29, borderRadius: 15, display: 'grid', placeItems: 'center', background: staff ? '#44526B' : '#7B5B22', fontSize: 14 }}>{staff ? '👩‍💼' : '🙂'}</div>
        <div style={{ maxWidth: '80%', padding: '8px 10px', borderRadius: 14, background: staff ? '#242428' : 'rgba(200,149,42,.16)', border: staff ? '1px solid #34343A' : '1px solid rgba(200,149,42,.4)' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ flex: 1, color: staff ? '#A0A0A8' : '#F5C842', fontSize: 9, fontWeight: 900 }}>{item.speaker}</span>
            <button onClick={() => speakCzech(item.czech)} aria-label="Аудио тоглуулах" style={{ width: 25, height: 25, padding: 0, borderRadius: 13, border: '1px solid rgba(200,149,42,.4)', background: 'rgba(200,149,42,.12)', color: '#F5C842', cursor: 'pointer' }}><Volume2 size={13} /></button>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: 15, fontWeight: 800 }}>{item.czech}</p>
          <p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 11 }}>{item.mongolian}</p>
        </div>
      </div>
    );
  };

  const completed = feedback === 'correct' && index === scenario.steps.length - 1;

  return (
    <div style={{ minHeight: '100dvh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ padding: 'max(16px, env(safe-area-inset-top)) 18px 13px', background: '#141416', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPage('a0Lesson')} style={{ width: 35, height: 35, borderRadius: 10, border: 0, background: '#242428', color: '#E5E5EA', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <div style={{ flex: 1 }}><p style={{ margin: 0, color: '#C8952A', fontSize: 11, fontWeight: 900 }}>ТҮР ШАЛГАЛТЫН ГОРИМ</p><h1 style={{ margin: '2px 0 0', fontSize: 17 }}>{lesson.titleMn.split(' — ')[0]} · Төгсгөлийн яриа</h1></div>
          <button onClick={restart} style={{ width: 35, height: 35, borderRadius: 10, border: '1px solid #34343A', background: '#242428', color: '#F5C842', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><RotateCcw size={16} /></button>
        </div>
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '16px 16px 32px' }}>
        <A0DialogueScene lessonId={currentLessonId} />
        <div style={{ marginBottom: 10, padding: 12, borderRadius: 16, background: '#1C1C1F', border: '1px solid #2A2A2F', display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, display: 'grid', placeItems: 'center', background: '#44526B' }}>👩‍💼</div>
          <div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 13, fontWeight: 900 }}>{scenario.titleMn}</p><p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 11, lineHeight: 1.35 }}>{scenario.contextMn}</p></div>
          <button onClick={() => setAutoAudio((value) => !value)} style={{ padding: '7px 8px', borderRadius: 10, border: '1px solid rgba(200,149,42,.4)', background: autoAudio ? 'rgba(200,149,42,.16)' : 'transparent', color: autoAudio ? '#F5C842' : '#A0A0A8', cursor: 'pointer', fontSize: 10 }}>{autoAudio ? '🔊 Авто' : '🔇 Дуугүй'}</button>
        </div>

        <div style={{ background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 20, padding: 14 }}>
          <div ref={logRef} style={{ maxHeight: 'min(36dvh, 280px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 4, marginBottom: 14 }}>
            {history.map(bubble)}
            {!completed && bubble({ id: `${step.id}-current`, side: 'staff', speaker: step.speaker, czech: step.staffCzech, mongolian: step.staffMn })}
          </div>

          {!completed ? <div style={{ borderTop: '1px solid #2A2A2F', paddingTop: 12 }}>
            <p style={{ margin: '0 0 8px', color: '#C8952A', fontSize: 11, fontWeight: 900 }}>ТАНЫ ХАРИУ</p>
            <h2 style={{ margin: '0 0 12px', fontSize: 16, lineHeight: 1.42 }}>{step.promptMn}</h2>
            {isSpeaking && <p style={{ margin: '-4px 0 10px', color: '#A0A0A8', fontSize: 12 }}>Асуулт дуустал сонсож байна…</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {choices.map((item) => {
                const right = feedback === 'correct' && item.id === step.correctId;
                const wrong = feedback === 'wrong' && item.id === picked;
                return <button key={item.id} onClick={() => choose(item.id)} disabled={feedback === 'correct' || isSpeaking} style={{ textAlign: 'left', padding: '13px', borderRadius: 13, color: isSpeaking ? '#8A8A93' : '#FFF', opacity: isSpeaking ? .55 : 1, background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: right ? '1px solid rgba(34,197,94,.6)' : wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A', cursor: feedback === 'correct' || isSpeaking ? 'default' : 'pointer' }}>{item.text}</button>;
              })}
            </div>
            {feedback && <p style={{ margin: '10px 0 0', color: feedback === 'correct' ? '#4ADE80' : '#F87171', fontSize: 12, fontWeight: 800 }}>{feedback === 'correct' ? 'Зөв. Дараагийн мөр рүү шилжинэ…' : 'Буруу. Дахин оролдоорой.'}</p>}
          </div> : <div style={{ textAlign: 'center', borderTop: '1px solid #2A2A2F', paddingTop: 18 }}><p style={{ margin: 0, color: '#4ADE80', fontWeight: 900 }}>Яриа дууслаа.</p><p style={{ color: '#A0A0A8', fontSize: 12, lineHeight: 1.45 }}>Энэ нь туршилтын горим тул XP, ахиц, SRS-д нөлөөлөхгүй.</p><button onClick={restart} className="btn-gold" style={{ width: '100%', padding: 13 }}>Дахин шалгах</button></div>}
        </div>
      </main>
    </div>
  );
};

export default A0DialoguePreviewPage;
