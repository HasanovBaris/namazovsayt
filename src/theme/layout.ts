export const layout = {
  /** Content column cap; the page itself is full-bleed. */
  maxWidth: 1120,
  gutterMobile: 20,
  gutterDesktop: 32,
  radius: 16,
  radiusSm: 10,
  radiusPill: 999,
  headerHeight: 76,
} as const

export const breakpoints = {
  /** Two-column grids and the desktop header start here. */
  md: 768,
  /** Three-column grids start here. */
  lg: 1080,
} as const

export type Cols = 1 | 2 | 3

/** Column count for a card grid at the given viewport width. */
export function columnsFor(width: number, max: Cols = 3): Cols {
  if (width >= breakpoints.lg) return Math.min(3, max) as Cols
  if (width >= breakpoints.md) return Math.min(2, max) as Cols
  return 1
}
