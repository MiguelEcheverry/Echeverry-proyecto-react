import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import FloatingIA from './components/FloatingIA'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header activeSection="inicio" />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <Footer />
      <FloatingIA />
    </div>
  )
}

export default App
