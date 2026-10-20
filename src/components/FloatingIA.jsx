export default function FloatingIA() {
  return (
    <a href="#ia" className="ia-float-btn" aria-label="Ir a IA">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#ffffff" />
        <polygon
          points="42.0,25.0 49.1,47.9 72.0,55.0 49.1,62.1 42.0,85.0 34.9,62.1 12.0,55.0 34.9,47.9"
          fill="#2E9EF0"
        />
        <polygon
          points="74.0,15.0 76.5,23.5 85.0,26.0 76.5,28.5 74.0,37.0 71.5,28.5 63.0,26.0 71.5,23.5"
          fill="#2E9EF0"
        />
        <g fill="#2E9EF0">
          <rect x="70" y="70" width="18" height="6" rx="2" />
          <rect x="76" y="64" width="6" height="18" rx="2" />
        </g>
        <text
          x="42"
          y="60"
          textAnchor="middle"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="20"
          fill="#ffffff"
        >
          IA
        </text>
      </svg>
    </a>
  )
}
