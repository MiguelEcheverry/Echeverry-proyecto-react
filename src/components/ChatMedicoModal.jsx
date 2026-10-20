import { useState, useEffect, useRef } from 'react'

export default function ChatMedicoModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'patient', text: 'HOLA DOCTORA, NO HE TENIDO MAS FIEBRE DESDE AYER' },
    { id: 2, sender: 'doctor', text: 'HOLA, ¿HAS TENIDO DOLOR DE CABEZA O MALESTAR EN EL CUERPO?' },
    { id: 3, sender: 'patient', text: 'SI, DOCTORA, ME SIGO SINTIENDO ALGO DEBIL' },
  ])
  const [inputText, setInputText] = useState('')
  const [attachMenuOpen, setAttachMenuOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  if (!isOpen) return null

  const handleSendMessage = (e) => {
    e.preventDefault()
    const text = inputText.trim()
    if (!text) return

    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: text.toUpperCase(),
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText('')
    setIsTyping(true)

    // Doctor / AI response
    setTimeout(() => {
      let replyText =
        'Comprendo tus síntomas. Te recomiendo mantener buena hidratación y reposo. He registrado tus signos para la videoconsulta.'
      const lower = text.toLowerCase()
      if (lower.includes('hola') || lower.includes('buenas')) {
        replyText =
          '¡Hola! Soy la Dra. Isabel Duque del equipo médico de Medlife. ¿En qué te podemos ayudar hoy?'
      } else if (lower.includes('fiebre') || lower.includes('temperatura')) {
        replyText =
          'Si la temperatura supera los 38.5°C de forma continua, puedes tomar acetaminofén 500mg según prescripción y colocar paños tibios.'
      } else if (lower.includes('dolor') || lower.includes('cabeza')) {
        replyText =
          'El dolor puede asociarse a fatiga o deshidratación. Por favor evita pantallas y descansa en un ambiente con poca luz.'
      } else if (lower.includes('cita') || lower.includes('consulta')) {
        replyText =
          'Puedes agendar tu cita directa en la sección CONSULTAS del portal con cualquiera de nuestras 8 especialidades.'
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'doctor',
          text: replyText.toUpperCase(),
        },
      ])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="chat-topbar">
          <button className="chat-back-btn" onClick={onClose} title="Cerrar chat">
            &#8249;
          </button>
          <span className="chat-topbar-title">MEDLIFE CHAT MÉDICO & IA 24/7</span>
          <span className="chat-online-indicator">● EN LÍNEA</span>
        </div>

        <div className="chat-body-container">
          {/* Left panel: Doctor profile */}
          <div className="panel-left">
            <div className="panel-label">MÉDICO ASIGNADO</div>
            <div className="doctor-row">
              <div className="avatar-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <div>
                <div className="doctor-name">DRA. ISABEL DUQUE</div>
                <div className="doctor-spec">MEDICINA GENERAL / IA ASSIST</div>
              </div>
            </div>

            <div className="contact-list-mini">
              <div className="panel-label">CANALES DISPONIBLES</div>
              <div className="contact-item-chat active">
                <i className="fa-solid fa-stethoscope"></i>
                <span>Consulta General</span>
              </div>
              <div className="contact-item-chat">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>Triage IA Medlife</span>
              </div>
              <div className="contact-item-chat">
                <i className="fa-solid fa-pills"></i>
                <span>Orientación Farmacéutica</span>
              </div>
            </div>
          </div>

          {/* Middle / Right: Chat dialogue */}
          <div className="panel-mid">
            <div className="consult-label">SALA DE ORIENTACIÓN VIRTUAL</div>

            <div className="messages" id="messages">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`msg-row ${m.sender === 'patient' ? 'mine' : ''}`}
                >
                  {m.sender === 'doctor' && (
                    <div className="avatar-circle">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                  )}
                  <div className={`bubble ${m.sender}`}>{m.text}</div>
                </div>
              ))}

              {isTyping && (
                <div className="msg-row">
                  <div className="avatar-circle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                  </div>
                  <div className="bubble doctor typing-indicator">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message composer */}
            <form className="composer" onSubmit={handleSendMessage}>
              <button
                type="button"
                className="plus-btn"
                onClick={() => setAttachMenuOpen(!attachMenuOpen)}
                title="Adjuntos"
              >
                +
              </button>

              {attachMenuOpen && (
                <div className="attach-menu">
                  <div onClick={() => setAttachMenuOpen(false)}>📷 CÁMARA</div>
                  <div onClick={() => setAttachMenuOpen(false)}>📁 SUBIR ARCHIVO</div>
                  <div onClick={() => setAttachMenuOpen(false)}>🖼️ FOTOS</div>
                  <div onClick={() => setAttachMenuOpen(false)}>📋 HISTORIA CLÍNICA</div>
                </div>
              )}

              <input
                id="chatInput"
                type="text"
                placeholder="Escribe tu consulta médica o síntoma..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoComplete="off"
              />

              <button type="submit" className="send-msg-btn">
                ENVIAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
