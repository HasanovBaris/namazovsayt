import type { ReactNode } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'
import { Reveal } from './Reveal'

interface SectionProps {
  /** Anchor id — the header nav links to this. */
  id?: string
  kicker: string
  title: string
  lead?: string
  /** Lifts the background one step, so sections alternate down the page. */
  alt?: boolean
  children: ReactNode
}

/**
 * One page band: constrained column, consistent vertical rhythm, and a
 * kicker / title / lead header. Every section on the site uses it so the
 * spacing never drifts.
 */
export function Section({ id, kicker, title, lead, alt, children }: SectionProps) {
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md

  return (
    <View
      nativeID={id}
      style={[
        styles.band,
        alt && styles.bandAlt,
        {
          paddingVertical: isDesktop ? 96 : 64,
          paddingHorizontal: isDesktop ? layout.gutterDesktop : layout.gutterMobile,
        },
      ]}
    >
      <View style={styles.column}>
        <Reveal>
          <View style={styles.header}>
            <View style={styles.kickerRow}>
              <View style={styles.kickerBar} />
              <Text style={styles.kicker}>{kicker}</Text>
            </View>

            <Text
              role="heading"
              aria-level={2}
              style={[styles.title, { fontSize: isDesktop ? 38 : 28 }]}
            >
              {title}
            </Text>

            {lead ? (
              <Text style={[styles.lead, { fontSize: isDesktop ? 17 : 15 }]}>
                {lead}
              </Text>
            ) : null}
          </View>
        </Reveal>

        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  band: {
    width: '100%',
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  bandAlt: {
    backgroundColor: colors.bgAlt,
  },
  column: {
    width: '100%',
    maxWidth: layout.maxWidth,
  },
  header: {
    marginBottom: 36,
    maxWidth: 680,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  kickerBar: {
    width: 22,
    height: 2,
    backgroundColor: colors.accent,
    marginRight: 10,
  },
  kicker: {
    ...typeScale.kicker,
    color: colors.accent,
  },
  title: {
    ...typeScale.sectionTitle,
    color: colors.text,
  },
  lead: {
    ...typeScale.body,
    color: colors.textDim,
    marginTop: 14,
  },
})
