import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useI18n, type Dict } from '../i18n'
import {
  isPlaceholderPhone,
  site,
  telHref,
  type Branch,
  type BranchId,
} from '../data/content'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from '../components/Icon'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { layout } from '../theme/layout'

/** Branch name and street line per language. */
function placeCopy(t: Dict): Record<BranchId, { name: string; address: string }> {
  return {
    xirdalan: { name: t.branches.xirdalanName, address: t.branches.xirdalanAddress },
    nerimanov: {
      name: t.branches.nerimanovName,
      address: t.branches.nerimanovAddress,
    },
  }
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <View style={styles.detail}>
      <View style={styles.detailIcon}>{icon}</View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        {children}
      </View>
    </View>
  )
}

function BranchCard({ branch }: { branch: Branch }) {
  const { t } = useI18n()
  const place = placeCopy(t)[branch.id]
  const phoneUnknown = isPlaceholderPhone(branch.phone)

  return (
    <Card padding={24}>
      <View style={styles.head}>
        <Text style={styles.name}>{place.name}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            {branch.rigCount} {t.branches.rigsLabel}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <DetailRow
          icon={<PinIcon size={18} color={colors.textFaint} />}
          label={t.branches.addressLabel}
        >
          <Text style={styles.detailValue}>{place.address}</Text>
        </DetailRow>

        <DetailRow
          icon={<ClockIcon size={18} color={colors.textFaint} />}
          label={t.branches.hoursLabel}
        >
          <Text style={styles.detailValue}>
            {t.branches.everyDay} · {site.hours.open} — {site.hours.close}
          </Text>
        </DetailRow>

        <DetailRow
          icon={<PhoneIcon size={18} color={colors.textFaint} />}
          label={t.branches.phoneLabel}
        >
          {phoneUnknown ? (
            <Text style={styles.detailPending}>{t.branches.phoneSoon}</Text>
          ) : (
            <a href={telHref(branch.phone)} className="ngc-link">
              <Text style={styles.detailLink}>{branch.phone}</Text>
            </a>
          )}
        </DetailRow>
      </View>

      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ngc-link"
      >
        <View style={styles.mapButton}>
          <Text style={styles.mapText}>{t.branches.mapAction}</Text>
          <ArrowIcon size={15} color={colors.text} />
        </View>
      </a>
    </Card>
  )
}

export function Branches() {
  const { t } = useI18n()

  return (
    <Section
      id="branches"
      kicker={t.branches.kicker}
      title={t.branches.title}
      lead={t.branches.lead}
      alt
    >
      <Grid maxColumns={2} gap={16}>
        {site.branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </Grid>
    </Section>
  )
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    /* "25 yarış masası" is a long pill — let it drop below the name on a
       narrow card rather than squeezing either one. */
    flexWrap: 'wrap',
  },
  name: {
    fontFamily: fonts.display,
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: -0.6,
    color: colors.text,
    marginRight: 12,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusPill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  tagText: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  details: {
    marginTop: 22,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  detailIcon: {
    width: 24,
    marginTop: 2,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    ...typeScale.kicker,
    fontSize: 10,
    letterSpacing: 1.8,
    color: colors.textFaint,
    marginBottom: 3,
  },
  detailValue: {
    ...typeScale.body,
    fontSize: 15,
    color: colors.text,
  },
  detailLink: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.4,
    color: colors.text,
  },
  detailPending: {
    ...typeScale.body,
    fontSize: 15,
    color: colors.textFaint,
    fontStyle: 'italic',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderHi,
    borderRadius: layout.radiusSm,
    paddingVertical: 12,
    marginTop: 4,
  },
  mapText: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.3,
    color: colors.text,
    marginRight: 8,
  },
})
