import { Children, type ReactNode } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { columnsFor, type Cols } from '../theme/layout'
import { Reveal } from './Reveal'

interface GridProps {
  children: ReactNode
  /** Column cap on the widest breakpoint. Narrower screens step down. */
  maxColumns?: Cols
  /** Space between cards, in pixels. */
  gap?: number
  /** Milliseconds added per card so they reveal in sequence, not together. */
  stagger?: number
}

/**
 * Responsive card grid.
 *
 * Uses percentage widths with a negative outer margin rather than `gap`, which
 * keeps the layout identical across browsers regardless of flex-gap support.
 */
export function Grid({
  children,
  maxColumns = 3,
  gap = 16,
  stagger = 70,
}: GridProps) {
  const { width } = useWindowDimensions()
  const columns = columnsFor(width, maxColumns)
  const half = gap / 2

  return (
    <View style={[styles.grid, { marginHorizontal: -half, marginVertical: -half }]}>
      {Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / columns}%`,
            paddingHorizontal: half,
            paddingVertical: half,
          }}
        >
          {/* Delay resets each row so a long grid never lags far behind. */}
          <Reveal delay={(index % columns) * stagger}>{child}</Reveal>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
})
