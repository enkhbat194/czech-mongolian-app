import React, { useMemo, useState } from 'react';
import { Check, ChevronLeft, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { AudioButton, ProgressBar } from '../components/UI/SharedComponents';
import {
  a0NeedsCards,
  a0NeedsMicroLessons,
  a0NeedsMission,
  getA0NeedsCard,
} from '../data/a0Needs';

type Stage = 'cards' | 'exercises' | 'mission' | 'complete';
type Feedback = 'correct' | 'wrong' | null;

const shell: React.CSSProperties = {
  background:'#0C0C0E',
  minHeight:'100dvh',
  fontFamily:'Inter,sans-serif',
  color:'#FFF',
};

const panel: React.CSSProperties = {
  background:'#1C1C1F',
  border:'1px solid #2A2A2F',
  borderRadius:24,
  padding:22,
};

const A0NeedsPage: React.FC = () => {
  const {
    setPage, markWordLearned, updateSRSCard, completeLesson, unlockNextLesson,
    addXP, addMinutes, updateStreak,
  } = useAppStore();

  const [stage, setStage] = useState<Stage>('cards');
  const [microIndex, setMicroIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [orderedTokens, setOrderedTokens] = useState<string[]>([]);
  const [missionIndex, setMissionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentMicro = a0NeedsMicroLessons[microIndex];
  const currentCard = currentMicro ? getA0NeedsCard(currentMicro.cardIds[cardIndex]) : null;
  const currentExercise = currentMicro?.exercises[exerciseIndex] ?? null;
  const currentMission = a0NeedsMission[missionIndex];

  const totalSteps = useMemo(
    () => a0NeedsMicroLessons.reduce((sum, item) => sum + item.cardIds.length + item.exercises.length, 0) + a0NeedsMission.length,
    [],
  );

  const completedSteps = useMemo(() => {
    const finishedMicros = a0NeedsMicroLessons.slice(0, microIndex)
      .reduce((sum, item) => sum + item.cardIds.length + item.exercises.length, 0);
    if (stage === 'cards') return finishedMicros + cardIndex;
    if (stage === 'exercises' && currentMicro) return finishedMicros + currentMicro.cardIds.length + exerciseIndex;
    if (stage === 'mission') return totalSteps - a0NeedsMission.length + missionIndex;
    return totalSteps;
  }, [cardIndex, currentMicro, exerciseIndex, microIndex, missionIndex, stage, totalSteps]);

  const resetAnswer = () => {
    setChoice(null);
    setFeedback(null);
    setOrderedTokens([]);
  };

  const nextCard = () => {
    if (!currentMicro) return;
    if (cardIndex < currentMicro.cardIds.length - 1) {
      setCardIndex((value) => value + 1);
      setShowMeaning(false);
      return;
    }
    setStage('exercises');
    setExerciseIndex(0);
    resetAnswer();
  };

  const nextExercise = () => {
    if (!currentMicro) return;
    if (exerciseIndex < currentMicro.exercises.length - 1) {
      setExerciseIndex((value) => value + 1);
      resetAnswer();
      return;
    }
    if (microIndex < a0NeedsMicroLessons.length - 1) {
      setMicroIndex((value) => value + 1);
      setCardIndex(0);
      setStage('cards');
      setShowMeaning(false);
      resetAnswer();
      return;
    }
    setStage('mission');
    resetAnswer();
  };

  const answerChoice = (correctId: string, pickedId: string) => {
    setChoice(pickedId);
    setFeedback(pickedId === correctId ? 'correct' : 'wrong');
  };

  const addToken = (token: string) => {
    if (!currentExercise || currentExercise.type !== 'order' || feedback === 'correct') return;
    if (orderedTokens.length >= currentExercise.tokens.length) return;
    const next = [...orderedTokens, token];
    setOrderedTokens(next);
    if (next.length === currentExercise.tokens.length) {
      setFeedback(next.join(' ') === currentExercise.expectedText ? 'correct' : 'wrong');
    }
  };

  const removeToken = (index: number) => {
    if (feedback === 'correct') return;
    setOrderedTokens((tokens) => tokens.filter((_, tokenIndex) => tokenIndex !== index));
    setFeedback(null);
  };

  const nextMission = () => {
    if (missionIndex < a0NeedsMission.length - 1) {
      setMissionIndex((value) => value + 1);
      resetAnswer();
      return;
    }
    if (completed) return;
    a0NeedsCards.forEach((card) => {
      markWordLearned(card.id);
      updateSRSCard(card.id, 4);
    });
    addXP(110);
    addMinutes(25);
    updateStreak();
    completeLesson('l002');
    unlockNextLesson('l002');
    setCompleted(true);
    setStage('complete');
  };

  const feedbackBox = (text: string) => feedback && (
    <div style={{ marginTop:14, borderRadius:14, padding:13, background:feedback === 'correct' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', border:`1px solid ${feedback === 'correct' ? 'rgba(34,197,94,.35)' : 'rgba(239,68,68,.35)}` }}>
      <p style={{ margin:0, color:feedback === 'correct' ? '#4ADE80' : '#F87171', fontWeight:800 }}>
        {feedback === 'correct' ? 'Зөв.' : 'Буруу. Дахин оролдоорой.'}
      </p>
      {feedback === 'correct' && <p style={{ margin:'5px 0 0', color:'#D1D1D6', fontSize:13, lineHeight:1.45 }}>{text}</p>}
    </div>
  );

  if (stage === 'complete') {
    return (
      <div style={{ ...shell, display:'flex', alignItems:'center', padding:'24px 20px' }}>
        <div style={{ ...panel, width:'100%', textAlign:'center' }}>
          <div style={{ fontSize:58, marginBottom:12 }}>🧾</div>
          <h1 style={{ margin:'0 0 8px', fontSize:24 }}>A0.2 дууслаа</h1>
          <p style={{ color:'#A0A0A8', lineHeight:1.55, margin:'0 0 18px' }}>
            Та одоо тусламж, ус, утас хэрэгтэйгээ хэлж, хүсэлтээ илэрхийлж, мөнгө эсвэл карт байхгүйгээ тайлбарлаж чадна.
          </p>
          <div style={{ ...panel, padding:16, textAlign:'left', marginBottom:16 }}>
            <p style={{ margin:'0 0 7px', color:'#C8952A', fontWeight:800 }}>Одоо таны ашиглаж чадах хэллэгүүд</p>
            {['Potřebuji pomoc.','Potřebuji vodu.','Chci něco k jídlu.','Nemám kartu.','Potřebuji pomoc, prosím.'].map((text) => (
              <p key={text} style={{ margin:'6px 0', color:'#FFF' }}>✓ {text}</p>
            ))}
          </div>
          <button onClick={() => setPage('path')} className="btn-gold" style={{ width:'100%', padding:15, fontSize:15 }}>
            Хичээлийн зам руу буцах
          </button>
          <button onClick={() => window.location.reload()} style={{ width:'100%', marginTop:10, padding:12, border:0, background:'transparent', color:'#A0A0A8', cursor:'pointer' }}>
            <RotateCcw size={14} style={{ verticalAlign:'middle', marginRight:6 }} /> A0.2-ыг дахин хийх
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={shell}>
      <header style={{ background:'#141416', borderBottom:'1px solid #2A2A2F', padding:'max(16px, env(safe-area-inset-top)) 20px 13px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <button onClick={() => setPage('path')} aria-label="Буцах" style={{ width:34, height:34, borderRadius:10, background:'#242428', border:0, cursor:'pointer', color:'#A0A0A8' }}>
            <ChevronLeft size={20} />
          </button>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ margin:0, fontSize:12, color:'#A0A0A8' }}>A0.2 · ойролцоогоор 25 минут</p>
            <h1 style={{ margin:'2px 0 0', fontSize:17 }}>Надад хэрэгтэй</h1>
          </div>
          <span style={{ fontSize:12, color:'#C8952A', fontWeight:800 }}>{Math.min(completedSteps + 1, totalSteps)}/{totalSteps}</span>
        </div>
        <ProgressBar value={completedSteps} max={totalSteps} height={5} />
      </header>

      <main style={{ maxWidth:430, margin:'0 auto', padding:'18px 16px max(28px, env(safe-area-inset-bottom))' }}>
        {stage === 'cards' && currentCard && currentMicro && (
          <>
            <p style={{ color:'#C8952A', fontSize:12, fontWeight:800, margin:'0 0 6px' }}>{currentMicro.titleMn}</p>
            <p style={{ color:'#A0A0A8', fontSize:13, margin:'0 0 16px', lineHeight:1.45 }}>{currentMicro.canDoMn}</p>
            <motion.div key={currentCard.id} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} style={panel}>
              <p style={{ margin:'0 0 10px', fontSize:12, color:'#606068' }}>Шинэ карт {cardIndex + 1}/{currentMicro.cardIds.length}</p>
              <h2 style={{ margin:'0 0 14px', textAlign:'center', fontSize:'clamp(28px, 9vw, 36px)', lineHeight:1.16, overflowWrap:'anywhere' }}>{currentCard.czech}</h2>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
                <AudioButton word={currentCard.czech} audioFile={currentCard.audioFile} size="lg" />
              </div>
              {!showMeaning ? (
                <button onClick={() => setShowMeaning(true)} className="btn-outline" style={{ width:'100%', padding:13, fontSize:14 }}>
                  Монгол утгыг харах
                </button>
              ) : (
                <div style={{ background:'rgba(200,149,42,.10)', border:'1px solid rgba(200,149,42,.28)', borderRadius:16, padding:15 }}>
                  <p style={{ margin:'0 0 8px', color:'#FFF', fontSize:19, fontWeight:800 }}>{currentCard.mongolian}</p>
                  <p style={{ margin:0, color:'#D1D1D6', fontSize:13, lineHeight:1.5 }}>{currentMicro.instructions[currentCard.id]}</p>
                </div>
              )}
            </motion.div>
            {showMeaning && (
              <button onClick={nextCard} className="btn-gold" style={{ width:'100%', marginTop:16, padding:15, fontSize:15 }}>
                Сонсож, хэлж давтаад үргэлжлүүлэх
              </button>
            )}
          </>
        )}

        {stage === 'exercises' && currentExercise && currentMicro && (
          <>
            <p style={{ color:'#C8952A', fontSize:12, fontWeight:800, margin:'0 0 6px' }}>{currentMicro.titleMn} · Бататгал</p>
            <div style={panel}>
              <p style={{ margin:'0 0 8px', color:'#A0A0A8', fontSize:12 }}>{currentExercise.titleMn}</p>
              <h2 style={{ margin:'0 0 14px', fontSize:21, lineHeight:1.35 }}>{currentExercise.promptMn}</h2>
              {'audioText' in currentExercise && currentExercise.audioText && (
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                  <AudioButton word={currentExercise.audioText} size="md" />
                  <span style={{ color:'#A0A0A8', fontSize:13 }}>Дараад сонсоорой</span>
                </div>
              )}
              {'promptCzech' in currentExercise && currentExercise.promptCzech && (
                <div style={{ background:'#242428', borderRadius:14, padding:14, marginBottom:16, fontSize:22, fontWeight:800, textAlign:'center' }}>{currentExercise.promptCzech}</div>
              )}

              {currentExercise.type === 'choice' && (
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {currentExercise.choices.map((item) => {
                    const picked = choice === item.id;
                    const isCorrect = feedback && item.id === currentExercise.correctId;
                    const isWrong = feedback === 'wrong' && picked;
                    return (
                      <button key={item.id} onClick={() => answerChoice(currentExercise.correctId, item.id)} disabled={feedback === 'correct'}
                        style={{ textAlign:'left', cursor:feedback === 'correct' ? 'default' : 'pointer', padding:'13px 14px', borderRadius:14, color:'#FFF', background:isCorrect ? 'rgba(34,197,94,.16)' : isWrong ? 'rgba(239,68,68,.16)' : '#242428', border:`1px solid ${isCorrect ? 'rgba(34,197,94,.6)' : isWrong ? 'rgba(239,68,68,.6)' : '#34343A'}`, fontSize:15 }}>
                        {item.text}
                      </button>
                    );
                  })}
                  {feedbackBox(currentExercise.feedbackMn)}
                </div>
              )}

              {currentExercise.type === 'order' && (
                <div>
                  <div style={{ minHeight:58, display:'flex', flexWrap:'wrap', gap:8, padding:10, borderRadius:14, background:'#141416', border:'1px dashed #42424A', marginBottom:12 }}>
                    {orderedTokens.length === 0 && <span style={{ color:'#606068', fontSize:13 }}>Доорх үгсийг дарааллаар нь дарна уу</span>}
                    {orderedTokens.map((token, index) => (
                      <button key={`${token}-${index}`} onClick={() => removeToken(index)} style={{ padding:'8px 10px', background:'rgba(200,149,42,.16)', color:'#F5C842', border:'1px solid rgba(200,149,42,.4)', borderRadius:10, cursor:'pointer' }}>{token}</button>
                    ))}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {currentExercise.tokens.map((token, index) => {
                      const used = orderedTokens.filter((item) => item === token).length > currentExercise.tokens.slice(0, index).filter((item) => item === token).length;
                      return <button key={`${token}-${index}`} onClick={() => addToken(token)} disabled={used || feedback === 'correct'} style={{ padding:'10px 12px', borderRadius:10, color:used ? '#606068' : '#FFF', background:'#242428', border:'1px solid #34343A', cursor:used ? 'default' : 'pointer', opacity:used ? .45 : 1 }}>{token}</button>;
                    })}
                  </div>
                  {feedback === 'wrong' && <button onClick={resetAnswer} style={{ marginTop:12, background:'transparent', border:0, color:'#F5C842', cursor:'pointer', padding:0 }}>Дахин оролдох</button>}
                  {feedbackBox(currentExercise.feedbackMn)}
                </div>
              )}
            </div>
            {feedback === 'correct' && <button onClick={nextExercise} className="btn-gold" style={{ width:'100%', marginTop:16, padding:15, fontSize:15 }}>Үргэлжлүүлэх</button>}
          </>
        )}

        {stage === 'mission' && currentMission && (
          <>
            <p style={{ color:'#C8952A', fontSize:12, fontWeight:800, margin:'0 0 6px' }}>Төгсгөлийн бодит даалгавар</p>
            <p style={{ color:'#A0A0A8', fontSize:13, margin:'0 0 16px', lineHeight:1.45 }}>Нөхцөл: Та ресепшн эсвэл үйлчилгээний газарт хэрэгцээгээ ойлгомжтой хэлэх хэрэгтэй боллоо.</p>
            <div style={panel}>
              <p style={{ margin:'0 0 8px', color:'#A0A0A8', fontSize:12 }}>Алхам {missionIndex + 1}/{a0NeedsMission.length}</p>
              <h2 style={{ margin:'0 0 16px', fontSize:21, lineHeight:1.35 }}>{currentMission.promptMn}</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {currentMission.choices.map((item) => {
                  const isCorrect = feedback && item.id === currentMission.correctId;
                  const isWrong = feedback === 'wrong' && choice === item.id;
                  return (
                    <button key={item.id} onClick={() => answerChoice(currentMission.correctId, item.id)} disabled={feedback === 'correct'}
                      style={{ textAlign:'left', padding:'13px 14px', borderRadius:14, cursor:feedback === 'correct' ? 'default' : 'pointer', color:'#FFF', background:isCorrect ? 'rgba(34,197,94,.16)' : isWrong ? 'rgba(239,68,68,.16)' : '#242428', border:`1px solid ${isCorrect ? 'rgba(34,197,94,.6)' : isWrong ? 'rgba(239,68,68,.6)' : '#34343A'}`, fontSize:15 }}>
                      {item.text}
                    </button>
                  );
                })}
                {feedbackBox(currentMission.feedbackMn)}
              </div>
            </div>
            {feedback === 'correct' && <button onClick={nextMission} className="btn-gold" style={{ width:'100%', marginTop:16, padding:15, fontSize:15 }}>{missionIndex === a0NeedsMission.length - 1 ? 'Хичээлийг дуусгах' : 'Үргэлжлүүлэх'}</button>}
          </>
        )}
      </main>
    </div>
  );
};

export default A0NeedsPage;