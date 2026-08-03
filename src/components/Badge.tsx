import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'
import { layout } from '../theme/layout'

interface BadgeProps {
  icon?: ReactNode
  /** Emphasised leading part, e.g. the price. */
  strong?: string
  label: string
  tone?: 'default' | 'accent'
}

/** Hero fact pill: price, branch count, closing time. */
export function Badge({ icon, strong, label, tone = 'default' }: BadgeProps) {
  const accent = tone === 'accent'

  return (
    <View style={[styles.badge, accent && styles.badgeAccent]}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      {strong ? (
        <Text style={[styles.strong, accent && styles.strongAccent]}>{strong}</Text>
      ) : null}
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusPill,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  badgeAccent: {
    borderColor: colors.accentEdge,
    backgroundColor: colors.accentSoft,
  },
  icon: {
    marginRight: 8,
    justifyContent: 'center',
  },
  strong: {
    fontFamily: fonts.display,
    fontWeight: '800',
    fontSize: 15,
    color: colors.text,
    marginRight: 6,
  },
  strongAccent: {
    color: colors.amber,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textDim,
  },
})
