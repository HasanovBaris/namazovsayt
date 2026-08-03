import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'

interface LogoProps {
  /** Height of the "N" mark in pixels. The wordmark scales with it. */
  size?: number
  /** Hide the text and show only the mark (used for tight layouts). */
  markOnly?: boolean
}

/**
 * The brand mark: an italic "N" whose diagonal is cut in the accent red, so the
 * letter reads as a racing line through an apex. Drawn inline as SVG — about
 * 1 KB and sharp at any size.
 */
export function Logo({ size = 28, markOnly = false }: LogoProps) {
  const width = (size * 40) / 44

  return (
    <View style={styles.row}>
      <svg
        width={width}
        height={size}
        viewBox="0 0 40 44"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <path d="M0 44 L7.5 44 L14.5 0 L7 0 Z" fill={colors.text} />
        <path d="M25.5 44 L33 44 L40 0 L32.5 0 Z" fill={colors.text} />
        <path d="M7 0 L14.5 0 L33 44 L25.5 44 Z" fill={colors.accent} />
      </svg>

      {!markOnly && (
        <View style={styles.words}>
          <Text
            style={[
              styles.wordTop,
              { fontSize: size * 0.62, lineHeight: size * 0.66 },
            ]}
          >
            NAMAZOV
          </Text>
          <Text
            style={[
              styles.wordBottom,
              { fontSize: size * 0.3, lineHeight: size * 0.38 },
            ]}
          >
            GAME CENTER
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  words: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  wordTop: {
    fontFamily: fonts.display,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  wordBottom: {
    fontFamily: fonts.display,
    fontWeight: '600',
    color: colors.textDim,
    letterSpacing: 3.2,
  },
})
