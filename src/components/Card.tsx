import type { ReactNode } from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { colors } from '../theme/colors'
import { layout } from '../theme/layout'

interface CardProps {
  children: ReactNode
  /** Draws the accent hairline along the top edge. */
  highlight?: boolean
  padding?: number
  style?: StyleProp<ViewStyle>
}

/** The single surface primitive — every panel on the site is one of these. */
export function Card({ children, highlight, padding = 22, style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding },
        highlight && styles.cardHighlight,
        style,
      ]}
    >
      {highlight ? <View style={styles.topEdge} /> : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radius,
    height: '100%',
    overflow: 'hidden',
  },
  cardHighlight: {
    borderColor: colors.accentEdge,
    backgroundColor: colors.surfaceHi,
  },
  topEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.accent,
  },
})
