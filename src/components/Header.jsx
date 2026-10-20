import { useState, useEffect } from 'react'
import logoImg from '../assets/medlife/img/inicio/logo.png'

export default function Header({
  activeSection = 'inicio',
  cartCount = 0,
  onOpenCart,
  onOpenAuth,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'inicio', label: 'INICIO', href: '#inicio' },
    { id: 'nosotros', label: 'NOSOTROS', href: '#nosotros' },
    { id: 'especialidades', label: 'ESPECIALIDADES', href: '#especialidades' },
    { id: 'servicios', label: 'SERVICIOS', href: '#servicios' },
    { id: 'consultas', label: 'CONSULTAS', href: '#consultas' },
    { id: 'blog', label: 'BLOG', href: '#blog' },
    { id: 'farmacia', label: 'FARMACIA', href: '#farmacia' },
    { id: 'pagos', label: 'PAGOS', href: '#pagos' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <a href="#inicio" className="logo" onClick={(e) => handleLinkClick(e, '#inicio')}>
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
              href={link.href}
              className={activeSection === link.id ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.href)}
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
