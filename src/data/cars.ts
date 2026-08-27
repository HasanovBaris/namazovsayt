/**
 * ════════════════════════════════════════════════════════════════════════
 *  QARAJ — serverdə sürülən avtomobillərin siyahısı.
 *
 *  Şəkillər: `public/media/cars/<slug>.jpg`        (1400 px — böyük baxış)
 *            `public/media/cars/thumbs/<slug>.jpg` (760 px  — şəbəkə)
 *
 *  Yeni maşın əlavə etmək üçün hər iki şəkli həmin adla qoy və aşağıya
 *  bir sətir yaz. Ad tərcümə olunmur — marka və model hər dildə eynidir.
 * ════════════════════════════════════════════════════════════════════════
 */

/** Filtr düymələri bu sıra ilə görünür. `all` həmişə birincidir. */
export const CAR_BRANDS = [
  'bmw',
  'mercedes',
  'hyundai',
  'kia',
  'toyota',
  'chevrolet',
  'other',
] as const

export type CarBrand = (typeof CAR_BRANDS)[number]

/** Filtr düyməsinin üstündəki yazı — marka adı tərcümə olunmur, `other`-dən başqa. */
export const BRAND_LABELS: Record<Exclude<CarBrand, 'other'>, string> = {
  bmw: 'BMW',
  mercedes: 'Mercedes-Benz',
  hyundai: 'Hyundai',
  kia: 'Kia',
  toyota: 'Toyota',
  chevrolet: 'Chevrolet',
}

export interface Car {
  /** Fayl adı — `public/media/cars` içindəki şəkil bu adla axtarılır. */
  slug: string
  /** Kartın altındakı ad. Tərcümə olunmur. */
  name: string
  brand: CarBrand
}

/** Şəbəkədəki sıra — ilk ekranda ən göz oxşayanlar dayanır. */
export const cars: Car[] = [
  { slug: 'mercedes-amg-g-63', name: 'Mercedes-AMG G 63 (W463)', brand: 'mercedes' },
  { slug: 'audi-rs6-c8', name: 'Audi RS 6 Avant (C8)', brand: 'other' },
  { slug: 'range-rover-l460', name: 'Range Rover (L460)', brand: 'other' },
  { slug: 'bmw-m5-f90', name: 'BMW M5 (F90)', brand: 'bmw' },
  { slug: 'mercedes-amg-gle63-w166', name: 'Mercedes-AMG GLE 63 (W166)', brand: 'mercedes' },
  { slug: 'bmw-x7-g07', name: 'BMW X7 (G07)', brand: 'bmw' },
  { slug: 'bmw-m4-f82', name: 'BMW M4 (F82)', brand: 'bmw' },
  { slug: 'porsche-cayenne', name: 'Porsche Cayenne', brand: 'other' },
  { slug: 'mercedes-amg-cls63-c218', name: 'Mercedes-AMG CLS 63 (C218)', brand: 'mercedes' },
  { slug: 'bmw-m3-f80', name: 'BMW M3 (F80)', brand: 'bmw' },
  { slug: 'bmw-x5m-g05', name: 'BMW X5 M (G05)', brand: 'bmw' },
  { slug: 'mercedes-amg-c43-w205', name: 'Mercedes-AMG C 43 (W205)', brand: 'mercedes' },

  { slug: 'bmw-m5-e60', name: 'BMW M5 (E60)', brand: 'bmw' },
  { slug: 'bmw-m5-f10', name: 'BMW M5 (F10)', brand: 'bmw' },
  { slug: 'bmw-x5m-f85', name: 'BMW X5 M (F85)', brand: 'bmw' },
  { slug: 'mercedes-amg-e63-w211', name: 'Mercedes-AMG E 63 (W211)', brand: 'mercedes' },
  { slug: 'bmw-x5m-e70', name: 'BMW X5 M (E70)', brand: 'bmw' },
  { slug: 'mercedes-amg-cls-c219', name: 'Mercedes-AMG CLS 55 (C219)', brand: 'mercedes' },
  { slug: 'bmw-5-g30', name: 'BMW 5 Series (G30)', brand: 'bmw' },
  { slug: 'li-auto-l9', name: 'Li Auto L9', brand: 'other' },
  { slug: 'bmw-5-f10', name: 'BMW 5 Series (F10)', brand: 'bmw' },
  { slug: 'mercedes-c-w206', name: 'Mercedes-Benz C-Class (W206)', brand: 'mercedes' },
  { slug: 'byd-han', name: 'BYD Han', brand: 'other' },
  { slug: 'bmw-3-g20', name: 'BMW 3 Series (G20)', brand: 'bmw' },

  { slug: 'bmw-m5-e39', name: 'BMW M5 (E39)', brand: 'bmw' },
  { slug: 'mercedes-e55-amg-w210', name: 'Mercedes-Benz E 55 AMG (W210)', brand: 'mercedes' },
  { slug: 'bmw-5-e34', name: 'BMW 5 Series (E34)', brand: 'bmw' },
  { slug: 'mercedes-c-w202', name: 'Mercedes-Benz C-Class (W202)', brand: 'mercedes' },

  { slug: 'bmw-3-f30-msport', name: 'BMW 3 Series (F30) M Sport', brand: 'bmw' },
  { slug: 'bmw-3-f30', name: 'BMW 3 Series (F30)', brand: 'bmw' },
  { slug: 'hyundai-grandeur-gn7', name: 'Hyundai Grandeur (GN7)', brand: 'hyundai' },
  { slug: 'hyundai-sonata-dn8', name: 'Hyundai Sonata (DN8)', brand: 'hyundai' },
  { slug: 'kia-k5-dl3', name: 'Kia K5 (DL3)', brand: 'kia' },
  { slug: 'hyundai-santa-fe-dm', name: 'Hyundai Santa Fe (DM)', brand: 'hyundai' },
  { slug: 'kia-sorento-um', name: 'Kia Sorento (UM)', brand: 'kia' },
  { slug: 'toyota-camry-xv80', name: 'Toyota Camry (XV80)', brand: 'toyota' },
  { slug: 'toyota-camry-xv70', name: 'Toyota Camry (XV70)', brand: 'toyota' },
  { slug: 'hyundai-sonata-lf', name: 'Hyundai Sonata (LF)', brand: 'hyundai' },
  { slug: 'hyundai-grandeur-hg', name: 'Hyundai Grandeur (HG)', brand: 'hyundai' },
  { slug: 'hyundai-sonata-yf', name: 'Hyundai Sonata (YF)', brand: 'hyundai' },
  { slug: 'kia-optima-tf', name: 'Kia Optima (TF)', brand: 'kia' },
  { slug: 'hyundai-sonata-nf', name: 'Hyundai Sonata (NF)', brand: 'hyundai' },
  { slug: 'hyundai-elantra-ad', name: 'Hyundai Elantra (AD)', brand: 'hyundai' },
  { slug: 'hyundai-elantra-md', name: 'Hyundai Elantra (MD)', brand: 'hyundai' },
  { slug: 'chevrolet-malibu', name: 'Chevrolet Malibu', brand: 'chevrolet' },
  { slug: 'chevrolet-cruze', name: 'Chevrolet Cruze', brand: 'chevrolet' },
  { slug: 'toyota-corolla-e210', name: 'Toyota Corolla (E210)', brand: 'toyota' },
  { slug: 'kia-cerato-yd', name: 'Kia Cerato (YD)', brand: 'kia' },
  { slug: 'chevrolet-cobalt', name: 'Chevrolet Cobalt', brand: 'chevrolet' },
  { slug: 'hyundai-accent-rb', name: 'Hyundai Accent (RB)', brand: 'hyundai' },
  { slug: 'toyota-prius-xw30', name: 'Toyota Prius (XW30)', brand: 'toyota' },
  { slug: 'toyota-prius-xw20', name: 'Toyota Prius (XW20)', brand: 'toyota' },
  { slug: 'ikco-dena', name: 'IKCO Dena', brand: 'other' },
  { slug: 'ikco-samand', name: 'IKCO Samand', brand: 'other' },
]

export const CAR_IMAGE_DIR = '/media/cars'

/** Şəbəkə üçün kiçik şəkil. */
export function carThumb(car: Car): string {
  return `${CAR_IMAGE_DIR}/thumbs/${car.slug}.jpg`
}

/** Lightbox üçün böyük şəkil. */
export function carPhoto(car: Car): string {
  return `${CAR_IMAGE_DIR}/${car.slug}.jpg`
}
