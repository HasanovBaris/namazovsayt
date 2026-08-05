/**
 * Render smoke test.
 *
 * A green `tsc` only proves the types line up — it does not prove that
 * react-native-web actually renders these components. This mounts the whole
 * page server-side and asserts that content from every section reaches the
 * output. Run with `npm run smoke`.
 */
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { AppRegistry } from 'react-native'
import App from '../src/App'
import { az } from '../src/i18n/az'
import { site } from '../src/data/content'

// Going through AppRegistry also hands back the stylesheet react-native-web
// generates, so the emitted CSS can be asserted on — not just the markup.
AppRegistry.registerComponent('NamazovGameCenter', () => App)
const { element, getStyleElement } = AppRegistry.getApplication('NamazovGameCenter')

const html = renderToString(element)
const css = renderToStaticMarkup(getStyleElement())

if (process.env.DUMP_CSS) {
  const hit = css.match(/.{0,70}(46,\s*23|ff2e17).{0,40}/i)
  console.log('colour sample:', hit ? hit[0] : 'NOT FOUND')
}

/** Strings that must appear on the rendered page. */
const expected: [label: string, needle: string][] = [
  ['logo wordmark', 'NAMAZOV'],
  ['hero headline', az.hero.titleBottom],
  ['hero lead', az.hero.lead.slice(0, 40)],
  ['about heading', az.about.title],
  ['rigs heading', az.rigs.title],
  ['rig spec value', site.rigs[0].value],
  ['games heading', az.games.title],
  ['game logo tile', site.games[0].logo ?? ''],
  ['game chip', site.games[site.games.length - 1].name],
  ['pricing heading', az.pricing.title],
  ['price amount', `>${site.price.hour}<`],
  ['branches heading', az.branches.title],
  ['branch name', az.branches.xirdalanName],
  ['branch address', az.branches.xirdalanAddress],
  ['closing time', site.hours.close],
  ['gallery heading', az.gallery.title],
  ['gallery photo', site.gallery[0].src],
  ['gallery alt text', az.gallery.alt[site.gallery[0].id]],
  ['hero backdrop photo', site.heroPhoto],
  ['contact heading', az.contact.title],
  ['instagram link', site.social.instagram],
  ['tiktok link', site.social.tiktok],
  // `&` is escaped in attribute output, so compare against the escaped form.
  ['map link', site.branches[0].mapUrl.replace(/&/g, '&amp;')],
  ['footer tagline', az.footer.tagline],
  // Motion layer — these are plain CSS classes, so assert they reach the markup.
  ['scroll reveal wrappers', 'ngc-reveal'],
  ['card hover wrappers', 'ngc-card'],
  ['gradient headline', 'ngc-grad'],
  ['ticker strip', 'ngc-marquee-track'],
  ['ticker copy', az.ticker.noAgeLimit],
  ['animated speed lines', 'ngc-streaks'],
  ['scroll progress bar', 'ngc-progress'],
]

/**
 * CSS guards. react-native-web appends `px` to numeric style values, so a
 * ratio written as a number silently becomes `1.65px` and collapses the text.
 * These assert the generated stylesheet is actually correct.
 */
const cssRules: [label: string, ok: boolean][] = [
  [
    'line-height stays a ratio (no px)',
    !/line-height:\s*[01]\.\d+px/.test(css) && !/line-height:\s*1px/.test(css),
  ],
  ['body line-height present', css.includes('line-height:1.65')],
  // react-native-web normalises hex colours to rgba(), so match that form.
  ['accent colour used', css.includes('rgba(255,46,23')],
  ['display font wired up', css.includes('Exo 2')],
]

let failed = 0

for (const [label, needle] of expected) {
  const ok = html.includes(needle)
  if (!ok) failed++
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${label}`)
  if (!ok) console.log(`        missing: ${JSON.stringify(needle)}`)
}

for (const [label, ok] of cssRules) {
  if (!ok) failed++
  console.log(`${ok ? '  ok  ' : ' FAIL '} css: ${label}`)
}

console.log(`\nrendered ${html.length} chars of html, ${css.length} chars of css`)

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`)
  process.exit(1)
}

console.log(`all ${expected.length + cssRules.length} checks passed.`)
