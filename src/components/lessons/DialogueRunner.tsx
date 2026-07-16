import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { DialogueChoice, DialogueScenario } from '../../data/a0Dialogues';
import { getA0MemoryTargetsByCzech } from '../../data/a0MemoryPlan';
import { usePhraseMemoryStore } from '../../stores/usePhraseMemoryStore';
import { useAppStore } from '../../stores/useAppStore';
import { personalizeLearnerText } from '../../utils/learnerName';
import { cancelCzechSpeech, speakCzech } from '../audio/czechSpeech';
import { stableShuffle } from '../../utils/stableShuffle';

type DialogueStatus = 'playingQuestion' | 'awaitingAnswer' | 'correct' | 'wrong' | 'complete';
type DialogueSide = 'staff' | 'learner';

type DialogueTurn = {
  id: string;
  side: DialogueSide;
  speaker: string;
  czech: string;
  mongolian: string;
};

export interface DialogueRunnerProps {
  scenario: DialogueScenario;
  onComplete?: () => void;
  onProgress?: (stepIndex: number) => void;
  onAttempt?: (correctAnswerText: string, correct: boolean) => void;
  onExposure?: (text: string) => void;
  onMistake?: () => void;
  completionBehavior?: 'continue' | 'stay';
}

function createSessionSeed() {
  return `${Date.now()}-${Math.random()}`;
}

/**
 * The engine callback records the first canonical match for backwards
 * compatibility. Composed replies can contain several target phrases, so this
 * records every additional exact token-level match without duplicating the first.
 */
function recordAdditionalDialogueExposure(text: string) {
  const targets = getA0MemoryTargetsByCzech(text).slice(1);
  const memory = usePhraseMemoryStore.getState();
  targets.forEach((target) => memory.recordExposure(target.id));
}

function recordAdditionalDialogueAttempt(text: string, correct: boolean) {
  const targets = getA0MemoryTargetsByCzech(text).slice(1);
  const memory = usePhraseMemoryStore.getState();
  targets.forEach((target) => memory.recordAttempt(target.id, correct));
}

const DialogueRunner: React.FC<DialogueRunnerProps> = ({
  scenario,
  onComplete,
  onProgress,
  onAttempt,
  onExposure,
  onMistake,
  completionBehavior = 'continue',
}) => {
  const userName = useAppStore((state) => state.userName);
  const personalize = (text: string) => personalizeLearnerText(text, userName);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<DialogueStatus>('playingQuestion');
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [history, setHistory] = useState<DialogueTurn[]>([]);
  const [autoAudio, setAutoAudio] = useState(true);
  const [sessionSeed, setSessionSeed] = useState(createSessionSeed);
  const [runId, setRunId] = useState(0);

  const autoAudioRef = useRef(autoAudio);
  const timerRef = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const step = scenario.steps[index];
  const isFinalStep = index === scenario.steps.length - 1;
  const visibleHistory = history.slice(-2);
  const choices = useMemo(
    () => step ? stableShuffle(step.choices, `${sessionSeed}:${step.id}`) : [],
    [sessionSeed, step],
  );

  useEffect(() => {
    autoAudioRef.current = autoAudio;
  }, [autoAudio]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    cancelCzechSpeech();
  }, []);

  useEffect(() => {
    if (!step) return;

    onProgress?.(index);
    onExposure?.(step.staffCzech);
    recordAdditionalDialogueExposure(step.staffCzech);
    setPickedId(null);

    const frame = window.requestAnimationFrame(() => {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
    });

    if (!autoAudioRef.current) {
      setStatus('awaitingAnswer');
      return () => window.cancelAnimationFrame(frame);
    }

    setStatus('playingQuestion');
    timerRef.current = window.setTimeout(() => {
      speakCzech(personalize(step.staffCzech), { onFinished: () => setStatus('awaitingAnswer') });
    }, 180);

    return () => {
      window.cancelAnimationFrame(frame);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, onExposure, onProgress, runId, scenario.id, step]);

  if (!step) return null;

  const restart = () => {
    cancelCzechSpeech();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIndex(0);
    setStatus(autoAudio ? 'playingQuestion' : 'awaitingAnswer');
    setPickedId(null);
    setHistory([]);
    setSessionSeed(createSessionSeed());
    setRunId((value) => value + 1);
  };

  const toggleAutoAudio = () => {
    setAutoAudio((value) => {
      const next = !value;
      autoAudioRef.current = next;
      if (!next && status === 'playingQuestion') {
        cancelCzechSpeech();
        if (timerRef.current) window.clearTimeout(timerRef.current);
        setStatus('awaitingAnswer');
      }
      return next;
    });
  };

  const advance = () => {
    timerRef.current = window.setTimeout(() => {
      if (isFinalStep) {
        setStatus('complete');
        if (completionBehavior === 'continue') onComplete?.();
        return;
      }
      setIndex((value) => value + 1);
    }, 260);
  };

  const choose = (choiceId: string) => {
    if (status !== 'awaitingAnswer' && status !== 'wrong') return;

    const correct = choiceId === step.correctId;
    const correctChoice = step.choices.find((choice) => choice.id === step.correctId);
    if (correctChoice) {
      onAttempt?.(correctChoice.text, correct);
      recordAdditionalDialogueAttempt(correctChoice.text, correct);
    }

    setPickedId(choiceId);
    if (!correct) {
      setStatus('wrong');
      onMistake?.();
      return;
    }

    const reply = step.choices.find((choice) => choice.id === choiceId);
    if (!reply) return;

    onExposure?.(reply.text);
    recordAdditionalDialogueExposure(reply.text);
    setStatus('correct');
    setHistory((turns) => [
      ...turns,
      {
        id: `${step.id}-staff`,
        side: 'staff',
        speaker: step.speaker,
        czech: personalize(step.staffCzech),
        mongolian: personalize(step.staffMn),
      },
      {
        id: `${step.id}-learner`,
        side: 'learner',
        speaker: 'Та',
        czech: personalize(reply.text),
        mongolian: personalize(reply.mongolian),
      },
    ]);

    if (autoAudioRef.current) speakCzech(personalize(reply.text), { onFinished: advance });
    else advance();
  };

  const bubble = (turn: DialogueTurn) => {
    const staff = turn.side === 'staff';
    return (
      <div key={turn.id} style={{ display: 'flex', flexDirection: staff ? 'row' : 'row-reverse', gap: 6, alignItems: 'flex-end' }}>
        <div style={{ width: 26, height: 26, flex: '0 0 26px', borderRadius: 13, display: 'grid', placeItems: 'center', background: staff ? '#44526B' : '#7B5B22', fontSize: 13 }}>
          {staff ? '👩‍💼' : '🙂'}
        </div>
        <div style={{ maxWidth: '82%', padding: '7px 9px', borderRadius: 13, background: staff ? '#242428' : 'rgba(200,149,42,.16)', border: staff ? '1px solid #34343A' : '1px solid rgba(200,149,42,.40)' }}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ flex: 1, color: staff ? '#A0A0A8' : '#F5C842', fontSize: 9, fontWeight: 900 }}>{turn.speaker}</span>
            <button onClick={() => speakCzech(turn.czech)} aria-label="Аудио тоглуулах" style={{ width: 22, height: 22, padding: 0, borderRadius: 11, border: '1px solid rgba(200,149,42,.4)', background: 'rgba(200,149,42,.12)', color: '#F5C842', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <Volume2 size={12} />
            </button>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 800, lineHeight: 1.27 }}>{turn.czech}</p>
          <p style={{ margin: '3px 0 0', color: '#A0A0A8', fontSize: 11, lineHeight: 1.25 }}>{turn.mongolian}</p>
        </div>
      </div>
    );
  };

  const currentStaffTurn: DialogueTurn = {
    id: `${step.id}-current`,
    side: 'staff',
    speaker: step.speaker,
    czech: personalize(step.staffCzech),
    mongolian: personalize(step.staffMn),
  };

  return (
    <section>
      <div style={{ minHeight: 42, padding: '8px 10px', marginBottom: 8, borderRadius: 14, background: '#1C1C1F', border: '1px solid #2A2A2F', display: 'flex', alignItems: 'center', gap: 8 }}>
        <p style={{ flex: 1, minWidth: 0, margin: 0, fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{scenario.titleMn}</p>
        <button onClick={toggleAutoAudio} style={{ padding: '6px 8px', flex: '0 0 auto', borderRadius: 9, border: '1px solid rgba(200,149,42,.4)', background: autoAudio ? 'rgba(200,149,42,.16)' : 'transparent', color: autoAudio ? '#F5C842' : '#A0A0A8', cursor: 'pointer', fontSize: 10, fontWeight: 800 }}>
          {autoAudio ? '🔊 Авто' : '🔇 Дуугүй'}
        </button>
      </div>

      <div style={{ background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 18, padding: 12 }}>
        <div ref={logRef} style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: status === 'correct' || status === 'complete' ? 0 : 11 }}>
          {visibleHistory.map(bubble)}
          {status !== 'correct' && status !== 'complete' && bubble(currentStaffTurn)}
        </div>

        {status === 'correct' && <div style={{ padding: '10px 0 2px', textAlign: 'center', color: '#C8952A', fontSize: 12, fontWeight: 800 }}>Таны хариултыг сонсож байна…</div>}

        {status === 'complete' && completionBehavior === 'stay' && (
          <div style={{ textAlign: 'center', borderTop: '1px solid #2A2A2F', marginTop: 12, paddingTop: 14 }}>
            <p style={{ margin: 0, color: '#4ADE80', fontWeight: 900 }}>Яриа дууслаа.</p>
            <button onClick={restart} className="btn-gold" style={{ width: '100%', marginTop: 12, padding: 12 }}>Дахин шалгах</button>
          </div>
        )}

        {(status === 'playingQuestion' || status === 'awaitingAnswer' || status === 'wrong') && (
          <div style={{ borderTop: '1px solid #2A2A2F', paddingTop: 11 }}>
            <p style={{ margin: '0 0 7px', color: '#C8952A', fontSize: 10, fontWeight: 900 }}>ТАНЫ ХАРИУ</p>
            <h2 style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.34 }}>{personalize(step.promptMn)}</h2>
            {status === 'playingQuestion' && <p style={{ margin: '-3px 0 8px', color: '#A0A0A8', fontSize: 11 }}>Асуулт дуустал сонсож байна…</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {choices.map((choice: DialogueChoice) => {
                const wrong = status === 'wrong' && choice.id === pickedId;
                return (
                  <button key={choice.id} onClick={() => choose(choice.id)} disabled={status === 'playingQuestion'} style={{ minHeight: 44, textAlign: 'left', padding: '10px 12px', borderRadius: 12, color: status === 'playingQuestion' ? '#8A8A93' : '#FFF', opacity: status === 'playingQuestion' ? 0.58 : 1, background: wrong ? 'rgba(239,68,68,.16)' : '#242428', border: wrong ? '1px solid rgba(239,68,68,.6)' : '1px solid #34343A', cursor: status === 'playingQuestion' ? 'default' : 'pointer', fontSize: 15, fontWeight: 700 }}>
                    {personalize(choice.text)}
                  </button>
                );
              })}
            </div>
            {status === 'wrong' && <p style={{ margin: '9px 0 0', color: '#F87171', fontSize: 12, fontWeight: 800 }}>Буруу. Дахин оролдоорой.</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default DialogueRunner;
