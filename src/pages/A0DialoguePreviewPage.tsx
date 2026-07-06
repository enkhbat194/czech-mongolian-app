import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, RotateCcw, Volume2 } from 'lucide-react';
import { a0ReferenceCatalog } from '../data/a0ReferenceCatalog';
import type { DialogueChoice, DialogueScenario } from '../data/a0Dialogues';
import { useAppStore } from '../stores/useAppStore';

type Feedback = 'correct' | 'wrong' | null;
type Bubble = { id: string; side: 'staff' | 'user'; speaker: string; czech: string; mongolian: string };

function speakCzech(text: string, onDone?: () => void) {
  if (!('speechSynthesis' in window)) { onDone?.(); return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'cs-CZ';
  utterance.rate = 0.84;
  let settled = false;
  const done = () => { if (!settled) { settled = true; onDone?.(); } };
  utterance.onend = done;
  utterance.onerror = done;
  window.speechSynthesis.speak(utterance);
}

function correctedScenario(scenario: DialogueScenario): DialogueScenario {
  return { ...scenario, steps: scenario.steps.map((step) => step.staffCzech === 'Mluvím rychle.' ? { ...step, staffCzech: 'Promiňte, mluvím moc rychle?', staffMn: 'Уучлаарай, би хэт хурдан ярьж байна уу?' } : step) };
}

function rotate<T>(items: T[], offset: number) {
  if (items.length < 2) return items;
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function distributeChoices(stepIndex: number, choices: DialogueChoice[], correctId: string) {
  const correct = choices.find((choice) => choice.id === correctId);
  if (!correct || choices.length < 2) return choices;
  const result = rotate(choices.filter((choice) => choice.id !== correctId), stepIndex);
  result.splice((stepIndex + 1) % choices.length, 0, correct);
  return result;
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

  const step = scenario.steps[index];
  const choices = useMemo(() => distributeChoices(index, step.choices, step.correctId), [index, step.choices, step.correctId]);
  const finalStep = index === scenario.steps.length - 1;
  const transitioning = feedback === 'correct' && !finalStep;
  const completed = feedback === 'correct' && finalStep;
  const visibleHistory = history.slice(-2);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIndex(0); setFeedback(null); setPicked(null); setHistory([]);
  }, [scenario.id]);

  useEffect(() => {
    if (!autoAudio || completed || transitioning) { setIsSpeaking(false); return; }
    setIsSpeaking(true);
    const timer = window.setTimeout(() => speakCzech(step.staffCzech, () => setIsSpeaking(false)), 180);
    return () => window.clearTimeout(timer);
  }, [autoAudio, completed, step.id, step.staffCzech, transitioning]);

  const restart = () => {
    window.speechSynthesis?.cancel();
    setIndex(0); setFeedback(null); setPicked(null); setHistory([]); setIsSpeaking(autoAudio);
  };

  const advance = () => {
    if (finalStep) return;
    window.setTimeout(() => { setIndex((value) => value + 1); setFeedback(null); setPicked(null); }, 180);
  };

  const choose = (id: string) => {
    if (feedback === 'correct' || isSpeaking || transitioning) return;
    const correct = id === step.correctId;
    setPicked(id); setFeedback(correct ? 'correct' : 'wrong');
    if (!correct) return;
    const reply = step.choices.find((item) => item.id === id);
    if (!reply) return;
    setHistory((items) => [...items,
      { id: `${step.id}-staff`, side: 'staff', speaker: step.speaker, czech: step.staffCzech, mongolian: step.staffMn },
      { id: `${step.id}-user`, side: 'user', speaker: 'Та', czech: reply.text, mongolian: reply.mongolian },
    ]);
    if (autoAudio) speakCzech(reply.text, advance); else advance();
  };

  const bubble = (item: Bubble) => {
    const staff = item.side === 'staff';
    return <div key={item.id} style={{ display: 'flex', flexDirection: staff ? 'row' : 'row-reverse', gap: 6, alignItems: 'flex-end' }}>
      <div style={{ width: 26, height: 26, flex: '0 0 26px', borderRadius: 13, display: 'grid', placeItems: 'center', background: staff ? '#44526B' : '#7B5B22', fontSize: 13 }}>{staff ? '👩‍💼' : '🙂'}</div>
      <div style={{ maxWidth: '82%', padding: '7px 9px', borderRadius: 13, background: staff ? '#242428' : 'rgba(200,149,42,.16)', border: staff ? '1px solid #34343A' : '1px solid rgba(200,149,42,.40)' }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}><span style={{ flex: 1, color: staff ? '#A0A0A8' : '#F5C842', fontSize: 9, fontWeight: 900 }}>{item.speaker}</span><button onClick={() => speakCzech(item.czech)} aria-label="Аудио тоглуулах" style={{ width: 22, height: 22, padding: 0, borderRadius: 11, border: '1px solid rgba(200,149,42,.4)', background: 'rgba(200,149,42,.12)', color: '#F5C842', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Volume2 size={12} /></button></div>
        <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 800, lineHeight: 1.27 }}>{item.czech}</p><p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 11, lineHeight: 1.25 }}>{item.mongolian}</p>
      </div>
    </div>;
  };

  return <div style={{ minHeight: '100dvh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
    <header style={{ padding: 'max(11px, env(safe-area-inset-top)) 14px 10px', background: '#141416', borderBottom: '1px solid #2A2A2F' }}><div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <button onClick={() => setPage('a0Lesson')} style={{ width: 34, height: 34, flex: '0 0 34px', borderRadius: 10, border: 0, background: '#242428', color: '#E5E5EA', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ChevronLeft size={19} /></button>
      <div style={{ flex: 1, minWidth: 0 }}><p style={{ margin: 0, color: '#C8952A', fontSize: 10, fontWeight: 900 }}>ТҮР ШАЛГАЛТ</p><h1 style={{ margin: '2px 0 0', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.titleMn.split(' — ')[0]} · Төгсгөлийн яриа</h1></div>
      <button onClick={restart} aria-label="Яриаг дахин эхлүүлэх" style={{ width: 34, height: 34, flex: '0 0 34px', borderRadius: 10, border: '1px solid #34343A', background: '#242428', color: '#F5C842', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><RotateCcw size={15} /></button>
    </div></header>
    <main style={{ maxWidth: 430, margin: '0 auto', padding: '12px 12px 24px' }}>
      <div style={{ marginBottom: 8, minHeight: 42, padding: '8px 10px', borderRadius: 14, background: '#1C1C1F', border: '1px solid #2A2A2F', display: 'flex', alignItems: 'center', gap: 8 }}><p style={{ flex: 1, minWidth: 0, margin: 0, fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{scenario.titleMn}</p><button onClick={() => setAutoAudio((value) => !value)} style={{ padding: '6px 8px', flex: '0 0 auto', borderRadius: 9, border: '1px solid rgba(200,149,42,.4)', background: autoAudio ? 'rgba(200,149,42,.16)' : 'transparent', color: autoAudio ? '#F5C842' : '#A0A0A8', cursor: 'pointer', fontSize: 10, fontWeight: 800 }}>{autoAudio ? '🔊 Авто' : '🔇 Дуугүй'}</button></div>
      <section style={{ background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 18, padding: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: transitioning || completed ? 0 : 11 }}>{visibleHistory.map(bubble)}{!transitioning && !completed && bubble({ id: `${step.id}-current`, side: 'staff', speaker: step.speaker, czech: step.staffCzech, mongolian: step.staffMn })}</div>
        {transitioning && <div style={{ padding: '10px 0 2px', textAlign: 'center', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>Таны хариултыг сонсож байна…</div>}
        {completed ? <div style={{ textAlign: 'center', borderTop: '1px solid #2A2A2F', marginTop: 12, paddingTop: 14 }}><p style={{ margin: 0, color: '#4ADE80', fontWeight: 900 }}>Яриа дууслаа.</p><button onClick={restart} className="btn-gold" style={{ width: '100%', marginTop: 12, padding: 12 }}>Дахин шалгах</button></div> : !transitioning ? <div style={{ borderTop: '1px solid #2A2A2F', paddingTop: 11 }}>
          <p style={{ margin: '0 0 7px', color: '#C8952A', fontSize: 10, fontWeight: 900 }}>ТАНЫ ХАРИУ</p><h2 style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.34 }}>{step.promptMn}</h2>{isSpeaking && <p style={{ margin: '-3px 0 8px', color: '#A0A0A8', fontSize: 11 }}>Асуулт дуустал сонсож байна…</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>{choices.map((item) => { const wrong = feedback === 'wrong' && item.id === picked; return <button key={item.id} onClick={() => choose(item.id)} disabled={isSpeaking} style={{ minHeight: 44, textAlign: 'left', padding: '10px 12px', borderRadius: 12, color: isSpeaking ? '#8A8A93' : '#FFF', opacity: isSpeaking ? .58 : 1, background: wrong ? 'rgba(239,68,68,.16)' : '#242428', border: wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A', cursor: isSpeaking ? 'default' : 'pointer', fontSize: 15, fontWeight: 700 }}>{item.text}</button>; })}</div>{feedback === 'wrong' && <p style={{ margin: '9px 0 0', color: '#F87171', fontSize: 12, fontWeight: 800 }}>Буруу. Дахин оролдоорой.</p>}
        </div> : null}
      </section>
    </main>
  </div>;
};

export default A0DialoguePreviewPage;
