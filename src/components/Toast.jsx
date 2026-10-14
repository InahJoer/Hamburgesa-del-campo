import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose, onOpenCart }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-[#2E1F17] text-[#FFF8E9] px-4 py-3 rounded-2xl shadow-2xl border border-[#D97706]/50 flex items-center justify-between gap-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#D97706]/20 border border-[#D97706] flex items-center justify-center flex-shrink-0 text-[#D97706]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                ¡{toast.name} agregado a la canasta!
              </p>
              <p className="text-[10px] text-amber-200/80">
                C$ {toast.price}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => {
                onOpenCart();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-[11px] font-bold flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ver canasta</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              aria-label="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
