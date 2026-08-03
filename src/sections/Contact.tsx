import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { isPlaceholderPhone, site, telHref } from '../data/content'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import {
  ArrowIcon,
  InstagramIcon,
  PhoneIcon,
  ThreadsIcon,
  TikTokIcon,
  YouTubeIcon,
} from '../components/Icon'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'

function LinkRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const inner = (
    <View style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, !href && styles.rowValueMuted]}>{value}</Text>
      </View>
      {href ? <ArrowIcon size={16} color={colors.textFaint} /> : null}
    </View>
  )

  if (!href) return inner

  return (
    <a
      href={href}
      className="ngc-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}

export function Contact() {
  const { t } = useI18n()

  const socials = [
    {
      key: 'instagram',
      icon: <InstagramIcon size={20} color={colors.text} />,
      label: t.contact.instagram,
      value: '@namazovgamecenter',
      href: site.social.instagram,
    },
    {
      key: 'tiktok',
      icon: <TikTokIcon size={20} color={colors.text} />,
      label: t.contact.tiktok,
      value: '@namazovgamecenter',
      href: site.social.tiktok,
    },
    {
      key: 'youtube',
      icon: <YouTubeIcon size={20} color={colors.text} />,
      label: t.contact.youtube,
      value: '@namazovgamecenter',
      href: site.social.youtube,
    },
    {
      key: 'threads',
      icon: <ThreadsIcon size={20} color={colors.text} />,
      label: t.contact.threads,
      value: '@namazovgamecenter',
      href: site.social.threads,
    },
  ]

  const branchName = {
    xirdalan: t.branches.xirdalanName,
    nerimanov: t.branches.nerimanovName,
  }

  return (
    <Section
      id="contact"
      kicker={t.contact.kicker}
      title={t.contact.title}
      lead={t.contact.lead}
      alt
    >
      <Grid maxColumns={2} gap={16}>
        <Card padding={22}>
          <Text style={styles.cardTitle}>{t.contact.socialTitle}</Text>
          <View style={styles.list}>
            {socials.map((item) => (
              <LinkRow
                key={item.key}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
                external
              />
            ))}
          </View>
        </Card>

        <Card padding={22}>
          <Text style={styles.cardTitle}>{t.contact.phonesTitle}</Text>
          <View style={styles.list}>
            {site.branches.map((branch) => {
              const unknown = isPlaceholderPhone(branch.phone)
              return (
                <LinkRow
                  key={branch.id}
                  icon={<PhoneIcon size={20} color={colors.text} />}
                  label={branchName[branch.id]}
                  value={unknown ? t.branches.phoneSoon : branch.phone}
                  href={unknown ? undefined : telHref(branch.phone)}
                />
              )
            })}
          </View>
        </Card>
      </Grid>
    </Section>
  )
}

const styles = StyleSheet.create({
  cardTitle: {
    ...typeScale.kicker,
    color: colors.textFaint,
    marginBottom: 6,
  },
  list: {
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowIcon: {
    width: 34,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    ...typeScale.small,
    fontSize: 12,
    color: colors.textFaint,
  },
  rowValue: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
    color: colors.text,
    marginTop: 2,
  },
  rowValueMuted: {
    fontWeight: '500',
    color: colors.textFaint,
    fontStyle: 'italic',
  },
})
