import React, { useEffect, useMemo, useState } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getA0MemoryTarget } from '../../data/a0MemoryPlan';
import { usePhraseMemoryStore } from '../../stores/usePhraseMemoryStore';
import { speakCzech } from '../audio/czechSpeech';

type Feedback = 'correct' | 'wrong' | null;

interface A0CarryoverReviewProps {
  lessonId: string;
  onComplete: () => void;
}

function stableShuffle<T>(items: T[], seedText: string): T[] {
  let seed = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) {
    seed = Math.imul(seed ^ seedText.charCodeAt(index), 16777619);
  }
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 2246822507) >>> 0;
    const swapIndex = seed % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

const A0CarryoverReview: React.FC<A0CarryoverReviewProps> = ({ lessonId, onComplete }) => {
  const recordAttempt = usePhraseMemoryStore((state) => state.recordAttempt);
  const [targetIds] = useState(() => usePhraseMemoryStore.getState().getCarryoverTargetIds(lessonId));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const targets = useMemo(
    () => targetIds.map(getA0MemoryTarget).filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [targetIds],
  );
  const target = targets[index];
  const choices = useMemo(
    () => target ? stableShuffle(targets, `${target.id}-carryover`) : [],
    [target, targets],
  );

  useEffect(() => {
    if (targets.length === 0) onComplete();
  }, [onComplete, targets.length]);

  if (!target || targets.length === 0) return null;

  const choose = (id: string) => {
    if (feedback === 'correct') return;
    const picked = targets.find((item) => item.id === id);
    if (!picked) return;

    speakCzech(picked.czech);
    const correct = id === target.id;
    setPickedId(id);
    setFeedback(correct ? 'correct' : 'wrong');
    recordAttempt(target.id, correct);
  };

  const continueReview = () => {
    if (index >= targets.length - 1) {
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setPickedId(null);
    setFeedback(null);
  };

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', padding: 'max(20px, env(safe-area-inset-top)) 18px 30px' }}>
      <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '78dvh', display: 'flex', alignItems: 'center' }}>
        <motion.div key={target.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 24, padding: 21 }}>
          <div style={{ width: 46, height: 46, borderRadius: 23, display: 'grid', placeItems: 'center', background: 'rgba(200,149,42,.15)', border: '1px solid rgba(200,149,42,.42)', marginBottom: 12 }}><Volume2 size={23} color="#F5C842" /></div>
          <p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 900 }}>ӨМНӨХ ХИЧЭЭЛИЙН СЭРГЭЭЛТ · {index + 1}/{targets.length}</p>
          <h1 style={{ margin: '8px 0 8px', fontSize: 24, lineHeight: 1.24 }}>Энэ утгыг Чехээр хэрхэн хэлэх вэ?</h1>
          <p style={{ margin: '0 0 18px', color: '#A0A0A8', lineHeight: 1.45 }}>Өмнө сурсан гол хэллэгийг шинэ хичээл эхлэхээс өмнө сэргээж байна.</p>
          <div style={{ borderRadius: 16, background: '#141416', border: '1px solid #303036', padding: '18px 15px', marginBottom: 14 }}><p style={{ margin: 0, textAlign: 'center', color: '#FFF', fontSize: 21, fontWeight: 800 }}>{target.mongolian}</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {choices.map((item) => {
              const selected = pickedId === item.id;
              const right = feedback === 'correct' && item.id === target.id;
              const wrong = feedback === 'wrong' && selected;
              return <button key={item.id} onClick={() => choose(item.id)} disabled={feedback === 'correct'} style={{ textAlign: 'left', padding: '13px 14px', borderRadius: 14, color: '#FFF', background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: right ? '1px solid rgba(34,197,94,.65)' : wrong ? '1px solid rgba(239,68,68,.65)' : '1px solid #34343A', cursor: feedback === 'correct' ? 'default' : 'pointer', fontSize: 16 }}>{item.czech}</button>;
            })}
          </div>
          {feedback === 'correct' && <><div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14, color: '#4ADE80', fontWeight: 800, fontSize: 13 }}><Check size={17} /> Зөв. Энэ хэллэг дараагийн давталтад орлоо.</div><button onClick={continueReview} className="btn-gold" style={{ width: '100%', marginTop: 15, padding: 14 }}>{index >= targets.length - 1 ? 'Шинэ хичээлээ эхлэх' : 'Үргэлжлүүлэх'}</button></>}
          {feedback === 'wrong' && <p style={{ margin: '14px 0 0', color: '#F87171', fontSize: 13, fontWeight: 800 }}>Буруу. Дууг нь сонсчихлоо — дахин сонгоорой.</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default A0CarryoverReview;
