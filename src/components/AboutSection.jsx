import nosotrosBg from '../assets/medlife/img/nosotros/nosotros-bg.png'

export default function AboutSection() {
  return (
    <section
      className="nosotros-hero"
      id="nosotros"
      style={{ backgroundImage: `url(${nosotrosBg})` }}
    >
      <div className="nosotros-content">
        <h1>¡ Conoce mas acerca de nosotros !</h1>
        <p>
          Nuestra app combina lo mejor de la medicina con el poder de la inteligencia
          artificial para hacer tu vida más fácil. Te ofrecemos consultas médicas rápidas
          y seguras, acceso a especialistas, orientación inmediata con IA y la posibilidad
          de adquirir productos farmacéuticos sin complicaciones. Todo en un solo lugar,
          pensado para tu salud y bienestar.
        </p>
      </div>
    </section>
  )
}
