import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'

/**
 * Endless ticker strip between sections — the club's headline facts on repeat.
 *
 * The item list is rendered twice and the track scrolls exactly half its width,
 * which makes the loop seamless. Hovering pauses it.
 */
export function Marquee() {
  const { t } = useI18n()

  const items = [
    `${site.price.hour} ${site.price.currency} / ${t.ticker.hour}`,
    `${site.totalRigs}+ ${t.ticker.rigs}`,
    `${t.ticker.until} ${site.hours.close}`,
    t.ticker.noAgeLimit,
    t.branches.xirdalanName,
    t.branches.nerimanovName,
    t.ticker.forceFeedback,
  ]

  const sequence = [...items, ...items]

  return (
    <View style={styles.band}>
      <div className="ngc-marquee">
        <div className="ngc-marquee-track">
          {sequence.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.item}>
              <Text style={styles.text}>{item}</Text>
              <View style={styles.separator} />
            </View>
          ))}
        </div>
      </div>
    </View>
  )
}

const styles = StyleSheet.create({
  band: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.border,
    borderBottomColor: colors.border,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
    color: colors.textDim,
    whiteSpace: 'nowrap',
  },
  separator: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.accent,
    marginHorizontal: 26,
  },
})
