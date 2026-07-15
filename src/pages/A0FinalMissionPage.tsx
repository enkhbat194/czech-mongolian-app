import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { a0FinalMissionQuestionCount, a0FinalMissionSections, type A0FinalMissionQuestion } from '../data/a0FinalMission';
import { speakCzech } from '../components/audio/czechSpeech';
import { useAppStore } from '../stores/useAppStore';
import { usePhraseMemoryStore } from '../stores/usePhraseMemoryStore';

type Feedback = 'correct' | 'wrong' | null;

const panel: React.CSSProperties = {
  background: '#1C1C1F',
  border: '1px solid #2A2A2F',
  borderRadius: 22,
  padding: 18,
};

function normalizeAnswer(value: string) {
  return value
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isTypingCorrect(question: A0FinalMissionQuestion, answer: string) {
  const accepted = question.acceptedAnswers?.length ? question.acceptedAnswers : question.expectedText ? [question.expectedText] : [];
  const normalizedAnswer = normalizeAnswer(answer);
  return accepted.some((candidate) => normalizeAnswer(candidate) === normalizedAnswer);
}

function getChoicePrimaryText(question: A0FinalMissionQuestion, choice: { text: string; mongolian: string }) {
  return question.type === 'choice' ? choice.mongolian : choice.text;
}

const A0FinalMissionPage: React.FC = () => {
  const setPage = useAppStore((state) => state.setPage);
  const addXP = useAppStore((state) => state.addXP);
  const addMinutes = useAppStore((state) => state.addMinutes);
  const updateStreak = useAppStore((state) => state.updateStreak);
  const recordAttempt = usePhraseMemoryStore((state) => state.recordAttempt);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [typingValue, setTypingValue] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [finished, setFinished] = useState(false);

  const section = a0FinalMissionSections[sectionIndex];
  const question = section?.questions[questionIndex];
  const answeredCount = useMemo(
    () => a0FinalMissionSections.slice(0, sectionIndex).reduce((sum, item) => sum + item.questions.length, 0) + questionIndex + 1,
    [sectionIndex, questionIndex],
  );

  useEffect(() => {
    if (question?.type === 'listening' && question.czech && feedback === null) speakCzech(question.czech, { rate: 0.86 });
  }, [question, feedback]);

  const finish = (finalScore: number) => {
    addXP(120 + finalScore * 8);
    addMinutes(10);
    updateStreak();
    setFinished(true);
  };

  const saveAttempt = (item: A0FinalMissionQuestion, correct: boolean, chosenId?: string) => {
    if (!item.targetId) return;
    const mistakeType = item.type === 'typing' ? 'typing' : item.type === 'listening' ? 'listening' : 'confusion';
    recordAttempt(item.targetId, correct, correct ? undefined : { mistakeType, confusedWith: chosenId });
  };

  const answerChoice = (choiceId: string) => {
    if (!question || feedback !== null) return;
    const correct = choiceId === question.correctId;
    const chosen = question.choices?.find((choice) => choice.id === choiceId);
    if (chosen && question.type !== 'choice') speakCzech(chosen.text);
    saveAttempt(question, correct, choiceId);
    setPickedId(choiceId);
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((value) => value + (correct ? 1 : 0));
  };

  const submitTyping = () => {
    if (!question || feedback !== null) return;
    const correct = isTypingCorrect(question, typingValue);
    if (question.expectedText) speakCzech(question.expectedText);
    saveAttempt(question, correct);
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((value) => value + (correct ? 1 : 0));
  };

  const revealTypingAnswer = () => {
    if (!question || feedback !== null) return;
    if (question.expectedText) speakCzech(question.expectedText);
    saveAttempt(question, false);
    setFeedback('wrong');
  };

  const continueMission = () => {
    if (!section || !question) return;
    const currentScore = score;
    const lastQuestionInSection = questionIndex >= section.questions.length - 1;
    const lastSection = sectionIndex >= a0FinalMissionSections.length - 1;
    if (lastQuestionInSection && lastSection) {
      finish(currentScore);
      return;
    }
    if (lastQuestionInSection) {
      setSectionIndex((value) => value + 1);
      setQuestionIndex(0);
    } else {
      setQuestionIndex((value) => value + 1);
    }
    setPickedId(null);
    setTypingValue('');
    setFeedback(null);
  };

  if (finished) {
    const passed = score >= Math.ceil(a0FinalMissionQuestionCount * 0.75);
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', padding: 20 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ ...panel, width: '100%', maxWidth: 430, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 58, marginBottom: 8 }}>{passed ? '🏁' : '🔁'}</div>
          <p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>ХААЛТЫН ШАЛГАЛТ</p>
          <h1 style={{ margin: '8px 0', fontSize: 24 }}>{passed ? 'A0 суурь баталгаажлаа' : 'Дахин нэг тойрог хэрэгтэй'}</h1>
          <p style={{ margin: '0 0 16px', color: '#D1D1D6', lineHeight: 1.5 }}>Оноо: {score}/{a0FinalMissionQuestionCount}. {passed ? 'Та эхний өдрийн гол нөхцөлүүдэд хариу өгөх суурьтай байна.' : 'Сонсох, бичих, нөхцөл сонгох хэсгийг дахин давт.'}</p>
          <button onClick={() => setPage('practice')} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 15, marginBottom: 10 }}>Дасгал руу буцах</button>
          <button onClick={() => setPage('home')} style={{ width: '100%', padding: 13, borderRadius: 14, border: '1px solid #34343A', background: '#242428', color: '#FFF', cursor: 'pointer' }}>Нүүр хуудас</button>
        </motion.div>
      </div>
    );
  }

  if (!section || !question) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', padding: 20 }}>
        <div style={panel}>
          <h1 style={{ margin: '0 0 10px' }}>Шалгалтын өгөгдөл олдсонгүй</h1>
          <button onClick={() => setPage('practice')} className="btn-gold" style={{ width: '100%', padding: 14 }}>Буцах</button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((answeredCount / a0FinalMissionQuestionCount) * 100);
  const choices = question.choices || [];

  return (
    <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ background: '#141416', padding: 'max(16px, env(safe-area-inset-top)) 20px 13px', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPage('practice')} style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: '#242428', color: '#A0A0A8', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <div style={{ flex: 1 }}><p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 800 }}>A0 ХААЛТЫН ШАЛГАЛТ</p><h1 style={{ margin: '2px 0 0', fontSize: 18 }}>{section.titleMn}</h1></div>
          <span style={{ color: '#C8952A', fontWeight: 800, fontSize: 13 }}>{answeredCount}/{a0FinalMissionQuestionCount}</span>
        </div>
        <div style={{ height: 5, background: '#242428', borderRadius: 99, overflow: 'hidden', marginTop: 12 }}><div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg,#F5C842,#C8952A)' }} /></div>
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '20px 16px 30px' }}>
        <motion.div key={question.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} style={panel}>
          <p style={{ margin: '0 0 5px', color: '#C8952A', fontSize: 12, fontWeight: 900 }}>{question.titleMn}</p>
          <p style={{ margin: '0 0 14px', color: '#A0A0A8', fontSize: 13, lineHeight: 1.45 }}>{section.goalMn}</p>

          {question.staffCzech && <div style={{ background: '#141416', border: '1px solid #303036', borderRadius: 16, padding: 14, marginBottom: 14 }}>
            <p style={{ margin: '0 0 5px', color: '#A0A0A8', fontSize: 12 }}>Нөхцөл</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{question.staffCzech}</p>
            {question.staffMn && <p style={{ margin: '6px 0 0', color: '#A0A0A8', fontSize: 13 }}>{question.staffMn}</p>}
          </div>}

          <div style={{ background: '#141416', border: '1px solid #303036', borderRadius: 16, padding: '18px 14px', marginBottom: 16 }}>
            {question.type === 'listening'
              ? <button onClick={() => question.czech && speakCzech(question.czech, { rate: 0.86 })} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto 10px', padding: '10px 18px', borderRadius: 99, background: 'rgba(200,149,42,.14)', border: '1px solid rgba(200,149,42,.4)', color: '#F5C842', cursor: 'pointer', fontSize: 15, fontWeight: 800 }}><Volume2 size={19} /> Сонсох</button>
              : question.czech && question.type === 'choice'
                ? <p style={{ margin: '0 0 10px', textAlign: 'center', fontSize: 22, fontWeight: 900 }}>{question.czech}</p>
                : null}
            <p style={{ margin: 0, textAlign: 'center', color: '#FFF', fontSize: 17, fontWeight: 800, lineHeight: 1.35 }}>{question.promptMn}</p>
          </div>

          {question.type === 'typing' ? <div>
            <input value={typingValue} onChange={(event) => setTypingValue(event.target.value)} disabled={feedback !== null} placeholder="Санаж байвал Чехээр бич" style={{ width: '100%', boxSizing: 'border-box', padding: '14px 15px', borderRadius: 14, background: '#242428', border: '1px solid #34343A', color: '#FFF', fontSize: 16, marginBottom: 12 }} />
            <button onClick={submitTyping} disabled={!typingValue.trim() || feedback !== null} className="btn-gold" style={{ width: '100%', padding: 14, opacity: !typingValue.trim() || feedback !== null ? 0.55 : 1 }}>Шалгах</button>
            {feedback === null && <button onClick={revealTypingAnswer} style={{ width: '100%', marginTop: 10, padding: 13, borderRadius: 14, border: '1px solid #34343A', background: '#242428', color: '#D1D1D6', cursor: 'pointer', fontWeight: 800 }}>Мэдэхгүй — хариуг харах</button>}
          </div> : <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {choices.map((choice) => {
              const selected = pickedId === choice.id;
              const right = feedback !== null && choice.id === question.correctId;
              const wrong = feedback === 'wrong' && selected;
              const showTranslation = feedback !== null && question.type !== 'choice' && (right || selected);
              return <button key={choice.id} onClick={() => answerChoice(choice.id)} disabled={feedback !== null} style={{ textAlign: 'left', padding: '13px 14px', borderRadius: 14, color: '#FFF', background: right ? 'rgba(34,197,94,.16)' : wrong ? 'rgba(239,68,68,.16)' : '#242428', border: right ? '1px solid rgba(34,197,94,.65)' : wrong ? '1px solid rgba(239,68,68,.65)' : '1px solid #34343A', cursor: feedback !== null ? 'default' : 'pointer', fontSize: 16 }}><span style={{ display: 'block', fontWeight: 800 }}>{getChoicePrimaryText(question, choice)}</span>{showTranslation && <span style={{ display: 'block', marginTop: 4, color: '#A0A0A8', fontSize: 12 }}>{choice.mongolian}</span>}</button>;
            })}
          </div>}

          {feedback === 'correct' && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, color: '#4ADE80', fontWeight: 800, fontSize: 13 }}><Check size={17} /> Зөв. {question.feedbackMn}</div>}
          {feedback === 'wrong' && <div style={{ marginTop: 14, color: '#F87171', fontSize: 13, fontWeight: 800 }}>Буруу. {question.expectedText ? `Зөв нь: ${question.expectedText}. ` : ''}{question.feedbackMn}</div>}
          {feedback !== null && <button onClick={continueMission} className="btn-gold" style={{ width: '100%', marginTop: 15, padding: 14, fontSize: 15 }}>{answeredCount >= a0FinalMissionQuestionCount ? 'Дуусгах' : 'Үргэлжлүүлэх'}</button>}
        </motion.div>
      </main>
    </div>
  );
};

export default A0FinalMissionPage;
