import React from 'react';
import LegacyA0LessonEngine from './A0LessonEngineV5';
import type { A0LessonEngineConfig as LegacyA0LessonEngineConfig } from './A0LessonEngineV5';
import type { A0LessonDefinition } from '../../data/a0LessonSchema';

const A0LessonEngine: React.FC<{ config: A0LessonDefinition }> = ({ config }) => (
  <LegacyA0LessonEngine config={config as unknown as LegacyA0LessonEngineConfig} />
);

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';