/** Dark-only palette. The club runs until 02:00 — the site reads the same way. */
export const colors = {
  /** Page background. */
  bg: '#0A0B0D',
  /** Slightly lifted background for alternating bands. */
  bgAlt: '#0E1013',
  /** Card / panel surface. */
  surface: '#14161A',
  /** Hovered or emphasised surface. */
  surfaceHi: '#1A1D22',

  border: '#23262C',
  borderHi: '#33373F',

  /** Brake-light red — the single brand accent. */
  accent: '#FF2E17',
  accentSoft: 'rgba(255, 46, 23, 0.12)',
  accentEdge: 'rgba(255, 46, 23, 0.35)',

  /** Amber — used sparingly for the headline number. */
  amber: '#FFB020',
  amberSoft: 'rgba(255, 176, 32, 0.12)',

  text: '#F2F3F5',
  textDim: '#9AA0A8',
  textFaint: '#6A7079',

  white: '#FFFFFF',
} as const
