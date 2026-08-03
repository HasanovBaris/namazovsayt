import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger, in milliseconds, so sibling cards do not all land at once. */
  delay?: number
}

/**
 * Fades and lifts its children the first time they scroll into view.
 *
 * Uses IntersectionObserver directly — no animation library, no scroll
 * listener. The element is unobserved after the first reveal so nothing keeps
 * running once the page has been read.
 */
export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect the OS "reduce motion" setting: show immediately, no transition.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={visible ? 'ngc-reveal is-visible' : 'ngc-reveal'}
      // Full height so grid cards still stretch to match their row.
      style={{ transitionDelay: `${delay}ms`, height: '100%' }}
    >
      {children}
    </div>
  )
}
