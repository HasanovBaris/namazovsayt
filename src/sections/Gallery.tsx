import { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'

/** Photos are shot vertically (788×1400), so the stage stays portrait and
    capped — stretching one across the full column would upscale a 788px
    source past 1100px and turn it to mush. */
const STAGE_MAX_WIDTH = 460
const AUTOPLAY_MS = 4000
/** Horizontal travel that commits to a slide change. */
const SWIPE_THRESHOLD = 48
/** Travel before we decide the gesture is a swipe and not a page scroll. */
const AXIS_LOCK = 8

/** Placeholder tile shown until real photos land in `site.gallery`. */
function EmptyTile({ index }: { index: number }) {
  return (
    <View style={[styles.tile, styles.tileEmpty]}>
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

function ArrowButton({
  side,
  offset,
  label,
  onPress,
}: {
  side: 'left' | 'right'
  offset: number
  label: string
  onPress: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={label}
      style={{
        position: 'absolute',
        [side]: offset,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: `1px solid ${colors.border}`,
        background: 'rgba(15, 18, 24, 0.72)',
        backdropFilter: 'blur(8px)',
        color: colors.text,
        fontSize: 22,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
      }}
    >
      {side === 'left' ? '‹' : '›'}
    </button>
  )
}

export function Gallery() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md

  const photos = site.gallery
  const total = photos.length

  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  /** Gesture bookkeeping lives in a ref so a moving finger doesn't re-render
      until we know it's actually a horizontal swipe. */
  const gesture = useRef({ active: false, startX: 0, startY: 0, axis: '' as '' | 'x' | 'y' })

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Autoplay. It only pauses mid-swipe — hovering does NOT stop it, so the
  // section keeps moving while you look at it. `index` in the deps restarts
  // the clock after a manual jump instead of cutting it short.
  useEffect(() => {
    if (total <= 1 || isDragging) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [total, isDragging, index])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (total <= 1) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    gesture.current = { active: true, startX: e.clientX, startY: e.clientY, axis: '' }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g.active) return

    const dx = e.clientX - g.startX
    const dy = e.clientY - g.startY

    if (g.axis === '') {
      if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return
      // Vertical intent belongs to the page, not the carousel.
      g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (g.axis === 'y') {
        g.active = false
        return
      }
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
    }

    setDragOffset(dx)
  }

  const endGesture = () => {
    const g = gesture.current
    const committed = g.axis === 'x'
    gesture.current = { active: false, startX: 0, startY: 0, axis: '' }

    if (committed) {
      if (dragOffset <= -SWIPE_THRESHOLD) next()
      else if (dragOffset >= SWIPE_THRESHOLD) prev()
    }
    setDragOffset(0)
    setIsDragging(false)
  }

  if (total === 0) {
    return (
      <Section id="gallery" kicker={t.gallery.kicker} title={t.gallery.title}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <EmptyTile key={i} index={i} />
          ))}
        </div>
        <Text style={styles.soon}>{t.gallery.soon}</Text>
      </Section>
    )
  }

  return (
    <Section id="gallery" kicker={t.gallery.kicker} title={t.gallery.title}>
      <div
        style={{
          position: 'relative',
          maxWidth: STAGE_MAX_WIDTH,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          style={{
            overflow: 'hidden',
            borderRadius: layout.radius,
            // Vertical panning stays with the page; horizontal is ours.
            touchAction: 'pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            cursor: total > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: `translate3d(calc(${-index * 100}% + ${dragOffset}px), 0, 0)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.45s cubic-bezier(0.22, 0.61, 0.24, 1)',
            }}
          >
            {photos.map((photo, i) => (
              <div key={photo.src} style={{ flex: '0 0 100%', minWidth: 0 }}>
                <View style={styles.tile}>
                  <img
                    src={photo.src}
                    alt={t.gallery.alt[photo.id]}
                    draggable={false}
                    /* Slides sit off-stage under a transform, which reads as
                       "not visible" to lazy loading — a lazy image would only
                       start fetching once it slid in, flashing empty. */
                    loading="eager"
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />
                </View>
              </div>
            ))}
          </div>
        </div>

        {total > 1 && (
          <>
            <ArrowButton
              side="left"
              offset={isDesktop ? -58 : 10}
              label={t.gallery.prev}
              onPress={prev}
            />
            <ArrowButton
              side="right"
              offset={isDesktop ? -58 : 10}
              label={t.gallery.next}
              onPress={next}
            />
          </>
        )}
      </div>

      {total > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
          }}
        >
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.gallery.goTo} ${i + 1}`}
              aria-current={i === index}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                padding: 0,
                borderRadius: layout.radiusPill,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: i === index ? colors.accent : colors.border,
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </Section>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: layout.radius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  tileEmpty: {
    aspectRatio: 10 / 7,
    borderRadius: layout.radiusSm,
  },
  soon: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 24,
    maxWidth: 560,
  },
})
