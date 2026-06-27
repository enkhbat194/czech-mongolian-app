import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Mic, Check, X } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';

const MOCK_SCORE = () => Math.floor(Math.random() * 40) + 60; // 60-99

const InteractiveLearningPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const [qs] = useState(() => [...words].sort(() => Math.random() - 0.5).slice(0, 10));
  const [idx, setIdx] = useState(0);

  // States for the current card
  const [hasListened, setHasListened] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'fail' | null>(null);
  const [showXP, setXP] = useState(false);
  const [done, setDone] = useState(false);

  const q = qs[idx];

  // Reset state when idx changes
  useEffect(() => {
    setHasListened(false);
    setIsRecording(false);
    setFeedback(null);
  }, [idx]);

  const playAudio = () => {
    if (!q) return;
    const u = new SpeechSynthesisUtterance(q.czech);
    u.lang = 'cs-CZ';
    u.rate = 0.8;
    u.onend = () => {
      setHasListened(true);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    // Fallback if onend doesn't fire reliably on some mobile browsers
    setTimeout(() => setHasListened(true), 2000);
  };

  const handleNext = () => {
    if (idx < qs.length - 1) {
      setIdx(i => i + 1);
    } else {
      setDone(true);
    }
  };

  const skip = () => {
    updateSRSCard(q.id, 4); // Good enough, but not perfect since skipped
    handleNext();
  };

  const startPronunciationCheck = () => {
    setIsRecording(true);
    
    // Simulate recording delay
    setTimeout(() => {
      setIsRecording(false);
      const score = MOCK_SCORE();
      const isGood = score >= 75;
      
      if (isGood) {
        setFeedback('success');
        addXP(20);
        setXP(true);
        setTimeout(() => setXP(false), 1200);
        updateSRSCard(q.id, 5); // Perfect
      } else {
        setFeedback('fail');
        updateSRSCard(q.id, 1); // Needs work
      }

      // Automatically move to next after feedback
      setTimeout(() => {
        handleNext();
      }, 2000);
      
    }, 2500); // 2.5s recording
  };

  if (done) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter,sans-serif' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: '#1C1C1F', borderRadius: 28, padding: 32, textAlign: 'center', border: '1px solid #2A2A2F', width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#FFF', marginBottom: 6 }}>Дасгал дууслаа!</h2>
          <p style={{ fontSize: 14, color: '#A0A0A8', marginBottom: 20 }}>Та шинэ үгнүүдтэйгээ танилцлаа.</p>
          <button onClick={() => setPage('practice')} className="btn-gold" style={{ width: '100%', padding: 16, fontSize: 16 }}>
            Буцах
          </button>
        </motion.div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter,sans-serif', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
        <button onClick={() => setPage('practice')}
          style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="#C8952A" />
        </button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#A0A0A8' }}>{idx + 1} / {qs.length}</span>
          <ProgressBar value={idx} max={qs.length} height={4} color="#C8952A" />
        </div>
        <div style={{ width: 34 }} /> {/* Spacer */}
      </div>

      <AnimatePresence>
        {showXP && (
          <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', top: 70, zIndex: 20 }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <XPToast xp={20} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column' }}
          >
            {/* Word Content */}
            <div style={{ textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
              <h1 style={{ fontSize: 40, fontWeight: 800, color: '#FFF', marginBottom: 12 }}>{q.czech}</h1>
              <p style={{ fontSize: 16, color: '#A0A0A8', fontFamily: 'monospace', marginBottom: 24 }}>{q.ipa}</p>
              
              <div style={{ background: '#1C1C1F', padding: '16px 24px', borderRadius: 16, border: '1px solid #2A2A2F', display: 'inline-block' }}>
                <p style={{ fontSize: 18, color: '#FFF', fontWeight: 600 }}>{q.mongolian}</p>
              </div>
            </div>

            {/* Actions Area */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              
              {feedback ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 40, border: `3px solid ${feedback === 'success' ? '#22C55E' : '#EF4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feedback === 'success' ? <Check size={40} color="#22C55E" /> : <X size={40} color="#EF4444" />}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: feedback === 'success' ? '#22C55E' : '#EF4444' }}>
                    {feedback === 'success' ? 'Сайн байна!' : 'Дахин давтаарай'}
                  </h3>
                </motion.div>
              ) : isRecording ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
                  
                  <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <Mic size={32} color="#EF4444" />
                    </motion.div>
                  </div>
                  <p style={{ color: '#EF4444', fontWeight: 600 }}>Сонсож байна...</p>

                </motion.div>
              ) : (
                <>
                  <button onClick={playAudio} className="btn-gold" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 16 }}>
                    <Volume2 size={24} />
                    {hasListened ? 'Дахин сонсох' : 'Сонсох'}
                  </button>

                  <AnimatePresence>
                    {hasListened && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
                        <button onClick={startPronunciationCheck} className="btn-outline" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 16, border: '1.5px solid #C8952A', color: '#C8952A' }}>
                          <Mic size={24} />
                          Дуудлага шалгах
                        </button>
                        
                        <button onClick={skip} style={{ background: 'transparent', border: 'none', color: '#606068', fontSize: 15, padding: '8px', cursor: 'pointer', textDecoration: 'underline' }}>
                          Алгасах
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default InteractiveLearningPage;
