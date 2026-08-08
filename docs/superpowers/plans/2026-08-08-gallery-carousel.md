# Gallery Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static photo grid in `Gallery.tsx` into an interactive, autoplaying photo carousel slider with touch swipe, mouse drag, chevron controls, and pagination indicators.

**Architecture:** Update `src/sections/Gallery.tsx` to include carousel state (`currentIndex`, `isHovered`, `isDragging`, `dragStartX`, `dragOffsetX`) and touch/mouse handlers, with a 3000ms autoplay `useEffect` timer.

**Tech Stack:** React, React Native for Web (StyleSheet, View, Text), TypeScript, Vite.

## Global Constraints

- Preserve existing styling and color tokens from `src/theme/colors.ts` and `src/theme/layout.ts`.
- Auto-slide interval: 3000ms.
- Pause auto-slide on hover or touch drag.

---

### Task 1: Refactor Gallery.tsx with Interactive Carousel & Controls

**Files:**
- Modify: `src/sections/Gallery.tsx`

**Interfaces:**
- Consumes: `site.gallery` from `src/data/content.ts`, `useI18n` from `src/i18n`
- Produces: Interactive Carousel UI in Gallery section

- [ ] **Step 1: Update Gallery.tsx with stateful Carousel component**

```tsx
import { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useI18n } from '../i18n'
import { site } from '../data/content'
import { Section } from '../components/Section'
import { colors } from '../theme/colors'
import { typeScale } from '../theme/typography'
import { layout } from '../theme/layout'

export function Gallery() {
  const { t } = useI18n()
  const photos = site.gallery
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const total = photos.length

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
    if (dragOffset < -50) {
      nextSlide()
    } else if (dragOffset > 50) {
      prevSlide()
    }
    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <Section id="gallery" kicker={t.gallery.kicker} title={t.gallery.title}>
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
        style={{ position: 'relative', overflow: 'hidden', userSelect: 'none' }}
      >
        {/* Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: '1px solid ' + colors.border,
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: '1px solid ' + colors.border,
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
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
            transition: isDragging ? 'none' : 'transform 0.4s ease-out',
            width: '100%',
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              style={{
                minWidth: '100%',
                flexShrink: 0,
                padding: '0 8px',
                boxSizing: 'border-box',
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
              marginTop: 16,
            }}
          >
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    idx === currentIndex ? colors.accent : colors.border,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    maxHeight: 520,
    aspectRatio: 16 / 9,
    borderRadius: layout.radius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
})
```

- [ ] **Step 2: Run build to verify zero compilation errors**

Run: `npm run build`
Expected: Code 0 build success

- [ ] **Step 3: Commit implementation**

```bash
git add src/sections/Gallery.tsx
git commit -m "feat: implement responsive auto-sliding interactive gallery carousel"
```
