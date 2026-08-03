import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'
import { Logo } from './Logo'
import { LangSwitch } from './LangSwitch'

/**
 * Sticky top bar.
 *
 * The sticky wrapper is a plain `<header>` element: `position: sticky` is a
 * DOM concern, and going through the element directly keeps the behaviour
 * identical in every browser.
 */
export function Header() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md
  const showNav = width >= breakpoints.lg
  const [scrolled, setScrolled] = useState(false)

  // Past the fold the bar goes opaque, so text never sits on moving artwork.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#rigs', label: t.nav.rigs },
    { href: '#games', label: t.nav.games },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#branches', label: t.nav.branches },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(10, 11, 13, 0.92)' : 'rgba(10, 11, 13, 0.4)',
        backdropFilter: 'saturate(170%) blur(14px)',
        WebkitBackdropFilter: 'saturate(170%) blur(14px)',
        borderBottom: `1px solid ${scrolled ? colors.border : 'transparent'}`,
        boxShadow: scrolled ? '0 10px 30px -18px rgba(0,0,0,0.9)' : 'none',
        transition:
          'background-color .3s ease, border-color .3s ease, box-shadow .3s ease',
      }}
    >
      <View
        style={[
          styles.bar,
          {
            paddingHorizontal: isDesktop
              ? layout.gutterDesktop
              : layout.gutterMobile,
          },
        ]}
      >
        <View style={styles.inner}>
          <a href="#top" aria-label="Namazov Game Center">
            <Logo size={isDesktop ? 26 : 22} />
          </a>

          {showNav ? (
            <View style={styles.nav} role="navigation">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="ngc-navlink">
                  <Text style={styles.navLabel}>{link.label}</Text>
                </a>
              ))}
            </View>
          ) : null}

          <LangSwitch />
        </View>
      </View>
    </header>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: layout.headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLabel: {
    fontFamily: fonts.display,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.2,
    color: colors.textDim,
    marginHorizontal: 13,
  },
})
