import { useState } from 'react'

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login') // login | register | forgot
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [msg, setMsg] = useState('')

  if (!isOpen) return null

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return
    setMsg('¡Sesión iniciada con éxito! Bienvenido(a) a Medlife.')
    setTimeout(() => {
      setMsg('')
      onClose()
    }, 1500)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || !nombre) return
    setMsg('¡Cuenta registrada con éxito! Ya puedes acceder con tus credenciales.')
    setTimeout(() => {
      setMsg('')
      setMode('login')
    }, 1800)
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setMsg('Hemos enviado un enlace de recuperación a tu correo electrónico.')
    setTimeout(() => {
      setMsg('')
      setMode('login')
    }, 2200)
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} title="Cerrar">
          ×
        </button>

        {/* Top photo banner */}
        <div className="login-page__photo-modal">
          <div className="login-page__overlay"></div>
          <div className="login-navbar-modal">
            <div className="brand-name-modal">
              MEDLIFE <span>VIRTUAL HEALTHCARE</span>
            </div>
          </div>
        </div>

        {/* Modal card content */}
        <div className="login-card-modal">
          <div className="login-card__icon">
            <svg
              className="lock-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="5" y="10" width="14" height="10" rx="2.2" fill="none" stroke="#ffffff" strokeWidth="1.8" />
              <path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div className="login-card__dots">****</div>
          </div>

          <h2 className="login-card__title">
            {mode === 'login' && 'INICIA SESIÓN'}
            {mode === 'register' && 'CREAR CUENTA'}
            {mode === 'forgot' && 'RECUPERAR CONTRASEÑA'}
          </h2>

          {msg && <div className="auth-feedback-banner">{msg}</div>}

          {mode === 'login' && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label className="login-form__label" htmlFor="email-modal">
                CORREO ELECTRÓNICO
              </label>
              <input
                className="login-form__input"
                type="email"
                id="email-modal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="login-form__label" htmlFor="pass-modal">
                CONTRASEÑA
              </label>
              <input
                className="login-form__input"
                type="password"
                id="pass-modal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-form__submit">
                ACCESO
              </button>

              <div className="auth-links-row">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setMode('forgot')}
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <button
                  type="button"
                  className="auth-link-btn primary"
                  onClick={() => setMode('register')}
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form className="login-form" onSubmit={handleRegisterSubmit}>
              <label className="login-form__label">NOMBRE COMPLETO</label>
              <input
                className="login-form__input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label className="login-form__label">CORREO ELECTRÓNICO</label>
              <input
                className="login-form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="login-form__label">CONTRASEÑA</label>
              <input
                className="login-form__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-form__submit">
                REGISTRARME
              </button>

              <div className="auth-links-row">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setMode('login')}
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          )}

          {mode === 'forgot' && (
            <form className="login-form" onSubmit={handleForgotSubmit}>
              <label className="login-form__label">INGRESA TU CORREO</label>
              <input
                className="login-form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className="login-form__submit">
                ENVIAR INSTRUCCIONES
              </button>

              <div className="auth-links-row">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setMode('login')}
                >
                  Volver a Iniciar Sesión
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
