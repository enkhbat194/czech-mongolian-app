import React, { useState } from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import A0CarryoverReview from '../components/lessons/A0CarryoverReview';
import { getA0ReferenceLesson } from '../data/a0ReferenceLessons';

const A0NeedsPage: React.FC = () => {
  const [carryoverComplete, setCarryoverComplete] = useState(false);

  if (!carryoverComplete) {
    return <A0CarryoverReview lessonId="l002" onComplete={() => setCarryoverComplete(true)} />;
  }

  return <A0LessonEngine config={getA0ReferenceLesson('l002')} />;
};

export default A0NeedsPage;