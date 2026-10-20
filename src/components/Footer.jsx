import contactIcon from '../assets/medlife/img/nosotros/contact-icon.png'

export default function Footer() {
  return (
    <footer className="contact-bar" id="contacto">
      <div className="contact-icon">
        <img src={contactIcon} alt="Medlife" className="contact-heart" />
      </div>
      <div className="contact-item">
        <svg className="contact-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
            stroke="#1C86C4"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span>+57 322 7048889</span>
      </div>
      <div className="contact-item">
        <svg className="contact-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="#1C86C4" strokeWidth="1.6" />
          <path d="M3.5 6L12 13L20.5 6" stroke="#1C86C4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>INFO@MEDILIFEGROUP.COM</span>
      </div>
    </footer>
  )
}
