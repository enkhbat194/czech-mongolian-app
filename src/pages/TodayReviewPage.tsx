import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, RotateCcw, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { a0MemoryTargets, getA0MemoryTarget } from '../data/a0MemoryPlan';
import { getA0ConfusionChoices } from '../data/a0ConfusionPairs';
import { useAppStore } from '../stores/useAppStore';
import { getMasteryTier, usePhraseMemoryStore, type MasteryTier } from '../stores/usePhraseMemoryStore';
import { speakCzech } from '../components/audio/czechSpeech';
import { stableShuffle } from '../utils/stableShuffle';

type Feedback = 'correct' | 'wrong' | null;
type ReviewMode = 'recognition' | 'reverse' | 'listening';

const MAX_REPAIRS_PER_TARGET = 2;
const REPAIR_GAP_CARDS = 2;

function getReviewMode(tier: MasteryTier): ReviewMode {
  if (tier === 'FAMILIAR') return 'reverse';
  if (tier === 'STRONG' || tier === 'MASTERED') return 'listening';
  return 'recognition';
}

const reviewPanel: React.CSSProperties = {
  background: '#1C1C1F',
  border: '1px solid #2A2A2F',
  borderRadius: 24,
  padding: 20,
};

const TodayReviewPage: React.FC = () => {
  const setPage = useAppStore((state) => state.setPage);
  const addXP = useAppStore((state) => state.addXP);
  const addMinutes = useAppStore((state) => state.addMinutes);
  const updateStreak = useAppStore((state) => state.updateStreak);
  const phrases = usePhraseMemoryStore((state) => state.phrases);
  const recordAttempt = usePhraseMemoryStore((state) => state.recordAttempt);

  const [targetIds] = useState(() => usePhraseMemoryStore.getState().getTodayReviewTargetIds());
  // Session-scoped seed: choice order is stable within one session but differs
  // across sessions, so learners cannot memorize the answer position.
  const [sessionSeed] = useState(() => `${Date.now()}-${Math.random()}`);
  const [queueIds, setQueueIds] = useState<string[]>(() => targetIds);
  const [repairCounts, setRepairCounts] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState<ReviewMode>('recognition');

  const targets = useMemo(
    () => targetIds.map(getA0MemoryTarget).filter((target): target is NonNullable<typeof target> => Boolean(target)),
    [targetIds],
  );
  const currentId = queueIds[index];
  const current = currentId ? getA0MemoryTarget(currentId) : undefined;

  useEffect(() => {
    setMode(currentId ? getReviewMode(getMasteryTier(usePhraseMemoryStore.getState().phrases[currentId])) : 'recognition');
  }, [currentId]);

  useEffect(() => {
    if (mode === 'listening' && current && feedback === null) speakCzech(current.czech, { rate: 0.85 });
  }, [mode, current, feedback]);

  const activePool = useMemo(
    () => current
      ? a0MemoryTargets.filter((target) => target.priority === 'active' && target.lessonId <= current.lessonId && target.id !== current.id)
      : [],
    [current],
  );
  const choices = useMemo(() => {
    if (!current) return [];
    const merged = [current];
    const seen = new Set([current.id]);
    const filler = stableShuffle(activePool, `${sessionSeed}:${current.id}-today-options`);
    for (const item of [...getA0ConfusionChoices(current, activePool, 3), ...filler]) {
      if (merged.length >= 4) break;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      merged.push(item);
    }
    return stableShuffle(merged, `${sessionSeed}:${current.id}-today-final`);
  }, [current, activePool, sessionSeed]);

  const finish = () => {
    addXP(targets.length * 4);
    addMinutes(Math.max(1, Math.ceil(targets.length / 2)));
    updateStreak();
    setFinished(true);
  };

  const choose = (targetId: string) => {
    if (!current || feedback !== null) return;
    const correct = targetId === current.id;
    const chosen = a0MemoryTargets.find((target) => target.id === targetId);
    if (chosen && mode !== 'listening') speakCzech(chosen.czech);

    recordAttempt(current.id, correct, correct ? undefined : { mistakeType: 'confusion', confusedWith: targetId });
    setPickedId(targetId);
    setFeedback(correct ? 'correct' : 'wrong');

    if (!correct) {
      const missedId = current.id;
      const used = repairCounts[missedId] ?? 0;
      if (used < MAX_REPAIRS_PER_TARGET) {
        setRepairCounts((counts) => ({ ...counts, [missedId]: used + 1 }));
        setQueueIds((ids) => {
          const insertAt = Math.min(ids.length, index + REPAIR_GAP_CARDS + 1);
          const next = [...ids];
          next.splice(insertAt, 0, missedId);
          return next;
        });
      }
    }
  };

  const continueReview = () => {
    if (index >= queueIds.length - 1) {
      finish();
      return;
    }
    setIndex((value) => value + 1);
    setPickedId(null);
    setFeedback(null);
  };

  if (finished) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', padding: 20 }}>
        <motion.div initial={{ opacity: 0, scale: 0.88, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }} style={{ ...reviewPanel, width: '100%', maxWidth: 430, margin: '0 auto', textAlign: 'center' }}>
          <motion.div animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }} transition={{ duration: 1.1 }} style={{ fontSize: 58, marginBottom: 8 }}>🧠</motion.div>
          <p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>ӨНӨӨДРИЙН ДАВТАЛТ</p>
          <h1 style={{ margin: '8px 0', fontSize: 25 }}>Сэргээн саналаа</h1>
          <p style={{ margin: '0 0 18px', color: '#A0A0A8', lineHeight: 1.5 }}>{targets.length} гол хэллэгийг сэргээж, дараагийн давталтын хугацааг шинэчиллээ.</p>
          <div style={{ ...reviewPanel, textAlign: 'left', padding: 14, marginBottom: 16, background: '#17171A' }}>
            {targets.map((target) => <p key={target.id} style={{ margin: '7px 0', fontSize: 14 }}>✓ {target.czech}<span style={{ color: '#A0A0A8' }}> — {target.mongolian}</span></p>)}
          </div>
          <button onClick={() => setPage('home')} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 15 }}>Нүүр хуудас руу буцах</button>
        </motion.div>
      </div>
    );
  }

  if (!current || targets.length === 0) {
    const introducedCount = Object.values(phrases).filter((memory) => memory.exposures > 0).length;
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', padding: 20 }}>
        <div style={{ ...reviewPanel, width: '100%', maxWidth: 430, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🌙</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 23 }}>Одоохондоо давтах хэллэг алга</h1>
          <p style={{ margin: '0 0 20px', color: '#A0A0A8', lineHeight: 1.5 }}>{introducedCount === 0 ? 'Эхлээд нэг микро хэсэг үз. Гол хэллэгүүд маргааш давталтад орно.' : 'Таны хэллэгүүдийн дараагийн давталтын хугацаа болоогүй байна.'}</p>
          <button onClick={() => setPage('home')} className="btn-gold" style={{ width: '100%', padding: 14 }}>Нүүр хуудас руу буцах</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ background: '#141416', padding: 'max(16px, env(safe-area-inset-top)) 20px 13px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPage('home')} style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: '#242428', color: '#A0A0A8', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <div style={{ flex: 1 }}><p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 800 }}>ӨНӨӨДӨР ДАВТАХ</p><h1 style={{ margin: '2px 0 0', fontSize: 18 }}>Гол хэллэгээ сэргээ</h1></div>
          <span style={{ color: '#C8952A', fontWeight: 800, fontSize: 13 }}>{index + 1}/{queueIds.length}</span>
        </div>
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '20px 16px 30px' }}>
        <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} style={reviewPanel}>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: 'rgba(200,149,42,.15)', border: '1px solid rgba(200,149,42,.35)', display: 'grid', placeItems: 'center', marginBottom: 14 }}><Volume2 size={23} color="#F5C842" /></div>
          <p style={{ margin: '0 0 8px', color: '#A0A0A8', fontSize: 12 }}>
            {mode === 'recognition' && 'Монгол утгаас нь Чех хэллэгийг сэргээнэ.'}
            {mode === 'reverse' && 'Чех хэллэгийн утгыг Монголоор сонгоно.'}
            {mode === 'listening' && 'Сонсоод аль хэллэг байсныг сонгоно.'}
          </p>
          <div style={{ background: '#141416', border: '1px solid #303036', borderRadius: 16, padding: '20px 14px', marginBottom: 16 }}>
            {mode === 'listening'
              ? <button onClick={() => speakCzech(current.czech, { rate: 0.85 })} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto', padding: '10px 18px', borderRadius: 99, background: 'rgba(200,149,42,.14)', border: '1px solid rgba(200,149,42,.4)', color: '#F5C842', cursor: 'pointer', fontSize: 15, fontWeight: 800 }}><Volume2 size={19} /> Дахин сонсох</button>
              : <p style={{ margin: 0, textAlign: 'center', fontSize: 22, fontWeight: 900, lineHeight: 1.3 }}>{mode === 'reverse' ? current.czech : current.mongolian}</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {choices.map((item) => {
              const selected = pickedId === item.id;
              const right = feedback !== null && item.id === current.id;
              const wrong = feedback === 'wrong' && selected;
              return <button key={item.id} onClick={() => choose(item.id)} disabled={feedback !== null} style={{ textAlign: 'left', padding: '13px 14px', borderRadius: 14, color: '#FFF', background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: right ? '1px solid rgba(34,197,94,.65)' : wrong ? '1px solid rgba(239,68,68,.65)' : '1px solid #34343A', cursor: feedback !== null ? 'default' : 'pointer', fontSize: 16 }}>{mode === 'reverse' ? item.mongolian : item.czech}</button>;
            })}
          </div>

          {feedback === 'wrong' && <><div style={{ marginTop: 14, color: '#F87171', fontSize: 13, fontWeight: 800 }}>Буруу. Зөв нь: {current.czech} — {current.mongolian}. Энэ хэллэг удахгүй дахин гарна.</div><button onClick={continueReview} className="btn-gold" style={{ width: '100%', marginTop: 15, padding: 14, fontSize: 15 }}>{index >= queueIds.length - 1 ? 'Дуусгах' : 'Үргэлжлүүлэх'}</button></>}
          {feedback === 'correct' && <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, color: '#4ADE80', fontWeight: 800, fontSize: 13 }}><Check size={17} /> Зөв. Энэ хэллэгийн дараагийн давталт хойшиллоо.</div><button onClick={continueReview} className="btn-gold" style={{ width: '100%', marginTop: 15, padding: 14, fontSize: 15 }}>{index >= queueIds.length - 1 ? 'Дуусгах' : 'Үргэлжлүүлэх'}</button></>}
        </motion.div>
        <button onClick={() => setPage('home')} style={{ display: 'block', margin: '15px auto 0', border: 0, background: 'transparent', color: '#A0A0A8', cursor: 'pointer', fontSize: 13 }}><RotateCcw size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} /> Дараа үргэлжлүүлэх</button>
      </main>
    </div>
  );
};

export default TodayReviewPage;
