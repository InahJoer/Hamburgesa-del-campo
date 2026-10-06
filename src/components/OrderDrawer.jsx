import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_INFO } from '../data/menuData';

export default function OrderDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.log(err);
    }

    // Build the clean WhatsApp message
    let msg = `🍔 *¡Hola Hamburguesas del Campo! Quiero realizar el siguiente pedido:*\n\n`;
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddress.trim()) msg += `🏠 *Dirección/Referencia:* ${customerAddress.trim()}\n\n`;

    msg += `📋 *DETALLE DEL PEDIDO:*\n`;
    cart.forEach((item, index) => {
      msg += `• *${item.name}* (x${item.quantity}) — C$ ${item.price * item.quantity}\n`;
      if (item.badge) msg += `  _(${item.badge})_\n`;
    });

    msg += `\n💵 *TOTAL ESTIMADO:* C$ ${subtotal}\n`;
    if (notes.trim()) msg += `📌 *Nota adicional:* ${notes.trim()}\n`;
    msg += `\n_¿Me confirman el tiempo de entrega y el monto final? ¡Muchas gracias!_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#FFF8E9] text-[#2E1F17] shadow-2xl flex flex-col justify-between border-l border-[#E8DFC8]"
            >
              {/* Header */}
              <div className="p-5 bg-[#2E1F17] text-[#FFF8E9] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#D97706] text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold">Tu Pedido</h3>
                    <p className="text-[11px] text-amber-300">
                      {cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <span className="text-4xl block">🍔</span>
                    <h4 className="text-base font-serif font-bold text-[#2E1F17]">
                      Tu canasta está vacía
                    </h4>
                    <p className="text-xs text-[#2E1F17]/70 max-w-xs mx-auto">
                      Agrega tus platos favoritos del menú para enviarlos por WhatsApp.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2.5">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-3 rounded-xl border border-[#E8DFC8] flex items-center gap-3 shadow-xs"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg object-cover bg-amber-50 border flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h5 className="text-xs font-bold text-[#2E1F17] truncate">
                                {item.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-600 p-1"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-xs font-bold text-[#6B1F1A]">
                              C$ {item.price * item.quantity}
                            </p>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center border rounded-md bg-[#FFF8E9]">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-0.5 text-xs text-[#2E1F17] hover:bg-amber-100"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="px-2 text-xs font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-xs text-[#2E1F17] hover:bg-amber-100"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <span className="text-[10px] text-gray-500">
                                C$ {item.price} c/u
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Info Form */}
                    <form onSubmit={handleSendWhatsAppOrder} className="pt-3 border-t border-[#E8DFC8] space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#2E1F17] mb-0.5">
                          Tu Nombre (opcional)
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Nombre para el pedido"
                          className="w-full px-3 py-2 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#2E1F17] mb-0.5">
                          Dirección / Punto de Entrega (opcional)
                        </label>
                        <input
                          type="text"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Ej: Villa Jerusalén, 2c al sur..."
                          className="w-full px-3 py-2 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#2E1F17] mb-0.5">
                          Comentario o aclaración
                        </label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Ej: Salsa aparte, bien tostada..."
                          className="w-full px-3 py-2 bg-white rounded-lg border border-[#D5C5A3] text-xs focus:outline-none focus:border-[#D97706]"
                        />
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Footer Total & WhatsApp trigger */}
              {cart.length > 0 && (
                <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-[#2E1F17]/80">Total de productos:</span>
                    <span className="font-serif text-xl font-black text-[#6B1F1A]">
                      C$ {subtotal}
                    </span>
                  </div>

                  <button
                    onClick={handleSendWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enviar pedido a WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center text-[#2E1F17]/60">
                    Se abrirá tu WhatsApp con el pedido listo para enviar a Hamburguesas del Campo.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
