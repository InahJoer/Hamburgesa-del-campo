import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function Hero({ onOpenMenuBook }) {
  return (
    <section id="inicio" className="pt-8 pb-14 md:pt-14 md:pb-20 bg-[#FFF8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Clean Editorial Typography */}
          <div className="lg:col-span-6 space-y-5 text-left">

            <span className="text-[11px] font-bold tracking-[0.25em] text-[#6B1F1A] uppercase block">
              Hamburguesas del Campo
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#2E1F17] leading-[1.12] tracking-tight">
              El verdadero sabor <br />
              de la buena <br />
              hamburguesa
            </h1>

            {/* Tagline with accent line */}
            <div className="flex items-center gap-3 pt-1">
              <span className="w-10 h-[2px] bg-[#D97706]"></span>
              <p className="text-sm sm:text-base text-[#6B1F1A] font-semibold tracking-wide">
                Sabor - Calidad - En tu mesa
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encodeURIComponent('¡Hola! Quiero hacer un pedido por WhatsApp.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <span>Pedir por WhatsApp</span>
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>

              <button
                onClick={onOpenMenuBook}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#2E1F17] hover:bg-[#2E1F17] text-[#2E1F17] hover:text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                <span>Haz tu pedido por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Arch Cut Hero Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="w-full h-[360px] sm:h-[460px] rounded-t-[180px] rounded-b-3xl overflow-hidden shadow-xl border-4 border-white bg-[#FAF2DF]">
                <img
                  src="/images/menu-board.jpg"
                  alt="Hamburguesas del Campo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
