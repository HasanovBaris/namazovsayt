import { StyleSheet, View } from 'react-native'
import { I18nProvider } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Rigs } from './sections/Rigs'
import { Games } from './sections/Games'
import { Pricing } from './sections/Pricing'
import { Branches } from './sections/Branches'
import { Gallery } from './sections/Gallery'
import { Contact } from './sections/Contact'
import { colors } from './theme/colors'

export default function App() {
  return (
    <I18nProvider>
      <View style={styles.page}>
        <Header />
        <Hero />
        <About />
        <Rigs />
        <Games />
        <Pricing />
        <Branches />
        <Gallery />
        <Contact />
        <Footer />
      </View>
    </I18nProvider>
  )
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    backgroundColor: colors.bg,
  },
})
