import logoImg from '../assets/medlife/img/inicio/logo.png'

export default function Header({ activeSection = 'inicio' }) {
  return (
    <>
      <header className="site-header">
        <div className="logo">
          <img src={logoImg} alt="Medlife" className="logo-icon" />
          <div className="logo-text">
            <span className="logo-title">MEDLIFE</span>
            <span className="logo-subtitle">VIRTUAL HEALTHCARE</span>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''}>
            INICIO
          </a>
          <a href="#nosotros" className={activeSection === 'nosotros' ? 'active' : ''}>
            NOSOTROS
          </a>
          <a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''}>
            SERVICIOS
          </a>
          <a href="#especialidades">ESPECIALIDADES</a>
          <a href="#blog">BLOG</a>
          <a href="#farmacia">FARMACIA</a>
          <a href="#pagos">PAGOS</a>
        </nav>
      </header>

      <div className="gray-bar"></div>
    </>
  )
}
