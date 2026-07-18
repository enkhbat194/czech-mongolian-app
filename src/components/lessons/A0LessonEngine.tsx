import React from 'react';
import A0LessonEngineV5 from './A0LessonEngineV5';
import type { A0LessonDefinition } from '../../data/a0LessonSchema';

/**
 * Temporary adapter while the lesson core is renamed in a later cleanup commit.
 * The lesson UI owns its React state directly; no DOM observers or selector-based
 * patches are allowed around it.
 */
const A0LessonEngine: React.FC<{ config: A0LessonDefinition }> = ({ config }) => (
  <A0LessonEngineV5 config={config} />
);

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';
