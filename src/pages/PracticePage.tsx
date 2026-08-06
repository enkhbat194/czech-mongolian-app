import React from 'react';
import { motion } from 'framer-motion';
import { a0MemoryTargets } from '../data/a0MemoryPlan';
import { useAppStore } from '../stores/useAppStore';
import { usePhraseMemoryStore } from '../stores/usePhraseMemoryStore';
import {
  getMissingFinalMissionLessonIds,
  getNextIncompleteLesson,
  isFinalMissionUnlocked,
} from '../utils/a0BaselineIntegrity';

const PracticePage: React.FC = () => {
  const { setPage, setCurrentLesson, lessons, progress } = useAppStore();
  const phrases = usePhraseMemoryStore((state) => state.phrases);
  const nextLesson = getNextIncompleteLesson(lessons, progress.completedLessons);
  const finalMissionUnlocked = isFinalMissionUnlocked(lessons, progress.completedLessons);
  const missingMissionLessons = getMissingFinalMissionLessonIds(lessons, progress.completedLessons);
  const introducedWords = progress.introducedWords;
  const now = Date.now();
  const duePhraseCount = Object.values(phrases).filter((memory) => {
    const target = a0MemoryTargets.find((item) => item.id === memory.targetId);
    return target?.priority === 'active' && memory.exposures > 0 && new Date(memory.nextReview).getTime() <= now;
  }).length;

  const options = [
    {
      icon: finalMissionUnlocked ? '🏁' : '🔒',
      label: 'A0 хаалтын шалгалт',
      sub: finalMissionUnlocked
        ? 'Эхний өдрийн чадвараа шалгах'
        : `${missingMissionLessons.length} хичээл дууссаны дараа нээгдэнэ`,
      color: 'rgba(245,200,66,.14)',
      accent: '#F5C842',
      disabled: !finalMissionUnlocked,
      action: () => setPage('a0FinalMission'),
    },
    { icon: '🌟', label: 'Үг давтах', sub: 'Зөвхөн өмнө нь үзсэн карт', color: 'rgba(234,179,8,.15)', accent: '#EAB308', disabled: false, action: () => setPage('interactiveLearning') },
    { icon: '🃏', label: 'Флашкард', sub: nextLesson ? `${nextLesson.titleMn} — дараагийн дутуу хичээл` : 'Үг цээжлэх', color: 'rgba(200,149,42,.15)', accent: '#C8952A', disabled: false, action: () => { if (nextLesson) setCurrentLesson(nextLesson.id); setPage('flashcard'); } },
    { icon: '📝', label: 'Үг сонгох', sub: 'Чех → Монгол', color: 'rgba(56,189,248,.1)', accent: '#38BDF8', disabled: false, action: () => setPage('wordQuiz') },
    { icon: '🔄', label: 'Урвуу сонгох', sub: 'Монгол → Чех', color: 'rgba(168,85,247,.1)', accent: '#A855F7', disabled: false, action: () => setPage('reverseQuiz') },
    { icon: '🧩', label: 'Өгүүлбэр бүтээх', sub: 'Үгсийг зөв дараалуулах', color: 'rgba(20,184,166,.12)', accent: '#2DD4BF', disabled: false, action: () => setPage('sentenceBuilder') },
    { icon: '✍️', label: 'Бичих дасгал', sub: 'Зөв бичих', color: 'rgba(245,158,11,.1)', accent: '#F59E0B', disabled: false, action: () => setPage('writing') },
    { icon: '🎧', label: 'Сонсоод бичих', sub: 'Чээж бичиг', color: 'rgba(236,72,153,.1)', accent: '#EC4899', disabled: false, action: () => setPage('dictation') },
    { icon: '📝', label: 'Хоосон үг нөхөх', sub: 'Дүрэм, үгсийн сан', color: 'rgba(99,102,241,.1)', accent: '#6366F1', disabled: false, action: () => setPage('fillBlank') },
    { icon: '🎧', label: 'Сонсох дасгал', sub: 'Аудио ойлголт', color: 'rgba(34,197,94,.1)', accent: '#22C55E', disabled: false, action: () => setPage('listening') },
    { icon: '🗣️', label: 'Ярих дасгал', sub: 'Дуудлага шалгах', color: 'rgba(99,102,241,.15)', accent: '#818CF8', disabled: false, action: () => setPage('speaking') },
    { icon: '🧠', label: 'Өнөөдөр давтах', sub: duePhraseCount > 0 ? `${duePhraseCount} гол хэллэг хугацаа болсон` : 'Дараагийн хугацаат хэллэгээ харах', color: 'rgba(239,68,68,.1)', accent: '#F87171', disabled: false, action: () => setPage('todayReview') },
  ];

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100vh', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#141416', padding: '20px 20px 16px', borderBottom: '1px solid #2A2A2F' }}>
        <p style={{ fontSize: 12, color: '#A0A0A8', marginBottom: 2 }}>ДАСГАЛ</p>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#FFF' }}>Юу хийх вэ? 💪</h1>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map((option) => (
          <motion.button
            key={option.label}
            whileTap={option.disabled ? undefined : { scale: 0.97 }}
            onClick={option.action}
            disabled={option.disabled}
            aria-disabled={option.disabled}
            style={{
              background: '#1C1C1F',
              borderRadius: 20,
              padding: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              border: '1px solid #2A2A2F',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              opacity: option.disabled ? 0.62 : 1,
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 18, background: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{option.icon}</div>
            <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: '#FFF', marginBottom: 3 }}>{option.label}</p><p style={{ fontSize: 12, color: '#A0A0A8' }}>{option.sub}</p></div>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16, color: option.accent }}>{option.disabled ? '•' : '→'}</span></div>
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
