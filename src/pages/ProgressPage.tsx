import React, { useEffect, useState } from 'react';

import { useAppStore } from '../stores/useAppStore';
import { getLocalDateKey, getMondayIndex, WEEKDAY_LABELS_MN } from '../utils/studyCalendar';
import { CircularProgress, ProgressBar } from '../components/UI/SharedComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TABS = ['Ерөнхий','Давталт (SRS)','Үг'];

const ProgressPage: React.FC = () => {
  const { progress, words, refreshCalendar } = useAppStore();
  const srsCards = Object.values(progress.srsCards);
  const [tab, setTab] = useState(0);

  useEffect(() => { refreshCalendar(); }, [refreshCalendar]);

  const weekData = WEEKDAY_LABELS_MN.map((d, i) => ({ d, xp: progress.weeklyXP[i] || 0 }));
  const learnedWordIds = new Set(progress.learnedWords);
  const mastered = progress.learnedWords.length;
  const activeCards = srsCards.filter((card) => !learnedWordIds.has(card.wordId));
  const learning = activeCards.filter((card) => card.correctAttempts >= card.incorrectAttempts).length;
  const struggling = activeCards.length - learning;

  const totalSec = progress.totalMinutes * 60;
  const h = Math.floor(totalSec/3600);
  const m = Math.floor((totalSec%3600)/60);

  const due = srsCards.filter(c => {
    if (!c.nextReview) return false;
    return new Date(c.nextReview) <= new Date();
  });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = getLocalDateKey(tomorrow);
  const upcoming = srsCards.filter(c => {
    if (!c.nextReview) return false;
    return getLocalDateKey(new Date(c.nextReview)) === tomorrowKey;
  });

  return (
    <div style={{background:'#0C0C0E',minHeight:'100vh',fontFamily:'Inter,sans-serif'}}>
      <div style={{background:'#141416',padding:'20px 20px 0',borderBottom:'1px solid #2A2A2F'}}>
        <h1 style={{fontSize:20,fontWeight:900,color:'#FFF',marginBottom:16}}>📊 Ахиц</h1>
        <div style={{display:'flex',gap:4,overflowX:'auto',paddingBottom:0}}>
          {TABS.map((t,i) => (
            <button key={t} onClick={()=>setTab(i)} style={{padding:'8px 16px',borderRadius:'10px 10px 0 0',background: tab===i ? '#0C0C0E' : 'transparent',color: tab===i ? '#C8952A' : '#606068',fontSize:13, fontWeight:700, border:'none', cursor:'pointer',borderTop: tab===i ? '2px solid #C8952A' : '2px solid transparent',whiteSpace:'nowrap', transition:'all .2s'}}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{padding:16}}>
        {tab===0 && (
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {icon:'⏱',label:'Нийт судалсан',val:`${h}ц ${m}мин`,sub:''},
                {icon:'🔥',label:'Одоогийн streak',val:progress.streak,sub:'өдөр'},
                {icon:'📚',label:'Сурсан үг',val:progress.learnedWords.length,sub:''},
                {icon:'🎯',label:'Өнөөдрийн XP',val:progress.weeklyXP[getMondayIndex()]||0,sub:'XP'},
              ].map(s => (
                <div key={s.label} style={{background:'#1C1C1F',borderRadius:18,padding:16,border:'1px solid #2A2A2F'}}>
                  <span style={{fontSize:22}}>{s.icon}</span>
                  <p style={{fontSize:22,fontWeight:900,color:'#C8952A',margin:'6px 0 2px'}}>{s.val} <span style={{fontSize:11,color:'#606068'}}>{s.sub}</span></p>
                  <p style={{fontSize:11,color:'#606068'}}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
              <p style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:12}}>7 өдрийн ахиц</p>
              <div style={{height:120}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekData}>
                    <XAxis dataKey="d" tick={{fill:'#606068',fontSize:10}} axisLine={false} tickLine={false}/><YAxis hide/>
                    <Tooltip contentStyle={{background:'#1C1C1F',border:'1px solid #2A2A2F',borderRadius:10,color:'#FFF',fontSize:11}} formatter={(v:any)=>[`${v} XP`,'']} />
                    <Bar dataKey="xp" radius={[6,6,0,0]}>{weekData.map((d,i) => <Cell key={i} fill={d.xp>0 ? 'url(#goldBar)' : '#2A2A2F'} />)}</Bar>
                    <defs><linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5C842"/><stop offset="100%" stopColor="#C8952A"/></linearGradient></defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
              <p style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:14}}>Үгийн ангилал</p>
              <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <CircularProgress value={mastered} max={Math.max(1,srsCards.length)} size={80} stroke={8} color="#22C55E" label={`${mastered}`} sub="Эзэмшсэн"/>
                <CircularProgress value={learning} max={Math.max(1,srsCards.length)} size={80} stroke={8} color="#C8952A" label={`${learning}`} sub="Суралцаж"/>
                <CircularProgress value={struggling} max={Math.max(1,srsCards.length)} size={80} stroke={8} color="#EF4444" label={`${struggling}`} sub="Хэцүү"/>
              </div>
            </div>

            <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
              <p style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:12}}>🏅 Амжилтууд</p>
              {[
                {icon:'🥇',label:'Анхны алхам',sub:'10 үг сур',done:progress.learnedWords.length>=10},
                {icon:'🔥',label:'Тогтвортой',sub:'7 өдрийн streak',done:progress.streak>=7},
                {icon:'⚡',label:'Хурдан сурч',sub:'50 үг сур',done:progress.learnedWords.length>=50},
                {icon:'🏆',label:'Мастер',sub:'100 үг сур',done:progress.learnedWords.length>=100},
              ].map(a => (
                <div key={a.label} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid #2A2A2F'}}>
                  <div style={{width:40,height:40,borderRadius:12,background:a.done?'rgba(200,149,42,.15)':'#242428',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,opacity:a.done?1:.4}}>{a.icon}</div>
                  <div style={{flex:1}}><p style={{fontSize:13,fontWeight:700,color:a.done?'#FFF':'#606068'}}>{a.label}</p><p style={{fontSize:11,color:'#606068'}}>{a.sub}</p></div>
                  {a.done && <div style={{background:'rgba(200,149,42,.15)',borderRadius:99,padding:'3px 10px',fontSize:11,fontWeight:700,color:'#C8952A',border:'1px solid rgba(200,149,42,.3)'}}>✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab===1 && (
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}><p style={{fontSize:13,color:'#A0A0A8',marginBottom:6}}>Өнөөдөр давтах</p><p style={{fontSize:28,fontWeight:900,color:'#C8952A',marginBottom:4}}>{due.length}</p><ProgressBar value={mastered} max={Math.max(1,srsCards.length)} height={8} showPct/></div>
            {due.length > 0 && <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}><p style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:10}}>Өнөөдрийн давтах ({due.length})</p>{due.slice(0,5).map(c => { const w = words.find(x=>x.id===c.wordId); return w ? <div key={c.wordId} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid #2A2A2F'}}><div><p style={{fontSize:14,fontWeight:700,color:'#FFF'}}>{w.czech}</p><p style={{fontSize:11,color:'#606068'}}>{w.mongolian}</p></div><div style={{width:8,height:8,borderRadius:4,background:'#EF4444'}}/></div> : null; })}</div>}
            {upcoming.length > 0 && <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}><p style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:10}}>Маргааш давтах</p>{upcoming.slice(0,5).map(c => { const w = words.find(x=>x.id===c.wordId); return w ? <div key={c.wordId} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid #2A2A2F'}}><div><p style={{fontSize:14,fontWeight:700,color:'#FFF'}}>{w.czech}</p><p style={{fontSize:11,color:'#606068'}}>{w.mongolian}</p></div><div style={{width:8,height:8,borderRadius:4,background:'#22C55E'}}/></div> : null; })}</div>}
          </div>
        )}

        {tab===2 && (
          <div style={{background:'#1C1C1F',borderRadius:20,border:'1px solid #2A2A2F',overflow:'hidden'}}>
            {words.map((w,i) => {
              const card = srsCards.find(c=>c.wordId===w.id);
              const learned = progress.learnedWords.includes(w.id);
              return <div key={w.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:i<words.length-1?'1px solid #2A2A2F':'none'}}><div style={{width:36,height:36,borderRadius:10,background: learned?'rgba(200,149,42,.15)':'#242428',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:learned?'#C8952A':'#606068',flexShrink:0}}>{i+1}</div><div style={{flex:1}}><p style={{fontSize:14,fontWeight:700,color:'#FFF'}}>{w.czech}</p><p style={{fontSize:11,color:'#606068'}}>{w.mongolian}</p></div>{learned && <div style={{fontSize:11,fontWeight:700,color:'#C8952A',background:'rgba(200,149,42,.1)',padding:'3px 8px',borderRadius:99}}>Lv {card?.repetitions||0}</div>}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
