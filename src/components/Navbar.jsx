import React from 'react';
import { MessageCircle, Lock, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function Navbar({ onOpenMenuBook, onOpenAdmin, cartCount, onOpenCart }) {
  return (
    <header className="w-full bg-[#FFF8E9] border-b border-[#E8DFC8] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Wheat Emblem */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#D97706]/60 flex items-center justify-center bg-[#FAF2DF] text-[#6B1F1A]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.5 4 10.5 5.5 9 6.5C10.5 7.5 11.5 9 12 11C12.5 9 13.5 7.5 15 6.5C13.5 5.5 12.5 4 12 2Z" />
              <path d="M12 11C11.5 13 10.5 14.5 9 15.5C10.5 16.5 11.5 18 12 20C12.5 18 13.5 16.5 15 15.5C13.5 14.5 12.5 13 12 11Z" />
              <path d="M12 6.5C11.5 8.5 10.5 10 9 11C10.5 12 11.5 13.5 12 15.5C12.5 13.5 13.5 12 15 11C13.5 10 12.5 8.5 12 6.5Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#6B1F1A] font-bold">
              Hamburguesas
            </span>
            <span className="text-xl sm:text-2xl font-serif font-black text-[#6B1F1A] leading-none">
              del Campo
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2E1F17]">
          <button
            onClick={onOpenMenuBook}
            className="hover:text-[#D97706] transition-colors font-semibold"
          >
            Menú
          </button>
          <a href="#sobre-nosotros" className="hover:text-[#D97706] transition-colors">
            Sobre nosotros
          </a>
          <a href="#contacto" className="hover:text-[#D97706] transition-colors">
            Contacto
          </a>
        </nav>

        {/* Right Actions: Phone WhatsApp + Cart + Admin */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encodeURIComponent('¡Hola! Me gustaría hacer un pedido.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6B1F1A] hover:text-[#D97706] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#D97706]" />
            <span>{BUSINESS_INFO.whatsappFormatted}</span>
          </a>

          {/* Cart trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-amber-100 text-[#6B1F1A] transition-colors"
            title="Ver pedido"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin panel trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full hover:bg-amber-100 text-[#6B1F1A]/70 hover:text-[#6B1F1A] transition-colors"
            title="Panel de Administración (campo123)"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
