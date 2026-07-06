import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LegacyA0LessonEngine from './A0LessonEngineV5';
import type { A0LessonEngineConfig as LegacyA0LessonEngineConfig } from './A0LessonEngineV5';
import type { A0LessonDefinition } from '../../data/a0LessonSchema';
import type { DialogueScenario } from '../../data/a0Dialogues';
import A0DialogueScene from './A0DialogueScene';

function correctDialogueCopy(scenario: DialogueScenario): DialogueScenario {
  return {
    ...scenario,
    steps: scenario.steps.map((step) => {
      if (step.staffCzech !== 'Mluvím rychle.') return step;
      return {
        ...step,
        staffCzech: 'Mluvím moc rychle?',
        staffMn: 'Би хэт хурдан ярьж байна уу?',
      };
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
  const correctedConfig = useMemo(() => {
    const microDialogues = Object.keys(config.microDialogues).reduce<Record<string, DialogueScenario>>((result, key) => {
      result[key] = correctDialogueCopy(config.microDialogues[key]);
      return result;
    }, {});
    return { ...config, microDialogues, finalDialogue: correctDialogueCopy(config.finalDialogue) };
  }, [config]);

  return (
    <div ref={rootRef}>
      <LegacyA0LessonEngine config={correctedConfig as unknown as LegacyA0LessonEngineConfig} />
      <DialogueSceneInjector lessonId={config.lessonId} rootRef={rootRef} />
    </div>
  );
};

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';
