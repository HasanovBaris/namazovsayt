import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { Chip } from '../components/Chip'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'

export function Games() {
  const { t } = useI18n()

  return (
    <Section
      id="games"
      kicker={t.games.kicker}
      title={t.games.title}
      lead={t.games.lead}
      alt
    >
      <View style={styles.chips}>
        {site.games.map((game) => (
          <Chip key={game} label={game} />
        ))}
      </View>

      <Text style={styles.note}>{t.games.note}</Text>
    </Section>
  )
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  note: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 22,
    maxWidth: 560,
  },
})
