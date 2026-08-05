import { StyleSheet, View } from 'react-native'
import { site } from '../data/content'

/** Width-to-height of the trimmed artwork, so callers only pick a height. */
const RATIO = 900 / 203

interface LogoProps {
  /** Height of the lockup in pixels. The width follows the artwork. */
  size?: number
}

/**
 * The club's own logo: a car silhouette over the orange NAMAZOV wordmark.
 *
 * Shipped as a trimmed transparent PNG rather than traced to SVG — the
 * silhouette carries too much curve detail for hand-written paths to stay
 * faithful, and at 52 KB it costs less than the fonts already do.
 */
export function Logo({ size = 40 }: LogoProps) {
  const width = Math.round(size * RATIO)

  return (
    <View style={styles.row}>
      <img
        src={site.logo}
        alt={site.name}
        width={width}
        height={size}
        style={{ width, height: size, display: 'block' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
