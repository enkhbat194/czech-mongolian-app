import { a0DirectionsCards, a0DirectionsMicroLessons, getA0DirectionsCard } from './a0Directions';
import { a0TimeCards, a0TimeMicroLessons, getA0TimeCard } from './a0Time';
import { a0WorkCards, a0WorkMicroLessons, getA0WorkCard } from './a0Work';
import { a0DirectionsFinalDialogue, a0DirectionsMicroDialogues } from './a0DirectionsDialogues';
import { a0TimeFinalDialogue, a0TimeMicroDialogues } from './a0TimeDialogues';
import { a0WorkFinalDialogue, a0WorkMicroDialogues } from './a0WorkDialogues';
import { a0LessonMeta } from './a0LessonMeta';
import { defineA0Lesson, type A0LessonDefinition } from './a0LessonSchema';

export const a0ReferenceNewLessons: Record<'l004' | 'l005' | 'l006', A0LessonDefinition> = {
  l004: defineA0Lesson({
    lessonId:'l004', titleMn:a0LessonMeta.l004.titleMn, durationMinutes:a0LessonMeta.l004.durationMinutes, cards:a0DirectionsCards, microLessons:a0DirectionsMicroLessons, getCard:getA0DirectionsCard,
    microDialogues:a0DirectionsMicroDialogues, finalDialogue:a0DirectionsFinalDialogue, xpReward:180, completionIcon:'🚌',
    completionSummaryMn:'Та буудал асууж, шулуун, зүүн, баруун гэсэн чиглэлийг ойлгож, автобус эсвэл трамвайгаар явах, буух зааврыг дагаж чадна.',
    completionPhrases:['Kde je zastávka?','Jděte rovně.','Jeďte autobusem.','Vystupte tady.','Jdu na nádraží.'],
  }),
  l005: defineA0Lesson({
    lessonId:'l005', titleMn:a0LessonMeta.l005.titleMn, durationMinutes:a0LessonMeta.l005.durationMinutes, cards:a0TimeCards, microLessons:a0TimeMicroLessons, getCard:getA0TimeCard,
    microDialogues:a0TimeMicroDialogues, finalDialogue:a0TimeFinalDialogue, xpReward:190, completionIcon:'⏰',
    completionSummaryMn:'Та цаг асууж, өнөөдөр эсвэл маргаашийг тодруулж, завтай эсэхээ хэлж, найман, таван, арван хоёр цагийн мэдээллийг ойлгож чадна.',
    completionPhrases:['Kolik je hodin?','zítra','Kdy máte čas?','v pět','ve dvanáct','Máme schůzku v osm.'],
  }),
  l006: defineA0Lesson({
    lessonId:'l006', titleMn:a0LessonMeta.l006.titleMn, durationMinutes:a0LessonMeta.l006.durationMinutes, cards:a0WorkCards, microLessons:a0WorkMicroLessons, getCard:getA0WorkCard,
    microDialogues:a0WorkMicroDialogues, finalDialogue:a0WorkFinalDialogue, xpReward:200, completionIcon:'🦺',
    completionSummaryMn:'Та ажилладаг газраа хэлж, эхлэх болон тарах цаг, ээлж, завсарлагаа асууж, шинэ даалгавар дээр юу хийхээ асууж, үзүүлж өгөхийг хүсэж чадна.',
    completionPhrases:['Pracuji tady.','Začínáme v osm.','Kdy je přestávka?','Co mám dělat?','Ukažte mi, prosím.'],
  }),
};
