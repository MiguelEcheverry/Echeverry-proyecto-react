import { useState, useEffect } from 'react'

export default function ConsultasSection({ selectedSpecialty = '' }) {
  const [activeView, setActiveView] = useState('mainView') // mainView | termsView | habeasView
  const [docTypeOpen, setDocTypeOpen] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)

  const [formData, setFormData] = useState({
    nombre: '',
    tipoDoc: 'INGRESE SU TIPO DE DOCUMENTO',
    telefono: '',
    numDoc: '',
    departamento: 'SELECCIONE DEPARTAMENTO',
    ciudad: 'SELECCIONE CIUDAD',
    direccion: '',
    email: '',
    password: '',
    especialidad: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [prevSpecialty, setPrevSpecialty] = useState(selectedSpecialty)

  if (selectedSpecialty !== prevSpecialty) {
    setPrevSpecialty(selectedSpecialty)
    setFormData((prev) => ({ ...prev, especialidad: selectedSpecialty }))
  }

  // Click outside to close dropdowns
  useEffect(() => {
    const handleDocumentClick = () => {
      setDocTypeOpen(false)
      setDeptOpen(false)
      setCityOpen(false)
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const docTypes = [
    'Cédula Ciudadanía',
    'Cédula Extranjería',
    'Tarj. Identidad',
    'Pasaporte',
    'Registro Civil',
  ]

  const departments = [
    'Amazonas',
    'Antioquia',
    'Arauca',
    'Atlántico',
    'Bolívar',
    'Boyacá',
  ]

  const cities = [
    'Leticia',
    'Medellín',
    'Arauca',
    'Barranquilla',
    'Cartagena',
    'Tunja',
    'Manizales',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombre || !formData.email || !formData.telefono) {
      alert('Por favor complete sus datos básicos de contacto.')
      return
    }
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nombre: '',
        tipoDoc: 'INGRESE SU TIPO DE DOCUMENTO',
        telefono: '',
        numDoc: '',
        departamento: 'SELECCIONE DEPARTAMENTO',
        ciudad: 'SELECCIONE CIUDAD',
        direccion: '',
        email: '',
        password: '',
        especialidad: '',
      })
    }, 4000)
  }

  return (
    <section className="consultas-container" id="consultas">
      <div className="consultas-header">
        <div className="logo-block">
          <svg className="logo-icon-consultas" viewBox="0 0 90 60" fill="none">
            <path
              d="M45 50s-30-11.5-30-26.5C15 13 22 8 29 8c5 0 9 2.5 8 8 0 0 0-8 8-8 7 0 13 5 13 13.5C58 38.5 45 50 45 50z"
              stroke="#1f7fc4"
              strokeWidth="4"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M22 25h10l4-7 6 14 4-7h10"
              stroke="#1f7fc4"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div className="brand-name">
            MEDLIFE
            <span>VIRTUAL HEALTHCARE</span>
          </div>
        </div>
        <div className="header-text">
          ENVÍANOS LOS SIGUIENTES DATOS PARA ASIGNARTE EL SERVICIO MÉDICO QUE REQUIERAS.
          <br />
          PODEMOS ATENDERTE POR VIDEOLLAMADAS, CHAT 24/7 O EN CONSULTORIOS VIRTUALES
        </div>
      </div>

      {activeView === 'mainView' && (
        <div className="view active" id="mainView">
          <div className="title-bar">
            REALIZA TU CONSULTA
            {formData.especialidad && (
              <span className="specialty-badge-inline"> - {formData.especialidad}</span>
            )}
          </div>

          <div className="form-wrap">
            {submitted ? (
              <div className="consulta-success-card">
                <i className="fa-solid fa-circle-check success-check-icon"></i>
                <h2>¡Solicitud Recibida con Éxito!</h2>
                <p>
                  Estimado(a) <strong>{formData.nombre || 'paciente'}</strong>, hemos asignado su solicitud
                  de consulta médica. Un profesional de Medlife se comunicará a su teléfono o correo en los próximos minutos.
                </p>
              </div>
            ) : (
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Ingrese su nombre completo (nombres y apellidos)"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="row">
                  <div
                    className="field"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDocTypeOpen(!docTypeOpen)
                      setDeptOpen(false)
                      setCityOpen(false)
                    }}
                  >
                    <div className={`select-display ${docTypeOpen ? 'open' : ''}`} tabIndex={0}>
                      <span className="select-label">{formData.tipoDoc}</span>
                      <span className="arrow">&#9660;</span>
                    </div>
                    {docTypeOpen && (
                      <div className="dropdown-panel show">
                        {docTypes.map((item) => (
                          <div
                            key={item}
                            className={formData.tipoDoc === item.toUpperCase() ? 'active' : ''}
                            onClick={() => setFormData({ ...formData, tipoDoc: item.toUpperCase() })}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="field">
                    <input
                      type="tel"
                      placeholder="Ingrese su número de teléfono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <input
                    type="text"
                    placeholder="Ingrese su número de documento"
                    value={formData.numDoc}
                    onChange={(e) => setFormData({ ...formData, numDoc: e.target.value })}
                    required
                  />
                </div>

                <div className="row">
                  <div
                    className="field"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeptOpen(!deptOpen)
                      setDocTypeOpen(false)
                      setCityOpen(false)
                    }}
                  >
                    <div className={`select-display ${deptOpen ? 'open' : ''}`} tabIndex={0}>
                      <span className="select-label">{formData.departamento}</span>
                      <span className="arrow">&#9660;</span>
                    </div>
                    {deptOpen && (
                      <div className="dropdown-panel show">
                        {departments.map((item) => (
                          <div
                            key={item}
                            className={formData.departamento === item.toUpperCase() ? 'active' : ''}
                            onClick={() => setFormData({ ...formData, departamento: item.toUpperCase() })}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="field"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCityOpen(!cityOpen)
                      setDocTypeOpen(false)
                      setDeptOpen(false)
                    }}
                  >
                    <div className={`select-display ${cityOpen ? 'open' : ''}`} tabIndex={0}>
                      <span className="select-label">{formData.ciudad}</span>
                      <span className="arrow">&#9660;</span>
                    </div>
                    {cityOpen && (
                      <div className="dropdown-panel show">
                        {cities.map((item) => (
                          <div
                            key={item}
                            className={formData.ciudad === item.toUpperCase() ? 'active' : ''}
                            onClick={() => setFormData({ ...formData, ciudad: item.toUpperCase() })}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="field">
                  <input
                    type="text"
                    placeholder="Ingrese su dirección (Barrio, número, código postal)"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </div>

                <div className="row">
                  <div className="field">
                    <input
                      type="email"
                      placeholder="Ingrese su correo electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      placeholder="Ingrese una contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="terms">
                  Al enviar sus datos, está de acuerdo con la ley vigente{' '}
                  <a
                    href="#habeas"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveView('habeasView')
                    }}
                  >
                    Habeas Data
                  </a>{' '}
                  y los{' '}
                  <a
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveView('termsView')
                    }}
                  >
                    términos y condiciones
                  </a>{' '}
                  que puede consultar
                </div>

                <button type="submit" className="submit-btn">
                  ENVIAR DATOS
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VISTA: TÉRMINOS Y CONDICIONES */}
      {activeView === 'termsView' && (
        <div className="view active" id="termsView">
          <div className="legal-wrap">
            <span
              className="back-arrow"
              onClick={() => setActiveView('mainView')}
              title="Volver al formulario"
            >
              &#8249;
            </span>
            <div className="legal-card">
              <h1 className="legal-title">TERMINOS Y CONDICIONES</h1>
              <p className="legal-subtitle">
                AL UTILIZAR EL SITIO WEB DE MEDLIFE, EL USUARIO ACEPTA LOS SIGUIENTES TÉRMINOS
              </p>
              <ul className="legal-list">
                <li>
                  <strong>USO DEL SERVICIO:</strong> LA PLATAFORMA OFRECE ORIENTACIÓN Y CONSULTAS
                  VIRTUALES CON FINES INFORMATIVOS. NO REEMPLAZA UNA CONSULTA MÉDICA PRESENCIAL
                  CUANDO SEA NECESARIA.
                </li>
                <li>
                  <strong>RESPONSABILIDAD DEL USUARIO:</strong> EL USUARIO SE COMPROMETE A PROPORCIONAR
                  INFORMACIÓN VERAZ Y A UTILIZAR EL SITIO DE MANERA ADECUADA Y LEGAL.
                </li>
                <li>
                  <strong>CONFIDENCIALIDAD:</strong> LA INFORMACIÓN PERSONAL Y MÉDICA PROPORCIONADA
                  SERÁ TRATADA DE FORMA CONFIDENCIAL Y UTILIZADA ÚNICAMENTE PARA LA PRESTACIÓN DEL SERVICIO.
                </li>
                <li>
                  <strong>LIMITACIÓN DE RESPONSABILIDAD:</strong> EL CONSULTORIO NO SE HACE RESPONSABLE
                  POR DECISIONES TOMADAS POR EL USUARIO BASADAS ÚNICAMENTE EN LA INFORMACIÓN BRINDADA EN LA CONSULTA VIRTUAL.
                </li>
                <li>
                  <strong>MODIFICACIONES:</strong> EL CONSULTORIO SE RESERVA EL DERECHO DE MODIFICAR
                  ESTOS TÉRMINOS EN CUALQUIER MOMENTO.
                </li>
              </ul>
              <button
                type="button"
                className="legal-accept"
                onClick={() => setActiveView('mainView')}
              >
                ACEPTAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA: HABEAS DATA */}
      {activeView === 'habeasView' && (
        <div className="view active" id="habeasView">
          <div className="legal-wrap">
            <span
              className="back-arrow"
              onClick={() => setActiveView('mainView')}
              title="Volver al formulario"
            >
              &#8249;
            </span>
            <div className="legal-card">
              <h1 className="legal-title">HABEAS DATA</h1>
              <p className="legal-intro">
                DE CONFORMIDAD CON LA LEGISLACIÓN VIGENTE SOBRE PROTECCIÓN DE DATOS PERSONALES, EL USUARIO
                AUTORIZA A MEDLIFE PARA RECOLECTAR, ALMACENAR, USAR Y TRATAR LA INFORMACIÓN PERSONAL
                SUMINISTRADA A TRAVÉS DE LA PÁGINA WEB.
                <br />
                LOS DATOS SERÁN UTILIZADOS ÚNICAMENTE PARA:
              </p>
              <ul className="legal-list">
                <li>GESTIONAR LAS CONSULTAS MÉDICAS VIRTUALES.</li>
                <li>CONTACTAR AL USUARIO CUANDO SEA NECESARIO.</li>
                <li>MEJORAR LA PRESTACIÓN DEL SERVICIO.</li>
                <li>
                  EL USUARIO TIENE DERECHO A CONOCER, ACTUALIZAR, RECTIFICAR O SOLICITAR LA ELIMINACIÓN DE SUS
                  DATOS PERSONALES EN CUALQUIER MOMENTO.
                </li>
                <li>
                  AL UTILIZAR LA PLATAFORMA Y PROPORCIONAR SU INFORMACIÓN, EL USUARIO ACEPTA EL TRATAMIENTO DE
                  SUS DATOS PERSONALES CONFORME A ESTA AUTORIZACIÓN DE HABEAS DATA.
                </li>
              </ul>
              <button
                type="button"
                className="legal-accept"
                onClick={() => setActiveView('mainView')}
              >
                ACEPTAR
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
