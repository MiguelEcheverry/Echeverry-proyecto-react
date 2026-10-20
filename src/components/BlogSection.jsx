import { useState } from 'react'

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState('lepra')
  const [selectedCategory, setSelectedCategory] = useState('TODAS')

  const articles = {
    lepra: {
      title: '¿QUÉ ES LA LEPRA?',
      metaTime: 'PUBLICADO HACE 2 AÑOS',
      category: 'SALUD',
      intro:
        'La lepra, también llamada enfermedad de Hansen, es una enfermedad infecciosa crónica causada por una bacteria llamada Mycobacterium leprae. Esta bacteria afecta principalmente la piel, los nervios periféricos, los ojos y algunas partes de las vías respiratorias.',
      p1:
        'La lepra se transmite de una persona a otra principalmente a través de gotas que salen por la nariz o la boca cuando una persona enferma y no tratada tose o estornuda. Sin embargo, no es una enfermedad muy contagiosa, y normalmente se necesita contacto cercano y prolongado con una persona infectada para que ocurra el contagio.',
      p2:
        'Uno de los síntomas más comunes de la lepra es la aparición de manchas claras o rojizas en la piel que pueden perder sensibilidad. También pueden aparecer entumecimiento en manos y pies, debilidad muscular, lesiones en la piel y daño en los nervios. Si la enfermedad no se trata a tiempo, puede causar daños permanentes en los nervios, deformaciones en manos o pies y problemas en los ojos.',
      p3:
        'La lepra tiene cura. Actualmente se trata con una combinación de antibióticos especiales durante varios meses, tratamiento conocido como terapia multidrogas, recomendado por la Organización Mundial de la Salud. Con el tratamiento adecuado, la persona deja de contagiar rápidamente y puede recuperarse.',
    },
    asperger: {
      title: 'DÍA INTERNACIONAL DEL SÍNDROME DE ASPERGER',
      metaTime: 'PUBLICADO HACE 1 AÑO',
      category: 'BIENESTAR',
      intro:
        'El Síndrome de Asperger es una condición del neurodesarrollo que se encuentra dentro del espectro autista. Las personas con esta condición suelen tener un lenguaje fluido y una inteligencia promedio o superior, pero enfrentan desafíos en la interacción social.',
      p1:
        'Se caracteriza por un interés profundo y especializado en áreas particulares del conocimiento, apego a rutinas predecibles y una forma honesta, directa y analítica de ver el mundo.',
      p2:
        'La sensibilización social y la educación inclusiva son fundamentales para derribar estigmas y permitir que las personas con Asperger desarrollen plenamente sus talentos y capacidades en la sociedad.',
      p3:
        'En Medlife ofrecemos acompañamiento multidisciplinario con especialistas en psicología, neurología y terapia ocupacional para brindar apoyo a pacientes y sus familias.',
    },
    glaucoma: {
      title: 'DÍA MUNDIAL DEL GLAUCOMA',
      metaTime: 'PUBLICADO HACE 6 MESES',
      category: 'CORPORATIVO',
      intro:
        'El glaucoma es conocido como "el ladrón silencioso de la vista", ya que en sus etapas iniciales no presenta síntomas evidentes mientras causa daño progresivo al nervio óptico.',
      p1:
        'La principal causa suele ser un aumento de la presión intraocular. Si no se detecta y trata oportunamente, puede derivar en pérdida irreversible del campo visual e incluso ceguera total.',
      p2:
        'Los chequeos oftalmológicos periódicos a partir de los 40 años son la mejor herramienta de prevención, permitiendo iniciar tratamientos con gotas o procedimientos que preservan la visión.',
      p3:
        'Cuidar tu salud ocular es fundamental para mantener tu independencia y calidad de vida en todas las etapas.',
    },
  }

  const current = articles[selectedArticle] || articles.lepra

  return (
    <section className="blog-section-wrapper" id="blog">
      <div className="blog-wrapper">
        <div className="post-meta">
          <div className="meta-item">
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            {current.metaTime}
          </div>
          <div className="meta-item">
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-4.35-9.5-8.5C.7 8.6 2.4 5 6 5c2 0 3.4 1.1 4 2 0.6-.9 2-2 4-2 3.6 0 5.3 3.6 3.5 7.5C19 16.65 12 21 12 21z" />
            </svg>
            {current.category}
          </div>
        </div>

        <div className="content-grid">
          {/* ARTICLE COLUMN */}
          <article className="article-col">
            <div className="article-head">
              <div className="article-thumb-wrapper">
                <svg viewBox="0 0 100 100" className="blog-placeholder-svg">
                  <rect width="100" height="100" rx="12" fill="#EAF6FA" />
                  <circle cx="50" cy="50" r="32" fill="#7FCBE0" />
                  <path
                    d="M32 50 L44 50 L48 38 L54 62 L60 44 L64 50 L72 50"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="article-title-block">
                <h1>{current.title}</h1>
                <p>{current.intro}</p>
              </div>
            </div>

            <div className="article-body">
              <p>{current.p1}</p>
              <p>{current.p2}</p>
              <p>{current.p3}</p>
            </div>
          </article>

          {/* SIDEBAR COLUMN */}
          <aside className="sidebar-col">
            <div className="sidebar-block">
              <h3>CATEGORÍAS</h3>
              <ul className="category-list">
                {['BIENESTAR', 'CORPORATIVO', 'SALUD'].map((cat) => (
                  <li key={cat}>
                    <span className="bullet">·</span>{' '}
                    <a
                      href="#blog"
                      className={selectedCategory === cat ? 'active-cat' : ''}
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedCategory(cat)
                      }}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-block">
              <h3>ENTRADAS RECIENTES</h3>
              <ul className="recent-list">
                <li>
                  <span className="bullet">·</span>{' '}
                  <a
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedArticle('lepra')
                    }}
                    style={{ fontWeight: selectedArticle === 'lepra' ? '800' : 'normal' }}
                  >
                    ¿Qué es la lepra?
                  </a>
                </li>
                <li>
                  <span className="bullet">·</span>{' '}
                  <a
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedArticle('asperger')
                    }}
                    style={{ fontWeight: selectedArticle === 'asperger' ? '800' : 'normal' }}
                  >
                    Día internacional del síndrome de Asperger
                  </a>
                </li>
                <li>
                  <span className="bullet">·</span>{' '}
                  <a
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedArticle('glaucoma')
                    }}
                    style={{ fontWeight: selectedArticle === 'glaucoma' ? '800' : 'normal' }}
                  >
                    Día mundial del glaucoma
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
