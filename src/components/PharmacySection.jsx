import { useState } from 'react'

const PHARMACY_PRODUCTS = [
  {
    id: 1,
    name: 'Protector Solar Nivea Sun Fps 70+ Muy Alto Uva Uvb...',
    brand: 'Nivea',
    price: '$55.160',
    priceOld: '$68.950',
    badge: '20%',
    promoText: '¡Exclusivo 1ra compra ref. selec. solares!',
    mlText: 'Mililitros a $ 344.75',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.5 (91)',
    iconType: 'bottle-tall',
  },
  {
    id: 2,
    name: 'Protector Solar Nivea Sensitive Fps60 125 Ml X 2...',
    brand: 'Nivea',
    price: '$78.710',
    priceOld: '$92.600',
    badge: '15%',
    promoText: '¡Exclusivo en 1era compra Nivea!',
    mlText: 'Mililitros a $ 740.80',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.0 (26)',
    iconType: 'bottle-tall',
  },
  {
    id: 3,
    name: 'Protector Solar Facial Nívea Piel Sensible Con...',
    brand: 'Nivea',
    price: '$45.730',
    priceOld: '$53.800',
    badge: '15%',
    promoText: 'Primera compra App y Web - Sólo domicilios',
    mlText: 'Mililitros a $ 1076.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.9 (304)',
    iconType: 'tube',
  },
  {
    id: 4,
    name: 'Protector Solar Nivea Sun Facial Control Brillo Spf 50...',
    brand: 'Nivea',
    price: '$48.080',
    priceOld: '$60.100',
    badge: '20%',
    promoText: '¡Aprovecha ofertas exclusivas online!',
    mlText: 'Mililitros a $ 1202.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.7 (158)',
    iconType: 'tube',
  },
  {
    id: 5,
    name: 'Protector Facial Nivea Sun Q10 Anti-edad Spf50 X 50 Ml',
    brand: 'Nivea',
    price: '$41.840',
    priceOld: '$52.300',
    badge: '20%',
    promoText: 'Cuidado antiedad y protección solar',
    mlText: 'Mililitros a $ 1046.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.8 (212)',
    iconType: 'jar',
  },
  {
    id: 6,
    name: 'Protector Solar Nivea Sun Protect & Light Feeling Fps50',
    brand: 'Nivea',
    price: '$50.200',
    priceOld: '$62.750',
    badge: '20%',
    promoText: 'Fórmula ligera toque seco',
    mlText: 'Mililitros a $ 1004.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.6 (88)',
    iconType: 'bottle-tall',
  },
  {
    id: 7,
    name: 'Protector Solar Nivea Sun Kids Swim & Play Fps50+',
    brand: 'Nivea',
    price: '$46.500',
    priceOld: '$58.100',
    badge: '20%',
    promoText: 'Resistente al agua especial para niños',
    mlText: 'Mililitros a $ 930.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.9 (320)',
    iconType: 'bottle-tall',
  },
  {
    id: 8,
    name: 'Protector Solar Nivea Sun Protección & Hidratación Fps50',
    brand: 'Nivea',
    price: '$52.300',
    priceOld: '$65.300',
    badge: '20%',
    promoText: 'Hidratación profunda 24h',
    mlText: 'Mililitros a $ 1046.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.4 (75)',
    iconType: 'bottle-tall',
  },
  {
    id: 9,
    name: 'Protector Solar Nivea Sensitive Fps60 125 Ml X 2',
    brand: 'Nivea',
    price: '$79.900',
    priceOld: '$94.000',
    badge: '15%',
    promoText: 'Pack ahorro piel sensible',
    mlText: 'Mililitros a $ 754.20',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.3 (44)',
    iconType: 'bottle-tall',
  },
  {
    id: 10,
    name: 'Protector Solar Nivea Sun Kids Swim & Play Fps50+ 150ml',
    brand: 'Nivea',
    price: '$48.900',
    priceOld: '$61.100',
    badge: '20%',
    promoText: 'Fórmula pediátrica certificada',
    mlText: 'Mililitros a $ 815.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.8 (190)',
    iconType: 'tube',
  },
  {
    id: 11,
    name: 'Acetaminofén 500mg X 20 Tabletas',
    brand: 'Genfar',
    price: '$8.900',
    priceOld: '$11.200',
    badge: '20%',
    promoText: 'Alivio rápido de fiebre y dolor',
    mlText: 'Tableta a $ 445.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.9 (450)',
    iconType: 'pill',
  },
  {
    id: 12,
    name: 'Ibuprofeno 400mg X 10 Tabletas',
    brand: 'MK',
    price: '$7.300',
    priceOld: '$9.100',
    badge: '20%',
    promoText: 'Antiinflamatorio y analgésico',
    mlText: 'Tableta a $ 730.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.7 (310)',
    iconType: 'pill',
  },
  {
    id: 13,
    name: 'Alcohol Antiséptico 70% X 250ml',
    brand: 'JGB',
    price: '$6.500',
    priceOld: '$7.600',
    badge: '15%',
    promoText: 'Desinfección y primeros auxilios',
    mlText: 'Mililitros a $ 26.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.8 (520)',
    iconType: 'bottle-tall',
  },
  {
    id: 14,
    name: 'Vitamina C 1000mg X 30 Tabletas Efervescentes',
    brand: 'Redoxon',
    price: '$22.400',
    priceOld: '$28.000',
    badge: '20%',
    promoText: 'Refuerza tu sistema inmune',
    mlText: 'Tableta a $ 746.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.9 (280)',
    iconType: 'tube',
  },
  {
    id: 15,
    name: 'La Roche Posay Anthelios Protector Solar Fps50',
    brand: 'La Roche Posay',
    price: '$89.900',
    priceOld: '$112.400',
    badge: '20%',
    promoText: 'Dermatológicamente recomendado',
    mlText: 'Mililitros a $ 1798.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 5.0 (610)',
    iconType: 'bottle-tall',
  },
  {
    id: 16,
    name: 'Crema Hidratante Corporal X 400ml',
    brand: 'Cerave',
    price: '$18.700',
    priceOld: '$22.000',
    badge: '15%',
    promoText: 'Hidratación 48h con ceramidas',
    mlText: 'Mililitros a $ 46.75',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.6 (140)',
    iconType: 'bottle-tall',
  },
  {
    id: 17,
    name: 'Jabón Antibacterial En Barra X 3 Unidades',
    brand: 'Protex',
    price: '$9.800',
    priceOld: '$11.500',
    badge: '15%',
    promoText: 'Elimina el 99.9% de bacterias',
    mlText: 'Unidad a $ 3266.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.5 (95)',
    iconType: 'pill',
  },
  {
    id: 18,
    name: 'Suero Fisiológico Nasal X 100ml',
    brand: 'Physiomer',
    price: '$6.200',
    priceOld: '$7.500',
    badge: '15%',
    promoText: 'Limpieza e higiene nasal diaria',
    mlText: 'Mililitros a $ 62.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.8 (82)',
    iconType: 'bottle-tall',
  },
  {
    id: 19,
    name: 'Multivitamínico Infantil X 30 Tabletas',
    brand: 'Centrum Kids',
    price: '$24.900',
    priceOld: '$29.500',
    badge: '15%',
    promoText: 'Vitaminas y minerales para su desarrollo',
    mlText: 'Tableta a $ 830.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★☆ 4.7 (110)',
    iconType: 'jar',
  },
  {
    id: 20,
    name: 'Nivea Crema Facial Hidratante Q10 X 50g',
    brand: 'Nivea',
    price: '$32.400',
    priceOld: '$40.500',
    badge: '20%',
    promoText: 'Reduce arrugas visiblemente',
    mlText: 'Gramos a $ 648.00',
    deliveryText: '🛵 35 mins',
    ratingText: '★★★★★ 4.8 (230)',
    iconType: 'jar',
  },
]

const SUGGESTIONS = [
  'nivea protector solar',
  'nivea crema facial',
  'nivea sun kids',
  'nivea sensitive',
  'nivea q10 anti-edad',
  'acetaminofén',
  'ibuprofeno',
  'alcohol antiséptico',
  'vitamina c',
  'protector solar la roche posay',
  'crema hidratante',
  'jabón antibacterial',
  'suero fisiológico',
  'multivitamínico',
]

export default function PharmacySection({ cart, onAddToCart, onRemoveFromCart, onOpenCart }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [wishlist, setWishlist] = useState({})
  const [recentlyAddedId, setRecentlyAddedId] = useState(null)

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    const q = value.trim().toLowerCase()
    setActiveQuery(value.trim())

    if (q.length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const matches = SUGGESTIONS.filter((s) => s.toLowerCase().includes(q))
    setSuggestions(matches)
    setShowSuggestions(matches.length > 0)
  }

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion)
    setActiveQuery(suggestion)
    setShowSuggestions(false)
  }

  const handleResetSearch = () => {
    setSearchTerm('')
    setActiveQuery('')
    setShowSuggestions(false)
  }

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getItemQty = (productName) => {
    const item = cart.find((i) => i.name === productName)
    return item ? item.qty : 0
  }

  const handleAddWithFeedback = (prod) => {
    onAddToCart(prod)
    setRecentlyAddedId(prod.id)
    setTimeout(() => setRecentlyAddedId(null), 300)
  }

  const matchesSearch = (prod) => {
    if (!activeQuery) return true
    const q = activeQuery.toLowerCase()
    const target = `${prod.name} ${prod.brand}`.toLowerCase()
    if (target.includes(q)) return true
    const words = q.split(/\s+/).filter((w) => w.length >= 3)
    if (words.length === 0) return false
    return words.every((w) => target.includes(w))
  }

  const filteredProducts = PHARMACY_PRODUCTS.filter(matchesSearch)
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const renderProductSVG = (type) => {
    if (type === 'tube') {
      return (
        <svg viewBox="0 0 80 100" className="product-icon">
          <path d="M35 8 h10 l4 10 h-18 z" fill="#1C86C4" />
          <path
            d="M25 18 h30 l6 60 q0 12 -21 12 q-21 0 -21 -12 z"
            fill="#EAF6FA"
            stroke="#7FCBE0"
            strokeWidth="3"
          />
          <rect x="30" y="45" width="20" height="18" fill="#B9DDE8" />
        </svg>
      )
    }
    if (type === 'jar') {
      return (
        <svg viewBox="0 0 80 100" className="product-icon">
          <rect x="22" y="22" width="36" height="12" rx="3" fill="#1C86C4" />
          <rect x="20" y="34" width="40" height="42" rx="8" fill="#EAF6FA" stroke="#7FCBE0" strokeWidth="3" />
          <circle cx="40" cy="55" r="10" fill="#B9DDE8" />
        </svg>
      )
    }
    if (type === 'pill') {
      return (
        <svg viewBox="0 0 80 100" className="product-icon">
          <rect x="18" y="25" width="44" height="50" rx="6" fill="#EAF6FA" stroke="#7FCBE0" strokeWidth="3" />
          <line x1="28" y1="40" x2="52" y2="40" stroke="#1C86C4" strokeWidth="4" strokeLinecap="round" />
          <line x1="28" y1="52" x2="52" y2="52" stroke="#1C86C4" strokeWidth="4" strokeLinecap="round" />
          <line x1="28" y1="64" x2="44" y2="64" stroke="#1C86C4" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    }
    // Default bottle-tall
    return (
      <svg viewBox="0 0 80 100" className="product-icon">
        <rect x="30" y="5" width="20" height="10" rx="2" fill="#1C86C4" />
        <rect
          x="20"
          y="18"
          width="40"
          height="75"
          rx="8"
          fill="#EAF6FA"
          stroke="#7FCBE0"
          strokeWidth="3"
        />
        <rect x="25" y="40" width="30" height="20" fill="#B9DDE8" />
      </svg>
    )
  }

  return (
    <section className="farmacia-wrapper" id="farmacia">
      {/* Barra de contexto */}
      <div className="context-bar">
        <button className="context-link cart-btn" onClick={onOpenCart}>
          🛒 CARRITO <span className="cart-count">{totalCartCount}</span>
        </button>

        <span className="context-text">
          {activeQuery ? (
            <>
              RESULTADOS : {activeQuery.toUpperCase()}{' '}
              <button className="reset-search" onClick={handleResetSearch}>
                ✕ Ver recomendados
              </button>
            </>
          ) : (
            'PRODUCTOS RECOMENDADOS PARA TI'
          )}
        </span>

        <div className="search-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos, marcas..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowSuggestions(false)
              }
            }}
            autoComplete="off"
          />
          <button
            className="search-pill"
            onClick={() => {
              setActiveQuery(searchTerm.trim())
              setShowSuggestions(false)
            }}
          >
            <svg viewBox="0 0 24 24" className="search-icon">
              <circle cx="10" cy="10" r="6" fill="none" stroke="#fff" strokeWidth="2" />
              <line x1="15" y1="15" x2="21" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            BUSQUEDA
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-box active">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="suggestion-item"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main product catalog */}
      <div className="farmacia-section">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No se encontraron productos para tu búsqueda.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((prod) => {
              const qty = getItemQty(prod.name)
              const isWish = wishlist[prod.id]
              const isAdded = recentlyAddedId === prod.id

              return (
                <article key={prod.id} className="product-card">
                  <div className="card-image">
                    {prod.badge && <span className="badge">{prod.badge}</span>}

                    <div className="qty-controls">
                      {qty > 0 && (
                        <button
                          className="remove-btn"
                          onClick={() => onRemoveFromCart(prod.name)}
                          title="Restar cantidad"
                        >
                          −
                        </button>
                      )}
                      <button
                        className={`add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddWithFeedback(prod)}
                        title="Añadir al carrito"
                      >
                        +
                      </button>
                      {qty > 0 && <span className="qty-label">x{qty}</span>}
                    </div>

                    {renderProductSVG(prod.iconType)}
                  </div>

                  <div className="promo-banner">
                    <span className="promo-text">{prod.promoText}</span>
                    <button
                      className="wish-btn"
                      onClick={() => toggleWishlist(prod.id)}
                      style={{ color: isWish ? '#e74c3c' : '#4a3b00' }}
                      title="Agregar a deseados"
                    >
                      {isWish ? '♥' : '♡'}
                    </button>
                  </div>

                  <span className="brand">{prod.brand}</span>
                  <h3 className="product-name">{prod.name}</h3>
                  <div className="price-row">
                    <span className="price">{prod.price}</span>
                    {prod.priceOld && <span className="price-old">{prod.priceOld}</span>}
                  </div>
                  <div className="meta-row">
                    <span>{prod.mlText}</span>
                    <span className="delivery">{prod.deliveryText}</span>
                  </div>
                  <div className="rating">{prod.ratingText}</div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
