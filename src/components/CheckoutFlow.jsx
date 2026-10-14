import React, { useState, useCallback } from 'react';
import {
  MapPin, Banknote, CreditCard, Check, Phone, User, FileText,
  MessageCircle, Download, AlertCircle, Navigation, Loader2, ExternalLink
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/deliveryZones';
import { BUSINESS_INFO } from '../data/menuData';
import { generateInvoicePDF } from './InvoicePDF';

// ─── Main Checkout Component (Single Scroll View) ───────
export default function CheckoutFlow({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
  form = {},
  onFormChange,
}) {
  const [paymentId, setPaymentId] = useState('cash');
  const [orderNumber] = useState(() => `HDC-${Date.now().toString(36).toUpperCase()}`);
  const [orderSent, setOrderSent] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [showManualLink, setShowManualLink] = useState(false);

  const safeForm = {
    name: '',
    phone: '',
    address: '',
    notes: '',
    lat: null,
    lng: null,
    mapsUrl: '',
    locationShared: false,
    ...form,
  };

  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === paymentId);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const icons = { Banknote, CreditCard };

  const handleChange = (field, value) => {
    if (onFormChange) {
      onFormChange({ ...safeForm, [field]: value });
    }
  };

  // ─── Geolocation ─────────────────────────
  const handleShareLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización.');
      return;
    }

    setLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        if (onFormChange) {
          onFormChange({
            ...safeForm,
            lat: latitude,
            lng: longitude,
            mapsUrl,
            locationShared: true,
          });
        }
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) {
          setLocationError('Permiso denegado. Habilitá la ubicación o pegá tu link de Maps abajo.');
        } else if (err.code === 2) {
          setLocationError('No se pudo determinar tu ubicación exacta.');
        } else {
          setLocationError('Tiempo agotado al obtener ubicación.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [safeForm, onFormChange]);

  const handleManualMapsLink = (url) => {
    const trimmed = url.trim();
    if (!trimmed) {
      handleChange('mapsUrl', '');
      handleChange('locationShared', false);
      return;
    }
    if (onFormChange) {
      onFormChange({
        ...safeForm,
        mapsUrl: trimmed,
        locationShared: true,
      });
    }
  };

  const handleRemoveLocation = () => {
    if (onFormChange) {
      onFormChange({
        ...safeForm,
        lat: null,
        lng: null,
        mapsUrl: '',
        locationShared: false,
      });
    }
  };

  const buildWhatsAppMessage = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-NI', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' });

    let msg = `🍔 *PEDIDO — HAMBURGUESAS DEL CAMPO*\n`;
    msg += `📋 Orden: *${orderNumber}*\n`;
    msg += `📅 ${dateStr} a las ${timeStr}\n\n`;

    msg += `👤 *CLIENTE:*\n`;
    msg += `• Nombre: ${safeForm.name}\n`;
    msg += `• Tel: ${safeForm.phone}\n`;
    if (safeForm.address) msg += `• Referencia: ${safeForm.address}\n`;
    if (safeForm.locationShared && safeForm.mapsUrl) {
      msg += `• 📍 Ubicación Google Maps: ${safeForm.mapsUrl}\n`;
    }
    msg += `\n`;

    msg += `🛒 *DETALLE DEL PEDIDO:*\n`;
    cart.forEach((item) => {
      msg += `• *${item.name}* x${item.quantity} — C$ ${item.price * item.quantity}\n`;
    });
    msg += `\n`;

    msg += `💰 *Subtotal: C$ ${subtotal}*\n`;
    msg += `🚚 *Delivery:* A coordinar con el repartidor\n`;
    msg += `💳 *Pago:* ${selectedPayment?.name}\n`;

    if (safeForm.notes) msg += `\n📌 *Nota:* ${safeForm.notes}\n`;
    msg += `\n_¡Hola! Ya envié mi pedido y ubicación. Por favor confirmen y me indican el costo del delivery._ 🙏`;
    return msg;
  };

  const handleConfirmOrder = () => {
    const msg = buildWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encoded}`, '_blank');
    setOrderSent(true);
  };

  const handleDownloadPDF = () => {
    generateInvoicePDF({
      orderNumber,
      cart,
      form: safeForm,
      deliveryOption: { name: 'A coordinar por WhatsApp' },
      paymentMethod: selectedPayment,
      subtotal,
      deliveryFee: 0,
      total: subtotal,
    });
  };

  const handleNewOrder = () => {
    onClearCart();
    setOrderSent(false);
    onClose();
  };

  const isFormValid = Boolean(safeForm.name?.trim() && safeForm.phone?.trim());

  // ─── Success Screen ──────────────────────
  if (orderSent) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-[scale-in_0.3s_ease-out]">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <div>
            <h3 className="text-lg font-serif font-black text-[#2E1F17]">
              ¡Pedido enviado!
            </h3>
            <p className="text-xs text-[#2E1F17]/60 mt-1 max-w-xs">
              Tu pedido <strong>{orderNumber}</strong> fue enviado a nuestro WhatsApp.
              Te contactaremos para confirmar el delivery.
            </p>
          </div>

          <div className="space-y-2 w-full max-w-xs">
            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center gap-2 bg-[#2E1F17] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#3d2a1f] transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              Descargar Factura PDF
            </button>

            <button
              onClick={handleNewOrder}
              className="w-full py-3 rounded-xl text-xs font-bold border-2 border-[#E8DFC8] text-[#2E1F17] hover:bg-[#FAF2DF] transition active:scale-95"
            >
              Hacer otro pedido
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Single Scroll Checkout ──────────────
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* ── Cart Items ─────────────────── */}
        <section>
          <h4 className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-2">
            Tu pedido ({cart.reduce((a, b) => a + b.quantity, 0)} productos)
          </h4>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-xl border border-[#E8DFC8] flex items-center gap-3 shadow-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-amber-50 border flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-bold text-[#2E1F17] truncate">{item.name}</h5>
                  <p className="text-[11px] font-bold text-[#6B1F1A]">C$ {item.price * item.quantity}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center border rounded-md bg-[#FFF8E9]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#2E1F17] hover:bg-amber-100"
                      >−</button>
                      <span className="px-2 text-[11px] font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#2E1F17] hover:bg-amber-100"
                      >+</button>
                    </div>
                    <span className="text-[10px] text-gray-500">C$ {item.price} c/u</span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto text-[10px] text-red-500/70 hover:text-red-600 font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Separator ──────────────────── */}
        <div className="border-t border-[#E8DFC8]" />

        {/* ── Customer Info ──────────────── */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
            Tus datos
          </h4>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#2E1F17] mb-1">
              <User className="w-3 h-3 text-[#D97706]" /> Nombre *
            </label>
            <input
              type="text"
              value={safeForm.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706] transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#2E1F17] mb-1">
              <Phone className="w-3 h-3 text-[#D97706]" /> Teléfono / WhatsApp *
            </label>
            <input
              type="tel"
              value={safeForm.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="8888-0000"
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706] transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#2E1F17] mb-1">
              <FileText className="w-3 h-3 text-[#D97706]" /> Referencia de dirección
            </label>
            <input
              type="text"
              value={safeForm.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Ej: Del portón azul, 2c al sur..."
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706] transition"
            />
          </div>
        </section>

        {/* ── Location Sharing ───────────── */}
        <section className="space-y-2">
          <h4 className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
            📍 Tu ubicación (para el delivery)
          </h4>

          {safeForm.locationShared ? (
            <div className="bg-green-50 p-3 rounded-xl border border-green-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-green-100">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <p className="text-xs font-bold text-green-800">Ubicación guardada</p>
                </div>
                <button
                  onClick={handleRemoveLocation}
                  className="text-[10px] text-red-500/70 hover:text-red-600 font-bold"
                >
                  Quitar
                </button>
              </div>

              {/* Embedded Google Maps Preview if coordinates exist */}
              {safeForm.lat && safeForm.lng ? (
                <div className="rounded-lg overflow-hidden border border-green-200 shadow-xs">
                  <iframe
                    title="Tu ubicación en Google Maps"
                    width="100%"
                    height="160"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${safeForm.lat},${safeForm.lng}&hl=es&z=16&output=embed`}
                  />
                </div>
              ) : null}

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={safeForm.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Ver en Google Maps
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleShareLocation}
                disabled={locating}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-xs font-bold transition active:scale-95 ${
                  locating
                    ? 'border-[#D97706]/40 bg-amber-50 text-[#D97706]/60 cursor-wait'
                    : 'border-[#D97706]/50 bg-white text-[#D97706] hover:bg-amber-50 hover:border-[#D97706]'
                }`}
              >
                {locating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Detectando ubicación...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    Compartir mi ubicación actual (GPS)
                  </>
                )}
              </button>

              {locationError && (
                <div className="flex items-start gap-1.5 bg-red-50 p-2 rounded-lg border border-red-200">
                  <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-red-600">{locationError}</p>
                </div>
              )}

              {/* Toggle manual link input */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowManualLink(!showManualLink)}
                  className="text-[10px] font-bold text-[#D97706] hover:underline"
                >
                  {showManualLink ? 'Ocultar entrada de link' : '¿O querés pegar un link de Google Maps?'}
                </button>
              </div>

              {showManualLink && (
                <div className="space-y-1 bg-white p-2.5 rounded-lg border border-[#E8DFC8]">
                  <label className="text-[10px] text-[#2E1F17]/70 font-semibold block">
                    Pegá tu enlace de Google Maps:
                  </label>
                  <input
                    type="url"
                    value={safeForm.mapsUrl || ''}
                    onChange={(e) => handleManualMapsLink(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-2.5 py-1.5 bg-[#FFF8E9] rounded border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              )}

              <p className="text-[10px] text-[#2E1F17]/50 text-center">
                El punto se enviará por WhatsApp para que el delivery calcule el costo y llegue directo.
              </p>
            </div>
          )}
        </section>

        {/* ── Separator ──────────────────── */}
        <div className="border-t border-[#E8DFC8]" />

        {/* ── Payment Method ─────────────── */}
        <section className="space-y-2">
          <h4 className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
            Método de pago
          </h4>

          {PAYMENT_METHODS.map((method) => {
            const isSelected = paymentId === method.id;
            const Icon = icons[method.icon] || Banknote;

            return (
              <button
                key={method.id}
                onClick={() => setPaymentId(method.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-[#D97706] bg-amber-50'
                    : 'border-[#E8DFC8] bg-white hover:border-[#D97706]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    isSelected ? 'bg-[#D97706] text-white' : 'bg-[#FAF2DF] text-[#D97706]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1">
                    <h5 className="text-[11px] font-bold text-[#2E1F17]">{method.name}</h5>
                    <p className="text-[10px] text-[#2E1F17]/60">{method.description}</p>
                  </div>

                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-[#D97706] bg-[#D97706]' : 'border-[#D5C5A3]'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </div>

                {/* Bank info for transfer */}
                {isSelected && method.bankInfo && (
                  <div className="mt-2.5 ml-9 p-2.5 bg-white rounded-lg border border-[#E8DFC8] space-y-1">
                    <p className="text-[10px] font-bold text-[#6B1F1A] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Datos para transferencia:
                    </p>
                    <p className="text-[10px] text-[#2E1F17]"><strong>Banco:</strong> {method.bankInfo.bank}</p>
                    <p className="text-[10px] text-[#2E1F17]"><strong>Titular:</strong> {method.bankInfo.accountHolder}</p>
                    <p className="text-[10px] text-[#2E1F17]"><strong>Cuenta:</strong> {method.bankInfo.accountNumber}</p>
                    <p className="text-[9px] text-amber-700 mt-1 italic">
                      Enviá el comprobante por WhatsApp después de confirmar.
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </section>

        {/* ── Notes ──────────────────────── */}
        <section>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-1.5">
            Comentarios
          </label>
          <input
            type="text"
            value={safeForm.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Salsa aparte, sin cebolla, bien tostada..."
            className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706] transition"
          />
        </section>
      </div>

      {/* ── Footer: Total + WhatsApp Button ── */}
      <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-2 flex-shrink-0">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] text-[#2E1F17]/60">
            {cart.reduce((a, b) => a + b.quantity, 0)} productos · Delivery a coordinar
          </span>
          <span className="font-serif text-xl font-black text-[#6B1F1A]">C$ {subtotal}</span>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={!isFormValid}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition active:scale-95 ${
            isFormValid
              ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md'
              : 'bg-[#E8DFC8] text-[#2E1F17]/40 cursor-not-allowed'
          }`}
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          Enviar pedido a WhatsApp
        </button>

        {!isFormValid && (
          <p className="text-[10px] text-center text-red-500/70">
            Completá tu nombre y teléfono para enviar el pedido.
          </p>
        )}
      </div>
    </div>
  );
}
