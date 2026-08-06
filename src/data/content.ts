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
  /** Təsdiqlənib. */
  phone: string
  /** Neçə yarış masası var. Təsdiqlənib. */
  rigCount: number
  /** Google Maps axtarış linki. Dəqiq pin olanda düz koordinat linkini qoy. */
  mapUrl: string
}

export interface RigSpec {
  id: 'wheel' | 'pedals' | 'display' | 'seat' | 'pc' | 'audio'
  /** Tərcümə olunmayan texniki dəyər. ⚠️ TODO — real avadanlıqla əvəz et. */
  value: string
  image?: string
}

export interface Game {
  /** Oyunun adı — tərcümə olunmur. */
  name: string
  /** `public/media/games` içindəki logo. Logosu olmayan oyun yazı kimi görünür. */
  logo?: string
}

export interface Photo {
  /** Alt mətni `t.gallery.alt[id]` açarından gəlir. */
  id: 'simHall' | 'cockpitRow' | 'gallery1' | 'gallery2'
  src: string
}

export const site = {
  name: 'Namazov Game Center',
  /** Sahibi — Rafiq Namazov. */
  owner: 'Rafiq Namazov',

  /** Klubun öz logosu — başlıqda, altlıqda və favicon-da. */
  logo: '/media/brand/namazov-game-center.png',

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

  /** Hər iki filialda cəmi yarış masası: 9 + 15. */
  totalRigs: 24,

  /** Minimum yaş həddi: 12+. */
  minAge: '12+',

  social: {
    instagram: 'https://www.instagram.com/namazovgamecenter/',
    tiktok: 'https://www.tiktok.com/@namazovgamecenter',
    youtube: 'https://www.youtube.com/@namazovgamecenter',
    threads: 'https://www.threads.net/@namazovgamecenter',
  },

  branches: [
    {
      id: 'xirdalan',
      phone: '+994 55 479 72 01',
      rigCount: 9,
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Namazov+Game+Center+Qalubiyya+60+Khirdalan',
    },
    {
      id: 'nerimanov',
      phone: '+994 55 479 72 02',
      rigCount: 15,
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Namazov+Game+Center+Gulara+Qadirbayova+14+Baku',
    },
  ] satisfies Branch[],

  /**
   * Kokpitlərin avadanlığı. ⚠️ TODO — bu dəyərlər təxminidir,
   * real avadanlıqla əvəz olunmalıdır.
   */
  rigs: [
    { id: 'wheel', value: 'Logitech G29 · 900°', image: '/media/photos/logitech-g29.jpg' },
    { id: 'pedals', value: '3 pedal + H-shifter' },
    { id: 'display', value: '32" · 165 Hz' },
    { id: 'seat', value: 'AndaSeat Chair Luna / 2E Gaming Chair BASAN Black/Red' },
    { id: 'pc', value: 'RTX 3060 / 4060 / 5060 · 32 GB RAM' },
    { id: 'audio', value: 'HyperX Cloud III' },
  ] satisfies RigSpec[],

  /**
   * Klubda mövcud oyunlar. Logosu olanlar yuxarıda lövhə kimi,
   * qalanları altda yazı kimi görünür. ⚠️ TODO — siyahını dəqiqləşdir.
   */
  games: [
    { name: '3D Qaraj', logo: '/media/games/3d-qaraj.png' },
    { name: 'Assetto Corsa', logo: '/media/games/assetto-corsa.png' },
    { name: 'Forza Horizon 5', logo: '/media/games/forza-horizon-5.png' },
    { name: 'Grand Theft Auto V', logo: '/media/games/grand-theft-auto-v.png' },
    {
      name: 'Euro Truck Simulator 2',
      logo: '/media/games/euro-truck-simulator-2.png',
    },
    {
      name: 'American Truck Simulator',
      logo: '/media/games/american-truck-simulator.png',
    },
  ] satisfies Game[],

  /** Qalereya şəkilləri. Boş qalsa bölmə "tezliklə" göstərir. */
  gallery: [
    { id: 'simHall', src: '/media/photos/sim-hall.jpg' },
    { id: 'cockpitRow', src: '/media/photos/cockpit-row.jpg' },
    { id: 'gallery1', src: '/media/photos/gallery-1.jpg' },
    { id: 'gallery2', src: '/media/photos/gallery-2.jpg' },
  ] satisfies Photo[],

  /** Hero-nun arxa fonu — qalereyadakı şəkillərdən biri təkrar işlədilir. */
  heroPhoto: '/media/photos/sim-hall.jpg',
} as const

/** `tel:` linki üçün nömrədən boşluq və işarələri təmizləyir. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Nömrə hələ doldurulmayıbsa — düymə passiv görünsün. */
export function isPlaceholderPhone(phone: string): boolean {
  return phone.includes('_')
}
