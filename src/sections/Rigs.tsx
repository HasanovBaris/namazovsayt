import { StyleSheet, Text, View } from 'react-native'
import { useI18n, type Dict } from '../i18n'
import { site, type RigSpec } from '../data/content'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'

/**
 * Translated label and description for each spec id. Adding a spec to
 * `content.ts` without adding its copy here is a type error.
 */
function copyFor(t: Dict): Record<RigSpec['id'], { label: string; desc: string }> {
  return {
    wheel: { label: t.rigs.wheelLabel, desc: t.rigs.wheelDesc },
    pedals: { label: t.rigs.pedalsLabel, desc: t.rigs.pedalsDesc },
    display: { label: t.rigs.displayLabel, desc: t.rigs.displayDesc },
    seat: { label: t.rigs.seatLabel, desc: t.rigs.seatDesc },
    pc: { label: t.rigs.pcLabel, desc: t.rigs.pcDesc },
    audio: { label: t.rigs.audioLabel, desc: t.rigs.audioDesc },
  }
}

export function Rigs() {
  const { t } = useI18n()
  const copy = copyFor(t)

  return (
    <Section id="rigs" kicker={t.rigs.kicker} title={t.rigs.title} lead={t.rigs.lead}>
      <Grid maxColumns={3} gap={16}>
        {site.rigs.map((rig) => {
          const { label, desc } = copy[rig.id]
          return (
            <Card key={rig.id}>
              {rig.image && (
                <img
                  src={rig.image}
                  alt={rig.value}
                  style={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />
              )}
              <View style={styles.head}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.rule} />
              </View>
              <Text style={styles.value}>{rig.value}</Text>
              <Text style={styles.desc}>{desc}</Text>
            </Card>
          )
        })}
      </Grid>
    </Section>
  )
}

const styles = StyleSheet.create({
  head: {
    marginBottom: 14,
  },
  label: {
    ...typeScale.kicker,
    color: colors.textFaint,
  },
  rule: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 12,
  },
  value: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 19,
    letterSpacing: -0.2,
    color: colors.text,
  },
  desc: {
    ...typeScale.small,
    color: colors.textDim,
    marginTop: 8,
  },
})
