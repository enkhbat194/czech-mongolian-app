import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Check, X } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';

interface Question {
  id: string;
  czTokens: string[];
  bank: string[];
  czFull: string;
  mnFull: string;
}

function tokenize(text: string): string[] {
  // matches words with Czech characters, or sequences of punctuation
  const matches = text.match(/[a-zA-ZěščřžýáíéůúťďňĚŠČŘŽÝÁÍÉŮÚŤĎŇ]+|[^\s\wěščřžýáíéůúťďňĚŠČŘŽÝÁÍÉŮÚŤĎŇ]+/g);
  return matches ? matches.filter(m => m.trim().length > 0) : text.split(' ');
}

function generateQuestions(words: any[]): Question[] {
  // Filter phrases or use examples that are short
  const phrases = words.filter(w => w.czech.includes(' '));
  const fallbacks = words.filter(w => w.example && w.example.split(' ').length >= 3 && w.example.split(' ').length <= 6);
  
  let pool = [...phrases, ...fallbacks].slice(0, 20);
  // deduplicate
  pool = Array.from(new Map(pool.map(item => [item.id, item])).values());
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 10);
  
  return shuffled.map((w) => {
    const text = w.czech.includes(' ') ? w.czech : w.example;
    const mn = w.czech.includes(' ') ? w.mongolian : w.exampleTranslation;
    const tokens = tokenize(text);
    
    // Pick 1-2 random words from pool as distractors
    const allOtherTokens = pool.filter(x => x.id !== w.id)
                               .flatMap(x => tokenize(x.czech.includes(' ') ? x.czech : x.example))
                               .filter(t => t.length > 2 && /^[a-zA-Zěščřžýáíéůúťďň]+$/i.test(t));
    const distractor = allOtherTokens.length > 0 ? allOtherTokens[Math.floor(Math.random() * allOtherTokens.length)] : 'jmenu';
    
    const bank = [...tokens, distractor].sort(() => Math.random() - 0.5);
    
    return {
      id: w.id,
      czTokens: tokens,
      bank,
      czFull: text,
      mnFull: mn,
    };
  });
}

const SentenceBuilderPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const qs = useMemo(() => generateQuestions(words), [words]);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'question' | 'result'>('question');
  const [showXP, setXP] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const q = qs[idx];

  // Which tokens from the bank have been placed in which slots
  // bankUsed: indices of the bank that have been placed
  const [slots, setSlots] = useState<{bankIndex: number, text: string}[]>([]);

  const playAudio = () => {
    if (!q) return;
    const u = new SpeechSynthesisUtterance(q.czFull);
    u.lang = 'cs-CZ'; u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const handleBankClick = (bankIndex: number, text: string) => {
    if (slots.some(s => s.bankIndex === bankIndex)) return; // already used
    setSlots(prev => [...prev, { bankIndex, text }]);
  };

  const handleSlotClick = (slotIndex: number) => {
    setSlots(prev => prev.filter((_, i) => i !== slotIndex));
  };

  const resetSlots = () => setSlots([]);

  const handleCheck = () => {
    const userSentence = slots.map(s => s.text).join('');
    const targetSentence = q.czTokens.join('');
    
    const correct = userSentence === targetSentence;
    setIsCorrect(correct);
    if (correct) {
      addXP(20);
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
      setSlots([]);
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
            <XPToast xp={20} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <AnimatePresence mode="wait">
          {phase === 'question' ? (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }}>
                <p style={{ fontSize: 15, color: '#FFF', marginBottom: 24, lineHeight: 1.5 }}>
                  Үгнүүдийг зөв дарааллаар байрлуулж, өгүүлбэр бүтээнэ үү.
                </p>
                <p style={{ fontSize: 13, color: '#C8952A', marginBottom: 24 }}>({q.mnFull})</p>
                
                <button onClick={playAudio}
                  style={{ width: 64, height: 64, borderRadius: 32, background: 'rgba(200,149,42,0.1)', border: '1.5px solid rgba(200,149,42,0.3)', color: '#C8952A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                  <Volume2 size={28} />
                </button>
              </div>

              {/* Word Bank */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
                {q.bank.map((token, i) => {
                  const used = slots.some(s => s.bankIndex === i);
                  return (
                    <button key={`bank-${i}`} onClick={() => handleBankClick(i, token)} disabled={used}
                      style={{
                        padding: '12px 16px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                        background: used ? 'transparent' : '#1C1C1F',
                        border: used ? '1.5px solid #2A2A2F' : '1.5px solid #C8952A',
                        color: used ? 'transparent' : '#FFF',
                        cursor: used ? 'default' : 'pointer',
                        transition: 'all .2s'
                      }}>
                      {token}
                    </button>
                  );
                })}
              </div>

              {/* Slots Area */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', minHeight: 60, padding: 10, borderRadius: 16, border: '1.5px dashed #2A2A2F' }}>
                {slots.map((s, i) => (
                  <motion.button key={`slot-${i}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                    onClick={() => handleSlotClick(i)}
                    style={{
                      padding: '10px 14px', borderRadius: 10, fontSize: 16, fontWeight: 600,
                      background: '#1C1C1F', border: '1px solid #C8952A', color: '#FFF', cursor: 'pointer'
                    }}>
                    {s.text}
                  </motion.button>
                ))}
                {slots.length === 0 && (
                  <span style={{ color: '#606068', alignSelf: 'center', fontSize: 14 }}>Энд дарж оруулна уу</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 24 }}>
                <button onClick={resetSlots} className="btn-outline" style={{ flex: 1, padding: 16, fontSize: 16 }}>
                  Сэргээх
                </button>
                <button onClick={handleCheck} disabled={slots.length === 0} className="btn-gold" 
                  style={{ flex: 1.5, padding: 16, fontSize: 16, opacity: slots.length > 0 ? 1 : 0.5 }}>
                  Шалгах
                </button>
              </div>
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
                  <p style={{ fontSize: 14, color: '#A0A0A8' }}>Зөв хариулт: <span style={{ color: '#FFF', fontWeight: 700, fontSize: 18 }}>{q.czFull}</span></p>
                )}
                {!isCorrect && (
                  <p style={{ fontSize: 14, color: '#A0A0A8' }}>Таны бүрдүүлсэн: <span style={{ color: '#EF4444' }}>{slots.map(s => s.text).join('')}</span></p>
                )}
                {isCorrect && <p style={{ fontSize: 20, color: '#FFF' }}>{q.czFull}</p>}
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

export default SentenceBuilderPage;
