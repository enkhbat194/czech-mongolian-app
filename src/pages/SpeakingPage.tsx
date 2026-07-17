import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Mic, RefreshCw, RotateCcw, Volume2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { speakCzech } from '../components/audio/czechSpeech';
import { XPToast } from '../components/UI/SharedComponents';
import PracticeEmptyState from '../components/practice/PracticeEmptyState';
import { useAppStore } from '../stores/useAppStore';
import {
  getA0PhraseIpa,
  getA0SpeakingPool,
  personalizeA0PracticeTarget,
  pickIntroducedPracticeTargets,
} from '../data/a0PracticePools';
import {
  appendSinglePracticeRetry,
  claimPracticeKey,
  createPracticeSessionSeed,
} from '../utils/practiceSession';

const SESSION_PHRASE_COUNT = 8;

interface SpeakingPhrase {
  id: string;
  czech: string;
  mongolian: string;
  ipa: string;
}

function makeSessionPhrases(
  introducedWords: readonly string[],
  genderForm: 'male' | 'female' | 'neutral',
  userName: string,
  sessionSeed: string,
): SpeakingPhrase[] {
  return pickIntroducedPracticeTargets(
    getA0SpeakingPool(genderForm, userName),
    introducedWords,
    SESSION_PHRASE_COUNT,
    `${sessionSeed}:targets`,
  ).map((target) => {
    const personalized = personalizeA0PracticeTarget(target, userName);
    return {
      id: target.id,
      czech: personalized.czech,
      mongolian: personalized.mongolian,
      ipa: getA0PhraseIpa(target.czech),
    };
  });
}

type Phase = 'listen' | 'selfReview' | 'result';
type Result = 'said' | 'again' | null;

const SpeakingPage: React.FC = () => {
  const { addXP, setPage, progress, genderForm, userName } = useAppStore();
  const [sessionSeed, setSessionSeed] = useState(() => createPracticeSessionSeed('speaking'));
  const basePhrases = useMemo(
    () => makeSessionPhrases(progress.introducedWords, genderForm, userName, sessionSeed),
    [genderForm, progress.introducedWords, sessionSeed, userName],
  );
  const [phrases, setPhrases] = useState<SpeakingPhrase[]>(basePhrases);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('listen');
  const [result, setResult] = useState<Result>(null);
  const [showXP, setShowXP] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const originalCountRef = useRef(basePhrases.length);
  const retryQueuedRef = useRef(new Set<string>());
  const rewardedRef = useRef(new Set<string>());
  const masteredRef = useRef(new Set<string>());
  const phrase = phrases[index];

  useEffect(() => {
    setPhrases(basePhrases);
    setIndex(0);
    setPhase('listen');
    setResult(null);
    setShowXP(false);
    setScore(0);
    setFinished(false);
    originalCountRef.current = basePhrases.length;
    retryQueuedRef.current.clear();
    rewardedRef.current.clear();
    masteredRef.current.clear();
  }, [basePhrases]);

  if (!phrase) {
    return (
      <PracticeEmptyState
        icon="🗣️"
        onBack={() => setPage('practice')}
        onGoToLessons={() => setPage('path')}
        description="Ярих дасгалд зөвхөн өмнө нь үзсэн, өөрөө хэлэх Чех хэллэгүүд орно."
      />
    );
  }

  const listen = () => speakCzech(phrase.czech, { rate: 0.78 });

  const markPractice = (saidIt: boolean) => {
    if (phase !== 'selfReview') return;
    setResult(saidIt ? 'said' : 'again');
    setPhase('result');

    if (saidIt) {
      if (claimPracticeKey(masteredRef.current, phrase.id)) setScore((value) => value + 1);
      if (claimPracticeKey(rewardedRef.current, phrase.id)) {
        addXP(4);
        setShowXP(true);
        window.setTimeout(() => setShowXP(false), 1100);
      }
      return;
    }

    setPhrases((current) => appendSinglePracticeRetry(current, phrase, retryQueuedRef.current));
  };

  const retry = () => {
    setResult(null);
    setPhase('listen');
  };

  const next = () => {
    if (index >= phrases.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setResult(null);
    setPhase('listen');
  };

  const restart = () => setSessionSeed(createPracticeSessionSeed('speaking'));

  if (finished) {
    const originalCount = originalCountRef.current;
    const retryCount = Math.max(0, phrases.length - originalCount);
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
        <section style={{ width: '100%', maxWidth: 430, padding: 28, textAlign: 'center', borderRadius: 24, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
          <div style={{ fontSize: 52 }}>{score === originalCount ? '🏆' : '👍'}</div>
          <h1 style={{ fontSize: 24 }}>Дасгал дууслаа</h1>
          <p style={{ color: '#A0A0A8' }}>{score} / {originalCount} хэллэгийг дагаж хэлсэн</p>
          {retryCount > 0 && <p style={{ color: '#606068', fontSize: 13 }}>Эргэлзсэн {retryCount} хэллэгийг төгсгөлд нэг удаа давтлаа.</p>}
          <button className="btn-gold" onClick={restart} style={{ width: '100%', padding: 15, marginBottom: 10 }}><RotateCcw size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Шинэ дасгал эхлэх</button>
          <button className="btn-outline" onClick={() => setPage('practice')} style={{ width: '100%', padding: 15 }}>Буцах</button>
        </section>
      </div>
    );
  }

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif', color: '#FFF' }}>
      <header style={{ background: '#141416', padding: '16px 20px 14px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button onClick={() => setPage('practice')} style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 'none', color: '#A0A0A8' }}><ChevronLeft size={18} /></button>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, flex: 1 }}>🗣️ Ярих дасгал</h1>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#C8952A' }}>{index + 1}/{phrases.length}</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>{phrases.map((item, itemIndex) => <div key={`${item.id}-${itemIndex}`} style={{ height: 4, flex: 1, borderRadius: 2, background: itemIndex <= index ? '#C8952A' : '#2A2A2F' }} />)}</div>
      </header>

      <main style={{ padding: 16, display: 'grid', gap: 14 }}>
        <AnimatePresence>{showXP && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} style={{ display: 'flex', justifyContent: 'center' }}><XPToast xp={4} /></motion.div>}</AnimatePresence>

        <motion.section key={`${index}:${phrase.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#1C1C1F', borderRadius: 24, padding: 28, textAlign: 'center', border: '1px solid #2A2A2F' }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#A0A0A8' }}>Чех хэллэгийг сонсоод дагаж хэлнэ.</p>
          <h2 style={{ margin: 0, fontSize: 31, fontWeight: 900 }}>{phrase.czech}</h2>
          {phrase.ipa && <p style={{ margin: '7px 0 4px', fontFamily: 'monospace', color: '#C8952A' }}>{phrase.ipa}</p>}
          <p style={{ margin: 0, color: '#A0A0A8' }}>({phrase.mongolian})</p>
          <button onClick={listen} style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 99, background: 'rgba(200,149,42,.12)', border: '1px solid rgba(200,149,42,.3)', color: '#C8952A' }}><Volume2 size={15} /> Жишээ сонсох</button>
        </motion.section>

        {phase === 'listen' && <section style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F', textAlign: 'center' }}><div style={{ width: 74, height: 74, margin: '0 auto 14px', borderRadius: 37, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#C8952A,#F5C842)' }}><Mic size={30} color="#000" /></div><p style={{ margin: '0 0 16px', color: '#A0A0A8', fontSize: 14, lineHeight: 1.5 }}>Жишээг сонсоод, өөрөө чангаар давтаж хэлнэ үү. Одоохондоо app таны дууг автоматаар оношлохгүй.</p><button onClick={() => setPhase('selfReview')} className="btn-gold" style={{ width: '100%', padding: 15 }}>Би дагаж хэллээ</button></section>}

        {phase === 'selfReview' && <section style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F' }}><p style={{ margin: '0 0 14px', textAlign: 'center', color: '#A0A0A8', fontSize: 14 }}>Дууг нь сонсоод өөрөө давтаж хэлсэн эсэхээ тэмдэглэ. Энэ нь автомат дуудлага шалгалт биш.</p><button onClick={() => markPractice(true)} className="btn-gold" style={{ width: '100%', padding: 15, marginBottom: 10 }}><Check size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />Дагаж хэлсэн</button><button onClick={() => markPractice(false)} className="btn-outline" style={{ width: '100%', padding: 15 }}><RefreshCw size={17} style={{ verticalAlign: 'middle', marginRight: 6 }} />Дахин сонсъё</button></section>}

        {phase === 'result' && <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#1C1C1F', borderRadius: 22, padding: 20, border: '1px solid #2A2A2F' }}><div style={{ textAlign: 'center', padding: 14, borderRadius: 16, background: result === 'said' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border: `1px solid ${result === 'said' ? 'rgba(34,197,94,.45)' : 'rgba(239,68,68,.45)'}` }}>{result === 'said' ? <Check size={36} color="#22C55E" /> : <X size={36} color="#EF4444" />}<h2 style={{ margin: '8px 0 0', color: result === 'said' ? '#4ADE80' : '#F87171', fontSize: 19 }}>{result === 'said' ? 'Дагаж хэлсэн гэж тэмдэглэлээ.' : 'Энэ хэллэгийг төгсгөлд дахин давтана.'}</h2></div><div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button onClick={retry} className="btn-outline" style={{ flex: 1, padding: 13 }}><RefreshCw size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />Одоо дахин</button><button onClick={next} className="btn-gold" style={{ flex: 1.4, padding: 13 }}>{index < phrases.length - 1 ? <><span>Дараах</span> <ChevronRight size={15} style={{ verticalAlign: 'middle' }} /></> : 'Дуусгах'}</button></div></motion.section>}

        <section style={{ background: '#1C1C1F', borderRadius: 18, padding: 16, border: '1px solid #2A2A2F' }}><p style={{ margin: '0 0 7px', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>ЗӨВЛӨГӨӨ</p><p style={{ margin: 0, color: '#A0A0A8', fontSize: 13, lineHeight: 1.6 }}>Эхлээд аудиог сонсоно. Дараа нь үг бүрийг аажим, тодорхой давтаж хэлнэ. Жинхэнэ автомат дуудлага шалгалтыг Azure Speech-to-Text шатанд тусад нь холбоно.</p></section>
      </main>
    </div>
  );
};

export default SpeakingPage;
