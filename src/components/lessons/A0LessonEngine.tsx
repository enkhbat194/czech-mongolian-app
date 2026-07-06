import React, { useState } from 'react';
import LegacyA0LessonEngine from './A0LessonEngineV5';
import type { A0LessonEngineConfig as LegacyA0LessonEngineConfig } from './A0LessonEngineV5';
import type { A0LessonDefinition } from '../../data/a0LessonSchema';
import A0StoryMission from './A0StoryMission';
import { useAppStore } from '../../stores/useAppStore';

const A0LessonEngine: React.FC<{ config: A0LessonDefinition }> = ({ config }) => {
  const [showStoryMission, setShowStoryMission] = useState(true);
  const setPage = useAppStore((state) => state.setPage);

  if (showStoryMission) {
    return (
      <A0StoryMission
        lessonId={config.lessonId}
        lessonTitleMn={config.titleMn}
        onBack={() => setPage('path')}
        onStart={() => setShowStoryMission(false)}
      />
    );
  }

  return <LegacyA0LessonEngine config={config as unknown as LegacyA0LessonEngineConfig} />;
};

export default A0LessonEngine;
export type { A0LessonDefinition } from '../../data/a0LessonSchema';
