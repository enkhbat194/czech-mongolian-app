import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Check, X } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';

interface MCQ {
  id: string;
  cz: string;
  mn: string;
  ipa: string;
  options: string[];
}

function generateQuestions(words: any[]): MCQ[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
  return shuffled.map((w) => {
    const others = words.filter((x) => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.mongolian);
    return {
      id: w.id,
      cz: w.czech,
      mn: w.mongolian,
      ipa: w.ipa || '',
      options: [w.mongolian, ...others].sort(() => Math.random() - 0.5),
    };
  });
}

const WordQuizPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const [qs] = useState<MCQ[]>(() => generateQuestions(words));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [phase, setPhase] = useState<'question' | 'result'>('question');
  const [showXP, setXP] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  
  const q = qs[idx];

  const playAudio = () => {
    if (!q) return;
    const u = new SpeechSynthesisUtterance(q.cz);
    u.lang = 'cs-CZ';
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const handleSelect = (opt: string) => {
    if (sel) return;
    setSel(opt);
  };

  const handleCheck = () => {
    if (!sel) return;
    const isCorrect = sel === q.mn;
    if (isCorrect) {
      addXP(10);
      setScore(s => s + 1);
      setXP(true);
      setTimeout(() => setXP(false), 1200);
      updateSRSCard(q.id, 5);
    } else {
      updateSRSCard(q.id, 1);
    }
    setPhase('result');
  };

  const next = () => {
    if (idx < qs.length - 1) {
      setIdx(i => i + 1);
      setSel(null);
      setPhase('question');
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = qs.length > 0 ? Math.round((score / qs.length) * 100) : 0;
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: '#1C1C1F', borderRadius: 28, padding: 32, textAlign: 'center', border: '1px solid #2A2A2F', width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{pct >= 70 ? '🏆' : '👍'}</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#FFF', marginBottom: 6 }}>Дасгал дууслаа!</h2>
          <p style={{ fontSize: 14, color: '#A0A0A8', marginBottom: 20 }}>{score} / {qs.length} зөв хариулсан</p>
          <button onClick={() => setPage('practice')} className="btn-gold" style={{ width: '100%', padding: 16, fontSize: 16 }}>
            Буцах
          </button>
        </motion.div>
      </div>
    );
  }

  if (!q) return null;

  const isCorrect = sel === q.mn;

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter,sans-serif' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setPage('practice')}
          style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="#C8952A" />
        </button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#A0A0A8' }}>{idx + 1} / {qs.length}</span>
          <ProgressBar value={idx + (phase === 'result' ? 1 : 0)} max={qs.length} height={4} color="#C8952A" />
        </div>
        <div style={{ width: 34 }} /> {/* Spacer */}
      </div>

      <AnimatePresence>
        {showXP && (
          <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', top: 70, zIndex: 10 }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <XPToast xp={10} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <AnimatePresence mode="wait">
          {phase === 'question' ? (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 20 }}>
                <div style={{ fontSize: 24, marginBottom: 16 }}>🇨🇿</div>
                <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>{q.cz}</h1>
                <p style={{ fontSize: 14, color: '#A0A0A8', fontFamily: 'monospace', marginBottom: 24 }}>{q.ipa}</p>
                <p style={{ fontSize: 13, color: '#C8952A', marginBottom: 24 }}>Зөв утгыг сонгоно уу</p>
                
                <button onClick={playAudio}
                  style={{ width: 64, height: 64, borderRadius: 32, background: 'rgba(200,149,42,0.1)', border: '1.5px solid rgba(200,149,42,0.3)', color: '#C8952A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                  <Volume2 size={28} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                {q.options.map((opt, i) => {
                  const isSelected = sel === opt;
                  return (
                    <button key={i} onClick={() => handleSelect(opt)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 16,
                        background: '#1C1C1F', border: `1.5px solid ${isSelected ? '#C8952A' : '#2A2A2F'}`,
                        cursor: 'pointer', textAlign: 'left', transition: 'all .2s'
                      }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: isSelected ? '#C8952A' : '#242428', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: isSelected ? '#000' : '#A0A0A8', flexShrink: 0 }}>
                        {['A', 'B', 'C', 'D'][i]}
                      </div>
                      <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#FFF' }}>{opt}</span>
                      {isSelected && <Check size={20} color="#C8952A" />}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={handleCheck}
                disabled={!sel}
                className="btn-gold" 
                style={{ width: '100%', padding: 18, fontSize: 16, marginTop: 24, opacity: sel ? 1 : 0.5 }}>
                Дараах
              </button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              
              <div style={{ width: 120, height: 120, borderRadius: 60, border: `4px solid ${isCorrect ? '#22C55E' : '#EF4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                {isCorrect ? <Check size={64} color="#22C55E" /> : <X size={64} color="#EF4444" />}
              </div>
              
              <h2 style={{ fontSize: 24, fontWeight: 800, color: isCorrect ? '#22C55E' : '#EF4444', marginBottom: 16 }}>
                {isCorrect ? 'Зөв байна!' : 'Буруу байна!'}
              </h2>
              
              <p style={{ fontSize: 20, color: '#FFF' }}>{q.mn}</p>
              
              <div style={{ marginTop: 'auto', width: '100%', paddingTop: 40 }}>
                <button onClick={next} className="btn-gold" style={{ width: '100%', padding: 18, fontSize: 16 }}>
                  Дараах
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WordQuizPage;
