import { StyleSheet, Text } from 'react-native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/typography'

interface IconProps {
  size?: number
  color?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  display: 'block' as const,
  flexShrink: 0,
})

export function InstagramIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.2" fill={color} />
    </svg>
  )
}

export function TikTokIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <path
        d="M12.9 2.5h3.05c.2 1.6 1.05 2.98 2.3 3.79.72.46 1.55.73 2.45.8v3.06a8.9 8.9 0 0 1-4.5-1.45v6.44a6.05 6.05 0 1 1-6.05-6.05c.3 0 .6.02.88.07v3.15a2.9 2.9 0 1 0 1.87 2.71V2.5Z"
        fill={color}
      />
    </svg>
  )
}

export function YouTubeIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="4.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <path d="M10.4 9.1 16 12l-5.6 2.9V9.1Z" fill={color} />
    </svg>
  )
}

/**
 * Threads' logo is essentially a stylised "@". Rendering the character in the
 * display font is honest and stays crisp — no approximated path.
 */
export function ThreadsIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <Text
      aria-hidden
      style={[
        styles.glyph,
        { fontSize: size * 1.15, lineHeight: size * 1.2, width: size, color },
      ]}
    >
      @
    </Text>
  )
}

export function PhoneIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <path
        d="M6.2 3.5h2.9l1.4 3.5-1.8 1.3a11.5 11.5 0 0 0 5 5l1.3-1.8 3.5 1.4v2.9a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PinIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <path
        d="M12 21c4.2-4.4 6.3-7.7 6.3-10.3A6.3 6.3 0 0 0 5.7 10.7C5.7 13.3 7.8 16.6 12 21Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.4" stroke={color} strokeWidth="1.7" />
    </svg>
  )
}

export function ClockIcon({ size = 20, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path
        d="M12 7.3V12l3.2 2"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowIcon({ size = 16, color = colors.text }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <path
        d="M5 12h13M12.5 6l6 6-6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CheckIcon({ size = 16, color = colors.accent }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={base(size)}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const styles = StyleSheet.create({
  glyph: {
    fontFamily: fonts.display,
    fontWeight: '700',
    textAlign: 'center',
  },
})
