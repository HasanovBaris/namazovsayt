export const fonts = {
  /** Exo 2 — self-hosted variable font, covers Latin Ext (ə ğ ş ı) and Cyrillic. */
  display: '"Exo 2", "Segoe UI", system-ui, sans-serif',
  body: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
} as const

/**
 * `lineHeight` ratios are written as strings on purpose.
 *
 * react-native-web appends `px` to numeric style values, and `lineHeight` is
 * not on its unitless list — so `lineHeight: 1.4` would render as `1.4px` and
 * collapse the text. A string passes through untouched and stays a ratio,
 * which is what we want since font sizes change per breakpoint.
 */
export const typeScale = {
  hero: {
    fontFamily: fonts.display,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: '1.05',
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontWeight: '800',
    fontSize: 30,
    letterSpacing: -0.5,
    lineHeight: '1.15',
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: '1.3',
  },
  /** All-caps micro label above section titles. */
  kicker: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: '1.65',
  },
  small: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: '1.55',
  },
  mono: {
    fontFamily: fonts.display,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
} as const
