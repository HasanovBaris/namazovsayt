import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { layout } from '../theme/layout'

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

export function Gallery() {
  const { t } = useI18n()
  const photos = site.gallery
  const total = photos.length

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const nextSlide = useCallback(() => {
    if (total === 0) return
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const prevSlide = useCallback(() => {
    if (total === 0) return
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (total <= 1 || isHovered || isDragging) return
    const timer = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(timer)
  }, [total, isHovered, isDragging, nextSlide])

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX)
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    setDragOffset(pageX - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    if (dragOffset < -40) {
      nextSlide()
    } else if (dragOffset > 40) {
      prevSlide()
    }
    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <Section id="gallery" kicker={t.gallery.kicker} title={t.gallery.title}>
      {total > 0 ? (
        <div
          className="ngc-gallery-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsDragging(false)
            setDragOffset(0)
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          style={{
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'pan-y',
            paddingBottom: 24,
          }}
        >
          {/* Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevSlide()
                }}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 'calc(50% - 20px)',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(15, 18, 24, 0.75)',
                  color: '#fff',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextSlide()
                }}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 'calc(50% - 20px)',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(15, 18, 24, 0.75)',
                  color: '#fff',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
              >
                ›
              </button>
            </>
          )}

          {/* Track / Slide Container */}
          <div
            style={{
              display: 'flex',
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              width: '100%',
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.src}
                style={{
                  minWidth: '100%',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                <div className="ngc-card ngc-photo">
                  <View style={styles.tile}>
                    <img
                      src={photo.src}
                      alt={t.gallery.alt[photo.id]}
                      loading="lazy"
                      draggable={false}
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
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
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
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(idx)
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: idx === currentIndex ? colors.accent : colors.border,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <EmptyTile key={index} index={index} />
            ))}
          </div>
          <Text style={styles.soon}>{t.gallery.soon}</Text>
        </>
      )}
    </Section>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    maxHeight: 560,
    aspectRatio: 16 / 9,
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
