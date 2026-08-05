/**
 * Azərbaycanca — mənbə lüğət.
 *
 * Bu faylın quruluşu `Dict` tipini müəyyən edir. `ru.ts` və `en.ts` eyni
 * açarlara malik olmalıdır; açar əskik olsa TypeScript build-i sındırır,
 * yəni boş mətn heç vaxt sayta çıxa bilməz.
 */
export const az = {
  nav: {
    about: 'Haqqımızda',
    rigs: 'Avadanlıq',
    games: 'Oyunlar',
    pricing: 'Qiymət',
    branches: 'Filiallar',
    contact: 'Əlaqə',
  },

  hero: {
    kicker: 'Yarış simulyatorları klubu',
    titleTop: 'Yüksək sürət,',
    titleBottom: 'cəriməsiz sürüşlər',
    lead: '',
    badgeHourSuffix: '1 saat',
    badgeBranches: '2 filial',
    badgeHoursPrefix: 'Gecə',
    badgeHoursSuffix: '-a kimi',
  },

  about: {
    kicker: 'Haqqımızda',
    title: 'Trek həmişə açıqdır',
    p1: 'Namazov Game Center yalnız yarış simulyatorlarına həsr olunmuş klubdur. Hər kokpit tam quraşdırılmış dəstdir: geri qaytarma qüvvəli sükan dəsti, üç pedal, geniş ekran və oyunu bir saniyə də ləngitməyən kompüter.',
    p2: 'İlk dəfə gəlirsənsə narahat olma, ayarları sənə uyğunlaşdırırıq, trek seçirik, ilk dövrələrdə yanında dururuq. Təcrübən varsa, vaxtını götür və öz rekordunu qov.',
    statRigs: 'Yarış masası',
    statPrice: 'Bir saat',
    statClose: 'İş saatları',
    statAge: 'Minimum yaş',
    statAgeValue: '12+',
  },

  rigs: {
    kicker: 'Avadanlıq',
    title: 'Kokpitin içində nə var',
    lead: 'Hər yer eyni səviyyədə qurulub — hansı kokpitə otursan, fərq hiss etməyəcəksən.',
    wheelLabel: 'Sükan dəsti',
    wheelDesc: 'Geri qaytarma qüvvəsi ilə yolu ovcunda hiss edirsən.',
    pedalsLabel: 'Pedallar',
    pedalsDesc: 'Qaz, əyləc, mufta və əl ilə sürət qutusu.',
    displayLabel: 'Ekran',
    displayDesc: 'Yüksək təzələnmə tezliyi, sürətdə görüntü dağılmır.',
    seatLabel: 'Oturacaq',
    seatDesc: 'Keyfiyyətli və yumşaq materiallar ilə maksimum rahatlıq.',
    pcLabel: 'Kompüter',
    pcDesc: 'Ayarları maksimumda saxlayan konfiqurasiya.',
    audioLabel: 'Səs',
    audioDesc: 'Mühərriki və təkərləri ayrı-ayrı eşidirsən.',
  },

  games: {
    kicker: 'Oyunlar',
    title: 'Nə sürəcəksən',
    lead: 'Ciddi simulyatordan rahat arcade-ə qədər, hansı tərz xoşuna gəlirsə.',
    more: 'Həmçinin oynanılır',
    note: 'Siyahı daim yenilənir. Xüsusi oyun istəyirsənsə, gələndə de — baxaq.',
  },

  pricing: {
    kicker: 'Qiymət',
    title: 'Sadə hesab',
    perHour: '1 saat',
    includesTitle: 'Qiymətə daxildir',
    include1: 'Kokpit və bütün avadanlıq',
    include2: 'İstədiyin oyun və trek',
    include3: 'İlk dəfədirsə, ayar və izah',
    include4: 'Minimum yaş həddi: 12+',
    note: 'Qabaqcadan ödəniş yoxdur. Vaxtı yerində seçirsən.',
  },

  branches: {
    kicker: 'Filiallar',
    title: 'Bizi harada tapacaqsan',
    lead: 'İki filial — biri Bakıda Nərimanov rayonunda, biri Xırdalanda. Hər ikisi eyni qiymət, eyni saatlarla işləyir.',
    addressLabel: 'Ünvan',
    phoneLabel: 'Telefon',
    hoursLabel: 'İş saatı',
    rigsLabel: 'yarış masası',
    mapAction: 'Xəritədə aç',
    phoneSoon: 'Tezliklə əlavə olunacaq',
    everyDay: 'Hər gün',
    xirdalanName: 'Xırdalan',
    xirdalanAddress: 'Qalubiyyə 60, Xırdalan',
    nerimanovName: 'Nərimanov',
    nerimanovAddress: 'Gülarə Qədirbəyova 14, Bakı',
  },

  gallery: {
    kicker: 'Qalereya',
    title: 'Klubun içi',
    soon: 'Şəkillər tezliklə əlavə olunacaq. Hələlik ən yeni görüntülərə Instagram və TikTok-da baxa bilərsən.',
    alt: {
      simHall: 'Namazov Game Center-in zalı — sıra ilə düzülmüş yarış masaları və oyunçular',
      cockpitRow: 'Yarış masasında oyunçu — sükan, pedallar və iki ekran',
      gallery1: 'Namazov Game Center yarış simulyatoru zalından görüntü',
      gallery2: 'Namazov Game Center yarış masası və avadanlıqlar',
    },
  },

  contact: {
    kicker: 'Əlaqə',
    title: 'Bizə yaz və ya zəng et',
    lead: 'Sualın varsa istənilən kanaldan yaz. Ən aktiv olduğumuz yer Instagram və TikTok-dur.',
    socialTitle: 'Sosial şəbəkələr',
    phonesTitle: 'Telefon',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    threads: 'Threads',
  },

  footer: {
    tagline: 'Yarış simulyatorları klubu · Xırdalan · Nərimanov',
    rights: 'Bütün hüquqlar qorunur.',
  },

  /** Fırlanan lentdəki qısa ifadələr. */
  ticker: {
    hour: 'saat',
    rigs: 'yarış masası',
    noAgeLimit: '12+ yaş həddi',
    proSimulator: 'Peşəkar yarış simulyatoru',
    wideGameSelection: 'Geniş oyun seçimi',
  },

  a11y: {
    language: 'Dil',
    menu: 'Menyu',
    toTop: 'Yuxarı qayıt',
  },
}

export type Dict = typeof az
