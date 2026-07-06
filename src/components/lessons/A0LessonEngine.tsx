import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LegacyA0LessonEngine from './A0LessonEngineV5';
import type { A0LessonEngineConfig as LegacyA0LessonEngineConfig } from './A0LessonEngineV5';
import type { A0LessonDefinition } from '../../data/a0LessonSchema';
import type { DialogueChoice, DialogueScenario } from '../../data/a0Dialogues';
import A0DialogueScene from './A0DialogueScene';
import { useAppStore } from '../../stores/useAppStore';

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rotate<T>(items: T[], amount: number) {
  if (items.length < 2) return items;
  const offset = amount % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

/**
 * Choice data retains its stable correctId; only visual order changes.
 * Each new lesson session gets a fresh seed, so the correct answer is not fixed in slot 1.
 */
function shuffleDialogueChoices(scenario: DialogueScenario, seed: string): DialogueScenario {
  return {
    ...scenario,
    steps: scenario.steps.map((step) => {
      const correct = step.choices.find((choice) => choice.id === step.correctId);
      if (!correct || step.choices.length < 2) return step;

      const wrongChoices = step.choices.filter((choice) => choice.id !== step.correctId);
      const orderHash = hashText(`${seed}:wrong:${step.id}`);
      const slotHash = hashText(`${seed}:slot:${step.id}`);
      const orderedWrongChoices = rotate(wrongChoices, orderHash);
      const targetSlot = slotHash % step.choices.length;
      const nextChoices: DialogueChoice[] = [...orderedWrongChoices];
      nextChoices.splice(targetSlot, 0, correct);

      return { ...step, choices: nextChoices };
    }),
  };
}

const DialogueSceneInjector: React.FC<{ lessonId: string; rootRef: React.RefObject<HTMLDivElement | null> }> = ({ lessonId, rootRef }) => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const hostRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const removeHost = () => {
      if (!hostRef.current) return;
      hostRef.current.remove();
      hostRef.current = null;
      setHost(null);
    };

    const sync = () => {
      const main = root.querySelector('main');
      const isDialogueStage = Array.from(root.querySelectorAll('p')).some((node) => node.textContent?.trim() === 'Таны хариу');
      if (!main || !isDialogueStage) {
        removeHost();
        return;
      }
      if (hostRef.current?.isConnected && hostRef.current.parentElement === main) return;
      removeHost();
      const node = document.createElement('div');
      node.dataset.a0DialogueScene = 'true';
      main.prepend(node);
      hostRef.current = node;
      setHost(node);
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    sync();
    return () => {
      observer.disconnect();
      if (hostRef.current) hostRef.current.remove();
      hostRef.current = null;
    };
  }, [rootRef]);

  return host ? createPortal(<A0DialogueScene lessonId={lessonId} />, host) : null;
};

const A0LessonEngine: React.FC<{ config: A0LessonDefinition }> = ({ config }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const setPage = useAppStore((state) => state.setPage);
  const [dialogueSeed] = useState(() => `${Date.now()}-${Math.random()}`);

  const preparedConfig = useMemo(() => {
    const microDialogues = Object.keys(config.microDialogues).reduce<Record<string, DialogueScenario>>((result, key) => {
      result[key] = shuffleDialogueChoices(config.microDialogues[key], `${dialogueSeed}:${key}`);
      return result;
    }, {});
    return { ...config, microDialogues, finalDialogue: shuffleDialogueChoices(config.finalDialogue, `${dialogueSeed}:final`) };
  }, [config, dialogueSeed]);

  return (
    <div ref={rootRef}>
      <LegacyA0LessonEngine config={preparedConfig as unknown as LegacyA0LessonEngineConfig} />
      <DialogueSceneInjector lessonId={config.lessonId} rootRef={rootRef} />
      <button onClick={() => setPage('a0DialoguePreview')} style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 30, padding: '10px 12px', borderRadius: 14, border: '1px solid rgba(200,149,42,.55)', background: '#1C1C1F', color: '#F5C842', boxShadow: '0 8px 22px rgba(0,0,0,.38)', fontSize: 12, fontWeight: 900, cursor: 'pointer' }}>
        💬 Яриаг шууд шалгах
      </button>
    </div>
  );
};

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';
