import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Check, X } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { speakCzech } from '../components/audio/czechSpeech';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';

// Simple Levenshtein distance for "almost correct" checking
function levenshtein(a: string, b: string): number {
  if (!(a && b)) return (b || a).length;
  let prev: number[] = Array.from({ length: a.length + 1 }, (_, j) => j);
  for (let i = 1; i <= b.length; i++) {
    const curr: number[] = [i];
    for (let j = 1; j <= a.length; j++) {
      curr[j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? (prev[j - 1] ?? 0)
        : Math.min(prev[j - 1] ?? 0, curr[j - 1] ?? 0, prev[j] ?? 0) + 1;
    }
    prev = curr;
  }
  return prev[a.length] ?? 0;
}

interface Question { id: string; cz: string; mn: string; }

function generateQuestions(words: any[]): Question[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
  return shuffled.map((w) => ({ id: w.id, cz: w.czech, mn: w.mongolian }));
}

const CZECH_CHARS = ['ě', 'š', 'č', 'ř', 'ž', 'ý', 'á', 'í', 'é'];

const DictationPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const [qs] = useState<Question[]>(() => generateQuestions(words));
  const [idx, setIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [phase, setPhase] = useState<'question' | 'result'>('question');
  const [showXP, setXP] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [softError, setSoftError] = useState(false);

  const q = qs[idx];

  const playAudio = () => {
    if (!q) return;
    speakCzech(q.cz, { rate: 0.8 });
  };

  const handleCheck = () => {
    if (!q || !inputVal.trim()) return;
    const target = q.cz.trim().toLowerCase();
    const input = inputVal.trim().toLowerCase();
    
    if (target === input) {
      setIsCorrect(true);
      setSoftError(false);
      addXP(15);
      setScore(s => s + 1);
      setXP(true);
      setTimeout(() => setXP(false), 1200);
      if (isSrsEligiblePracticeTarget(q.id)) updateSRSCard(q.id, 5);
      setPhase('result');
    } else {
      const dist = levenshtein(target, input);
      if (dist <= 2 && target.length > 3) {
        // Almost correct (soft error)
        setSoftError(true);
      } else {
        // Completely wrong
        setIsCorrect(false);
        setSoftError(false);
        if (isSrsEligiblePracticeTarget(q.id)) updateSRSCard(q.id, 1);
        setPhase('result');
      }
    }
  };

  const next = () => {
    if (idx < qs.length - 1) {
      setIdx(i => i + 1);
      setInputVal('');
      setPhase('question');
      setSoftError(false);
    } else {
      setDone(true);
    }
  };

  const appendChar = (c: string) => setInputVal(prev => prev + c);

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

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setPage('practice')}
          style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="#C8952A" />
        </button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#A0A0A8' }}>{idx + 1} / {qs.length}</span>
          <ProgressBar value={idx + (phase === 'result' ? 1 : 0)} max={qs.length} height={4} color="#C8952A" />
        </div>
        <div style={{ width: 34 }} />
      </div>

      <AnimatePresence>
        {showXP && (
          <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', top: 70, zIndex: 10 }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <XPToast xp={15} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {phase === 'question' ? (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 40 }}>
                <button onClick={playAudio}
                  style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(200,149,42,0.1)', border: '1.5px solid rgba(200,149,42,0.3)', color: '#C8952A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                  <Volume2 size={36} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => { setInputVal(e.target.value); setSoftError(false); }}
                  placeholder="Сонссоноо бичнэ үү..."
                  autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false"
                  style={{
                    width: '100%', padding: '16px', borderRadius: 12,
                    background: '#1C1C1F', border: `1.5px solid ${softError ? '#EF4444' : '#C8952A'}`,
                    color: '#FFF', fontSize: 18, outline: 'none'
                  }}
                />
                
                {softError && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: 12, color: '#EF4444', textAlign: 'center' }}>
                    Бараг зөв байна, дахин оролдоно уу.
                  </motion.p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4, marginTop: 4 }}>
                  {CZECH_CHARS.map(c => (
                    <button key={c} onClick={() => { appendChar(c); setSoftError(false); }}
                      style={{
                        flex: 1, padding: '10px 0', borderRadius: 8, background: '#242428', border: '1px solid #2A2A2F',
                        color: '#FFF', fontSize: 16, fontWeight: 600, cursor: 'pointer'
                      }}
                      onPointerDown={(e) => (e.currentTarget.style.background = '#303036')}
                      onPointerUp={(e) => (e.currentTarget.style.background = '#242428')}
                      onPointerLeave={(e) => (e.currentTarget.style.background = '#242428')}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleCheck} disabled={!inputVal.trim()} className="btn-gold" 
                style={{ width: '100%', padding: 18, fontSize: 16, marginTop: 24, opacity: inputVal.trim() ? 1 : 0.5 }}>
                Шалгах
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {!isCorrect && (
                  <p style={{ fontSize: 14, color: '#A0A0A8' }}>Зөв хариулт: <span style={{ color: '#FFF', fontWeight: 700, fontSize: 18 }}>{q.cz}</span></p>
                )}
                {!isCorrect && (
                  <p style={{ fontSize: 14, color: '#A0A0A8' }}>Таны бичсэн: <span style={{ color: '#EF4444' }}>{inputVal}</span></p>
                )}
                {isCorrect && <p style={{ fontSize: 20, color: '#FFF' }}>{q.cz}</p>}
              </div>
              <div style={{ marginTop: 'auto', width: '100%', paddingTop: 40 }}>
                <button onClick={next} className="btn-gold" style={{ width: '100%', padding: 18, fontSize: 16 }}>Дараах</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DictationPage;
