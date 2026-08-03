import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Badge } from '../components/Badge'
import { ClockIcon, PinIcon } from '../components/Icon'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'

/** Diagonal light streaks behind the headline — the only decoration on the page. */
function SpeedLines() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <linearGradient id="ngc-streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0" />
          <stop offset="55%" stopColor={colors.accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ngc-glow" cx="0.22" cy="0.35" r="0.6">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.14" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="700" fill="url(#ngc-glow)" />

      <g stroke="url(#ngc-streak)" strokeWidth="1.5">
        <line x1="-100" y1="120" x2="700" y2="-60" />
        <line x1="-100" y1="300" x2="900" y2="70" />
        <line x1="200" y1="720" x2="1300" y2="440" />
        <line x1="380" y1="760" x2="1300" y2="530" />
      </g>
    </svg>
  )
}

export function Hero() {
  const { t } = useI18n()
  const { width, height } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md
  const isWide = width >= breakpoints.lg

  const titleSize = isWide ? 76 : isDesktop ? 56 : 38

  return (
    <View
      nativeID="top"
      style={[
        styles.hero,
        {
          minHeight: Math.max(540, height * 0.84),
          paddingHorizontal: isDesktop ? layout.gutterDesktop : layout.gutterMobile,
        },
      ]}
    >
      <SpeedLines />

      <View style={styles.column}>
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <Text style={styles.kicker}>{t.hero.kicker}</Text>
        </View>

        <Text
          role="heading"
          aria-level={1}
          style={[styles.title, { fontSize: titleSize }]}
        >
          {t.hero.titleTop}
          {'\n'}
          <Text style={[styles.title, styles.titleAccent, { fontSize: titleSize }]}>
            {t.hero.titleBottom}
          </Text>
        </Text>

        <Text style={[styles.lead, { fontSize: isDesktop ? 18 : 15 }]}>
          {t.hero.lead}
        </Text>

        <View style={styles.badges}>
          <Badge
            tone="accent"
            strong={`${site.price.hour} ${site.price.currency}`}
            label={t.hero.badgeHourSuffix}
          />
          <Badge
            icon={<PinIcon size={16} color={colors.textDim} />}
            label={t.hero.badgeBranches}
          />
          <Badge
            icon={<ClockIcon size={16} color={colors.textDim} />}
            label={`${t.hero.badgeHoursPrefix} ${site.hours.close}${t.hero.badgeHoursSuffix}`}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    overflow: 'hidden',
    paddingVertical: 72,
  },
  column: {
    width: '100%',
    maxWidth: layout.maxWidth,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.accent,
    marginRight: 10,
  },
  kicker: {
    ...typeScale.kicker,
    color: colors.textDim,
  },
  title: {
    fontFamily: fonts.display,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1.5,
    lineHeight: '1.05',
  },
  titleAccent: {
    color: colors.accent,
  },
  lead: {
    ...typeScale.body,
    color: colors.textDim,
    marginTop: 24,
    maxWidth: 620,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 34,
  },
})
