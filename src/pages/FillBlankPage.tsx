import React, { useMemo, useState } from 'react';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { speakCzech } from '../components/audio/czechSpeech';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { useAppStore } from '../stores/useAppStore';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';

type Question = {
  id: string;
  text: string;
  mongolian: string;
  before: string;
  answer: string;
  after: string;
  options: string[];
};

function createQuestions(words: any[]): Question[] {
  const candidates = words.filter((word) => word.czech.includes(' ') || word.example).slice(0, 20);
  const unique = [...new Map(candidates.map((word) => [word.id, word])).values()];

  return [...unique].sort(() => Math.random() - 0.5).slice(0, 10).map((word) => {
    const text = word.czech.includes(' ') ? word.czech : word.example;
    const mongolian = word.czech.includes(' ') ? word.mongolian : word.exampleTranslation;
    const pieces = text.split(' ').filter(Boolean);
    const answerIndex = Math.max(0, Math.floor(Math.random() * pieces.length));
    const answer = pieces[answerIndex] ?? text;
    const before = pieces.slice(0, answerIndex).join(' ');
    const after = pieces.slice(answerIndex + 1).join(' ');
    const pool = unique
      .filter((item) => item.id !== word.id)
      .flatMap((item) => (item.czech.includes(' ') ? item.czech : item.example ?? '').split(' '))
      .filter((item) => item.length > 1 && item.toLocaleLowerCase() !== answer.toLocaleLowerCase());
    const distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);

    return {
      id: word.id,
      text,
      mongolian,
      before,
      answer,
      after,
      options: [answer, ...distractors].sort(() => Math.random() - 0.5),
    };
  });
}

const FillBlankPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const questions = useMemo(() => createQuestions(words), [words]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  if (!question) return null;

  const correct = selected === question.answer;
  const continueLesson = () => {
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  };

  const checkAnswer = () => {
    if (!selected) return;
    if (correct) {
      addXP(15);
      setScore((value) => value + 1);
      setShowXP(true);
      window.setTimeout(() => setShowXP(false), 1200);
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
    } else {
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
    }
    setChecked(true);
  };

  if (finished) {
    const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', color: '#FFF', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <div style={{ width: '100%', maxWidth: 430, padding: 28, borderRadius: 24, textAlign: 'center', background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <div style={{ fontSize: 52 }}>{percent >= 70 ? '🏆' : '👍'}</div>
          <h1 style={{ fontSize: 24 }}>Дасгал дууслаа</h1>
          <p style={{ color: '#A0A0A8' }}>{score} / {questions.length} зөв хариулсан</p>
          <button className="btn-gold" onClick={() => setPage('practice')} style={{ width: '100%', padding: 15 }}>Буцах</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => setPage('practice')} style={{ border: 0, background: 'transparent', color: '#C8952A' }}><ChevronLeft size={24} /></button>
        <div style={{ flex: 1 }}><ProgressBar value={index + (checked ? 1 : 0)} max={questions.length} height={5} /></div>
        <span style={{ color: '#A0A0A8', fontSize: 13 }}>{index + 1}/{questions.length}</span>
      </header>
      <main style={{ maxWidth: 430, margin: '0 auto', padding: 20 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={15} /></motion.div>}</AnimatePresence>
        <section style={{ padding: 22, borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <p style={{ color: '#A0A0A8', marginTop: 0 }}>Өгүүлбэрийг зөв үгээр нөхнө үү.</p>
          <button onClick={() => speakCzech(question.text, { rate: 0.8 })} style={{ margin: '6px auto 20px', width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', background: 'rgba(200,149,42,.1)', border: '1px solid rgba(200,149,42,.3)', color: '#C8952A' }}><Volume2 size={28} /></button>
          <p style={{ color: '#C8952A', textAlign: 'center', fontSize: 13 }}>{question.mongolian}</p>
          <p style={{ minHeight: 70, textAlign: 'center', fontSize: 21, lineHeight: 1.7 }}>{question.before} <span style={{ borderBottom: '2px solid #C8952A', color: '#C8952A', padding: '0 8px' }}>{selected ?? ' '}</span> {question.after}</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {question.options.map((option) => {
              const selectedOption = selected === option;
              const right = checked && option === question.answer;
              const wrong = checked && selectedOption && !right;
              return <button key={option} disabled={checked} onClick={() => setSelected(option)} style={{ padding: 14, textAlign: 'left', borderRadius: 14, color: '#FFF', background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: `1px solid ${right ? '#22C55E' : wrong ? '#EF4444' : selectedOption ? '#C8952A' : '#34343A'}` }}>{option}</button>;
            })}
          </div>
          {!checked ? <button className="btn-gold" disabled={!selected} onClick={checkAnswer} style={{ marginTop: 18, width: '100%', padding: 15, opacity: selected ? 1 : .5 }}>Шалгах</button> : <><p style={{ color: correct ? '#4ADE80' : '#F87171', textAlign: 'center', fontWeight: 800 }}>{correct ? 'Зөв байна.' : `Зөв хариулт: ${question.answer}`}</p><button className="btn-gold" onClick={continueLesson} style={{ width: '100%', padding: 15 }}>{index === questions.length - 1 ? 'Дуусгах' : 'Дараах'}</button></>}
        </section>
      </main>
    </div>
  );
};

export default FillBlankPage;
