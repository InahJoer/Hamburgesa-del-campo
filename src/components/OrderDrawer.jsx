import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import CheckoutFlow from './CheckoutFlow';

export default function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  form,
  onFormChange,
}) {
  const totalCount = cart.reduce((a, b) => a + b.quantity, 0);

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
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 md:pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#FFF8E9] text-[#2E1F17] shadow-2xl flex flex-col border-l border-[#E8DFC8]"
            >
              {/* Header */}
              <div className="p-4 bg-[#2E1F17] text-[#FFF8E9] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#D97706] text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold">Tu Pedido</h3>
                    <p className="text-[11px] text-amber-300">
                      {totalCount} {totalCount === 1 ? 'producto' : 'productos'}
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

              {/* Checkout Flow (replaces old inline cart) */}
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                  <span className="text-4xl block">🍔</span>
                  <h4 className="text-base font-serif font-bold text-[#2E1F17]">
                    Tu canasta está vacía
                  </h4>
                  <p className="text-xs text-[#2E1F17]/70 max-w-xs">
                    Agrega tus platos favoritos del menú para comenzar tu pedido.
                  </p>
                </div>
              ) : (
                <CheckoutFlow
                  cart={cart}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                  onClearCart={onClearCart}
                  onClose={onClose}
                  form={form}
                  onFormChange={onFormChange}
                />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
