import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Loader2 } from 'lucide-react';
import { cancelCzechSpeech, speakCzech } from '../audio/czechSpeech';

/* ────────── AudioButton ────────── */
export const AudioButton: React.FC<{ audioFile?:string; word:string; size?:'sm'|'md'|'lg' }> =
  ({ audioFile, word, size='md' }) => {
  const [playing,setPlaying] = useState(false);
  const [loading,setLoading] = useState(false);
  const ref = useRef<HTMLAudioElement|null>(null);
  useEffect(() => () => { ref.current?.pause(); cancelCzechSpeech(); }, []);

  const tts = (text:string) => {
    setPlaying(true);
    speakCzech(text, { rate:.85, onFinished: () => setPlaying(false) });
  };

  const play = async () => {
    if (playing) {
      ref.current?.pause();
      cancelCzechSpeech();
      setPlaying(false);
      return;
    }
    if (audioFile) {
      setLoading(true);
      try {
        if (!ref.current) ref.current = new Audio(`/audio/words/${audioFile}`);
        ref.current.onended = () => setPlaying(false);
        ref.current.onerror = () => { setPlaying(false); setLoading(false); tts(word); };
        await ref.current.play();
        setPlaying(true);
      } catch { tts(word); }
      finally { setLoading(false); }
    } else tts(word);
  };

  const sz = { sm:36, md:48, lg:56 };
  const ic = { sm:14, md:18, lg:22 };
  const s  = sz[size];

  return (
    <motion.button whileTap={{scale:.9}} whileHover={{scale:1.06}} onClick={play}
      style={{
        width:s, height:s, borderRadius:s/2,
        display:'flex', alignItems:'center', justifyContent:'center',
        background: playing
          ? 'linear-gradient(135deg,#C8952A,#F5C842)'
          : 'rgba(200,149,42,.15)',
        border:'1.5px solid rgba(200,149,42,.4)',
        color: playing ? '#000' : '#C8952A',
        position:'relative', cursor:'pointer',
        boxShadow: playing ? '0 0 16px rgba(200,149,42,.4)' : 'none',
      }}
    >
      {loading ? <Loader2 size={ic[size]} style={{animation:'spin 1s linear infinite'}} />
               : <Volume2 size={ic[size]} />}
      {playing && <span style={{
        position:'absolute', inset:0, borderRadius:s/2,
        border:'2px solid rgba(200,149,42,.5)',
        animation:'pulse-ring .9s ease-out infinite',
      }}/>} 
    </motion.button>
  );
};

/* ────────── Waveform ────────── */
export const Waveform: React.FC<{active:boolean}> = ({active}) => {
  const hs = [4,8,6,12,8,16,10,14,8,12,6,10,8];
  return (
    <div style={{display:'flex',alignItems:'center',gap:3,height:40}}>
      {hs.map((h,i) => (
        <motion.div key={i} style={{width:3,borderRadius:4,background:active?'#C8952A':'#2A2A2F'}}
          animate={active
            ? {height:[`${h*1.5}px`,`${h*3}px`,`${h*1.5}px`]}
            : {height:'3px'}}
          transition={active
            ? {duration:.5+i*.04,repeat:Infinity,ease:'easeInOut'}
            : {duration:.3}}
        />
      ))}
    </div>
  );
};

/* ────────── ProgressBar ────────── */
export const ProgressBar: React.FC<{
  value:number; max?:number; height?:number; color?:string;
  showPct?:boolean; label?:string;
}> = ({value,max=100,height=8,color='#C8952A',showPct,label}) => {
  const pct = Math.min(100,Math.round((value/max)*100));
  return (
    <div style={{width:'100%'}}>
      {(label||showPct) && (
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
          {label && <span style={{fontSize:12,color:'#A0A0A8'}}>{label}</span>}
          {showPct && <span style={{fontSize:12,fontWeight:700,color}}>{pct}%</span>}
        </div>
      )}
      <div style={{width:'100%',height,borderRadius:height/2,background:'#2A2A2F',overflow:'hidden'}}>
        <motion.div
          style={{height:'100%',borderRadius:height/2,
            background:`linear-gradient(90deg,${color},#F5C842)`}}
          initial={{width:0}}
          animate={{width:`${pct}%`}}
          transition={{duration:.8,ease:'easeOut'}}
        />
      </div>
    </div>
  );
};

/* ────────── CircularProgress ────────── */
export const CircularProgress: React.FC<{
  value:number; max?:number; size?:number; stroke?:number;
  label?:string; sub?:string; color?:string;
}> = ({value,max=100,size=80,stroke=8,label,sub,color='#C8952A'}) => {
  const r   = (size-stroke)/2;
  const c   = 2*Math.PI*r;
  const pct = Math.min(100,Math.round((value/max)*100));
  const off = c - (pct/100)*c;
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{position:'relative',width:size,height:size}}>
        <svg width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r}
            fill="none" stroke="#2A2A2F" strokeWidth={stroke}/>
          <motion.circle cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{strokeDashoffset:c}}
            animate={{strokeDashoffset:off}}
            transition={{duration:1,ease:'easeOut'}}
            style={{transformOrigin:'50% 50%',transform:'rotate(-90deg)'}}
          />
        </svg>
        {label && (
          <div style={{
            position:'absolute',inset:0,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
          }}>
            <span style={{fontSize:15,fontWeight:900,color:'#FFF'}}>{label}</span>
            {sub && <span style={{fontSize:9,color:'#A0A0A8'}}>{sub}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

/* ────────── XP toast ────────── */
export const XPToast: React.FC<{xp:number}> = ({xp}) => (
  <motion.div
    initial={{opacity:0,y:0,scale:.6}}
    animate={{opacity:1,y:-12,scale:1}}
    exit={{opacity:0,y:-28,scale:.8}}
    style={{
      display:'inline-flex',alignItems:'center',gap:6,
      padding:'8px 18px', borderRadius:99,
      background:'linear-gradient(135deg,#C8952A,#F5C842)',
      color:'#000', fontWeight:900, fontSize:14,
      boxShadow:'0 4px 20px rgba(200,149,42,.5)',
    }}
  >⭐ +{xp} XP</motion.div>
);
