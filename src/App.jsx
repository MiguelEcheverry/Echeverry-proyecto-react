import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SpecialtiesSection from './components/SpecialtiesSection'
import ServicesSection from './components/ServicesSection'
import ConsultasSection from './components/ConsultasSection'
import BlogSection from './components/BlogSection'
import PharmacySection from './components/PharmacySection'
import PaymentsSection from './components/PaymentsSection'
import Footer from './components/Footer'
import FloatingIA from './components/FloatingIA'
import ChatMedicoModal from './components/ChatMedicoModal'
import AuthModal from './components/AuthModal'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Carrito persistido en localStorage (compatible con medlife_cart original)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('medlife_cart')) || []
    } catch {
      return []
    }
  })

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('medlife_cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Error saving cart to localStorage', e)
    }
  }, [cart])

  // Detección de sección activa mediante IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], main[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Operaciones del Carrito
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name)
      if (existing) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [
        ...prevCart,
        {
          name: product.name,
          price: product.price,
          priceOld: product.priceOld,
          brand: product.brand,
          badge: product.badge,
          promoText: product.promoText,
          mlText: product.mlText,
          deliveryText: product.deliveryText,
          ratingText: product.ratingText,
          iconType: product.iconType,
          qty: 1,
        },
      ]
    })
  }

  const handleRemoveFromCart = (productName) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === productName)
      if (!existing) return prevCart
      if (existing.qty <= 1) {
        return prevCart.filter((item) => item.name !== productName)
      }
      return prevCart.map((item) =>
        item.name === productName ? { ...item, qty: item.qty - 1 } : item
      )
    })
  }

  const handleUpdateQty = (productName, delta) => {
    if (delta > 0) {
      handleAddToCart({ name: productName })
    } else {
      handleRemoveFromCart(productName)
    }
  }

  const handleRemoveCartItem = (productName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName))
  }

  const handleClearCart = () => {
    setCart([])
  }

  const scrollToPharmacy = () => {
    const target = document.querySelector('#farmacia')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToPayments = () => {
    const target = document.querySelector('#pagos')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="app-container">
      {/* 1. Header con barra gris y navegación fluida */}
      <Header
        activeSection={activeSection}
        cartCount={totalCartCount}
        onOpenCart={scrollToPayments}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* 2. Hero Section (Inicio) */}
      <HeroSection />

      {/* 3. About Section (Nosotros) */}
      <AboutSection />

      {/* 4. Specialties Section (Especialidades) */}
      <SpecialtiesSection onSelectSpecialty={(spec) => setSelectedSpecialty(spec)} />

      {/* 5. Services Section (Servicios) */}
      <ServicesSection onOpenChatIA={() => setChatModalOpen(true)} />

      {/* 6. Consultas Section (Formulario & Términos) */}
      <ConsultasSection selectedSpecialty={selectedSpecialty} />

      {/* 7. Blog Section (Artículos de Salud) */}
      <BlogSection />

      {/* 8. Pharmacy Section (Catálogo, Buscador, Autocompletado) */}
      <PharmacySection
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onOpenCart={scrollToPayments}
      />

      {/* 9. Payments & Cart Section (Checkout & Pagos) */}
      <PaymentsSection
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onGoToPharmacy={scrollToPharmacy}
      />

      {/* 10. Footer (Contacto) */}
      <Footer />

      {/* 11. Botón Flotante IA */}
      <FloatingIA onClick={() => setChatModalOpen(true)} />

      {/* Modales Interactivos */}
      <ChatMedicoModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  )
}

export default App
