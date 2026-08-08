# Gallery Carousel Feature Design Specification

## Overview
Transform the static photo grid in `Gallery.tsx` into an interactive, responsive, autoplaying photo carousel (slider) with touch swipe, mouse drag, navigation arrows, and pagination indicators.

## Goals
1. Convert `src/sections/Gallery.tsx` from vertical grid layout to horizontal smooth slider.
2. Enable touch-swipe (mobile) and mouse click-drag (desktop) for intuitive navigation.
3. Add automatic slideshow transition every 3 seconds with hover/touch auto-pause.
4. Provide visual navigation controls (left/right chevron buttons, pagination dots).
5. Maintain responsive layout: 3 photos visible per slide on Desktop, 2 on Tablet, 1 on Mobile.

## Component Architecture
- **`src/sections/Gallery.tsx`**: Main section wrapping the title, description, carousel container, arrow buttons, and pagination dots.
- **State Management**:
  - `currentIndex`: Tracks the active slide index.
  - `isHovered` / `isDragging`: Tracks hover and drag states to temporarily pause autoplay timer.
  - `dragStartX` / `dragOffsetX`: Tracks touch/mouse drag position for smooth interactive swiping.
- **Autoplay Logic**:
  - `useEffect` interval triggering `nextSlide()` every 3000ms.
  - Interval resets whenever `currentIndex` changes or when paused.

## UI & Design Specifications
- **Container Styling**:
  - Glassmorphic card borders matching Namazov Game Center theme (`colors.surface`, `colors.border`, `layout.radius`).
  - Chevron buttons: Glowing neon orange/white hover state with semi-transparent background.
  - Pagination dots: Active dot highlighted with glowing accent bar/circle.
- **Image Aspect Ratio**:
  - Preserved 4:5 vertical photo ratio with `objectFit: 'cover'` inside styled rounded cards.

## Error & Edge Case Handling
- **Empty photo set**: Displays empty placeholder tiles with message if `site.gallery` is empty.
- **Single photo**: Autoplay and navigation disabled gracefully if only 1 photo exists.
- **Boundary drag**: Smooth elastic resistance when dragging past start or end.

## Verification Criteria
- `npm run build` passes with zero TypeScript or bundle errors.
- Autoplay advances every 3 seconds.
- Hovering or dragging pauses autoplay.
- Touch swipe and mouse drag respond fluidly.
