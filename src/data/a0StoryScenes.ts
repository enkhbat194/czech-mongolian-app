export type A0StorySceneId = 'reception' | 'help' | 'building' | 'tram' | 'meeting' | 'work';

export interface A0StoryBeat {
  id: string;
  icon: string;
  titleMn: string;
  detailMn: string;
}

export interface A0StoryScene {
  lessonId: string;
  sceneId: A0StorySceneId;
  placeMn: string;
  contextMn: string;
  currentPhrases: string[];
  reusePhrases: string[];
  beats: A0StoryBeat[];
}

export const a0StoryScenes: Record<string, A0StoryScene> = {
  l001: {
    lessonId: 'l001',
    sceneId: 'reception',
    placeMn: 'Ресепшн дээр анх очих',
    contextMn: 'Та шинэ газарт орж, ажилтантай албан ёсоор мэндлээд өөрийгөө танилцуулна. Ойлгохгүй бол удаан ярихыг хүснэ.',
    currentPhrases: ['Dobrý den.', 'Jmenuji se …', 'Jsem z Mongolska.'],
    reusePhrases: ['Nerozumím.', 'Mluvte prosím pomalu.', 'Na shledanou.'],
    beats: [
      { id: 'greet', icon: '👋', titleMn: 'Мэндлэх', detailMn: 'Ресепшний ажилтантай албан ёсоор мэндэлнэ.' },
      { id: 'name', icon: '🪪', titleMn: 'Өөрийгөө танилцуулах', detailMn: 'Нэр болон хаанаас ирснээ хэлнэ.' },
      { id: 'clarify', icon: '💬', titleMn: 'Тодруулах', detailMn: 'Хэт хурдан яривал удаан ярихыг хүснэ.' },
      { id: 'close', icon: '🤝', titleMn: 'Эелдгээр хаах', detailMn: 'Талархаад баяртай гэж хэлнэ.' },
    ],
  },
  l002: {
    lessonId: 'l002',
    sceneId: 'help',
    placeMn: 'Ресепшн дээр тусламж хүсэх',
    contextMn: 'Та ус, утас, идэх юм хэрэгтэй болсон тул ресепшний ажилтнаас тусламж хүсэж байна.',
    currentPhrases: ['Potřebuji pomoc.', 'Potřebuji vodu.', 'Potřebuji telefon.'],
    reusePhrases: ['Dobrý den.', 'Děkuji.', 'Na shledanou.'],
    beats: [
      { id: 'greet', icon: '👋', titleMn: 'Мэндлэх', detailMn: 'Эелдгээр яриагаа эхэлнэ.' },
      { id: 'need', icon: '💧', titleMn: 'Хэрэгцээгээ хэлэх', detailMn: 'Ус, утас эсвэл тусламж хэрэгтэйгээ хэлнэ.' },
      { id: 'pay', icon: '💳', titleMn: 'Саадаа тайлбарлах', detailMn: 'Карт эсвэл мөнгө байхгүй бол хэлнэ.' },
      { id: 'close', icon: '🙏', titleMn: 'Талархах', detailMn: 'Тусалсны дараа баярлалаа гэж хэлнэ.' },
    ],
  },
  l003: {
    lessonId: 'l003',
    sceneId: 'building',
    placeMn: 'Танихгүй барилгын дотор',
    contextMn: 'Та хэрэгтэй газраа олохын тулд ариун цэврийн өрөө, дэлгүүр, эмийн сан болон буудлыг асууж байна.',
    currentPhrases: ['Prosím, kde je toaleta?', 'Kde je obchod?', 'Kde je lékárna?'],
    reusePhrases: ['Dobrý den.', 'Děkuji.', 'Nerozumím.'],
    beats: [
      { id: 'ask', icon: '📍', titleMn: 'Газар асуух', detailMn: 'Хэрэгтэй газраа эелдгээр асууна.' },
      { id: 'locate', icon: '🧭', titleMn: 'Байрлалыг ойлгох', detailMn: 'Tady / Tam гэсэн хариуг ялгана.' },
      { id: 'clarify', icon: '🗺️', titleMn: 'Тодруулах', detailMn: 'Газрын зураг дээр энд үү, тэнд үү гэж асууна.' },
      { id: 'close', icon: '🙏', titleMn: 'Талархах', detailMn: 'Зөв чиглэл авсныхаа дараа талархана.' },
    ],
  },
  l004: {
    lessonId: 'l004',
    sceneId: 'tram',
    placeMn: 'Трамвайн буудал ба зам',
    contextMn: 'Та буудал хайж, галт тэрэгний буудал руу яаж очихоо асуугаад трамвайгаар зөв явна.',
    currentPhrases: ['Kde je zastávka?', 'Jděte rovně.', 'Jeďte tramvají.'],
    reusePhrases: ['Dobrý den.', 'Tady / Tam.', 'Děkuji.'],
    beats: [
      { id: 'stop', icon: '🚏', titleMn: 'Буудал асуух', detailMn: 'Нийтийн тээврийн буудал хаана байгааг асууна.' },
      { id: 'walk', icon: '🚶', titleMn: 'Чиглэл дагах', detailMn: 'Шулуун, зүүн, баруун чиглэлийг ойлгоно.' },
      { id: 'tram', icon: '🚋', titleMn: 'Трамвайгаар явах', detailMn: 'Ямар тээврээр явах заавар авна.' },
      { id: 'exit', icon: '📍', titleMn: 'Бууна', detailMn: 'Зөв газраа буух зааврыг сонсож ойлгоно.' },
    ],
  },
  l005: {
    lessonId: 'l005',
    sceneId: 'meeting',
    placeMn: 'Кафе дээр уулзалтын цаг тохирох',
    contextMn: 'Та найзтайгаа уулзалтын цагийг тодруулж, маргааш эсвэл өнөө орой хэдэн цагт уулзахаа тохирно.',
    currentPhrases: ['Kdy máte čas?', 'Mám čas.', 'Máme schůzku v osm.'],
    reusePhrases: ['Dobrý den.', 'Jak se máte?', 'Děkuji.'],
    beats: [
      { id: 'greet', icon: '👋', titleMn: 'Мэндлэх', detailMn: 'Энгийн мэндчилгээгээр яриагаа эхэлнэ.' },
      { id: 'time', icon: '🕗', titleMn: 'Цаг асуух', detailMn: 'Өнөөдөр, маргааш, өглөө эсвэл оройг тодруулна.' },
      { id: 'confirm', icon: '✅', titleMn: 'Уулзалтыг батлах', detailMn: 'Найман цагийн уулзалтыг тохирно.' },
      { id: 'close', icon: '🤝', titleMn: 'Салах', detailMn: 'Талархаад эелдгээр баяртай гэж хэлнэ.' },
    ],
  },
  l006: {
    lessonId: 'l006',
    sceneId: 'work',
    placeMn: 'Ажлын эхний өдөр',
    contextMn: 'Та ахлагчтайгаа ажлын эхлэх, тарах цаг, завсарлага, шинэ даалгаврын талаар ярьж байна.',
    currentPhrases: ['Pracuji tady.', 'Kdy končíme?', 'Co mám dělat?'],
    reusePhrases: ['Dobrý den.', 'Nerozumím.', 'Potřebuji pomoc.'],
    beats: [
      { id: 'work', icon: '🦺', titleMn: 'Ажил дээр очих', detailMn: 'Энд ажилладгаа хэлнэ.' },
      { id: 'schedule', icon: '🕗', titleMn: 'Хуваарь асуух', detailMn: 'Эхлэх, тарах, завсарлагын цагийг лавлана.' },
      { id: 'task', icon: '📋', titleMn: 'Даалгавар тодруулах', detailMn: 'Юу хийхээ ойлгохгүй бол асууна.' },
      { id: 'help', icon: '🤝', titleMn: 'Тусламж хүсэх', detailMn: 'Шаардлагатай үед тусламж хүснэ.' },
    ],
  },
};

export function getA0StoryScene(lessonId: string): A0StoryScene {
  return a0StoryScenes[lessonId] || a0StoryScenes.l001;
}
