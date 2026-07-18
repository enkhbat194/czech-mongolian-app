# Аудио үйлдвэрлэлийн дүрэм

## Файл нэршил

- Карт: `public/audio/words/<card-id>.mp3`
- Жишээ өгүүлбэр: `public/audio/examples/<example-id>.mp3`
- Сонсголын дасгал: `public/audio/exercises/<exercise-id>.mp3`
- Харилцан яриа: `public/audio/dialogues/<lesson-id>/<turn-id>.mp3`

Картын дугаар нь сургалтын өгөгдлийн `id`-тай яг ижил байна. Иймээс файл солигдсон, давхардсан, эсвэл буруу карт дээр тоглох эрсдэлгүй.

## Одоогийн туршилт

`manifests/a0-1-sample.json` нь A0.1-ийн 8 чухал хэллэгийн техникийн туршилтын багц юм. Энэ нь эцсийн A0 аудио багц биш.

Эхлээд:

```powershell
npm run audio:dry
```

гэсэн шалгалт амжилттай дуусна. Энэ команд Azure руу хүсэлт илгээхгүй, зөвхөн manifest болон гарах файлын замыг шалгана.

Дараа нь Azure Speech resource-ийн нууц утгуудыг зөвхөн тухайн компьютерийн environment variable эсвэл `.env.local` файлд оруулна. Тэдгээрийг GitHub, source code, чат руу хэзээ ч оруулахгүй.

Шаардлагатай local variable:

```text
AZURE_SPEECH_KEY
AZURE_SPEECH_REGION
```

Жишээ нь PowerShell-ийн одоогийн цонхонд оруулж болно:

```powershell
$env:AZURE_SPEECH_KEY = Read-Host 'Azure Speech resource key'
$env:AZURE_SPEECH_REGION = Read-Host 'Azure Speech region'
npm run audio:generate
```

Энэ нь 8 MP3 файлыг `public/audio/words/` руу үүсгэнэ. Нэгэнт үүссэн файлыг script дахин дарахгүй. Шинээр үүсгэхийн тулд `--force` ашиглана.

## Үйлдвэрлэлийн дараалал

1. A0.1–A0.15-ийн текст, дасгал, харилцан яриаг түгжинэ.
2. Нэг manifest-аар A0-ийн бүх аудиог batch-аар гаргана.
3. Сонсож чанарын хяналт хийж, буруу дуудлага/цэг тэмдэг/хурдыг засна.
4. Баталсан MP3 файлуудыг app assets болгон оруулна.
