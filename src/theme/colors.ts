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

  /** The orange straight off the logo wordmark — the single brand accent. */
  accent: '#FF9E00',
  accentSoft: 'rgba(255, 158, 0, 0.12)',
  accentEdge: 'rgba(255, 158, 0, 0.35)',

  /** A lighter gold, used sparingly for the headline number. */
  amber: '#FFC24A',
  amberSoft: 'rgba(255, 194, 74, 0.12)',

  text: '#F2F3F5',
  textDim: '#9AA0A8',
  textFaint: '#6A7079',

  white: '#FFFFFF',
} as const
