import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { colors } from '../theme/colors'
import { fonts, typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md
  const year = new Date().getFullYear()

  return (
    <View
      style={[
        styles.footer,
        {
          paddingHorizontal: isDesktop ? layout.gutterDesktop : layout.gutterMobile,
        },
      ]}
    >
      <View style={[styles.inner, isDesktop && styles.innerRow]}>
        <View style={!isDesktop && styles.blockSpacing}>
          <Logo size={24} />
          <Text style={styles.tagline}>{t.footer.tagline}</Text>
        </View>

        <View style={isDesktop ? styles.rightAlign : undefined}>
          <Text style={styles.copy}>
            © {year} {site.name}
          </Text>
          <Text style={styles.copyDim}>{t.footer.rights}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  blockSpacing: {
    marginBottom: 24,
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  tagline: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 12,
  },
  copy: {
    fontFamily: fonts.display,
    fontWeight: '600',
    fontSize: 13,
    color: colors.textDim,
  },
  copyDim: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 4,
  },
})
