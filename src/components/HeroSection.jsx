import logoBlanco from '../assets/medlife/img/inicio/logo_blanco.png'

export default function HeroSection() {
  const handleConsultaClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#consultas')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="inicio-hero" id="inicio">
      <div className="hero-badge" aria-hidden="true">
        <img src={logoBlanco} alt="Medlife Logo Blanco" className="badge-logo" />
      </div>

      <div className="hero-content">
        <h1>Atención médica inmediata, sin salir de casa.</h1>
        <p>
          Transformamos la atención médica para que accedas a consultas y medicamentos sin complicaciones.
        </p>
        <a
          href="#consultas"
          className="btn-pill btn-consulta"
          onClick={handleConsultaClick}
        >
          Realiza tu consulta
        </a>
      </div>
    </section>
  )
}
