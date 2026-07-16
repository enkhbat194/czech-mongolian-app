import React from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import { getA0ReferenceLesson } from '../data/a0ReferenceLessons';

const A0FirstContactPage: React.FC = () => <A0LessonEngine config={getA0ReferenceLesson('l001')} />;

export default A0FirstContactPage;