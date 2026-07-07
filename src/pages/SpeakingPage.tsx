import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Mic, RefreshCw, Volume2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { speakCzech } from '../components/audio/czechSpeech';
import { XPToast } from '../components/UI/SharedComponents';
import { useAppStore } from '../stores/useAppStore';

const PHRASES = [
  { id: 'p1', czech: 'Jak se máš?', mongolian: 'Яаж байна?', ipa: '[jak se maːʃ]' },
  { id: 'p2', czech: 'Děkuji moc.', mongolian: 'Их баярлалаа.', ipa: '[dɛku-ji mots]' },
  { id: 'p3', czech: 'Dobrý den.', mongolian: 'Сайн байна уу.', ipa: '[dob-riː den]' },
  { id: 'p4', czech: 'Na shledanou.', mongolian: 'Баяртай.', ipa: '[na sxle-da-nou]' },
  { id: 'p5', czech: 'Mluvíte česky?', mongolian: 'Та чехээр ярьдаг уу?', ipa: '[mlu-viː-te tʃeski]' },
  { id: 'p6', czech: 'Promiňte, nerozumím.', mongolian: 'Ойлгохгүй байна.', ipa: '[pro-miɲ-te]' },
  { id: 'p7', czech: 'Kde je záchod?', mongolian: 'Жорлон хаана байна?', ipa: '[kde je zaː-xod]' },
  { id: 'p8', czech: 'Jsem z Mongolska.', mongolian: 'Монголоос ирсэн.', ipa: '[jsem z moŋgol-ska]' },
];

type Phase = 'listen' | 'selfReview' | 'result';
type Result = 'good' | 'again' | null;

const SpeakingPage: React.FC = () => {
  const { addXP, setPage } = useAppStore();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('listen');
  const [result, setResult] = useState<Result>(null);
  const [showXP, setShowXP] = useState(false);
  const phrase = PHRASES[index];

  const listen = () => speakCzech(phrase.czech, { rate: 0.78 });

  const assess = (didWell: boolean) => {
    setResult(didWell ? 'good' : 'again');
    setPhase('result');
    if (didWell) {
      addXP(20);
      setShowXP(true);
      window.setTimeout(() => setShowXP(false), 1100);
    }
  };

  const retry = () => {
    setResult(null);
    setPhase('listen');
  };

  const next = () => {
    if (index >= PHRASES.length - 1) {
      setPage('practice');
      return;
    }
    setIndex((value) => value + 1);
    setResult(null);
    setPhase('listen');
  };

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif', color: '#FFF' }}>
      <header style={{ background: '#141416', padding: '16px 20px 14px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={() => setPage('practice')} style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 'none', color: '#A0A0A8' }}><ChevronLeft size={18} /></button>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, flex: 1 }}>🗣️ Ярих дасгал</h1>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#C8952A' }}>{index + 1}/{PHRASES.length}</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>{PHRASES.map((_, itemIndex) => <div key={itemIndex} style={{ height: 4, flex: 1, borderRadius: 2, background: itemIndex <= index ? '#C8952A' : '#2A2A2F' }} />)}</div>
      </header>

      <main style={{ padding: 16, display: 'grid', gap: 14 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={20} /></motion.div>}</AnimatePresence>

        <motion.section key={phrase.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#1C1C1F', borderRadius: 24, padding: 28, textAlign: 'center', border: '1px solid #2A2A2F' }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#A0A0A8' }}>Дараах хэллэгийг чангаар хэлж үзнэ үү.</p>
          <h2 style={{ margin: 0, fontSize: 31, fontWeight: 900 }}>{phrase.czech}</h2>
          <p style={{ margin: '7px 0 4px', fontFamily: 'monospace', color: '#C8952A' }}>{phrase.ipa}</p>
          <p style={{ margin: 0, color: '#A0A0A8' }}>({phrase.mongolian})</p>
          <button onClick={listen} style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 99, background: 'rgba(200,149,42,.12)', border: '1px solid rgba(200,149,42,.3)', color: '#C8952A' }}><Volume2 size={15} /> Жишээ сонсох</button>
        </motion.section>

        {phase === 'listen' && <section style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F', textAlign: 'center' }}><div style={{ width: 74, height: 74, margin: '0 auto 14px', borderRadius: 37, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#C8952A,#F5C842)' }}><Mic size={30} color="#000" /></div><p style={{ margin: '0 0 16px', color: '#A0A0A8', fontSize: 14, lineHeight: 1.5 }}>Жишээг сонсоод, өөрөө чангаар давтаж хэлнэ үү.</p><button onClick={() => setPhase('selfReview')} className="btn-gold" style={{ width: '100%', padding: 15 }}>Давтаж хэллээ</button></section>}

        {phase === 'selfReview' && <section style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F' }}><p style={{ margin: '0 0 14px', textAlign: 'center', color: '#A0A0A8', fontSize: 14 }}>Одоогийн хувилбар дуу хоолойг автоматаар оношлохгүй. Өөрийгөө шударгаар үнэлнэ үү.</p><button onClick={() => assess(true)} className="btn-gold" style={{ width: '100%', padding: 15, marginBottom: 10 }}><Check size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />Сайн хэлж чадсан</button><button onClick={() => assess(false)} className="btn-outline" style={{ width: '100%', padding: 15 }}><RefreshCw size={17} style={{ verticalAlign: 'middle', marginRight: 6 }} />Дахин давтана</button></section>}

        {phase === 'result' && <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F' }}><div style={{ textAlign: 'center', padding: 14, borderRadius: 16, background: result === 'good' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: `1px solid ${result === 'good' ? 'rgba(34,197,94,.45)' : 'rgba(239,68,68,.45)'}` }}>{result === 'good' ? <Check size={36} color="#22C55E" /> : <X size={36} color="#EF4444" />}<h2 style={{ margin: '8px 0 0', color: result === 'good' ? '#4ADE80' : '#F87171', fontSize: 19 }}>{result === 'good' ? 'Сайн байна.' : 'Дахин сонсож, аажим хэлээрэй.'}</h2></div><div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button onClick={retry} className="btn-outline" style={{ flex: 1, padding: 13 }}><RefreshCw size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />Дахин</button><button onClick={next} className="btn-gold" style={{ flex: 1.4, padding: 13 }}>{index < PHRASES.length - 1 ? <><span>Дараах</span> <ChevronRight size={15} style={{ verticalAlign: 'middle' }} /></> : 'Дуусгах'}</button></div></motion.section>}

        <section style={{ background: '#1C1C1F', borderRadius: 18, padding: 16, border: '1px solid #2A2A2F' }}><p style={{ margin: '0 0 7px', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>ЗӨВЛӨГӨӨ</p><p style={{ margin: 0, color: '#A0A0A8', fontSize: 13, lineHeight: 1.6 }}>Эхлээд аудиог сонсоно. Дараа нь үг бүрийг аажим, тодорхой давтаж хэлнэ. Жинхэнэ автомат дуудлага шалгалтыг Azure Speech-to-Text шатанд тусад нь холбоно.</p></section>
      </main>
    </div>
  );
};

export default SpeakingPage;
