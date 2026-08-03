/**
 * ════════════════════════════════════════════════════════════════════════
 *  BÜTÜN MƏLUMATLAR BURADADIR — başqa fayla toxunmağa ehtiyac yoxdur.
 *  ВСЕ ДАННЫЕ ЗДЕСЬ.  ALL SITE FACTS LIVE HERE.
 *
 *  Telefon, ünvan, saat, qiymət dəyişəndə yalnız bu faylı redaktə et.
 *
 *  ⚠️  TODO işarəsi olan sətirlər təxminidir — dəqiq məlumatla əvəz et.
 * ════════════════════════════════════════════════════════════════════════
 */

export type BranchId = 'xirdalan' | 'nerimanov'

export interface Branch {
  id: BranchId
  /** Əsas filial siyahıda birinci gəlir və "əsas" nişanı alır. */
  isMain: boolean
  /** ⚠️ TODO — Instagram bio-dakı real nömrə ilə əvəz et. */
  phone: string
  /** Neçə simulyator var (təxmini). ⚠️ TODO */
  rigCount: number
  /** Google Maps axtarış linki. Dəqiq pin olanda düz koordinat linkini qoy. */
  mapUrl: string
}

export interface RigSpec {
  id: 'wheel' | 'pedals' | 'display' | 'seat' | 'pc' | 'audio'
  /** Tərcümə olunmayan texniki dəyər. ⚠️ TODO — real avadanlıqla əvəz et. */
  value: string
}

export const site = {
  name: 'Namazov Game Center',
  /** Sahibi — Rafiq Namazov. */
  owner: 'Rafiq Namazov',

  price: {
    hour: 5,
    currency: '₼',
    currencyCode: 'AZN',
  },

  hours: {
    /** ⚠️ TODO — açılış saatını dəqiqləşdir. */
    open: '10:00',
    /** Təsdiqlənib: gecə 02:00-a kimi işləyirlər. */
    close: '02:00',
    /** Həftənin bütün günləri. */
    everyDay: true,
  },

  /** Hər iki filialda cəmi simulyator sayı (təxmini). ⚠️ TODO */
  totalRigs: 15,

  /** Yaş həddi yoxdur — təsdiqlənib. */
  hasAgeLimit: false,

  social: {
    instagram: 'https://www.instagram.com/namazovgamecenter/',
    tiktok: 'https://www.tiktok.com/@namazovgamecenter',
    youtube: 'https://www.youtube.com/@namazovgamecenter',
    threads: 'https://www.threads.net/@namazovgamecenter',
  },

  branches: [
    {
      id: 'xirdalan',
      isMain: true,
      phone: '+994 __ ___ __ __', // ⚠️ TODO
      rigCount: 9, // ⚠️ TODO
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Namazov+Game+Center+Xirdalan',
    },
    {
      id: 'nerimanov',
      isMain: false,
      phone: '+994 __ ___ __ __', // ⚠️ TODO
      rigCount: 6, // ⚠️ TODO
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Namazov+Game+Center+2+Nerimanov+Baku',
    },
  ] satisfies Branch[],

  /**
   * Kokpitlərin avadanlığı. ⚠️ TODO — bu dəyərlər təxminidir,
   * real avadanlıqla əvəz olunmalıdır.
   */
  rigs: [
    { id: 'wheel', value: 'Logitech G923 · 900°' },
    { id: 'pedals', value: '3 pedal + H-shifter' },
    { id: 'display', value: '32" · 165 Hz' },
    { id: 'seat', value: 'Tam yarış kokpiti' },
    { id: 'pc', value: 'RTX 4060 · 32 GB RAM' },
    { id: 'audio', value: '7.1 qulaqlıq' },
  ] satisfies RigSpec[],

  /** Klubda mövcud oyunlar. ⚠️ TODO — siyahını dəqiqləşdir. */
  games: [
    'Assetto Corsa',
    'Assetto Corsa Competizione',
    'F1 25',
    'Forza Horizon 5',
    'EA Sports WRC',
    'BeamNG.drive',
    'Euro Truck Simulator 2',
    'CarX Drift Racing',
    'iRacing',
    'Need for Speed',
  ],

  /** Qalereya şəkilləri. Boş qalsa bölmə "tezliklə" göstərir. */
  gallery: [] as { src: string; alt: string }[],
} as const

/** `tel:` linki üçün nömrədən boşluq və işarələri təmizləyir. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Nömrə hələ doldurulmayıbsa — düymə passiv görünsün. */
export function isPlaceholderPhone(phone: string): boolean {
  return phone.includes('_')
}
