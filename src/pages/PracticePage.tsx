import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { usePhraseMemoryStore } from '../stores/usePhraseMemoryStore';

const PracticePage: React.FC = () => {
  const { setPage, setCurrentLesson, lessons, progress } = useAppStore();
  const phrases = usePhraseMemoryStore((state) => state.phrases);
  const firstLesson = lessons.find((lesson) => !lesson.isLocked);
  const duePhraseIds = useMemo(() => usePhraseMemoryStore.getState().getTodayReviewTargetIds(5), [phrases]);
  const introducedWords = progress.introducedWords || progress.learnedWords || [];

  const options = [
    { icon: '🌟', label: 'Шинэ үг үзэх', sub: 'Дэлгэрэнгүй танилцах', color: 'rgba(234,179,8,.15)', accent: '#EAB308', action: () => setPage('interactiveLearning') },
    { icon: '🃏', label: 'Флашкард', sub: 'Үг цээжлэх', color: 'rgba(200,149,42,.15)', accent: '#C8952A', action: () => { if (firstLesson) setCurrentLesson(firstLesson.id); setPage('flashcard'); } },
    { icon: '📝', label: 'Үг сонгох', sub: 'Чех → Монгол', color: 'rgba(56,189,248,.1)', accent: '#38BDF8', action: () => setPage('wordQuiz') },
    { icon: '🔄', label: 'Урвуу сонгох', sub: 'Монгол → Чех', color: 'rgba(168,85,247,.1)', accent: '#A855F7', action: () => setPage('reverseQuiz') },
    { icon: '✍️', label: 'Бичих дасгал', sub: 'Зөв бичих', color: 'rgba(245,158,11,.1)', accent: '#F59E0B', action: () => setPage('writing') },
    { icon: '🎧', label: 'Сонсоод бичих', sub: 'Чээж бичиг', color: 'rgba(236,72,153,.1)', accent: '#EC4899', action: () => setPage('dictation') },
    { icon: '🧩', label: 'Өгүүлбэр бүтээх', sub: 'Зөв дараалал', color: 'rgba(16,185,129,.1)', accent: '#10B981', action: () => setPage('sentenceBuilder') },
    { icon: '📝', label: 'Хоосон үг нөхөх', sub: 'Дүрэм, үгсийн сан', color: 'rgba(99,102,241,.1)', accent: '#6366F1', action: () => setPage('fillBlank') },
    { icon: '🎧', label: 'Сонсох дасгал', sub: 'Аудио ойлголт', color: 'rgba(34,197,94,.1)', accent: '#22C55E', action: () => setPage('listening') },
    { icon: '🗣️', label: 'Ярих дасгал', sub: 'Дуудлага шалгах', color: 'rgba(99,102,241,.15)', accent: '#818CF8', action: () => setPage('speaking') },
    { icon: '🧠', label: 'Өнөөдөр давтах', sub: duePhraseIds.length > 0 ? `${duePhraseIds.length} гол хэллэг хугацаа болсон` : 'Дараагийн хугацаат хэллэгээ харах', color: 'rgba(239,68,68,.1)', accent: '#F87171', action: () => setPage('todayReview') },
  ];

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#141416', padding: '20px 20px 16px', borderBottom: '1px solid #2A2A2F' }}>
        <p style={{ fontSize: 12, color: '#A0A0A8', marginBottom: 2 }}>ДАСГАЛ</p>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#FFF' }}>Юу хийх вэ? 💪</h1>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map((option) => (
          <motion.button key={option.label} whileTap={{ scale: 0.97 }} onClick={option.action} style={{ background: '#1C1C1F', borderRadius: 20, padding: 18, display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #2A2A2F', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{option.icon}</div>
            <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: '#FFF', marginBottom: 3 }}>{option.label}</p><p style={{ fontSize: 12, color: '#A0A0A8' }}>{option.sub}</p></div>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16, color: option.accent }}>→</span></div>
          </motion.button>
        ))}
      </div>

      <div style={{ margin: '0 16px 16px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#FFF', marginBottom: 10 }}>Өнөөдрийн ахиц</p>
        <div style={{ background: '#1C1C1F', borderRadius: 18, padding: 16, border: '1px solid #2A2A2F' }}>
          {[
            { label: 'Танилцсан карт', val: introducedWords.length },
            { label: 'Баттай карт', val: progress.learnedWords.length },
            { label: 'Судалсан минут', val: progress.todayMinutes },
          ].map((stat, index) => <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: index < 2 ? '1px solid #2A2A2F' : 'none' }}><span style={{ fontSize: 13, color: '#A0A0A8' }}>{stat.label}</span><span style={{ fontSize: 15, fontWeight: 800, color: '#C8952A' }}>{stat.val}</span></div>)}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;