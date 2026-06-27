import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play, Pause, Check, X, RotateCcw } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { Waveform, ProgressBar, XPToast } from '../components/UI/SharedComponents';

interface Q { id:string; q:string; ans:string; opts:string[]; audio:string; }

function makeQ(words:any[]): Q[] {
  return [...words].sort(()=>Math.random()-.5).slice(0,10).map(w => ({
    id:w.id, q:w.czech, ans:w.mongolian,
    opts:[w.mongolian,...words.filter((x:any)=>x.id!==w.id).sort(()=>Math.random()-.5).slice(0,3).map((x:any)=>x.mongolian)].sort(()=>Math.random()-.5),
    audio:w.czech,
  }));
}

const ListeningPage: React.FC = () => {
  const { words, addXP, updateSRSCard, setPage } = useAppStore();
  const [qs]       = useState<Q[]>(()=>makeQ(words));
  const [idx,setIdx]   = useState(0);
  const [sel,setSel]   = useState<string|null>(null);
  const [ans,setAns]   = useState(false);
  const [playing,setPl] = useState(false);
  const [showXP,setXP]  = useState(false);
  const [score,setScore]= useState({ok:0,tot:0});
  const [done,setDone]  = useState(false);

  const q = qs[idx];

  const play = () => {
    setPl(true);
    const u = new SpeechSynthesisUtterance(q.audio);
    u.lang='cs-CZ'; u.rate=.8;
    u.onend=()=>setPl(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const pick = (opt:string) => {
    if (ans) return;
    setSel(opt); setAns(true);
    const ok = opt===q.ans;
    if (ok) { addXP(15); setXP(true); setTimeout(()=>setXP(false),1100); updateSRSCard(q.id,5); }
    else updateSRSCard(q.id,1);
    setScore(s=>({ok:s.ok+(ok?1:0),tot:s.tot+1}));
  };

  const next = () => {
    if (idx<qs.length-1) { setIdx(i=>i+1); setSel(null); setAns(false); setPl(false); }
    else setDone(true);
  };

  const pct = score.tot ? Math.round((score.ok/score.tot)*100) : 0;

  if (done) return (
    <div style={{background:'#0C0C0E',minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',padding:24,fontFamily:'Inter,sans-serif'}}>
      <motion.div initial={{scale:.75,opacity:0}} animate={{scale:1,opacity:1}}
        style={{background:'#1C1C1F',borderRadius:28,padding:32,textAlign:'center',
          border:'1px solid #2A2A2F',width:'100%'}}>
        <div style={{fontSize:56,marginBottom:10}}>{pct>=70?'🏆':pct>=40?'👍':'💪'}</div>
        <h2 style={{fontSize:22,fontWeight:900,color:'#FFF',marginBottom:4}}>Дасгал дууслаа!</h2>
        <p style={{fontSize:14,color:'#A0A0A8',marginBottom:16}}>{score.ok}/{score.tot} зөв хариулсан</p>
        <div style={{marginBottom:20}}>
          <ProgressBar value={score.ok} max={score.tot} height={10} showPct
            color={pct>=70?'#22C55E':'#C8952A'}/>
        </div>
        <div style={{display:'flex',gap:10,marginBottom:20}}>
          <div style={{flex:1,background:'rgba(34,197,94,.1)',borderRadius:14,padding:14}}>
            <p style={{fontSize:22,fontWeight:900,color:'#22C55E'}}>{score.ok}</p>
            <p style={{fontSize:11,color:'#606068'}}>Зөв</p>
          </div>
          <div style={{flex:1,background:'rgba(239,68,68,.1)',borderRadius:14,padding:14}}>
            <p style={{fontSize:22,fontWeight:900,color:'#F87171'}}>{score.tot-score.ok}</p>
            <p style={{fontSize:11,color:'#606068'}}>Буруу</p>
          </div>
        </div>
        <button onClick={()=>{setDone(false);setIdx(0);setSel(null);setAns(false);setScore({ok:0,tot:0});}}
          className="btn-gold" style={{width:'100%',padding:14,fontSize:14}}>
          <RotateCcw size={14} style={{display:'inline',marginRight:6}}/>Дахин эхлэх
        </button>
      </motion.div>
    </div>
  );

  const LETTERS = ['A','B','C','D'];

  return (
    <div style={{background:'#0C0C0E',minHeight:'100vh',fontFamily:'Inter,sans-serif'}}>

      {/* Header */}
      <div style={{background:'#141416',padding:'16px 20px 14px',borderBottom:'1px solid #2A2A2F'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <button onClick={()=>setPage('practice')}
            style={{width:34,height:34,borderRadius:10,background:'#242428',
              border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ChevronLeft size={18} color="#A0A0A8"/>
          </button>
          <h1 style={{fontSize:16,fontWeight:800,color:'#FFF',flex:1}}>🎧 Сонсох дасгал</h1>
          <div style={{background:'rgba(200,149,42,.15)',borderRadius:10,padding:'4px 10px',
            border:'1px solid rgba(200,149,42,.3)'}}>
            <span style={{fontSize:13,fontWeight:700,color:'#C8952A'}}>{idx+1}/{qs.length}</span>
          </div>
        </div>
        <ProgressBar value={idx} max={qs.length} height={5}/>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
          <span style={{fontSize:11,color:'#606068'}}>✓ {score.ok} зөв</span>
          <span style={{fontSize:11,color:'#606068'}}>{qs.length-idx} үлдсэн</span>
        </div>
      </div>

      <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
        <AnimatePresence>
          {showXP && (
            <motion.div style={{display:'flex',justifyContent:'center'}}
              initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}>
              <XPToast xp={15}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio card */}
        <motion.div key={idx}
          initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
          style={{background:'#1C1C1F',borderRadius:24,padding:28,textAlign:'center',
            border:'1px solid #2A2A2F'}}>
          <p style={{fontSize:13,color:'#A0A0A8',marginBottom:16}}>
            Аудио сонсоод зөв хариулгыг олно уу
          </p>
          <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
            <Waveform active={playing}/>
          </div>
          <motion.button whileTap={{scale:.92}} onClick={play}
            style={{
              width:72,height:72,borderRadius:36,
              background: playing
                ? 'linear-gradient(135deg,#C8952A,#F5C842)'
                : 'rgba(200,149,42,.15)',
              border:`2px solid ${playing?'transparent':'rgba(200,149,42,.4)'}`,
              color: playing?'#000':'#C8952A',
              display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
              boxShadow: playing?'0 4px 20px rgba(200,149,42,.4)':'none',
              margin:'0 auto',
            }}>
            {playing ? <Pause size={28}/> : <Play size={28}/>}
          </motion.button>
          {ans && (
            <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              style={{fontSize:18,fontWeight:800,color:'#FFF',marginTop:14}}>
              {q.q}
            </motion.p>
          )}
        </motion.div>

        {/* Options */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {q.opts.map((opt,i) => {
            const letter = LETTERS[i];
            const isAns  = opt===q.ans;
            const isSel  = opt===sel;
            let bg='#1C1C1F', border='#2A2A2F', color='#FFF',
                lbg='#242428', lc='#A0A0A8';
            if (ans) {
              if (isAns) { bg='rgba(34,197,94,.12)'; border='rgba(34,197,94,.5)'; color='#22C55E'; lbg='#22C55E'; lc='#000'; }
              else if (isSel) { bg='rgba(239,68,68,.12)'; border='rgba(239,68,68,.5)'; color='#F87171'; lbg='#EF4444'; lc='#FFF'; }
            }
            return (
              <motion.button key={opt}
                whileHover={!ans?{x:3}:{}} whileTap={!ans?{scale:.97}:{}}
                onClick={()=>pick(opt)}
                style={{display:'flex',alignItems:'center',gap:12,padding:14,borderRadius:16,
                  background:bg, border:`1.5px solid ${border}`, cursor:'pointer', textAlign:'left',
                  transition:'all .15s'}}>
                <div style={{width:34,height:34,borderRadius:10,background:lbg,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:13,fontWeight:900,color:lc,flexShrink:0}}>
                  {letter}
                </div>
                <span style={{flex:1,fontSize:14,fontWeight:600,color}}>{opt}</span>
                {ans && isAns && <Check size={18} color="#22C55E"/>}
                {ans && isSel && !isAns && <X size={18} color="#EF4444"/>}
              </motion.button>
            );
          })}
        </div>

        {ans && (
          <motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            whileTap={{scale:.97}} onClick={next}
            className="btn-gold" style={{width:'100%',padding:14,fontSize:14}}>
            {idx<qs.length-1 ? 'Дараах асуулт →' : 'Дүн харах 🏆'}
          </motion.button>
        )}
      </div>
    </div>
  );
};
export default ListeningPage;
