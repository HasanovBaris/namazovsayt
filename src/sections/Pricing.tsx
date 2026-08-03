import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { CheckIcon } from '../components/Icon'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { breakpoints } from '../theme/layout'

export function Pricing() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md

  const includes = [
    t.pricing.include1,
    t.pricing.include2,
    t.pricing.include3,
    t.pricing.include4,
  ]

  return (
    <Section id="pricing" kicker={t.pricing.kicker} title={t.pricing.title}>
      <Card highlight padding={isDesktop ? 36 : 24}>
        <View style={isDesktop && styles.row}>
          <View style={[styles.priceBlock, isDesktop && styles.priceBlockDesktop]}>
            <View style={styles.amountRow}>
              <Text style={[styles.amount, { fontSize: isDesktop ? 86 : 64 }]}>
                {site.price.hour}
              </Text>
              <Text style={[styles.currency, { fontSize: isDesktop ? 40 : 30 }]}>
                {site.price.currency}
              </Text>
            </View>
            <Text style={styles.perHour}>{t.pricing.perHour}</Text>
          </View>

          <View style={[styles.includes, isDesktop && styles.includesDesktop]}>
            <Text style={styles.includesTitle}>{t.pricing.includesTitle}</Text>
            {includes.map((item) => (
              <View key={item} style={styles.includeRow}>
                <View style={styles.check}>
                  <CheckIcon size={15} />
                </View>
                <Text style={styles.includeText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.note}>{t.pricing.note}</Text>
      </Card>
    </Section>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceBlock: {
    marginBottom: 28,
  },
  priceBlockDesktop: {
    marginBottom: 0,
    width: 280,
    flexShrink: 0,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  amount: {
    fontFamily: fonts.display,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -3,
    lineHeight: '1',
  },
  currency: {
    fontFamily: fonts.display,
    fontWeight: '700',
    color: colors.amber,
    marginLeft: 8,
    marginTop: 4,
  },
  perHour: {
    ...typeScale.kicker,
    color: colors.textFaint,
    marginTop: 12,
  },
  includes: {
    flex: 1,
  },
  includesDesktop: {
    paddingLeft: 40,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  includesTitle: {
    ...typeScale.kicker,
    color: colors.textFaint,
    marginBottom: 16,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  check: {
    marginRight: 12,
    marginTop: 3,
  },
  includeText: {
    ...typeScale.body,
    color: colors.text,
    flex: 1,
  },
  note: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 26,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
})
