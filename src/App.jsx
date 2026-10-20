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
  const [activeTab, setActiveTab] = useState('inicio')
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

  // Desplazamiento automático arriba al cambiar de pestaña
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  const handleSelectSpecialtyAndNavigate = (specTitle) => {
    setSelectedSpecialty(specTitle)
    handleSelectTab('consultas')
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  // Renderizado condicional de la pestaña activa (One Tab at a time)
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <HeroSection
            onNavigateConsultas={() => handleSelectTab('consultas')}
          />
        )
      case 'nosotros':
        return <AboutSection />
      case 'especialidades':
        return (
          <SpecialtiesSection
            onSelectSpecialty={handleSelectSpecialtyAndNavigate}
          />
        )
      case 'servicios':
        return (
          <ServicesSection
            onOpenChatIA={() => setChatModalOpen(true)}
            onNavigateConsultas={() => handleSelectTab('consultas')}
          />
        )
      case 'consultas':
        return (
          <ConsultasSection
            selectedSpecialty={selectedSpecialty}
          />
        )
      case 'blog':
        return <BlogSection />
      case 'farmacia':
        return (
          <PharmacySection
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onOpenCart={() => handleSelectTab('pagos')}
          />
        )
      case 'pagos':
        return (
          <PaymentsSection
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onGoToPharmacy={() => handleSelectTab('farmacia')}
          />
        )
      default:
        return (
          <HeroSection
            onNavigateConsultas={() => handleSelectTab('consultas')}
          />
        )
    }
  }

  return (
    <div className="app-container">
      {/* 1. Header con barra gris y navegación por pestañas individuales */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        cartCount={totalCartCount}
        onOpenCart={() => handleSelectTab('pagos')}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* 2. Contenedor principal de la pestaña seleccionada (Vista única no lineal) */}
      <main className="tab-content-wrapper" key={activeTab}>
        {renderActiveTab()}
      </main>

      {/* 3. Footer de contacto global */}
      <Footer />

      {/* 4. Botón Flotante Asistente IA */}
      <FloatingIA onClick={() => setChatModalOpen(true)} />

      {/* Modales Interactivos del Sistema */}
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
