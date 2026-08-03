import { Children, type ReactNode } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { columnsFor, type Cols } from '../theme/layout'

interface GridProps {
  children: ReactNode
  /** Column cap on the widest breakpoint. Narrower screens step down. */
  maxColumns?: Cols
  /** Space between cards, in pixels. */
  gap?: number
}

/**
 * Responsive card grid.
 *
 * Uses percentage widths with a negative outer margin rather than `gap`, which
 * keeps the layout identical across browsers regardless of flex-gap support.
 */
export function Grid({ children, maxColumns = 3, gap = 16 }: GridProps) {
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
          {child}
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
