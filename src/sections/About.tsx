import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { breakpoints } from '../theme/layout'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card padding={20}>
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  )
}

export function About() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md

  const stats = [
    { value: `${site.totalRigs}`, label: t.about.statRigs },
    { value: `${site.price.hour} ${site.price.currency}`, label: t.about.statPrice },
    { value: site.hours.close, label: t.about.statClose },
    { value: t.about.statAgeValue, label: t.about.statAge },
  ]

  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.title} alt>
      <Reveal>
        <View style={[styles.prose, isDesktop && styles.proseDesktop]}>
          <Text style={styles.paragraph}>{t.about.p1}</Text>
          <Text style={[styles.paragraph, styles.paragraphSpaced]}>{t.about.p2}</Text>
        </View>
      </Reveal>

      <View style={styles.stats}>
        <Grid maxColumns={2} gap={14}>
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </Grid>
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  prose: {
    width: '100%',
  },
  proseDesktop: {
    maxWidth: 720,
  },
  paragraph: {
    ...typeScale.body,
    fontSize: 16,
    color: colors.textDim,
  },
  paragraphSpaced: {
    marginTop: 16,
  },
  stats: {
    marginTop: 40,
  },
  statValue: {
    fontFamily: fonts.display,
    fontWeight: '800',
    fontSize: 30,
    letterSpacing: -0.8,
    color: colors.text,
  },
  statLabel: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 6,
  },
})
