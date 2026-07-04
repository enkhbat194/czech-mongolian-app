import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { lessons as courseLessons } from '../data/lessons';
import { CircularProgress, ProgressBar } from '../components/UI/SharedComponents';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DAYS = ['Да','Мя','Лх','Пү','Ба','Бя','Ня'];

const HomePage: React.FC = () => {
  const { userName, progress, updateStreak, setPage, setCurrentLesson, getLessonProgress } = useAppStore();
  useEffect(() => { updateStreak(); }, [updateStreak]);

  const weekData = DAYS.map((d, i) => ({ d, xp:progress.weeklyXP[i] || 0 }));
  const goalPct = Math.min(100, Math.round((progress.todayMinutes / Math.max(progress.dailyGoalMinutes, 1)) * 100));
  const active = courseLessons.filter((lesson) => !lesson.isLocked && lesson.status === 'ready');
  const openLesson = (lessonId: string) => {
    setCurrentLesson(lessonId);
    setPage(lessonId === 'l001' ? 'a0FirstContact' : 'flashcard');
  };

  return (
    <div style={{ background:'#0C0C0E', minHeight:'100vh', fontFamily:'Inter,sans-serif' }}>
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div><p style={{ fontSize:13, color:'#A0A0A8', marginBottom:3 }}>Сайн уу! 👋</p><h1 style={{ fontSize:22, fontWeight:900, color:'#FFF', margin:0 }}>{userName}</h1></div>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(200,149,42,.15)', borderRadius:99, padding:'6px 12px', border:'1px solid rgba(200,149,42,.3)' }}><span className="flame">🔥</span><span style={{ fontSize:14, fontWeight:900, color:'#C8952A' }}>{progress.streak}</span></div>
        </div>

        <div style={{ background:'linear-gradient(135deg,#1C1C1F,#242428)', borderRadius:24, padding:20, marginBottom:16, border:'1px solid #2A2A2F', boxShadow:'0 4px 24px rgba(0,0,0,.4)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div><p style={{ fontSize:12, color:'#A0A0A8', marginBottom:4 }}>Өнөөдрийн зорилго</p><p style={{ fontSize:13, color:'#FFF', marginBottom:2 }}><span style={{ color:'#C8952A', fontWeight:700 }}>{progress.dailyGoalMinutes} мин</span>{' · '}<span style={{ color:'#C8952A', fontWeight:700 }}>A0.1</span></p><div style={{ marginTop:12, width:160 }}><ProgressBar value={progress.todayMinutes} max={progress.dailyGoalMinutes} height={6} showPct /></div></div>
            <CircularProgress value={goalPct} max={100} size={80} stroke={8} color="#C8952A" label={`${goalPct}%`} sub="зорилго" />
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
          {[{ icon:'⭐', label:'Нийт XP', val:progress.totalXP }, { icon:'📚', label:'Сурсан карт', val:progress.learnedWords.length }].map((item) => <div key={item.label} style={{ background:'#1C1C1F', borderRadius:18, padding:16, border:'1px solid #2A2A2F' }}><span style={{ fontSize:22 }}>{item.icon}</span><p style={{ fontSize:22, fontWeight:900, color:'#C8952A', margin:'4px 0 2px' }}>{item.val}</p><p style={{ fontSize:11, color:'#606068', margin:0 }}>{item.label}</p></div>)}
        </div>

        <div style={{ background:'#1C1C1F', borderRadius:20, padding:'16px 16px 8px', border:'1px solid #2A2A2F', marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#FFF', marginBottom:12 }}>📈 Сурсан цэгийн ахиц</p>
          <div style={{ height:100 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={weekData}><defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#C8952A" stopOpacity={.25}/><stop offset="95%" stopColor="#C8952A" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="d" tick={{ fill:'#606068', fontSize:10 }} axisLine={false} tickLine={false}/><Tooltip contentStyle={{ background:'#1C1C1F', border:'1px solid #2A2A2F', borderRadius:10, color:'#FFF', fontSize:11 }} formatter={(value: number) => [`${value} XP`, '']} /><Area type="monotone" dataKey="xp" stroke="#C8952A" strokeWidth={2} fill="url(#gg)" dot={{ fill:'#C8952A', r:3, strokeWidth:0 }} activeDot={{ r:5, fill:'#F5C842', stroke:'#000', strokeWidth:2 }} /></AreaChart></ResponsiveContainer></div>
        </div>

        <div style={{ marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><p style={{ fontSize:13, fontWeight:700, color:'#FFF', margin:0 }}>Үргэлжлүүлэх хичээл</p><button onClick={() => setPage('path')} style={{ fontSize:12, fontWeight:700, color:'#C8952A', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:2 }}>Бүгд <ChevronRight size={12}/></button></div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {active.map((lesson) => { const percent = getLessonProgress(lesson.id); return <motion.button key={lesson.id} whileTap={{ scale:.97 }} onClick={() => openLesson(lesson.id)} style={{ background:'#1C1C1F', borderRadius:18, padding:14, display:'flex', alignItems:'center', gap:12, border:'1px solid #2A2A2F', cursor:'pointer', textAlign:'left' }}><div style={{ width:48, height:48, borderRadius:14, background:'#242428', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{lesson.icon}</div><div style={{ flex:1, minWidth:0 }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}><span style={{ fontSize:14, fontWeight:700, color:'#FFF' }}>{lesson.titleMn}</span><span style={{ fontSize:12, fontWeight:700, color:'#C8952A' }}>{percent}%</span></div><ProgressBar value={percent} height={5}/><p style={{ fontSize:11, color:'#606068', margin:'5px 0 0' }}>{lesson.wordCount} карт · {lesson.estimatedMinutes} мин</p></div><ChevronRight size={16} color="#606068"/></motion.button>; })}
          </div>
        </div>

        <motion.button whileTap={{ scale:.97 }} onClick={() => openLesson('l001')} className="btn-gold" style={{ width:'100%', padding:'16px', fontSize:16, borderRadius:18, marginBottom:8 }}>🚀 A0.1 эхлэх</motion.button>
      </div>
    </div>
  );
};

export default HomePage;
