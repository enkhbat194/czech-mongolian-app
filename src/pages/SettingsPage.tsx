import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const SettingsPage: React.FC = () => {
  const { userName, setUserName, genderForm, setGenderForm, progress, setDailyGoal, resetProgress } = useAppStore();
  const dailyGoalMinutes = progress.dailyGoalMinutes;
  const [name, setName] = useState(userName);
  const [confirmReset, setConfirmReset] = useState(false);

  const Row: React.FC<{ label:string; right:React.ReactNode; sub?:string }> =
    ({label,right,sub}) => (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 0',
      borderBottom:'1px solid #2A2A2F'}}>
      <div style={{flex:1}}>
        <p style={{fontSize:14,fontWeight:600,color:'#FFF'}}>{label}</p>
        {sub && <p style={{fontSize:11,color:'#606068',marginTop:2}}>{sub}</p>}
      </div>
      {right}
    </div>
  );

  const Toggle: React.FC<{on:boolean; onChange:(v:boolean)=>void}> =
    ({on,onChange}) => (
    <motion.button onClick={()=>onChange(!on)}
      style={{
        width:48, height:26, borderRadius:13, position:'relative',
        background: on ? 'linear-gradient(90deg,#C8952A,#F5C842)' : '#2A2A2F',
        border:'none', cursor:'pointer', transition:'background .25s',
      }}>
      <motion.div animate={{x: on?24:2}}
        style={{width:22,height:22,borderRadius:11,background:'#FFF',
          position:'absolute',top:2, boxShadow:'0 1px 4px rgba(0,0,0,.4)'}}/>
    </motion.button>
  );

  const [sfx, setSfx] = useState(true);
  const [dark, setDark] = useState(true);

  return (
    <div style={{background:'#0C0C0E',minHeight:'100vh',fontFamily:'Inter,sans-serif'}}>
      <div style={{background:'#141416',padding:'20px 20px 16px',borderBottom:'1px solid #2A2A2F'}}>
        <h1 style={{fontSize:20,fontWeight:900,color:'#FFF'}}>⚙️ Тохиргоо</h1>
      </div>

      <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
          <p style={{fontSize:11,fontWeight:700,color:'#606068',marginBottom:12,textTransform:'uppercase',letterSpacing:.8}}>Профайл</p>
          <div style={{padding:'14px 0',borderBottom:'1px solid #2A2A2F'}}>
            <p style={{fontSize:12,color:'#A0A0A8',marginBottom:6}}>Хэрэглэгчийн нэр</p>
            <div style={{display:'flex',gap:8}}>
              <input value={name} onChange={e=>setName(e.target.value)} style={{flex:1, background:'#242428', border:'1px solid #2A2A2F', borderRadius:10, padding:'8px 12px', color:'#FFF', fontSize:14, outline:'none'}} />
              <button onClick={()=>setUserName(name)} className="btn-gold" style={{padding:'8px 14px',fontSize:13,borderRadius:10}}>Хадгалах</button>
            </div>
          </div>

          <div style={{padding:'14px 0',borderBottom:'1px solid #2A2A2F'}}>
            <p style={{fontSize:12,color:'#A0A0A8',marginBottom:6}}>Хэлний хэлбэр (Чех хэл зарим хэллэгийг эр/эм хүнээс хамааруулж өөрөөр хэлдэг)</p>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {([['male','Эрэгтэй'],['female','Эмэгтэй'],['neutral','Хэлэхгүй']] as const).map(([value,label]) => (
                <button key={value} onClick={()=>setGenderForm(value)} style={{padding:'6px 14px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', border:'1.5px solid', borderColor: genderForm===value ? '#C8952A' : '#2A2A2F', background: genderForm===value ? 'rgba(200,149,42,.15)' : '#242428', color: genderForm===value ? '#C8952A' : '#606068'}}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{padding:'14px 0',borderBottom:'1px solid #2A2A2F'}}>
            <p style={{fontSize:12,color:'#A0A0A8',marginBottom:6}}>Өдрийн зорилго</p>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {[5,10,15,20,30].map(m => (
                <button key={m} onClick={()=>setDailyGoal(m)} style={{padding:'6px 14px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', border:'1.5px solid', borderColor: dailyGoalMinutes===m ? '#C8952A' : '#2A2A2F', background: dailyGoalMinutes===m ? 'rgba(200,149,42,.15)' : '#242428', color: dailyGoalMinutes===m ? '#C8952A' : '#606068'}}>
                  {m} мин
                </button>
              ))}
            </div>
          </div>

          <div style={{paddingTop:14}}>
            <p style={{fontSize:12,color:'#A0A0A8',marginBottom:6}}>Хэл</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#242428',borderRadius:10,padding:'10px 14px'}}>
              <span style={{fontSize:14,color:'#FFF'}}>Монгол хэл</span>
              <ChevronRight size={16} color="#606068"/>
            </div>
          </div>
        </div>

        <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
          <p style={{fontSize:11,fontWeight:700,color:'#606068',marginBottom:12,textTransform:'uppercase',letterSpacing:.8}}>Аппын тохиргоо</p>
          <Row label="Харанхуй горим" sub="Dark mode" right={<Toggle on={dark} onChange={setDark}/>}/>
          <Row label="Эффект дуу" right={<Toggle on={sfx} onChange={setSfx}/>}/>
          <Row label="Мэдэгдэл" right={<Toggle on={false} onChange={()=>{}}/>}/>
        </div>

        <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid #2A2A2F'}}>
          <p style={{fontSize:11,fontWeight:700,color:'#606068',marginBottom:12,textTransform:'uppercase',letterSpacing:.8}}>Статистик</p>
          {[
            ['Нийт XP', progress.totalXP],
            ['Сурсан үг', progress.learnedWords.length],
            ['Нийт streak', progress.streak + ' өдөр'],
            ['Нийт минут', progress.totalMinutes || 0],
          ].map(([l,v]) => (
            <div key={String(l)} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #2A2A2F'}}>
              <span style={{fontSize:13,color:'#A0A0A8'}}>{l}</span>
              <span style={{fontSize:13,fontWeight:700,color:'#C8952A'}}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{background:'#1C1C1F',borderRadius:20,padding:16,border:'1px solid rgba(239,68,68,.3)'}}>
          <p style={{fontSize:11,fontWeight:700,color:'#F87171',marginBottom:8,textTransform:'uppercase',letterSpacing:.8}}>Аюултай бүс</p>
          {!confirmReset ? (
            <button onClick={()=>setConfirmReset(true)} style={{width:'100%',padding:12,borderRadius:12,fontSize:14,fontWeight:700,background:'rgba(239,68,68,.1)',border:'1.5px solid rgba(239,68,68,.3)',color:'#F87171',cursor:'pointer'}}>🗑️ Бүх өгөгдөл устгах</button>
          ) : (
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setConfirmReset(false)} className="btn-outline" style={{flex:1,padding:12,fontSize:13}}>Болих</button>
              <button onClick={()=>{ resetProgress(); setConfirmReset(false); }} style={{flex:1,padding:12,borderRadius:12,fontSize:13,fontWeight:700,background:'#EF4444',color:'#FFF',border:'none',cursor:'pointer'}}>Тийм, устга</button>
            </div>
          )}
        </div>

        <p style={{textAlign:'center',fontSize:11,color:'#2A2A2F',paddingBottom:8}}>ЧехМонгол v1.0 · localStorage</p>
      </div>
    </div>
  );
};
export default SettingsPage;
