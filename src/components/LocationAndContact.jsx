import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, Copy, Check, User, ShieldCheck, Bike, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function LocationAndContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${BUSINESS_INFO.address} (Ref: ${BUSINESS_INFO.addressReference})`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ubicacion" className="py-20 bg-[#FAF2DF] relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#6B1F1A_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#D97706] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>Encuéntranos o Pide a Domicilio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2E1F17] font-serif">
            Ubicación & <span className="text-[#6B1F1A]">Contacto Directo</span>
          </h2>

          <p className="text-sm sm:text-base text-[#2E1F17]/80 max-w-2xl mx-auto font-medium">
            Estamos ubicados en Villa Jerusalén, Sabana Grande, Managua. Atendemos en nuestro local campestre y entregamos directo en tu casa u oficina.
          </p>
        </div>

        {/* Contact & Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Address & Directions Card */}
          <div className="lg:col-span-7 bg-[#FFFBF2] rounded-3xl p-6 sm:p-8 border-2 border-[#D5C5A3] shadow-xl flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#6B1F1A] text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-[#D97706] tracking-wider">Dirección Exacta</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2E1F17]">
                    {BUSINESS_INFO.address}
                  </h3>
                </div>
              </div>

              {/* Exact Reference Box */}
              <div className="bg-[#FAF2DF] p-4 rounded-2xl border-l-4 border-[#D97706] space-y-1">
                <span className="text-xs font-black text-[#6B1F1A] uppercase tracking-wide">
                  Punto de Referencia Clave:
                </span>
                <p className="text-sm sm:text-base text-[#2E1F17] font-bold">
                  "{BUSINESS_INFO.addressReference}"
                </p>
              </div>

              {/* Delivery Zone Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-black uppercase text-[#2E1F17]/60 tracking-wider flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-[#D97706]" />
                  Zonas de Cobertura de Delivery:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {BUSINESS_INFO.deliveryZones.map((z, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-[#D5C5A3]/60 shadow-sm">
                      <p className="text-xs font-bold text-[#2E1F17]">{z.zone}</p>
                      <p className="text-[11px] text-[#D97706] font-bold mt-1">⏱ {z.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons for Location */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#D5C5A3]">
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2.5 rounded-xl bg-[#2E1F17] hover:bg-[#6B1F1A] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? '¡Dirección Copiada!' : 'Copiar Dirección'}</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_INFO.googleMapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir en Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right: Direct WhatsApp & Admin Contact Card */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* WhatsApp Orders Highlight Box */}
            <div className="bg-gradient-to-br from-[#1EBE5D] to-[#128C7E] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <MessageCircle className="w-32 h-32" />
              </div>

              <span className="inline-block bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md mb-2">
                Atención Inmediata
              </span>

              <h3 className="text-2xl font-bold font-serif">
                Pedidos por WhatsApp
              </h3>

              <p className="text-xs sm:text-sm text-white/90 mt-1">
                Escríbenos directamente para consultar, ordenar o pedir ubicación en tiempo real.
              </p>

              <div className="mt-4 bg-black/20 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/70 uppercase block font-bold">Número de Pedidos</span>
                  <span className="text-2xl font-black font-mono tracking-wider">{BUSINESS_INFO.whatsappFormatted}</span>
                </div>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encodeURIComponent('¡Hola! Me gustaría hacer un pedido.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-emerald-800 px-4 py-2 rounded-xl text-xs font-black hover:bg-amber-100 shadow-md transition-colors"
                >
                  Chatear
                </a>
              </div>
            </div>

            {/* Admin Contact Box */}
            <div className="bg-[#2E1F17] rounded-3xl p-6 text-[#FFF8E9] border-2 border-[#D97706]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#D97706] font-black uppercase tracking-wider">Administración General</span>
                  <h4 className="text-lg font-bold font-serif">{BUSINESS_INFO.adminContact}</h4>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-white/70">Teléfono directo:</span>
                <a
                  href={`tel:+505${BUSINESS_INFO.adminPhone.replace('-', '')}`}
                  className="font-mono font-bold text-amber-300 hover:underline text-sm"
                >
                  {BUSINESS_INFO.adminPhone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/60 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{BUSINESS_INFO.schedule}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
