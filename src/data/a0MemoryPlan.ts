export type MemoryPriority = 'active' | 'support';

export interface A0MemoryTarget {
  id: string;
  lessonId: 'l001' | 'l002' | 'l003';
  czech: string;
  mongolian: string;
  priority: MemoryPriority;
  aliases?: string[];
  requiredCoverage: {
    card: number;
    recognition: number;
    retrieval: number;
    dialogue: number;
    carryover: number;
  };
}

const activeCoverage = {
  card: 1,
  recognition: 2,
  retrieval: 2,
  dialogue: 2,
  carryover: 2,
};

const supportCoverage = {
  card: 1,
  recognition: 1,
  retrieval: 1,
  dialogue: 1,
  carryover: 0,
};

export const a0MemoryTargets: A0MemoryTarget[] = [
  { id: 'a0c0001', lessonId: 'l001', czech: 'Dobrý den.', mongolian: 'Сайн байна уу.', priority: 'active', aliases: ['Dobrý den'], requiredCoverage: activeCoverage },
  { id: 'a0c0002', lessonId: 'l001', czech: 'Ahoj.', mongolian: 'Сайн уу.', priority: 'support', aliases: ['Ahoj'], requiredCoverage: supportCoverage },
  { id: 'a0c0003', lessonId: 'l001', czech: 'Na shledanou.', mongolian: 'Баяртай.', priority: 'active', aliases: ['Na shledanou'], requiredCoverage: activeCoverage },
  { id: 'a0c0004', lessonId: 'l001', czech: 'Prosím.', mongolian: 'Гуйя.', priority: 'support', aliases: ['Prosím'], requiredCoverage: supportCoverage },
  { id: 'a0c0005', lessonId: 'l001', czech: 'Děkuji.', mongolian: 'Баярлалаа.', priority: 'active', aliases: ['Děkuji', 'Děkuji. Na shledanou.'], requiredCoverage: activeCoverage },
  { id: 'a0c0006', lessonId: 'l001', czech: 'Ano.', mongolian: 'Тийм.', priority: 'active', aliases: ['Ano', 'Ano, prosím.', 'Ano, děkuji.'], requiredCoverage: activeCoverage },
  { id: 'a0c0007', lessonId: 'l001', czech: 'Ne.', mongolian: 'Үгүй.', priority: 'support', aliases: ['Ne', 'Ne, děkuji.'], requiredCoverage: supportCoverage },
  { id: 'a0c0008', lessonId: 'l001', czech: 'být', mongolian: 'байх', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0009', lessonId: 'l001', czech: 'já', mongolian: 'би', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0010', lessonId: 'l001', czech: 'vy', mongolian: 'та', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0011', lessonId: 'l001', czech: 'jmenovat se', mongolian: 'нэртэй байх', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0012', lessonId: 'l001', czech: 'Jak se jmenujete?', mongolian: 'Таны нэр хэн бэ?', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0013', lessonId: 'l001', czech: 'Jmenuji se …', mongolian: 'Миний нэр …', priority: 'active', aliases: ['Jmenuji se Eba.'], requiredCoverage: activeCoverage },
  { id: 'a0c0014', lessonId: 'l001', czech: 'kdo', mongolian: 'хэн', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0015', lessonId: 'l001', czech: 'Kdo jste?', mongolian: 'Та хэн бэ?', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0016', lessonId: 'l001', czech: 'Jak se máte?', mongolian: 'Та сайн уу?', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0017', lessonId: 'l001', czech: 'Dobře.', mongolian: 'Сайн.', priority: 'active', aliases: ['Dobře, děkuji.'], requiredCoverage: activeCoverage },
  { id: 'a0c0018', lessonId: 'l001', czech: 'Špatně.', mongolian: 'Муу.', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0019', lessonId: 'l001', czech: 'Odkud jste?', mongolian: 'Та хаанаас ирсэн бэ?', priority: 'active', aliases: ['Odkud?'], requiredCoverage: activeCoverage },
  { id: 'a0c0020', lessonId: 'l001', czech: 'z', mongolian: '-аас, -ээс', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0021', lessonId: 'l001', czech: 'Jsem z Mongolska.', mongolian: 'Би Монголоос ирсэн.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0022', lessonId: 'l001', czech: 'mluvit', mongolian: 'ярих', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0141', lessonId: 'l001', czech: 'pomalu', mongolian: 'удаанаар', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0326', lessonId: 'l001', czech: 'Nerozumím.', mongolian: 'Би ойлгохгүй байна.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0327', lessonId: 'l001', czech: 'Mluvte prosím pomalu.', mongolian: 'Удаан ярьж өгнө үү.', priority: 'active', requiredCoverage: activeCoverage },

  { id: 'a0c0023', lessonId: 'l002', czech: 'Potřebuji', mongolian: 'надад хэрэгтэй', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0024', lessonId: 'l002', czech: 'pomoc', mongolian: 'тусламж', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0025', lessonId: 'l002', czech: 'Potřebuji pomoc.', mongolian: 'Надад тусламж хэрэгтэй.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0026', lessonId: 'l002', czech: 'vodu', mongolian: 'ус', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0027', lessonId: 'l002', czech: 'Potřebuji vodu.', mongolian: 'Надад ус хэрэгтэй.', priority: 'active', aliases: ['Ano, potřebuji vodu.'], requiredCoverage: activeCoverage },
  { id: 'a0c0028', lessonId: 'l002', czech: 'telefon', mongolian: 'утас', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0029', lessonId: 'l002', czech: 'Potřebuji telefon.', mongolian: 'Надад утас хэрэгтэй.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0030', lessonId: 'l002', czech: 'Chci', mongolian: 'би хүсэж байна', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0031', lessonId: 'l002', czech: 'Chci vodu.', mongolian: 'Би ус хүсэж байна.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0032', lessonId: 'l002', czech: 'jídlo', mongolian: 'хоол', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0033', lessonId: 'l002', czech: 'Chci jídlo.', mongolian: 'Би хоол хүсэж байна.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0034', lessonId: 'l002', czech: 'něco', mongolian: 'ямар нэг зүйл', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0035', lessonId: 'l002', czech: 'Chci něco k jídlu.', mongolian: 'Би идэх юм хүсэж байна.', priority: 'active', aliases: ['Ano, chci něco k jídlu.'], requiredCoverage: activeCoverage },
  { id: 'a0c0036', lessonId: 'l002', czech: 'tohle', mongolian: 'үүнийг', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0037', lessonId: 'l002', czech: 'Chci tohle.', mongolian: 'Би үүнийг хүсэж байна.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0038', lessonId: 'l002', czech: 'Nemám', mongolian: 'надад байхгүй', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0039', lessonId: 'l002', czech: 'peníze', mongolian: 'мөнгө', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0040', lessonId: 'l002', czech: 'Nemám peníze.', mongolian: 'Надад мөнгө байхгүй.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0041', lessonId: 'l002', czech: 'kartu', mongolian: 'карт', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0042', lessonId: 'l002', czech: 'Nemám kartu.', mongolian: 'Надад карт байхгүй.', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0043', lessonId: 'l002', czech: 'Co potřebujete?', mongolian: 'Танд юу хэрэгтэй вэ?', priority: 'active', requiredCoverage: activeCoverage },
  { id: 'a0c0044', lessonId: 'l002', czech: 'Potřebuji pomoc, prosím.', mongolian: 'Надад туслаач, гуйя.', priority: 'active', requiredCoverage: activeCoverage },

  { id: 'a0c0045', lessonId: 'l003', czech: 'kde', mongolian: 'хаана', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0046', lessonId: 'l003', czech: 'toaleta', mongolian: 'ариун цэврийн өрөө', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0047', lessonId: 'l003', czech: 'Prosím, kde je toaleta?', mongolian: 'Уучлаарай, ариун цэврийн өрөө хаана байна?', priority: 'active', aliases: ['Kde je toaleta?'], requiredCoverage: activeCoverage },
  { id: 'a0c0048', lessonId: 'l003', czech: 'Tady.', mongolian: 'Энд.', priority: 'active', aliases: ['Tady', 'Toaleta je tady.', 'Lékárna je tady.'], requiredCoverage: activeCoverage },
  { id: 'a0c0049', lessonId: 'l003', czech: 'Tam.', mongolian: 'Тэнд.', priority: 'active', aliases: ['Tam', 'Obchod je tam.', 'Nádraží je tam.'], requiredCoverage: activeCoverage },
  { id: 'a0c0050', lessonId: 'l003', czech: 'obchod', mongolian: 'дэлгүүр', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0051', lessonId: 'l003', czech: 'Kde je obchod?', mongolian: 'Дэлгүүр хаана байна?', priority: 'active', aliases: ['Prosím, kde je obchod?'], requiredCoverage: activeCoverage },
  { id: 'a0c0052', lessonId: 'l003', czech: 'lékárna', mongolian: 'эмийн сан', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0053', lessonId: 'l003', czech: 'Kde je lékárna?', mongolian: 'Эмийн сан хаана байна?', priority: 'active', aliases: ['Prosím, kde je lékárna?'], requiredCoverage: activeCoverage },
  { id: 'a0c0054', lessonId: 'l003', czech: 'nádraží', mongolian: 'галт тэрэгний буудал', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0055', lessonId: 'l003', czech: 'Kde je nádraží?', mongolian: 'Галт тэрэгний буудал хаана байна?', priority: 'active', aliases: ['Prosím, kde je nádraží?'], requiredCoverage: activeCoverage },
  { id: 'a0c0056', lessonId: 'l003', czech: 'nebo', mongolian: 'эсвэл', priority: 'support', requiredCoverage: supportCoverage },
  { id: 'a0c0057', lessonId: 'l003', czech: 'Tady, nebo tam?', mongolian: 'Энд үү, тэнд үү?', priority: 'active', requiredCoverage: activeCoverage },
];

const lessonOrder = ['l001', 'l002', 'l003'];

function normalizeCzech(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getA0MemoryTarget(id: string) {
  return a0MemoryTargets.find((target) => target.id === id);
}

export function getA0MemoryTargetByCzech(text: string) {
  const normalized = normalizeCzech(text);
  return a0MemoryTargets.find((target) => {
    const candidates = [target.czech, ...(target.aliases || [])];
    return candidates.some((candidate) => normalizeCzech(candidate) === normalized);
  });
}

export function getPriorActiveTargetIds(lessonId: string) {
  const lessonIndex = lessonOrder.indexOf(lessonId);
  if (lessonIndex <= 0) return [];
  return a0MemoryTargets
    .filter((target) => target.priority === 'active' && lessonOrder.indexOf(target.lessonId) < lessonIndex)
    .map((target) => target.id);
}
