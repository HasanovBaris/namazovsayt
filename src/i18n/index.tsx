import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { az, type Dict } from './az'
import { ru } from './ru'
import { en } from './en'

export const LANGS = ['az', 'ru', 'en'] as const
export type Lang = (typeof LANGS)[number]

const DICTS: Record<Lang, Dict> = { az, ru, en }

/** Short label shown in the header switcher. */
export const LANG_LABELS: Record<Lang, string> = {
  az: 'AZ',
  ru: 'RU',
  en: 'EN',
}

const STORAGE_KEY = 'ngc.lang'

function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value)
}

/** Saved choice first, then browser language, then Azerbaijani. */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'az'

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // Private-mode storage denial is not worth surfacing.
  }

  const browser = window.navigator.language.slice(0, 2).toLowerCase()
  if (browser === 'ru') return 'ru'
  if (browser === 'en') return 'en'
  return 'az'
}

interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (next: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore — the choice simply will not persist.
    }
  }, [])

  // Keep the document language in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({ lang, t: DICTS[lang], setLang }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

export type { Dict }
