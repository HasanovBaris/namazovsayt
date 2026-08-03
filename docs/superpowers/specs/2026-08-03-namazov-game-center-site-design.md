# Namazov Game Center — Static Info Site

**Tarix:** 2026-08-03
**Status:** Təsdiqlənib, icraya hazır

## Məqsəd

Namazov Game Center üçün informativ static sayt. Ziyarətçi girib görsün: nə var, harada, neçəyə, nə vaxta kimi açıq, necə əlaqə saxlamaq olar. Rezervasiya sistemi, hesab, ödəniş — **yoxdur**.

## Biznes haqqında (araşdırma nəticəsi)

| | |
|---|---|
| Növ | Yarış simulyatorları klubu (sim racing) |
| Filiallar | Xırdalan (əsas, Qalubiyyə küç.) · Nərimanov (filial) |
| Simulyator sayı | ~15 |
| Avadanlıq | Yüksək parametrli PC-lər + direksiyon dəstləri |
| Qiymət | 1 saat — 5 ₼ |
| İş saatı | Gecə 02:00-a kimi |
| Yaş həddi | Yoxdur |
| Sahibi | Rafiq Namazov |
| Instagram | @namazovgamecenter |
| TikTok | @namazovgamecenter |
| YouTube | @namazovgamecenter |
| Threads | @namazovgamecenter |

**Doğrulanmayan məlumat:** telefon nömrələri, dəqiq ünvanlar, açılış saatı, avadanlıq modelləri. Instagram/TikTok bu mühitdən əlçatmazdır (503). Bunlar `src/data/content.ts` faylında açıq `PLACEHOLDER` kimi qeyd olunur və sahibi tərəfindən sonradan doldurulacaq.

## Qərarlar

**Texnologiya:** React Native Web + Vite + TypeScript.
Sahibi React Native istədi; prioritet isə deploy sürəti və səhifə sürətidir. Expo-nun web export-u ağır və yavaşdır, Vite build ~5 saniyədir və təmiz `dist/` verir. Qeyd: saf info sayt üçün `react-native-web` ~100KB əlavə çəki gətirir və funksional faydası yoxdur — sahibi bunu bilir və RN-i seçdi.

**Tək səhifə, sürüşmə bölmələri.** Router yoxdur — ən sürətli variant, məzmun az.

**Əsas addım (CTA) yoxdur.** Sahibinin qərarı: heç bir təzyiqli düymə olmasın, əlaqə vasitələri sadəcə alt-alta siyahılansın.

**Yalnız qaranlıq tema.** Klub gecə 02:00-a kimi işləyir; gaming üçün standartdır; iki tema saxlamaq lazımsız işdir.

**Üç dil: AZ / RU / EN.** Kitabxana yox — öz kiçik hook-umuz, `localStorage`-da yadda saxlanır. Standart dil AZ.

## Vizual sistem

```
Fon        #0A0B0D
Səth       #14161A
Kənar      #23262C
Aksent     #FF2E17   (əyləc işığı qırmızısı)
Aksent-2   #FFB020   (amber)
Mətn       #F2F3F5
Mətn zəif  #9AA0A8
```

**Şrift:** başlıqlar Exo 2 (Latin Ext + Kiril dəstəyi — həm `ə ğ ş ı`, həm rus əlifbası), mətn sistem şrift yığını. Öz serverimizdə `woff2`, xarici sorğu yoxdur.

**Logo:** SVG wordmark. "N" hərfi apeks/şevron bucağı kimi stilləşdirilir, yanında `NAMAZOV`, altında incə aralıqlı `GAME CENTER`. Tək rəngli, ~2KB.

## Bölmələr

1. **Hero** — logo, "Yüksək sürət, cəriməsiz sürüşlər", nişanlar: `1 saat 5 ₼` · `2 filial` · `02:00-a kimi`
2. **Haqqımızda** — 15+ simulyator, güclü PC-lər, yaş həddi yoxdur
3. **Avadanlıq** — kartlar: direksiyon, pedallar, ekran, yarış oturacağı
4. **Oyunlar** — çiplər: Assetto Corsa, ACC, F1, Forza Horizon, Dirt Rally, BeamNG, ETS2
5. **Qiymət** — böyük kart: 1 saat — 5 ₼
6. **Filiallar** — 2 kart, hərəsində ünvan, saat, telefon, xəritə linki
7. **Qalereya** — placeholder grid (şəkillər sonra)
8. **Əlaqə** — Instagram, TikTok, YouTube, Threads, telefon — sakit siyahı
9. **Footer**

## Arxitektura

```
src/
  App.tsx
  theme/       colors.ts, typography.ts, layout.ts
  i18n/        index.ts, az.ts, ru.ts, en.ts
  data/        content.ts          ← telefon, ünvan, saat, qiymət
  components/  Header, Logo, Section, Card, Chip, Badge, LangSwitch, Footer
  sections/    Hero, About, Rigs, Games, Pricing, Branches, Gallery, Contact
```

**Məlumat qatı:** bütün dəyişkən faktlar (telefon, ünvan, saat, qiymət, sosial linklər) yalnız `src/data/content.ts` faylındadır. Komponentlər bu faylı oxuyur, heç bir fakt komponentin içində yazılmır. Telefon dəyişəndə bir sətir dəyişir.

**Dil qatı:** `i18n/az.ts` tip mənbəyidir; `ru.ts` və `en.ts` həmin tipə uyğun olmalıdır. Açar əskik olsa TypeScript build-i sındırır — boş mətn sayta çıxa bilmir.

**Responsiv:** mobil-öncə. Sınma nöqtələri 768px (2 sütun) və 1080px (3 sütun), `useWindowDimensions` ilə.

## Deploy

Render → Static Site, GitHub reposundan.
Build: `npm ci && npm run build` · Publish directory: `dist`

`index.html`-də SEO meta taglar + hər filial üçün JSON-LD `LocalBusiness` sxemi.

## Yoxlama

Şəkilsiz static sayt olduğu üçün ağır test yığını lazım deyil. Yoxlanan iki şey:

1. **Dil açarlarının uyğunluğu** — TypeScript tipi ilə, build zamanı avtomatik.
2. **Build səhvsiz keçir** — `npm run build`.

Qalanı brauzerdə üç ölçüdə gözlə yoxlanır: mobil (390px), planşet (768px), masaüstü (1440px).

**Performans hədəfi:** ümumi < 150KB gzip, ilk açılış < 1 saniyə.

## Əhatə dairəsindən kənar

Rezervasiya sistemi, ödəniş, istifadəçi hesabı, admin panel, CMS, blog, analitika, mobil tətbiq. Bunların heç biri bu mərhələdə yoxdur.
