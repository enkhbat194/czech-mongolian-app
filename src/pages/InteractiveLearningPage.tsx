import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, Mic, Volume2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { speakCzech } from '../components/audio/czechSpeech';
import { ProgressBar, XPToast } from '../components/UI/SharedComponents';
import { useAppStore } from '../stores/useAppStore';
import { isSrsEligiblePracticeTarget } from '../stores/usePhraseMemoryStore';

type Feedback = 'good' | 'again' | null;

const InteractiveLearningPage: React.FC = () => {
  const { words, addXP, setPage, updateSRSCard } = useAppStore();
  const [cards] = useState(() => [...words].sort(() => Math.random() - 0.5).slice(0, 10));
  const [index, setIndex] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showXP, setShowXP] = useState(false);
  const [finished, setFinished] = useState(false);
  const card = cards[index];

  useEffect(() => {
    setHasListened(false);
    setReviewMode(false);
    setFeedback(null);
  }, [index]);

  if (!card) return null;

  const playAudio = () => {
    speakCzech(card.czech, { rate: 0.8, onFinished: () => setHasListened(true) });
    setHasListened(true);
  };

  const assess = (didWell: boolean) => {
    setFeedback(didWell ? 'good' : 'again');
    setReviewMode(false);
    if (didWell) {
      addXP(20);
      setShowXP(true);
      window.setTimeout(() => setShowXP(false), 1200);
      if (isSrsEligiblePracticeTarget(card.id)) updateSRSCard(card.id, 5);
    } else {
      if (isSrsEligiblePracticeTarget(card.id)) updateSRSCard(card.id, 1);
    }
  };

  const next = () => {
    if (index >= cards.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
  };

  const skip = () => {
    if (isSrsEligiblePracticeTarget(card.id)) updateSRSCard(card.id, 4);
    next();
  };

  if (finished) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}><section style={{ width: '100%', maxWidth: 430, padding: 28, borderRadius: 24, textAlign: 'center', background: '#1C1C1F', border: '1px solid #2A2A2F' }}><div style={{ fontSize: 52 }}>🎉</div><h1 style={{ fontSize: 24 }}>Дасгал дууслаа</h1><p style={{ color: '#A0A0A8' }}>Та шинэ үгнүүдтэйгээ танилцлаа.</p><button className="btn-gold" onClick={() => setPage('practice')} style={{ width: '100%', padding: 15 }}>Буцах</button></section></div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif', overflow: 'hidden' }}>
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => setPage('practice')} style={{ border: 0, background: 'transparent', color: '#C8952A' }}><ChevronLeft size={24} /></button>
        <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: 800 }}>Шинэ үг үзэх</p><ProgressBar value={index} max={cards.length} height={5} /></div>
        <span style={{ color: '#A0A0A8', fontSize: 13 }}>{index + 1}/{cards.length}</span>
      </header>
      <main style={{ maxWidth: 430, margin: '0 auto', padding: 20 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={20} /></motion.div>}</AnimatePresence>
        <motion.section key={card.id} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} style={{ minHeight: '76dvh', padding: 22, borderRadius: 24, display: 'flex', flexDirection: 'column', background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <h1 style={{ margin: 0, fontSize: 38 }}>{card.czech}</h1>
            <p style={{ color: '#C8952A', fontFamily: 'monospace' }}>{card.ipa}</p>
            <div style={{ display: 'inline-block', padding: '14px 20px', borderRadius: 16, background: '#141416', border: '1px solid #303036' }}><p style={{ margin: 0, fontSize: 18 }}>{card.mongolian}</p></div>
          </div>
          <div style={{ marginTop: 'auto', display: 'grid', gap: 12 }}>
            {feedback ? <>
              <div style={{ padding: 18, textAlign: 'center', borderRadius: 16, background: feedback === 'good' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: `1px solid ${feedback === 'good' ? 'rgba(34,197,94,.5)' : 'rgba(239,68,68,.5)'}` }}>{feedback === 'good' ? <Check size={34} color="#22C55E" /> : <X size={34} color="#EF4444" />}<h2 style={{ margin: '8px 0 0', fontSize: 18, color: feedback === 'good' ? '#4ADE80' : '#F87171' }}>{feedback === 'good' ? 'Сайн байна.' : 'Дахин сонсоод давтаарай.'}</h2></div>
              <button className="btn-gold" onClick={next} style={{ width: '100%', padding: 15 }}>{index === cards.length - 1 ? 'Дуусгах' : 'Дараах'}</button>
            </> : reviewMode ? <>
              <div style={{ padding: 16, borderRadius: 16, background: '#141416', border: '1px solid #303036', textAlign: 'center' }}><Mic size={26} color="#C8952A" /><p style={{ margin: '8px 0 0', fontSize: 14, color: '#A0A0A8' }}>Хэллэгийг өөрөө чангаар хэлээд, дараа нь өөрийгөө үнэлнэ үү.</p></div>
              <button onClick={() => assess(true)} className="btn-gold" style={{ width: '100%', padding: 15 }}>Сайн хэлж чадсан</button>
              <button onClick={() => assess(false)} className="btn-outline" style={{ width: '100%', padding: 15 }}>Дахин давтана</button>
            </> : <>
              <button onClick={playAudio} className="btn-gold" style={{ width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><Volume2 size={23} />{hasListened ? 'Дахин сонсох' : 'Сонсох'}</button>
              {hasListened && <button onClick={() => setReviewMode(true)} className="btn-outline" style={{ width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><Mic size={23} />Чангаар давтаж хэлэх</button>}
              {hasListened && <button onClick={skip} style={{ border: 0, background: 'transparent', color: '#A0A0A8', padding: 8 }}>Алгасах</button>}
            </>}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default InteractiveLearningPage;
