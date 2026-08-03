import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'
import { layout } from '../theme/layout'

/** Small pill used for the game list. */
export function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusPill,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.display,
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
    letterSpacing: 0.2,
  },
})
