import { useState } from 'react'

const SPECIALTIES = [
  {
    id: 'psicologia',
    title: 'PSICOLOGÍA',
    gridImg: '/images/grid-psicologia.jpg',
    bannerImg: '/images/banner-psicologia.jpg',
    desc: 'Brindamos acompañamiento profesional para el manejo de emociones, estrés y salud mental, fortaleciendo tu bienestar y calidad de vida.',
  },
  {
    id: 'medicina-general',
    title: 'MEDICINA GENERAL',
    gridImg: '/images/grid-medicina-general.jpg',
    bannerImg: '/images/banner-medicina-general.jpg',
    desc: 'Brindamos atención médica integral para la prevención, diagnóstico y tratamiento de enfermedades comunes. Incluye evaluación clínica, orientación médica, control de salud y seguimiento del paciente, con el objetivo de mantener y mejorar su bienestar general.',
  },
  {
    id: 'pediatria',
    title: 'PEDIATRÍA',
    gridImg: '/images/grid-pediatria.jpg',
    bannerImg: '/images/banner-pediatria.jpg',
    desc: 'Brindamos atención médica especializada para niños y adolescentes, acompañando su crecimiento y desarrollo con controles preventivos, diagnóstico oportuno y tratamiento adecuado en cada etapa.',
  },
  {
    id: 'enfermeria',
    title: 'ENFERMERÍA',
    gridImg: '/images/grid-enfermeria.jpg',
    bannerImg: '/images/banner-enfermeria.jpg',
    desc: 'Brinda apoyo en la atención y cuidado de los pacientes, incluyendo control de signos vitales, administración de medicamentos, curaciones y asistencia en procedimientos médicos. Su objetivo es garantizar una atención segura, oportuna y de calidad para el bienestar del paciente.',
  },
  {
    id: 'nutricion',
    title: 'NUTRICIÓN',
    gridImg: '/images/grid-nutricion.jpg',
    bannerImg: '/images/banner-nutricion.jpg',
    desc: 'Ofrece asesoría profesional para mejorar los hábitos alimenticios y promover una alimentación saludable. Incluye evaluación nutricional, elaboración de planes de alimentación personalizados y orientación para la prevención y manejo de diferentes condiciones de salud.',
  },
  {
    id: 'cardiologia',
    title: 'CARDIOLOGÍA',
    gridImg: '/images/grid-cardiologia.jpg',
    bannerImg: '/images/banner-cardiologia.jpg',
    desc: 'Se especializa en la prevención, diagnóstico y tratamiento de enfermedades del corazón y del sistema cardiovascular. Ofrece evaluación médica, control de factores de riesgo y seguimiento para mantener una buena salud cardíaca y prevenir complicaciones.',
  },
  {
    id: 'terapia-fisica',
    title: 'TERAPIA FÍSICA',
    gridImg: '/images/grid-terapia-fisica.jpg',
    bannerImg: '/images/banner-terapia-fisica.jpg',
    desc: 'Se enfoca en la prevención, tratamiento y rehabilitación de lesiones o condiciones que afectan el movimiento y la función física del cuerpo. A través de ejercicios terapéuticos y técnicas especializadas, se busca mejorar la movilidad, reducir el dolor y favorecer la recuperación del paciente.',
  },
  {
    id: 'psiquiatria',
    title: 'PSIQUIATRÍA',
    gridImg: '/images/grid-psiquiatria.jpg',
    bannerImg: '/images/banner-psiquiatria.jpg',
    desc: 'Brinda atención médica especializada para la prevención, diagnóstico y tratamiento de trastornos de salud mental. Incluye evaluación clínica, manejo terapéutico y, cuando es necesario, tratamiento farmacológico para mejorar el bienestar emocional y la calidad de vida del paciente.',
  },
]

export default function SpecialtiesSection({ onSelectSpecialty }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)

  const handleStartConsultation = (specialtyTitle) => {
    if (onSelectSpecialty) {
      onSelectSpecialty(specialtyTitle)
    }
    const target = document.querySelector('#consultas')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="specialties-section" id="especialidades">
      {!selectedSpecialty ? (
        <div className="specialties-main-view">
          <h2 className="section-title">Nuestras Especialidades</h2>

          <div className="specialties-grid">
            {SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="specialty-card"
                onClick={() => setSelectedSpecialty(spec)}
              >
                <h3 className="card-title">{spec.title}</h3>
                <div className="img-container">
                  <img src={spec.gridImg} alt={spec.title} loading="lazy" />
                  <div className="overlay">
                    <i className="fa-solid fa-arrow-pointer cursor-icon"></i>
                    <span>VER MAS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="detail-view">
          <button
            className="btn-back"
            onClick={() => setSelectedSpecialty(null)}
          >
            <i className="fa-solid fa-arrow-left"></i> Volver a Especialidades
          </button>

          <h2 className="detail-title">{selectedSpecialty.title}</h2>

          <div className="detail-banner">
            <img
              src={selectedSpecialty.bannerImg}
              alt={selectedSpecialty.title}
              loading="lazy"
            />
          </div>

          <div className="detail-info-card">
            <p>{selectedSpecialty.desc}</p>
          </div>

          <div className="btn-container">
            <button
              className="btn-consulta"
              onClick={() => handleStartConsultation(selectedSpecialty.title)}
            >
              Realiza tu consulta
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
