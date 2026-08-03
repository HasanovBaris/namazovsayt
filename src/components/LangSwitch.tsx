import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LANGS, LANG_LABELS, useI18n } from '../i18n'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'
import { layout } from '../theme/layout'

/** AZ · RU · EN segmented switch. The choice is stored in localStorage. */
export function LangSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <View style={styles.group} role="group" aria-label={t.a11y.language}>
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <Pressable
            key={code}
            onPress={() => setLang(code)}
            aria-label={LANG_LABELS[code]}
            style={({ hovered }) => [
              styles.button,
              active && styles.buttonActive,
              hovered && !active && styles.buttonHovered,
            ]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {LANG_LABELS[code]}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusPill,
    padding: 3,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: layout.radiusPill,
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
  },
  buttonActive: {
    backgroundColor: colors.accent,
  },
  buttonHovered: {
    backgroundColor: colors.surfaceHi,
  },
  label: {
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.8,
    color: colors.textDim,
  },
  labelActive: {
    color: colors.white,
  },
})
