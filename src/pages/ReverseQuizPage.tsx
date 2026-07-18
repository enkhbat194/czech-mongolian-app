import React, { useState } from 'react';
import { Check, ChevronLeft, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { useAppStore } from '../stores/useAppStore';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';

type Question = { id: string; czech: string; mongolian: string; options: string[] };

function makeQuestions(words: any[]): Question[] {
  return [...words].sort(() => Math.random() - 0.5).slice(0, 10).map((word) => ({
    id: word.id,
    czech: word.czech,
    mongolian: word.mongolian,
    options: [word.czech, ...words.filter((item) => item.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map((item) => item.czech)].sort(() => Math.random() - 0.5),
  }));
}

const ReverseQuizPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const [questions] = useState<Question[]>(() => makeQuestions(words));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  if (!question) return null;

  const correct = selected === question.czech;
  const check = () => {
    if (!selected) return;
    setChecked(true);
    if (correct) {
      addXP(10);
      setScore((value) => value + 1);
      setShowXP(true);
      window.setTimeout(() => setShowXP(false), 1200);
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
    } else if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
  };

  const next = () => {
    if (index >= questions.length - 1) setFinished(true);
    else {
      setIndex((value) => value + 1);
      setSelected(null);
      setChecked(false);
    }
  };

  if (finished) {
    const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}><section style={{ width: '100%', maxWidth: 430, padding: 28, textAlign: 'center', borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}><div style={{ fontSize: 52 }}>{percent >= 70 ? '🏆' : '👍'}</div><h1 style={{ fontSize: 24 }}>Дасгал дууслаа</h1><p style={{ color: '#A0A0A8' }}>{score} / {questions.length} зөв хариулсан</p><button className="btn-gold" onClick={() => setPage('practice')} style={{ width: '100%', padding: 15 }}>Буцах</button></section></div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => setPage('practice')} style={{ border: 0, background: 'transparent', color: '#C8952A' }}><ChevronLeft size={24} /></button>
        <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: 800 }}>Урвуу сонгох</p><ProgressBar value={index + (checked ? 1 : 0)} max={questions.length} height={5} /></div>
        <span style={{ color: '#A0A0A8', fontSize: 13 }}>{index + 1}/{questions.length}</span>
      </header>
      <main style={{ maxWidth: 430, margin: '0 auto', padding: 20 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={10} /></motion.div>}</AnimatePresence>
        <section style={{ padding: 22, borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <p style={{ color: '#A0A0A8', textAlign: 'center' }}>Монгол утгыг хараад Чех хувилбарыг сонгоно.</p>
          <p style={{ minHeight: 70, margin: '14px 0 24px', textAlign: 'center', fontSize: 24, fontWeight: 800 }}>{question.mongolian}</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {question.options.map((option) => {
              const selectedOption = option === selected;
              const right = checked && option === question.czech;
              const wrong = checked && selectedOption && !right;
              return <button key={option} disabled={checked} onClick={() => setSelected(option)} style={{ padding: 14, textAlign: 'left', borderRadius: 14, color: '#FFF', background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: `1px solid ${right ? '#22C55E' : wrong ? '#EF4444' : selectedOption ? '#C8952A' : '#34343A'}` }}>{option}</button>;
            })}
          </div>
          {!checked ? <button className="btn-gold" disabled={!selected} onClick={check} style={{ width: '100%', marginTop: 18, padding: 15, opacity: selected ? 1 : .5 }}>Шалгах</button> : <><p style={{ textAlign: 'center', color: correct ? '#4ADE80' : '#F87171', fontWeight: 800 }}>{correct ? <><Check size={17} style={{ verticalAlign: 'middle' }} /> Зөв байна.</> : <><X size={17} style={{ verticalAlign: 'middle' }} /> Зөв хариулт: {question.czech}</>}</p><button className="btn-gold" onClick={next} style={{ width: '100%', padding: 15 }}>{index === questions.length - 1 ? 'Дуусгах' : 'Дараах'}</button></>}
        </section>
      </main>
    </div>
  );
};

export default ReverseQuizPage;
