import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { AudioButton, ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';
import { personalizeLearnerText } from '../utils/learnerName';

const FlashcardPage: React.FC = () => {
  const userName = useAppStore((state) => state.userName);
  const personalize = (text: string) => personalizeLearnerText(text, userName);
  const {
    currentLessonId, currentWordIndex, setCurrentWordIndex,
    getWordsForLesson, markWordLearned, addXP, addMinutes,
    updateSRSCard, progress, setPage, completeLesson,
    unlockNextLesson, updateStreak, lessons,
  } = useAppStore();

  const [flipped,   setFlipped]   = useState(false);
  const [showXP,    setShowXP]    = useState(false);
  const [xpAmount,  setXpAmount]  = useState(0);
  const [finished,  setFinished]  = useState(false);
  const [dir,       setDir]       = useState(1);

  const lessonId   = currentLessonId || 'l001';
  const words      = getWordsForLesson(lessonId);
  const word       = words[currentWordIndex];
  const total      = words.length;
  const lesson     = lessons.find(l => l.id === lessonId);

  useEffect(() => { setFlipped(false); }, [currentWordIndex]);

  const award = (xp:number) => {
    setXpAmount(xp); setShowXP(true);
    setTimeout(() => setShowXP(false), 1100);
  };

  const learn = (quality: 0|1|2|3|4|5, xp:number) => {
    if (!word) return;
    if (!progress.learnedWords.includes(word.id)) {
      markWordLearned(word.id); addXP(xp); addMinutes(1);
      if (isSrsEligiblePracticeTarget(word.id)) updateSRSCard(word.id, quality); updateStreak();
      award(xp);
    }
    setTimeout(() => {
      if (currentWordIndex < total-1) { setDir(1); setCurrentWordIndex(currentWordIndex+1); }
      else { completeLesson(lessonId); unlockNextLesson(lessonId); setFinished(true); }
    }, 280);
  };

  /* ── finished ── */
  if (finished) return (
    <div style={{ background:'#0C0C0E', minHeight:'100vh', display:'flex',
      alignItems:'center', justifyContent:'center', padding:24, fontFamily:'Inter,sans-serif' }}>
      <motion.div initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}}
        transition={{type:'spring',stiffness:280}}
        style={{ background:'#1C1C1F', borderRadius:28, padding:32, textAlign:'center',
          border:'1px solid #2A2A2F', width:'100%' }}>
        <div style={{ fontSize:64, marginBottom:12 }}>🏆</div>
        <h2 style={{ fontSize:24, fontWeight:900, color:'#FFF', marginBottom:6 }}>Маш сайн!</h2>
        <p style={{ fontSize:14, color:'#A0A0A8', marginBottom:20 }}>
          Та {total} үг сураалаа. +{total*10} XP
        </p>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={() => { setCurrentWordIndex(0); setFinished(false); }}
            className="btn-outline"
            style={{ flex:1, padding:14, fontSize:14, borderRadius:14 }}>
            <RotateCcw size={14} style={{display:'inline',marginRight:6}}/> Дахин
          </button>
          <button onClick={() => setPage('path')}
            className="btn-gold"
            style={{ flex:1, padding:14, fontSize:14 }}>
            Үргэлжлүүлэх →
          </button>
        </div>
      </motion.div>
    </div>
  );

  /* ── no word ── */
  if (!word) return (
    <div style={{ background:'#0C0C0E', minHeight:'100vh', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, fontFamily:'Inter,sans-serif' }}>
      <div style={{ fontSize:48 }}>📚</div>
      <p style={{ color:'#A0A0A8' }}>Хичээл сонгоно уу</p>
      <button onClick={() => setPage('path')} className="btn-gold" style={{ padding:'12px 24px', fontSize:14 }}>
        Хичээл харах
      </button>
    </div>
  );

  return (
    <div style={{ background:'#0C0C0E', minHeight:'100vh', fontFamily:'Inter,sans-serif' }}>

      {/* Header */}
      <div style={{ background:'#141416', padding:'16px 20px 12px', borderBottom:'1px solid #2A2A2F' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <button onClick={() => setPage('path')}
            style={{ width:34, height:34, borderRadius:10, background:'#242428',
              border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ChevronLeft size={18} color="#A0A0A8"/>
          </button>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontSize:13, fontWeight:700, color:'#FFF' }}>{lesson?.titleMn}</p>
          </div>
          <div style={{ background:'rgba(200,149,42,.15)', borderRadius:10, padding:'4px 10px',
            border:'1px solid rgba(200,149,42,.3)' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#C8952A' }}>
              {currentWordIndex+1}/{total}
            </span>
          </div>
        </div>
        <ProgressBar value={currentWordIndex} max={total} height={5}/>
      </div>

      <div style={{ padding:'16px 16px 0' }}>

        {/* XP toast */}
        <AnimatePresence>
          {showXP && (
            <div style={{ display:'flex', justifyContent:'center', marginBottom:12 }}>
              <XPToast xp={xpAmount}/>
            </div>
          )}
        </AnimatePresence>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentWordIndex}
            initial={{ opacity:0, x:dir*50 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-dir*50 }}
            transition={{ duration:.22 }}
          >
            {!flipped ? (
              /* Front */
              <motion.div whileTap={{scale:.98}} onClick={() => setFlipped(true)}
                style={{
                  background:'#1C1C1F', borderRadius:24, padding:32, textAlign:'center',
                  border:'1px solid #2A2A2F', cursor:'pointer', minHeight:300,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                }}>
                <span style={{ fontSize:32, marginBottom:12 }}>🇨🇿</span>
                <h2 style={{ fontSize:40, fontWeight:900, color:'#FFF', marginBottom:8 }}>
                  {word.czech}
                </h2>
                <p style={{ fontSize:16, color:'#A0A0A8', fontFamily:'monospace', marginBottom:20 }}>
                  {word.ipa}
                </p>
                <AudioButton word={word.czech} audioFile={word.audioFile} size="lg"/>
                <p style={{ fontSize:12, color:'#606068', marginTop:16 }}>
                  Дарж орчуулгыг харна уу ↓
                </p>
              </motion.div>
            ) : (
              /* Back */
              <motion.div
                initial={{ rotateY:90 }} animate={{ rotateY:0 }}
                transition={{ duration:.2 }}
                style={{
                  background:'linear-gradient(135deg,rgba(200,149,42,.12),rgba(200,149,42,.05))',
                  borderRadius:24, padding:28, textAlign:'center',
                  border:'1.5px solid rgba(200,149,42,.3)', minHeight:300,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                }}>
                <span style={{ fontSize:28, marginBottom:10 }}>🇲🇳</span>
                <h2 style={{ fontSize:32, fontWeight:900, color:'#FFF', marginBottom:6 }}>
                  {word.mongolian}
                </h2>
                <AudioButton word={word.czech} audioFile={word.audioFile} size="md"/>
                {/* example */}
                <div style={{ background:'#1C1C1F', borderRadius:14, padding:14,
                  marginTop:16, width:'100%', textAlign:'left' }}>
                  <p style={{ fontSize:13, color:'#C8952A', marginBottom:4, fontStyle:'italic' }}>
                    "{personalize(word.example)}"
                  </p>
                  <p style={{ fontSize:12, color:'#606068' }}>{personalize(word.exampleTranslation)}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div style={{ display:'flex', gap:12, marginTop:16 }}>
          {!flipped ? (
            <>
              <button
                onClick={() => { if (currentWordIndex>0) { setDir(-1); setCurrentWordIndex(currentWordIndex-1); }}}
                disabled={currentWordIndex===0}
                className="btn-outline"
                style={{ flex:1, padding:14, fontSize:14, opacity: currentWordIndex===0 ? .3 : 1 }}>
                <ChevronLeft size={16} style={{display:'inline',marginRight:4}}/> Буцах
              </button>
              <button onClick={() => setFlipped(true)}
                className="btn-gold" style={{ flex:1.8, padding:14, fontSize:14 }}>
                Дараах <ChevronRight size={16} style={{display:'inline',marginLeft:4}}/>
              </button>
            </>
          ) : (
            <>
              <motion.button whileTap={{scale:.94}} onClick={() => learn(2,8)}
                style={{ flex:1, padding:14, borderRadius:14, fontWeight:700, fontSize:14, cursor:'pointer',
                  background:'rgba(239,68,68,.12)', border:'1.5px solid rgba(239,68,68,.35)',
                  color:'#F87171', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <X size={16}/> Хэцүү
              </motion.button>
              <motion.button whileTap={{scale:.94}} onClick={() => learn(5,15)}
                className="btn-gold"
                style={{ flex:1.5, padding:14, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Check size={16}/> Мэднэ ✓
              </motion.button>
            </>
          )}
        </div>

        {/* Pronunciation check hint */}
        {!flipped && (
          <p style={{ textAlign:'center', fontSize:12, color:'#606068', marginTop:12 }}>
            Дуудлага шалгахыг хүсвэл{' '}
            <button onClick={() => setPage('speaking')}
              style={{ color:'#C8952A', fontWeight:700, background:'none', border:'none', cursor:'pointer' }}>
              Алгасах
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
export default FlashcardPage;
