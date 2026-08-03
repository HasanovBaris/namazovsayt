import { useEffect, useState } from 'react'

/**
 * Thin accent line across the top showing how far down the page you are.
 *
 * The scroll handler only writes a percentage into state; the bar itself is
 * a plain element, so nothing re-renders below it.
 */
export function ScrollProgress() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setPercent(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="ngc-progress" style={{ width: `${percent}%` }} />
}
