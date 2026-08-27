import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useI18n } from '../i18n'
import {
  BRAND_LABELS,
  CAR_BRANDS,
  cars,
  carPhoto,
  carThumb,
  type Car,
  type CarBrand,
} from '../data/cars'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { breakpoints, layout } from '../theme/layout'

/** `all` is not a brand — it is the filter that clears the filter. */
type Filter = CarBrand | 'all'

/** The grid opens with this many tiles; "show more" adds another batch. */
const PAGE = 12
/** Horizontal travel that flips to the next car inside the lightbox. */
const SWIPE_THRESHOLD = 48

function FilterButton({
  label,
  count,
  active,
  onPress,
}: {
  label: string
  count: number
  active: boolean
  onPress: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={active}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 7,
        marginRight: 8,
        marginBottom: 8,
        padding: '9px 15px',
        borderRadius: layout.radiusPill,
        cursor: 'pointer',
        fontFamily: typeScale.mono.fontFamily,
        fontWeight: 600,
        fontSize: 13.5,
        letterSpacing: 0.3,
        color: active ? colors.bg : colors.text,
        backgroundColor: active ? colors.accent : colors.surface,
        border: `1px solid ${active ? colors.accent : colors.border}`,
        transition: 'background-color .2s ease, border-color .2s ease, color .2s ease',
      }}
    >
      {label}
      <span
        style={{
          fontSize: 11,
          opacity: active ? 0.72 : 0.5,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </span>
    </button>
  )
}

function CarTile({
  car,
  alt,
  label,
  onPress,
}: {
  car: Car
  alt: string
  label: string
  onPress: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={`${car.name} — ${label}`}
      className="ngc-card ngc-photo"
      style={{
        display: 'block',
        width: '100%',
        padding: 0,
        border: 'none',
        background: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        font: 'inherit',
      }}
    >
      <View style={styles.tile}>
        <View style={styles.frame}>
          <img
            src={carThumb(car)}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={760}
            height={428}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </View>
        <Text style={styles.tileName} numberOfLines={1}>
          {car.name}
        </Text>
      </View>
    </button>
  )
}

/** Full-screen viewer. Arrow keys and swipes move through the filtered list. */
function Lightbox({
  list,
  index,
  onClose,
  onStep,
}: {
  list: Car[]
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md
  const car = list[index]
  const startX = useRef<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onStep(1)
      else if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)

    // The page behind must not scroll while the overlay owns the screen.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose, onStep])

  // Preload the neighbours so stepping through the garage never shows a gap.
  useEffect(() => {
    for (const step of [1, -1]) {
      const neighbour = list[(index + step + list.length) % list.length]
      if (neighbour) new Image().src = carPhoto(neighbour)
    }
  }, [list, index])

  if (!car) return null

  const round = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: isDesktop ? 22 : 10,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 46,
    height: 46,
    borderRadius: '50%',
    border: `1px solid ${colors.borderHi}`,
    background: 'rgba(15, 18, 24, 0.78)',
    backdropFilter: 'blur(8px)',
    color: colors.text,
    fontSize: 24,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  })

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={car.name}
      onClick={onClose}
      onPointerDown={(e) => {
        startX.current = e.clientX
      }}
      onPointerUp={(e) => {
        const from = startX.current
        startX.current = null
        if (from === null) return
        const dx = e.clientX - from
        if (dx <= -SWIPE_THRESHOLD) onStep(1)
        else if (dx >= SWIPE_THRESHOLD) onStep(-1)
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: isDesktop ? 40 : 16,
        background: 'rgba(6, 7, 9, 0.94)',
        backdropFilter: 'blur(6px)',
        touchAction: 'pan-y',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.garage.close}
        style={{
          position: 'absolute',
          top: isDesktop ? 22 : 12,
          right: isDesktop ? 22 : 12,
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: `1px solid ${colors.borderHi}`,
          background: 'rgba(15, 18, 24, 0.78)',
          color: colors.text,
          fontSize: 20,
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        ✕
      </button>

      <img
        src={carPhoto(car)}
        alt={`${car.name} — ${t.garage.altSuffix}`}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
        style={{
          maxWidth: '100%',
          maxHeight: '76vh',
          objectFit: 'contain',
          borderRadius: layout.radius,
          border: `1px solid ${colors.border}`,
          display: 'block',
        }}
      />

      <View style={styles.caption} pointerEvents="none">
        <Text style={styles.lightboxName}>{car.name}</Text>
        <Text style={styles.lightboxCount}>
          {index + 1} / {list.length}
        </Text>
      </View>

      {list.length > 1 && (
        <>
          <button
            type="button"
            aria-label={t.garage.prev}
            onClick={(e) => {
              e.stopPropagation()
              onStep(-1)
            }}
            style={round('left')}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={t.garage.next}
            onClick={(e) => {
              e.stopPropagation()
              onStep(1)
            }}
            style={round('right')}
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}

export function Garage() {
  const { t } = useI18n()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.md

  const [filter, setFilter] = useState<Filter>('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? cars : cars.filter((car) => car.brand === filter)),
    [filter],
  )

  /** How many cars sit behind each filter button. */
  const counts = useMemo(() => {
    const tally = {} as Record<CarBrand, number>
    for (const car of cars) tally[car.brand] = (tally[car.brand] ?? 0) + 1
    return tally
  }, [])

  const pick = (next: Filter) => {
    setFilter(next)
    setShown(PAGE)
  }

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? null
          : (current + delta + visible.length) % visible.length,
      ),
    [visible.length],
  )

  const list = visible.slice(0, shown)
  const brandLabel = (brand: CarBrand) =>
    brand === 'other' ? t.garage.other : BRAND_LABELS[brand]

  return (
    <Section id="garage" kicker={t.garage.kicker} title={t.garage.title} lead={t.garage.lead}>
      <Reveal>
        <View style={styles.filters}>
          <FilterButton
            label={t.garage.all}
            count={cars.length}
            active={filter === 'all'}
            onPress={() => pick('all')}
          />
          {CAR_BRANDS.map((brand) => (
            <FilterButton
              key={brand}
              label={brandLabel(brand)}
              count={counts[brand] ?? 0}
              active={filter === brand}
              onPress={() => pick(brand)}
            />
          ))}
        </View>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${isDesktop ? 232 : 150}px, 1fr))`,
          gap: isDesktop ? 16 : 10,
          marginTop: 6,
        }}
      >
        {list.map((car, i) => (
          <CarTile
            key={car.slug}
            car={car}
            alt={`${car.name} — ${t.garage.altSuffix}`}
            label={t.garage.open}
            onPress={() => setOpen(i)}
          />
        ))}
      </div>

      {shown < visible.length && (
        <View style={styles.moreRow}>
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            style={{
              padding: '13px 26px',
              borderRadius: layout.radiusPill,
              border: `1px solid ${colors.borderHi}`,
              background: colors.surface,
              color: colors.text,
              fontFamily: typeScale.mono.fontFamily,
              fontWeight: 600,
              fontSize: 14.5,
              letterSpacing: 0.4,
              cursor: 'pointer',
            }}
          >
            {t.garage.more} · {visible.length - shown}
          </button>
        </View>
      )}

      <Text style={styles.note}>{t.garage.note}</Text>

      {open !== null && (
        <Lightbox
          list={visible}
          index={open}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </Section>
  )
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tile: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radius,
    overflow: 'hidden',
  },
  frame: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    backgroundColor: colors.bgAlt,
  },
  tileName: {
    ...typeScale.small,
    fontFamily: typeScale.mono.fontFamily,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  moreRow: {
    alignItems: 'center',
    marginTop: 26,
  },
  caption: {
    alignItems: 'center',
  },
  lightboxName: {
    ...typeScale.cardTitle,
    color: colors.text,
  },
  lightboxCount: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 4,
  },
  note: {
    ...typeScale.small,
    color: colors.textFaint,
    marginTop: 26,
    maxWidth: 560,
  },
})
