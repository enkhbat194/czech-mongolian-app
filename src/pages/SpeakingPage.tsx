import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Mic, MicOff, Volume2, ChevronRight, RefreshCw } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { XPToast } from '../components/UI/SharedComponents';

const PHRASES = [
  { id:'p1', cz:'Jak se máš?',          mn:'Яяж байна?',            ipa:'[jak se maːʃ]' },
  { id:'p2', cz:'Děkuji moc',           mn:'Их баярлалаа',          ipa:'[dɛku-ji mots]' },
  { id:'p3', cz:'Dobrý den',            mn:'Сайн байна уу',         ipa:'[dob-riː den]' },
  { id:'p4', cz:'Na shledanou',         mn:'Баяртай',               ipa:'[na sxle-da-nou]' },
  { id:'p5', cz:'Mluvíte česky?',       mn:'Та чехээр ярьдаг уу?',  ipa:'[mlu-viː-te tʃeski]' },
  { id:'p6', cz:'Promiňte, nerozumím',  mn:'Ойлгохгүй байна',       ipa:'[pro-miɲ-te]' },
  { id:'p7', cz:'Kde je záchod?',       mn:'Жорлон хаана байна?',   ipa:'[kde je zaː-xod]' },
  { id:'p8', cz:'Jsem z Mongolska',     mn:'Монголоос ирсэн',       ipa:'[jsem z moŋgol-ska]' },
];

type Phase = 'idle'|'recording'|'result';

const SpeakingPage: React.FC = () => {
  const { addXP, setPage } = useAppStore();
  const [idx, setIdx]         = useState(0);
  const [phase, setPhase]     = useState<Phase>('idle');
  const [score, setScore]     = useState(0);
  const [heard, setHeard]     = useState('');
  const [showXP, setXP]       = useState(false);
  const recRef                = useRef<any>(null);
  const p = PHRASES[idx];

  const playDemo = () => {
    const u = new SpeechSynthesisUtterance(p.cz);
    u.lang='cs-CZ'; u.rate=.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const startRec = () => {
    const SR = (window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if (!SR) { simulate(); return; }
    const r = new SR();
    r.lang='cs-CZ'; r.interimResults=false;
    r.onstart=()=>setPhase('recording');
    r.onresult=(e:any)=>{ finish(e.results[0][0].transcript); };
    r.onerror=()=>simulate();
    r.onend=()=>{ if(phase==='recording') simulate(); };
    recRef.current=r; r.start();
  };

  const stopRec = () => { recRef.current?.stop(); };

  const simulate = () => {
    const s = 50+Math.floor(Math.random()*45);
    setScore(s); setHeard(''); setPhase('result');
    if (s>=70) { addXP(20); setXP(true); setTimeout(()=>setXP(false),1100); }
  };

  const finish = (text:string) => {
    const ref = p.cz.toLowerCase().split(' ');
    const hits = ref.filter(w => text.toLowerCase().includes(w)).length;
    const s = Math.min(99,Math.round((hits/ref.length)*100));
    setScore(s); setHeard(text); setPhase('result');
    if (s>=70) { addXP(20); setXP(true); setTimeout(()=>setXP(false),1100); }
  };

  const next = () => {
    setPhase('idle'); setScore(0); setHeard('');
    setIdx(i => Math.min(PHRASES.length-1, i+1));
  };

  const sc = score;
  const col   = sc>=80?'#22C55E':sc>=60?'#F5C842':'#EF4444';
  const colBg = sc>=80?'rgba(34,197,94,.12)':sc>=60?'rgba(245,200,66,.12)':'rgba(239,68,68,.12)';
  const colB  = sc>=80?'rgba(34,197,94,.4)':sc>=60?'rgba(245,200,66,.4)':'rgba(239,68,68,.4)';
  const verdict = sc>=80?'Сайн хэллээ! 🎉':sc>=60?'Дажгүй байна 👍':'Дахин хэлж үзье 💪';

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
          <h1 style={{fontSize:16,fontWeight:800,color:'#FFF',flex:1}}>🗣️ Ярих дасгал</h1>
          <span style={{fontSize:13,fontWeight:700,color:'#C8952A'}}>{idx+1}/{PHRASES.length}</span>
        </div>
        {/* Progress dots */}
        <div style={{display:'flex',gap:5}}>
          {PHRASES.map((_,i) => (
            <div key={i} style={{height:4,flex:1,borderRadius:2,
              background: i<=idx ? '#C8952A' : '#2A2A2F',
              transition:'background .3s'}}/>
          ))}
        </div>
      </div>

      <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>

        <AnimatePresence>
          {showXP && (
            <motion.div style={{display:'flex',justifyContent:'center'}}
              initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}>
              <XPToast xp={20}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phrase card */}
        <motion.div key={idx} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
          style={{background:'#1C1C1F',borderRadius:24,padding:28,textAlign:'center',
            border:'1px solid #2A2A2F'}}>
          <p style={{fontSize:12,color:'#606068',marginBottom:8}}>Дараах хэлгэлгийг хэлж үзнэ үү:</p>
          <h2 style={{fontSize:32,fontWeight:900,color:'#FFF',marginBottom:4}}>{p.cz}</h2>
          <p style={{fontSize:14,color:'#C8952A',fontFamily:'monospace',marginBottom:4}}>{p.ipa}</p>
          <p style={{fontSize:14,color:'#A0A0A8',marginBottom:20}}>({p.mn})</p>

          {/* Demo listen */}
          <button onClick={playDemo}
            style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 16px',
              borderRadius:99,background:'rgba(200,149,42,.12)',
              border:'1px solid rgba(200,149,42,.3)',color:'#C8952A',
              fontSize:13,fontWeight:600,cursor:'pointer',marginBottom:24}}>
            <Volume2 size={14}/> Жишээ сонсох
          </button>

          {/* Mic button */}
          {phase!=='result' && (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <motion.div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {phase==='recording' && (
                  <>
                    <motion.div animate={{scale:[1,1.5,1],opacity:[.4,0,.4]}}
                      transition={{repeat:Infinity,duration:1.2}}
                      style={{position:'absolute',width:90,height:90,borderRadius:45,
                        background:'rgba(239,68,68,.25)'}}/>
                    <motion.div animate={{scale:[1,1.8,1],opacity:[.3,0,.3]}}
                      transition={{repeat:Infinity,duration:1.2,delay:.4}}
                      style={{position:'absolute',width:100,height:100,borderRadius:50,
                        background:'rgba(239,68,68,.15)'}}/>
                  </>
                )}
                <motion.button whileTap={{scale:.92}}
                  onClick={phase==='idle'?startRec:stopRec}
                  style={{
                    width:72,height:72,borderRadius:36,
                    background:phase==='recording'
                      ? 'linear-gradient(135deg,#EF4444,#F87171)'
                      : 'linear-gradient(135deg,#C8952A,#F5C842)',
                    border:'none',cursor:'pointer',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    boxShadow: phase==='recording'
                      ? '0 4px 20px rgba(239,68,68,.4)'
                      : '0 4px 20px rgba(200,149,42,.4)',
                    zIndex:1,
                  }}>
                  {phase==='recording'
                    ? <MicOff size={28} color="#fff"/>
                    : <Mic size={28} color="#000"/>}
                </motion.button>
              </motion.div>
              <p style={{fontSize:12,color:'#606068',marginTop:12}}>
                {phase==='recording' ? '⏹ Зогсоохдоо дарна уу' : '🎤 Дарж эхлэх'}
              </p>
              {phase==='idle' && (
                <button onClick={simulate}
                  style={{marginTop:8,fontSize:12,color:'#C8952A',background:'none',border:'none',cursor:'pointer'}}>
                  Алгасах
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Result card */}
        <AnimatePresence>
          {phase==='result' && (
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              style={{background:'#1C1C1F',borderRadius:24,padding:22,
                border:'1px solid #2A2A2F'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <span style={{fontSize:14,fontWeight:700,color:'#FFF'}}>Дүн</span>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:28,fontWeight:900,color:col}}>{sc}%</span>
                  <div style={{padding:'4px 10px',borderRadius:99,background:colBg,
                    border:`1px solid ${colB}`,fontSize:12,fontWeight:700,color:col}}>
                    {verdict}
                  </div>
                </div>
              </div>
              {/* score bar */}
              <div style={{width:'100%',height:10,borderRadius:5,background:'#2A2A2F',overflow:'hidden',marginBottom:12}}>
                <motion.div initial={{width:0}} animate={{width:`${sc}%`}} transition={{duration:.8}}
                  style={{height:'100%',borderRadius:5,background:col}}/>
              </div>
              {heard && (
                <p style={{fontSize:12,color:'#606068',marginBottom:14}}>
                  Таны хэлсэн: <span style={{color:'#FFF',fontWeight:600}}>"{heard}"</span>
                </p>
              )}
              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>setPhase('idle')}
                  className="btn-outline"
                  style={{flex:1,padding:12,fontSize:13}}>
                  <RefreshCw size={13} style={{display:'inline',marginRight:5}}/>Дахин
                </button>
                <button onClick={next}
                  className="btn-gold"
                  style={{flex:1.5,padding:12,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:5}}>
                  {idx<PHRASES.length-1 ? <>Дараах <ChevronRight size={14}/></>
                    : 'Дуусгах 🎉'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        {phase!=='result' && (
          <div style={{background:'#1C1C1F',borderRadius:18,padding:16,border:'1px solid #2A2A2F'}}>
            <p style={{fontSize:12,fontWeight:700,color:'#C8952A',marginBottom:8}}>💡 Зөвлөгөө</p>
            <ul style={{fontSize:12,color:'#A0A0A8',lineHeight:1.8,paddingLeft:14}}>
              <li>Эхлээд жишээг сонсоорой</li>
              <li>Аажим, тодорхой дуугаарай</li>
              <li>Чех дуудлага монголоос ялгаатай</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SpeakingPage;
