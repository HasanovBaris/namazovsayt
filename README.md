# Namazov Game Center — sayt

Yarış simulyatorları klubunun informativ static saytı. Üç dildə (AZ / RU / EN),
tək səhifə, şəkilsiz — ona görə çox yüngüldür.

**Texnologiya:** React Native Web + Vite + TypeScript
**Ölçü:** ~87 KB gzip (JS) + ~40 KB şrift

---

## Məlumatı necə dəyişirəm?

Bircə fayl: **`src/data/content.ts`**

Telefon, ünvan, iş saatı, qiymət, simulyator sayı, oyun siyahısı, sosial
linklər — hamısı ordadır. Bir sətir dəyişirsən, bütün sayta yayılır.

Faylda `⚠️ TODO` işarəsi olan sətirlər **hələ təxminidir** və real məlumatla
əvəz olunmalıdır:

| Sətir | Nə lazımdır |
|---|---|
| `branches[].phone` | Hər iki filialın real nömrəsi |
| `hours.open` | Açılış saatı (bağlanış 02:00 təsdiqlənib) |
| `branches[].rigCount` | Hər filialda neçə kokpit var |
| `totalRigs` | Ümumi say |
| `rigs[].value` | Real avadanlıq (direksiyon modeli, ekran, PC) |
| `games` | Klubda olan real oyun siyahısı |

Nömrə doldurulmayana qədər sayt "Tezliklə əlavə olunacaq" yazır — səhv nömrə
göstərmir.

### Mətnləri dəyişmək

`src/i18n/az.ts` (Azərbaycanca), `ru.ts` (Rusca), `en.ts` (İngiliscə).

Üç fayl eyni açarlara malik olmalıdır. Birində açar əskik olsa **build sınır** —
yəni yarımçıq tərcümə sayta çıxa bilmir.

### Şəkil əlavə etmək

1. Şəkilləri `public/photos/` qovluğuna at.
2. `content.ts` → `gallery` massivini doldur:
   ```ts
   gallery: [
     { src: '/photos/1.jpg', alt: 'Yarış kokpiti' },
     { src: '/photos/2.jpg', alt: 'Klubun içi' },
   ]
   ```

Massiv boş olduğu müddətdə qalereya placeholder göstərir.

---

## Əmrlər

```bash
npm install      # bir dəfə
npm run dev      # lokal server → http://localhost:5173
npm run build    # dist/ qovluğuna yığır
npm run preview  # yığılmış versiyanı yoxlayır
npm run smoke    # bütün bölmələrin render olduğunu yoxlayır
npm run typecheck
```

`npm run build` avtomatik olaraq əvvəlcə `tsc` işlədir — tip səhvi varsa
build dayanır.

---

## Render-ə deploy

Repoda `render.yaml` var, ona görə:

**Render → New → Blueprint → bu reponu seç → Apply.**

Blueprint istifadə etməsən, əl ilə:

| Parametr | Dəyər |
|---|---|
| Type | Static Site |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |

Hər `git push` yeni deploy başladır.

---

## Quruluş

```
src/
  App.tsx              bölmələrin sırası
  data/content.ts      ← BÜTÜN MƏLUMAT BURADADIR
  i18n/                az.ts · ru.ts · en.ts + dil hook-u
  theme/               rənglər, şriftlər, ölçülər
  components/          Header, Logo, Section, Card, Chip, Badge, Grid, Footer, Icon
  sections/            Hero, About, Rigs, Games, Pricing, Branches, Gallery, Contact
scripts/ssr-smoke.tsx  render yoxlaması
docs/superpowers/specs/  dizayn sənədi
```

## Qeydlər

- Sayt yalnız qaranlıq temadadır — ayrıca açıq tema yoxdur.
- Exo 2 şrifti `public/fonts/` qovluğunda saxlanır, Google-a heç bir sorğu getmir.
- Logo `src/components/Logo.tsx` faylında inline SVG-dir, ayrıca fayl deyil.
- Rezervasiya, ödəniş, admin panel yoxdur — sayt sırf informativdir.
