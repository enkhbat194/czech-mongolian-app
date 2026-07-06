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

/** Correct answer remains the same id; only its visible position changes per session. */
function shuffleDialogueChoices(scenario: DialogueScenario, seed: string): DialogueScenario {
  return {
    ...scenario,
    steps: scenario.steps.map((step) => {
      const correct = step.choices.find((choice) => choice.id === step.correctId);
      if (!correct || step.choices.length < 2) return step;
      const wrongChoices = step.choices.filter((choice) => choice.id !== step.correctId);
      const orderedWrongChoices = rotate(wrongChoices, hashText(`${seed}:wrong:${step.id}`));
      const targetSlot = hashText(`${seed}:slot:${step.id}`) % step.choices.length;
      const nextChoices: DialogueChoice[] = [...orderedWrongChoices];
      nextChoices.splice(targetSlot, 0, correct);
      return { ...step, choices: nextChoices };
    }),
  };
}

function hideForTransition(element: HTMLElement) {
  if (element.dataset.a0TransitionHidden === 'true') return;
  element.dataset.a0TransitionHidden = 'true';
  element.dataset.a0TransitionDisplay = element.style.display;
  element.style.display = 'none';
}

function restoreAfterTransition(element: HTMLElement) {
  if (element.dataset.a0TransitionHidden !== 'true') return;
  element.style.display = element.dataset.a0TransitionDisplay || '';
  delete element.dataset.a0TransitionHidden;
  delete element.dataset.a0TransitionDisplay;
}

function setTransitionLabel(label: HTMLElement, value: string) {
  if (!label.dataset.a0TransitionLabel) label.dataset.a0TransitionLabel = label.textContent || '';
  label.textContent = value;
}

function restoreTransitionLabel(label: HTMLElement) {
  if (!label.dataset.a0TransitionLabel) return;
  label.textContent = label.dataset.a0TransitionLabel;
  delete label.dataset.a0TransitionLabel;
}

const findAnswerLabel = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>('p')).find(
  (node) => node.textContent?.trim() === 'Таны хариу' || node.dataset.a0TransitionLabel === 'Таны хариу',
);

/**
 * The legacy dialogue renderer commits a staff bubble into history before its active bubble
 * has fully disappeared. This guard keeps exactly one staff bubble on screen and removes the
 * stale answer card while the learner's chosen answer is being read aloud.
 */
const DialogueTransitionGuard: React.FC<{ rootRef: React.RefObject<HTMLDivElement | null> }> = ({ rootRef }) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;

    const restoreAll = () => {
      root.querySelectorAll<HTMLElement>('[data-a0-transition-hidden="true"]').forEach(restoreAfterTransition);
      root.querySelectorAll<HTMLElement>('[data-a0-transition-label]').forEach(restoreTransitionLabel);
    };

    const sync = () => {
      const answerLabel = findAnswerLabel(root);
      if (!answerLabel) {
        restoreAll();
        return;
      }

      const answerSection = answerLabel.parentElement as HTMLElement | null;
      const dialoguePanel = answerSection?.parentElement as HTMLElement | null;
      const log = dialoguePanel?.firstElementChild as HTMLElement | null;
      if (!answerSection || !log) {
        restoreAll();
        return;
      }

      const isAdvancing = Array.from(answerSection.querySelectorAll('p')).some((node) => /^Зөв\./.test(node.textContent?.trim() || ''));
      if (!isAdvancing) {
        restoreAll();
        return;
      }

      const rows = Array.from(log.children) as HTMLElement[];
      const lastRow = rows[rows.length - 1];
      const lastCzech = lastRow?.querySelector('p')?.textContent?.trim() || '';
      const sameStaffAlreadyInHistory = lastCzech !== '' && rows.slice(0, -1).some((row) => row.querySelector('p')?.textContent?.trim() === lastCzech);
      if (lastRow && sameStaffAlreadyInHistory) hideForTransition(lastRow);

      const prompt = answerSection.querySelector('h2') as HTMLElement | null;
      if (prompt) hideForTransition(prompt);
      answerSection.querySelectorAll<HTMLElement>('button').forEach(hideForTransition);
      setTransitionLabel(answerLabel, 'ДАРААГИЙН МӨР РҮҮ ШИЛЖИЖ БАЙНА');
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(sync);
    };

    const observer = new MutationObserver(scheduleSync);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      restoreAll();
    };
  }, [rootRef]);

  return null;
};

/** Mobile compaction: one scene, one compact control row, and only the last dialogue turn. */
const DialogueLayoutCompactor: React.FC<{ rootRef: React.RefObject<HTMLDivElement | null> }> = ({ rootRef }) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;

    const sync = () => {
      const answerLabel = findAnswerLabel(root);
      const main = root.querySelector('main') as HTMLElement | null;
      if (!answerLabel || !main) return;

      const answerSection = answerLabel.parentElement as HTMLElement | null;
      const dialoguePanel = answerSection?.parentElement as HTMLElement | null;
      const log = dialoguePanel?.firstElementChild as HTMLElement | null;
      if (!answerSection || !dialoguePanel || !log) return;

      dialoguePanel.style.padding = '13px';
      dialoguePanel.style.borderRadius = '18px';
      log.style.maxHeight = 'none';
      log.style.overflowY = 'visible';
      log.style.paddingRight = '0';
      log.style.marginBottom = '10px';
      log.style.gap = '7px';

      const rows = Array.from(log.children) as HTMLElement[];
      rows.forEach((row, index) => {
        if (index < rows.length - 3) {
          row.dataset.a0HistoryCollapsed = 'true';
          row.style.display = 'none';
        }
      });

      const header = dialoguePanel.previousElementSibling as HTMLElement | null;
      if (!header || header.dataset.a0DialogueScene === 'true') return;
      const headerAutoButton = Array.from(header.querySelectorAll('button')).find((button) => button.textContent?.includes('Авто') || button.textContent?.includes('Дуугүй'));
      if (!headerAutoButton) return;

      header.style.padding = '8px 10px';
      header.style.marginBottom = '8px';
      header.style.borderRadius = '15px';
      header.style.minHeight = '42px';
      header.style.gap = '8px';

      const avatar = header.firstElementChild as HTMLElement | null;
      if (avatar) avatar.style.display = 'none';
      const copy = header.children[1] as HTMLElement | undefined;
      if (copy) {
        copy.style.minWidth = '0';
        const textRows = Array.from(copy.querySelectorAll<HTMLElement>('p'));
        if (textRows[0]) {
          textRows[0].style.fontSize = '12px';
          textRows[0].style.whiteSpace = 'nowrap';
          textRows[0].style.overflow = 'hidden';
          textRows[0].style.textOverflow = 'ellipsis';
        }
        if (textRows[1]) textRows[1].style.display = 'none';
      }
      (headerAutoButton as HTMLElement).style.padding = '6px 8px';
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(sync);
    };

    const observer = new MutationObserver(scheduleSync);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [rootRef]);

  return null;
};

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
      const isDialogueStage = Boolean(findAnswerLabel(root));
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
      hostRef.current?.remove();
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
      <DialogueTransitionGuard rootRef={rootRef} />
      <DialogueLayoutCompactor rootRef={rootRef} />
      <button onClick={() => setPage('a0DialoguePreview')} style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 30, padding: '10px 12px', borderRadius: 14, border: '1px solid rgba(200,149,42,.55)', background: '#1C1C1F', color: '#F5C842', boxShadow: '0 8px 22px rgba(0,0,0,.38)', fontSize: 12, fontWeight: 900, cursor: 'pointer' }}>
        💬 Яриаг шууд шалгах
      </button>
    </div>
  );
};

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';
