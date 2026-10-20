import { useState, useEffect } from 'react'
import logoImg from '../assets/medlife/img/inicio/logo.png'

export default function Header({
  activeTab = 'inicio',
  activeSection,
  onSelectTab,
  cartCount = 0,
  onOpenCart,
  onOpenAuth,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const currentActive = activeTab || activeSection || 'inicio'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'nosotros', label: 'NOSOTROS' },
    { id: 'especialidades', label: 'ESPECIALIDADES' },
    { id: 'servicios', label: 'SERVICIOS' },
    { id: 'consultas', label: 'CONSULTAS' },
    { id: 'blog', label: 'BLOG' },
    { id: 'farmacia', label: 'FARMACIA' },
    { id: 'pagos', label: 'PAGOS' },
  ]

  const handleLinkClick = (e, tabId) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onSelectTab) {
      onSelectTab(tabId)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <a
          href="#inicio"
          className="logo"
          onClick={(e) => handleLinkClick(e, 'inicio')}
        >
          <img src={logoImg} alt="Medlife" className="logo-icon" />
          <div className="logo-text">
            <span className="logo-title">MEDLIFE</span>
            <span className="logo-subtitle">VIRTUAL HEALTHCARE</span>
          </div>
        </a>

        <button
          className="mobile-nav-toggle"
          aria-label="Abrir menú"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'main-nav--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={currentActive === link.id ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}

          <div className="nav-actions">
            <button
              className="nav-cart-btn"
              onClick={onOpenCart}
              title="Ver Carrito de Compras"
            >
              <span className="cart-emoji">🛒</span>
              <span className="cart-badge">{cartCount}</span>
            </button>
            <button
              className="nav-user-btn"
              onClick={onOpenAuth}
              title="Iniciar Sesión / Registro"
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </nav>
      </header>

      <div className="gray-bar"></div>
    </>
  )
}
