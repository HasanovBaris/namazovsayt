import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site, type Game } from '../data/content'
import { Section } from '../components/Section'
import { Chip } from '../components/Chip'
import { Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { layout } from '../theme/layout'

/**
 * A game we have artwork for. The logo is the label, so the tile carries no
 * caption — the name lives in `alt` for screen readers and broken images.
 */
function GameTile({ game }: { game: Game }) {
  return (
    <div className="ngc-card ngc-logo">
      <View style={styles.tile}>
        <img
          src={game.logo}
          alt={game.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </View>
    </div>
  )
}

export function Games() {
  const { t } = useI18n()

  const featured = site.games.filter((game) => game.logo)
  const rest = site.games.filter((game) => !game.logo)

  return (
    <Section
      id="games"
      kicker={t.games.kicker}
      title={t.games.title}
      lead={t.games.lead}
      alt
    >
      <Grid maxColumns={3} gap={14}>
        {featured.map((game) => (
          <GameTile key={game.name} game={game} />
        ))}
      </Grid>

      <Reveal>
        <Text style={styles.moreLabel}>{t.games.more}</Text>

        <View style={styles.chips}>
          {rest.map((game) => (
            <Chip key={game.name} label={game.name} />
          ))}
        </View>

        <Text style={styles.note}>{t.games.note}</Text>
      </Reveal>
    </Section>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    aspectRatio: 16 / 7,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radius,
    overflow: 'hidden',
  },
  moreLabel: {
    ...typeScale.kicker,
    fontSize: 10,
    letterSpacing: 1.8,
    color: colors.textFaint,
    marginTop: 34,
    marginBottom: 14,
  },
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
