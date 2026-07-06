import React from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import { a0ReferenceLessons } from '../data/a0ReferenceLessons';

const A0FirstContactPage: React.FC = () => <A0LessonEngine config={a0ReferenceLessons.l001} />;

export default A0FirstContactPage;