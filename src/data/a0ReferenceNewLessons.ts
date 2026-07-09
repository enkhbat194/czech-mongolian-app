import { a0DirectionsCards, a0DirectionsMicroLessons, getA0DirectionsCard } from './a0Directions';
import { a0TimeCards, a0TimeMicroLessons, getA0TimeCard } from './a0Time';
import { a0WorkCards, a0WorkMicroLessons, getA0WorkCard } from './a0Work';
import { a0FoodCards, a0FoodMicroLessons, getA0FoodCard } from './a0Food';
import { a0ShopCards, a0ShopMicroLessons, getA0ShopCard } from './a0Shop';
import { a0HomeCards, a0HomeMicroLessons, getA0HomeCard } from './a0Home';
import { a0HealthCards, a0HealthMicroLessons, getA0HealthCard } from './a0Health';
import { a0PhoneCards, a0PhoneMicroLessons, getA0PhoneCard } from './a0Phone';
import { a0DirectionsFinalDialogue, a0DirectionsMicroDialogues } from './a0DirectionsDialogues';
import { a0TimeFinalDialogue, a0TimeMicroDialogues } from './a0TimeDialogues';
import { a0WorkFinalDialogue, a0WorkMicroDialogues } from './a0WorkDialogues';
import { a0FoodFinalDialogue, a0FoodMicroDialogues } from './a0FoodDialogues';
import { a0ShopFinalDialogue, a0ShopMicroDialogues } from './a0ShopDialogues';
import { a0HomeFinalDialogue, a0HomeMicroDialogues } from './a0HomeDialogues';
import { a0HealthFinalDialogue, a0HealthMicroDialogues } from './a0HealthDialogues';
import { a0PhoneFinalDialogue, a0PhoneMicroDialogues } from './a0PhoneDialogues';
import { a0LessonMeta } from './a0LessonMeta';
import { defineA0Lesson, type A0LessonDefinition } from './a0LessonSchema';

export const a0ReferenceNewLessons: Record<'l004' | 'l005' | 'l006' | 'l007' | 'l008' | 'l009' | 'l010' | 'l011', A0LessonDefinition> = {
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
  l007: defineA0Lesson({
    lessonId:'l007', titleMn:a0LessonMeta.l007.titleMn, durationMinutes:a0LessonMeta.l007.durationMinutes, cards:a0FoodCards, microLessons:a0FoodMicroLessons, getCard:getA0FoodCard,
    microDialogues:a0FoodMicroDialogues, finalDialogue:a0FoodFinalDialogue, xpReward:210, completionIcon:'🍽️',
    completionSummaryMn:'Та кафед мэндэлж, цэс хүсэж, кофе/цай/шөл захиалж, авч явах эсэхээ хэлж, үнэ асууж, картаар эсвэл бэлнээр төлж чадна.',
    completionPhrases:['Menu, prosím.','Dám si kávu.','S sebou, prosím.','Kolik to stojí?','Platím kartou.'],
  }),
  l008: defineA0Lesson({
    lessonId:'l008', titleMn:a0LessonMeta.l008.titleMn, durationMinutes:a0LessonMeta.l008.durationMinutes, cards:a0ShopCards, microLessons:a0ShopMicroLessons, getCard:getA0ShopCard,
    microDialogues:a0ShopMicroDialogues, finalDialogue:a0ShopFinalDialogue, xpReward:220, completionIcon:'🛒',
    completionSummaryMn:'Та дэлгүүрт бараа зааж, уут болон баримт хүсэж, үнэ асууж, картаар төлөхөө хэлж чадна.',
    completionPhrases:['Tohle, prosím.','Tašku, prosím.','Účtenku, prosím.','Kolik to stojí?','Platím kartou.'],
  }),
  l009: defineA0Lesson({
    lessonId:'l009', titleMn:a0LessonMeta.l009.titleMn, durationMinutes:a0LessonMeta.l009.durationMinutes, cards:a0HomeCards, microLessons:a0HomeMicroLessons, getCard:getA0HomeCard,
    microDialogues:a0HomeMicroDialogues, finalDialogue:a0HomeFinalDialogue, xpReward:230, completionIcon:'🏠',
    completionSummaryMn:'Та өрөө, байр, түлхүүрийн тухай хэлж, асуудал байвал түлхүүр байхгүй, ус гарахгүй, хүйтэн байна гэж хэлж чадна.',
    completionPhrases:['Mám klíč.','Nemám klíč.','Je problém.','Neteče voda.','Je zima.'],
  }),
  l010: defineA0Lesson({
    lessonId:'l010', titleMn:a0LessonMeta.l010.titleMn, durationMinutes:a0LessonMeta.l010.durationMinutes, cards:a0HealthCards, microLessons:a0HealthMicroLessons, getCard:getA0HealthCard,
    microDialogues:a0HealthMicroDialogues, finalDialogue:a0HealthFinalDialogue, xpReward:240, completionIcon:'💊',
    completionSummaryMn:'Та эмийн санд өвдөж байгаа хэсгээ хэлж, халуурч байгаагаа хэлж, өвчин намдаах зүйл болон эм хэрэглэх заавар асууж чадна.',
    completionPhrases:['Bolí mě hlava.','Bolí mě břicho.','Mám teplotu.','Máte něco na bolest?','Jak to mám brát?'],
  }),
  l011: defineA0Lesson({
    lessonId:'l011', titleMn:a0LessonMeta.l011.titleMn, durationMinutes:a0LessonMeta.l011.durationMinutes, cards:a0PhoneCards, microLessons:a0PhoneMicroLessons, getCard:getA0PhoneCard,
    microDialogues:a0PhoneMicroDialogues, finalDialogue:a0PhoneFinalDialogue, xpReward:250, completionIcon:'📞',
    completionSummaryMn:'Та утсан дээр сонсож байгаа эсэхээ хэлж, ойлгохгүй бол дахин хэлүүлэх, удаан яриулах, бичүүлэх, SMS хүсэх чадвартай болно.',
    completionPhrases:['Slyším vás.','Ještě jednou, prosím.','Můžete to zopakovat?','Napište mi to, prosím.','Pošlete mi SMS, prosím.'],
  }),
};
