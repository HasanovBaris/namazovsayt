import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Badge } from '../components/Badge'
import { ClockIcon, PinIcon } from '../components/Icon'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'

/**
 * The moving backdrop: a breathing glow, a faint perspective grid, and four
 * light streaks that drift across at different speeds. All CSS animation —
 * no JavaScript runs per frame.
 */
function SpeedLines() {
  return (
    <svg
      className="ngc-streaks"
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
          <stop offset="50%" stopColor={colors.accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ngc-glow" cx="0.2" cy="0.34" r="0.62">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ngc-glow2" cx="0.85" cy="0.8" r="0.5">
          <stop offset="0%" stopColor={colors.amber} stopOpacity="0.1" />
          <stop offset="100%" stopColor={colors.amber} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ngc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.borderHi} stopOpacity="0" />
          <stop offset="100%" stopColor={colors.borderHi} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect className="ngc-glow" width="1200" height="700" fill="url(#ngc-glow)" />
      <rect width="1200" height="700" fill="url(#ngc-glow2)" />

      {/* Perspective floor lines converging on a vanishing point. */}
      <g stroke="url(#ngc-fade)" strokeWidth="1">
        {[-900, -560, -260, 0, 260, 560, 900, 1400, 2100].map((x) => (
          <line key={x} x1={600 + x} y1="700" x2="600" y2="330" />
        ))}
        <line x1="0" y1="620" x2="1200" y2="620" />
        <line x1="0" y1="545" x2="1200" y2="545" />
        <line x1="0" y1="490" x2="1200" y2="490" />
        <line x1="0" y1="450" x2="1200" y2="450" />
      </g>

      <g stroke="url(#ngc-streak)" strokeWidth="1.6">
        <line x1="-100" y1="120" x2="700" y2="-60" />
        <line x1="-100" y1="300" x2="900" y2="70" />
        <line x1="200" y1="720" x2="1300" y2="440" />
        <line x1="380" y1="760" x2="1300" y2="530" />
      </g>
    </svg>
  )
}

/**
 * The club's own hall, sunk behind the type.
 *
 * Two scrims do the work: a vertical one that fades the photo into the page
 * top and bottom, and a horizontal one that keeps the left-aligned headline on
 * near-solid background while the room stays visible on the right.
 */
function HallBackdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <img
        src={site.heroPhoto}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 38%',
          opacity: 0.34,
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(180deg, ${colors.bg} 0%, rgba(10,11,13,0.45) 40%, rgba(10,11,13,0.85) 80%, ${colors.bg} 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(90deg, ${colors.bg} 0%, rgba(10,11,13,0.74) 45%, rgba(10,11,13,0.15) 100%)`,
        }}
      />
    </div>
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
      <HallBackdrop />
      <SpeedLines />

      <View style={styles.column}>
        <View style={styles.kickerRow}>
          <div className="ngc-blink" style={{ display: 'flex', borderRadius: 999 }}>
            <View style={styles.dot} />
          </div>
          <Text style={styles.kicker}>{t.hero.kicker}</Text>
        </View>

        <View role="heading" aria-level={1}>
          <Text style={[styles.title, { fontSize: titleSize }]}>
            {t.hero.titleTop}
          </Text>
          <span className="ngc-grad">
            <Text style={[styles.title, { fontSize: titleSize }]}>
              {t.hero.titleBottom}
            </Text>
          </span>
        </View>

        {!!t.hero.lead && (
          <Text style={[styles.lead, { fontSize: isDesktop ? 18 : 15 }]}>
            {t.hero.lead}
          </Text>
        )}

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
    /* Lifts the type above the absolutely-positioned backdrop layers. */
    position: 'relative',
    zIndex: 1,
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
