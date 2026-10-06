import React from 'react';
import { MapPin, Clock, Bike, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-20 bg-[#6B1F1A] text-[#FFF8E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Sobre Nosotros / Aquí te esperamos */}
          <div className="lg:col-span-5 text-left space-y-5">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#FBBF24] uppercase block">
              Sobre Nosotros
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-tight">
              Aquí te <br className="hidden sm:inline" />
              esperamos.
            </h2>

            <p className="text-sm text-[#FFF8E9]/85 leading-relaxed max-w-md font-medium">
              Nacimos para llevar el verdadero sabor rústico y generoso del campo a tu mesa. Con carnes 100% artesanales, panes especiales y el cariño familiar que nos distingue en Managua.
            </p>

            {/* Gold wheat emblem */}
            <div className="pt-2 flex items-center gap-4">
              <div className="w-12 h-12 text-[#FBBF24]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C11.5 4 10.5 5.5 9 6.5C10.5 7.5 11.5 9 12 11C12.5 9 13.5 7.5 15 6.5C13.5 5.5 12.5 4 12 2Z" />
                  <path d="M12 11C11.5 13 10.5 14.5 9 15.5C10.5 16.5 11.5 18 12 20C12.5 18 13.5 16.5 15 15.5C13.5 14.5 12.5 13 12 11Z" />
                  <path d="M12 6.5C11.5 8.5 10.5 10 9 11C10.5 12 11.5 13.5 12 15.5C12.5 13.5 13.5 12 15 11C13.5 10 12.5 8.5 12 6.5Z" />
                </svg>
              </div>
              <div className="flex-1 h-[1px] bg-[#FBBF24]/40"></div>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-[#FBBF24] mb-1" />
                <p className="text-[11px] font-bold text-white">Martes a Domingo</p>
                <p className="text-[10px] text-white/70">4:00 PM – 10:30 PM</p>
              </div>
              <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                <Bike className="w-4 h-4 text-[#FBBF24] mb-1" />
                <p className="text-[11px] font-bold text-white">Delivery & Para Llevar</p>
                <p className="text-[10px] text-white/70">Sabana Grande y alrededores</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visítanos + Dirección + Propietario */}
          <div className="lg:col-span-7 text-left space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FBBF24] text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>Visítanos</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug">
                {BUSINESS_INFO.address}
              </h3>

              <div className="bg-black/20 p-4 rounded-2xl border-l-4 border-[#FBBF24]">
                <span className="text-[11px] uppercase font-bold text-[#FBBF24] block mb-0.5">
                  Punto de Referencia:
                </span>
                <p className="text-xs sm:text-sm text-[#FFF8E9] font-semibold leading-relaxed">
                  {BUSINESS_INFO.addressReference}
                </p>
              </div>
            </div>

            {/* Bottom Row: Propietario */}
            <div className="pt-6 border-t border-white/15 flex items-baseline justify-between">
              <span className="text-xs text-[#FFF8E9]/70 font-medium">
                Propietario
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#FBBF24]">
                {BUSINESS_INFO.adminContact}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
