import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { Grid } from '../components/Grid'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { layout } from '../theme/layout'

/** Placeholder tile shown until real photos land in `site.gallery`. */
function EmptyTile({ index }: { index: number }) {
  return (
    <View style={styles.tile}>
      <svg
        viewBox="0 0 100 70"
        aria-hidden="true"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <rect width="100" height="70" fill={colors.surface} />
        <g stroke={colors.border} strokeWidth="0.8">
          <line x1={-10 + index * 6} y1="70" x2={40 + index * 6} y2="0" />
          <line x1={10 + index * 6} y1="70" x2={60 + index * 6} y2="0" />
          <line x1={30 + index * 6} y1="70" x2={80 + index * 6} y2="0" />
        </g>
      </svg>
    </View>
  )
}

export function Gallery() {
  const { t } = useI18n()
  const photos = site.gallery

  return (
    <Section id="gallery" kicker={t.gallery.kicker} title={t.gallery.title}>
      <Grid maxColumns={3} gap={12}>
        {photos.length > 0
          ? photos.map((photo) => (
              <View key={photo.src} style={styles.tile}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </View>
            ))
          : [0, 1, 2, 3, 4, 5].map((index) => (
              <EmptyTile key={index} index={index} />
            ))}
      </Grid>

      {photos.length === 0 ? <Text style={styles.soon}>{t.gallery.soon}</Text> : null}
    </Section>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    aspectRatio: 10 / 7,
    borderRadius: layout.radiusSm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  soon: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 24,
    maxWidth: 560,
  },
})
