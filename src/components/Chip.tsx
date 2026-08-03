import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'
import { layout } from '../theme/layout'

/** Small pill used for the game list. Lifts on hover via the CSS class. */
export function Chip({ label }: { label: string }) {
  return (
    <div className="ngc-chip">
      <View style={styles.chip}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </div>
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
