import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { lessons as courseLessons } from '../data/lessons';
import { ProgressBar } from '../components/UI/SharedComponents';

const LearningPathPage: React.FC = () => {
  const { setCurrentLesson, setPage, getLessonProgress, progress } = useAppStore();
  const total = courseLessons.filter((lesson) => lesson.status === 'ready').reduce((sum, lesson) => sum + lesson.wordCount, 0);

  const openLesson = (lessonId: string) => {
    setCurrentLesson(lessonId);
    setPage(lessonId === 'l001' ? 'a0FirstContact' : 'flashcard');
  };

  return (
    <div style={{ background:'#0C0C0E', minHeight:'100vh', fontFamily:'Inter,sans-serif' }}>
      <div style={{ background:'#141416', padding:'20px 20px 16px', borderBottom:'1px solid #2A2A2F' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
          <button onClick={() => setPage('home')} style={{ width:34, height:34, borderRadius:10, background:'#242428', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer' }}>
            <ChevronLeft size={18} color="#A0A0A8" />
          </button>
          <h1 style={{ fontSize:18, fontWeight:900, color:'#FFF' }}>A0 хичээлийн зам</h1>
        </div>
        <p style={{ fontSize:12, color:'#A0A0A8', marginBottom:10, paddingLeft:46 }}>{progress.learnedWords.length}/{total} карт сурсан</p>
        <ProgressBar value={progress.learnedWords.length} max={Math.max(total, 1)} height={6} showPct />
      </div>

      <div style={{ padding:'12px 16px 16px', display:'flex', flexDirection:'column', gap:10 }}>
        {courseLessons.map((lesson, index) => {
          const progressPercent = getLessonProgress(lesson.id);
          const done = progress.completedLessons.includes(lesson.id);
          const ready = lesson.status === 'ready';
          const locked = lesson.isLocked || !ready;

          return (
            <div key={lesson.id}>
              {index > 0 && <div style={{ display:'flex', justifyContent:'center', margin:'2px 0' }}><div style={{ width:2, height:12, borderRadius:2, background:done ? '#C8952A' : '#2A2A2F' }} /></div>}
              <motion.button whileTap={locked ? {} : { scale:.98 }} onClick={() => !locked && openLesson(lesson.id)}
                style={{ width:'100%', textAlign:'left', cursor:locked ? 'default' : 'pointer', background:done ? 'rgba(200,149,42,.08)' : '#1C1C1F', border:`1.5px solid ${done ? 'rgba(200,149,42,.3)' : '#2A2A2F'}`, borderRadius:18, padding:14, opacity:locked ? .58 : 1, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <div style={{ width:52, height:52, borderRadius:16, background:done ? 'rgba(200,149,42,.15)' : '#242428', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{locked ? '🔒' : lesson.icon}</div>
                  {done && <div style={{ position:'absolute', bottom:-4, right:-4, width:20, height:20, borderRadius:10, background:'#C8952A', display:'flex', alignItems:'center', justifyContent:'center' }}><CheckCircle size={12} color="#000" strokeWidth={3} /></div>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', gap:8, marginBottom:4 }}>
                    <div>
                      <span style={{ fontSize:11, color:'#606068' }}>{lesson.order}-р хичээл</span>
                      <p style={{ fontSize:14, fontWeight:700, color:'#FFF', margin:0 }}>{lesson.titleMn}</p>
                    </div>
                    {done ? <span style={{ fontSize:11, fontWeight:700, color:'#C8952A', background:'rgba(200,149,42,.15)', padding:'3px 8px', borderRadius:99, height:'fit-content' }}>✓ Дууссан</span> : ready ? <span style={{ fontSize:13, fontWeight:700, color:'#C8952A' }}>{progressPercent}%</span> : <span style={{ fontSize:11, color:'#888', whiteSpace:'nowrap' }}>Төлөвлөгдсөн</span>}
                  </div>
                  <p style={{ fontSize:11, color:'#A0A0A8', margin:'0 0 7px', lineHeight:1.35 }}>{lesson.description}</p>
                  {ready && <ProgressBar value={progressPercent} height={5} />}
                  <div style={{ display:'flex', gap:12, marginTop:7 }}>
                    {ready ? <><span style={{ fontSize:11, color:'#606068' }}>📖 {lesson.wordCount} карт</span><span style={{ fontSize:11, color:'#606068' }}>⏱ {lesson.estimatedMinutes} мин</span></> : <span style={{ fontSize:11, color:'#606068' }}>Аппын өгөгдөлд хараахан ороогүй</span>}
                  </div>
                </div>
                {!locked && <ChevronRight size={16} color="#606068" style={{ flexShrink:0 }} />}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathPage;
