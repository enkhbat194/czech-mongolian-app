import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play, Pause, Check, X, RotateCcw } from 'lucide-react';
import { cancelCzechSpeech, speakCzech } from '../components/audio/czechSpeech';
import { useAppStore } from '../stores/useAppStore';
import { Waveform, ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';

interface Question {
  id: string;
  czech: string;
  answer: string;
  options: string[];
}

function makeQuestions(words: any[]): Question[] {
  return [...words].sort(() => Math.random() - 0.5).slice(0, 10).map((word) => ({
    id: word.id,
    czech: word.czech,
    answer: word.mongolian,
    options: [word.mongolian, ...words.filter((item: any) => item.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map((item: any) => item.mongolian)].sort(() => Math.random() - 0.5),
  }));
}

const ListeningPage: React.FC = () => {
  const { words, addXP, updateSRSCard, setPage } = useAppStore();
  const [questions] = useState<Question[]>(() => makeQuestions(words));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  if (!question) return null;

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
    if (answered) return;
    const correct = option === question.answer;
    setSelected(option);
    setAnswered(true);
    if (correct) {
      addXP(15);
      setShowXP(true);
      window.setTimeout(() => setShowXP(false), 1100);
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 5);
    } else {
      if (isSrsEligiblePracticeTarget(question.id)) updateSRSCard(question.id, 1);
    }
    setScore((value) => ({ correct: value.correct + (correct ? 1 : 0), total: value.total + 1 }));
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

  const percent = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  if (finished) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <motion.div initial={{ scale: .75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1C1C1F', borderRadius: 28, padding: 32, textAlign: 'center', border: '1px solid #2A2A2F', width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>{percent >= 70 ? '🏆' : percent >= 40 ? '👍' : '💪'}</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>Дасгал дууслаа!</h2>
          <p style={{ fontSize: 14, color: '#A0A0A8', marginBottom: 16 }}>{score.correct}/{score.total} зөв хариулсан</p>
          <div style={{ marginBottom: 20 }}><ProgressBar value={score.correct} max={score.total} height={10} showPct color={percent >= 70 ? '#22C55E' : '#C8952A'} /></div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, background: 'rgba(34,197,94,.1)', borderRadius: 14, padding: 14 }}><p style={{ fontSize: 22, fontWeight: 900, color: '#22C55E' }}>{score.correct}</p><p style={{ fontSize: 11, color: '#606068' }}>Зөв</p></div>
            <div style={{ flex: 1, background: 'rgba(239,68,68,.1)', borderRadius: 14, padding: 14 }}><p style={{ fontSize: 22, fontWeight: 900, color: '#F87171' }}>{score.total - score.correct}</p><p style={{ fontSize: 11, color: '#606068' }}>Буруу</p></div>
          </div>
          <button onClick={() => { setFinished(false); setIndex(0); setSelected(null); setAnswered(false); setScore({ correct: 0, total: 0 }); }} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 14 }}><RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }} />Дахин эхлэх</button>
        </motion.div>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];
  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#141416', padding: '16px 20px 14px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={() => setPage('practice')} style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={18} color="#A0A0A8" /></button>
          <h1 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', flex: 1 }}>🎧 Сонсох дасгал</h1>
          <div style={{ background: 'rgba(200,149,42,.15)', borderRadius: 10, padding: '4px 10px', border: '1px solid rgba(200,149,42,.3)' }}><span style={{ fontSize: 13, fontWeight: 700, color: '#C8952A' }}>{index + 1}/{questions.length}</span></div>
        </div>
        <ProgressBar value={index} max={questions.length} height={5} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ fontSize: 11, color: '#606068' }}>✓ {score.correct} зөв</span><span style={{ fontSize: 11, color: '#606068' }}>{questions.length - index} үлдсэн</span></div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AnimatePresence>{showXP && <motion.div style={{ display: 'flex', justifyContent: 'center' }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}><XPToast xp={15} /></motion.div>}</AnimatePresence>
        <motion.div key={index} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#1C1C1F', borderRadius: 24, padding: 28, textAlign: 'center', border: '1px solid #2A2A2F' }}>
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
