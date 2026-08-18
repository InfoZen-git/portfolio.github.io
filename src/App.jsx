import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageIntro from './components/layout/PageIntro'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Content from './components/sections/Content'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />

        {/* Séparateur lumineux entre le hero et le reste de la page */}
        <div
          aria-hidden="true"
          className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <About />
        <Projects />
        <Content />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
