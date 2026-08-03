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

interface CardPropsWithHover extends CardProps {
  /** Disables the lift-on-hover treatment (used for static panels). */
  flat?: boolean
}

/**
 * The single surface primitive — every panel on the site is one of these.
 *
 * The hover lift lives in a CSS class rather than in style props: transitions
 * and `:hover` are not expressible through react-native-web styles.
 */
export function Card({
  children,
  highlight,
  padding = 22,
  style,
  flat,
}: CardPropsWithHover) {
  const body = (
    <View style={[styles.card, { padding }, highlight && styles.cardHighlight, style]}>
      {highlight ? <View style={styles.topEdge} /> : null}
      {children}
    </View>
  )

  if (flat) return body

  return <div className="ngc-card">{body}</div>
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
