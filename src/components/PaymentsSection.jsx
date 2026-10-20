import { useState } from 'react'

export default function PaymentsSection({
  cart = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onGoToPharmacy,
}) {
  const [couponInput, setCouponInput] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    direccion: '',
    tarjeta: '',
    bancoPse: 'Bancolombia',
  })

  const DOMICILIO = 6900

  const priceToNumber = (priceText) => {
    return Number((priceText || '').replace(/[^\d]/g, '')) || 0
  }

  const formatPrice = (n) => {
    return '$' + Math.round(n).toLocaleString('es-CO')
  }

  const totalProductos = cart.reduce((sum, item) => {
    return sum + priceToNumber(item.price) * item.qty
  }, 0)

  const discountAmount = (totalProductos * discountPercent) / 100
  const finalTotal = totalProductos > 0 ? totalProductos + DOMICILIO - discountAmount : 0

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const code = couponInput.trim().toUpperCase()
    if (!code) return

    if (code === 'MEDLIFE' || code === 'MEDLIFE10' || code === 'SALUD10' || code === 'DESCUENTO') {
      setDiscountPercent(10)
      setCouponMessage('¡Cupón aplicado! 10% de descuento en tus productos.')
    } else if (code === 'MEDLIFE20' || code === 'PROMO20') {
      setDiscountPercent(20)
      setCouponMessage('¡Cupón VIP aplicado! 20% de descuento.')
    } else {
      setCouponMessage('Cupón no válido o vencido.')
    }
  }

  const handleConfirmOrder = (e) => {
    e.preventDefault()
    if (!paymentForm.nombre || !paymentForm.telefono || !paymentForm.direccion) {
      alert('Por favor complete su nombre, teléfono y dirección de entrega.')
      return
    }
    setCheckoutSuccess(true)
    if (onClearCart) onClearCart()
  }

  return (
    <section className="pagos-container" id="pagos">
      <div className="pagos-section">
        {/* Estado 1: Carrito Vacío */}
        {cart.length === 0 && !checkoutSuccess && (
          <div className="empty-state" style={{ display: 'block' }}>
            <h1>Aún no tienes ninguna compra en proceso</h1>
            <p>Agrega productos en Farmacia y confírmalos desde tu carrito para pagar aquí.</p>
            <button className="go-farmacia-btn" onClick={onGoToPharmacy}>
              Ir a Farmacia
            </button>
          </div>
        )}

        {/* Estado 2: Compra Exitosa */}
        {checkoutSuccess && (
          <div className="success-state" style={{ display: 'block' }}>
            <div className="success-icon">✓</div>
            <h1>¡Compra realizada con éxito!</h1>
            <p>Tu pedido va en camino. Te llegará en aproximadamente 35 minutos.</p>
            <button
              className="go-farmacia-btn"
              onClick={() => {
                setCheckoutSuccess(false)
                if (onGoToPharmacy) onGoToPharmacy()
              }}
            >
              Seguir comprando
            </button>
          </div>
        )}

        {/* Estado 3: Checkout Activo */}
        {cart.length > 0 && !checkoutSuccess && (
          <div className="checkout-state" style={{ display: 'block' }}>
            <h1>Elige la forma en la que quieres pagar</h1>

            <div className="checkout-grid">
              {/* Columna Izquierda: Lista de productos en Carrito */}
              <div className="products-panel">
                <h3 className="panel-subhead">Tus Productos ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
                <div id="payment-items">
                  {cart.map((item, idx) => (
                    <div key={idx} className="payment-item">
                      <div className="item-image">
                        {item.badge && <span className="badge">{item.badge}</span>}
                        <svg viewBox="0 0 80 100" className="item-svg-icon">
                          <rect x="25" y="10" width="30" height="70" rx="6" fill="#EAF6FA" stroke="#7FCBE0" strokeWidth="2" />
                          <rect x="30" y="30" width="20" height="20" fill="#B9DDE8" />
                        </svg>
                      </div>

                      <div className="item-info">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-price">{item.price}</div>
                        {item.priceOld && <div className="item-price-old">{item.priceOld}</div>}
                        <span className="item-tag">¡Aprovecha!</span>
                      </div>

                      <div className="item-qty">
                        <button
                          className="qty-minus"
                          onClick={() => onUpdateQty(item.name, -1)}
                          title="Disminuir"
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          className="qty-plus"
                          onClick={() => onUpdateQty(item.name, 1)}
                          title="Aumentar"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-x"
                        onClick={() => onRemoveItem(item.name)}
                        title="Eliminar producto"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="panel-actions-bottom">
                  <button className="btn-secondary-link" onClick={onGoToPharmacy}>
                    + Agregar más productos
                  </button>
                </div>
              </div>

              {/* Columna Derecha: Resumen de pago, cupón y formulario */}
              <div className="payment-panel">
                {/* Fila Cupón */}
                <form className="coupon-row" onSubmit={handleApplyCoupon}>
                  <svg viewBox="0 0 24 24" className="coupon-icon">
                    <rect
                      x="3"
                      y="9"
                      width="18"
                      height="6"
                      rx="3"
                      fill="none"
                      stroke="#1C86C4"
                      strokeWidth="1.8"
                      transform="rotate(-30 12 12)"
                    />
                  </svg>
                  <input
                    type="text"
                    id="coupon-input"
                    placeholder="Ingresa cupón (Ej: MEDLIFE)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="redimir-btn">
                    Redimir
                  </button>
                </form>
                {couponMessage && (
                  <p className={`coupon-msg ${discountPercent > 0 ? 'success' : 'error'}`}>
                    {couponMessage}
                  </p>
                )}

                {/* Resumen financiero */}
                <div className="summary-box">
                  <div className="summary-row">
                    <span>Subtotal productos:</span>
                    <span>{formatPrice(totalProductos)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Costo de domicilio:</span>
                    <span>{formatPrice(DOMICILIO)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="summary-row discount">
                      <span>Descuento cupón ({discountPercent}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total a pagar:</span>
                    <span className="total-val">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Métodos de Pago */}
                <div className="payment-methods-selector">
                  <h4>Selecciona método de pago:</h4>
                  <div className="methods-tabs">
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      💳 Tarjeta
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === 'pse' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('pse')}
                    >
                      🏦 PSE
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === 'cash' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      💵 Contraentrega
                    </button>
                  </div>
                </div>

                {/* Formulario de Checkout */}
                <form className="pago-form" onSubmit={handleConfirmOrder}>
                  <div className="pago-field">
                    <label>Nombre Completo:</label>
                    <input
                      type="text"
                      placeholder="Nombres y apellidos de quien recibe"
                      value={paymentForm.nombre}
                      onChange={(e) => setPaymentForm({ ...paymentForm, nombre: e.target.value })}
                      required
                    />
                  </div>

                  <div className="pago-field">
                    <label>Dirección de Entrega:</label>
                    <input
                      type="text"
                      placeholder="Calle / Carrera, Torre / Apto, Barrio"
                      value={paymentForm.direccion}
                      onChange={(e) => setPaymentForm({ ...paymentForm, direccion: e.target.value })}
                      required
                    />
                  </div>

                  <div className="pago-row">
                    <div className="pago-field">
                      <label>Teléfono de Contacto:</label>
                      <input
                        type="tel"
                        placeholder="Ej: 322 7048889"
                        value={paymentForm.telefono}
                        onChange={(e) => setPaymentForm({ ...paymentForm, telefono: e.target.value })}
                        required
                      />
                    </div>
                    <div className="pago-field">
                      <label>Documento de Identidad:</label>
                      <input
                        type="text"
                        placeholder="Cédula / Pasaporte"
                        value={paymentForm.documento}
                        onChange={(e) => setPaymentForm({ ...paymentForm, documento: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="pago-field">
                      <label>Número de Tarjeta:</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={paymentForm.tarjeta}
                        onChange={(e) => setPaymentForm({ ...paymentForm, tarjeta: e.target.value })}
                        maxLength={19}
                        required
                      />
                    </div>
                  )}

                  {paymentMethod === 'pse' && (
                    <div className="pago-field">
                      <label>Banco:</label>
                      <select
                        value={paymentForm.bancoPse}
                        onChange={(e) => setPaymentForm({ ...paymentForm, bancoPse: e.target.value })}
                        className="pse-select"
                      >
                        <option value="Bancolombia">Bancolombia</option>
                        <option value="Banco de Bogotá">Banco de Bogotá</option>
                        <option value="Davivienda">Davivienda</option>
                        <option value="Nequi">Nequi</option>
                        <option value="Daviplata">Daviplata</option>
                      </select>
                    </div>
                  )}

                  <button type="submit" className="confirmar-metodo-btn">
                    PAGAR {formatPrice(finalTotal)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
