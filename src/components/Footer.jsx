import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#241710] text-[#FFF8E9] pt-14 pb-8 border-t border-[#3D291F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Columns matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-left items-start">
          
          {/* Col 1: Logo & Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-600/40 flex items-center justify-center bg-[#1A0F0A] text-[#D97706]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C11.5 4 10.5 5.5 9 6.5C10.5 7.5 11.5 9 12 11C12.5 9 13.5 7.5 15 6.5C13.5 5.5 12.5 4 12 2Z" />
                <path d="M12 11C11.5 13 10.5 14.5 9 15.5C10.5 16.5 11.5 18 12 20C12.5 18 13.5 16.5 15 15.5C13.5 14.5 12.5 13 12 11Z" />
                <path d="M12 6.5C11.5 8.5 10.5 10 9 11C10.5 12 11.5 13.5 12 15.5C12.5 13.5 13.5 12 15 11C13.5 10 12.5 8.5 12 6.5Z" />
              </svg>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#D97706] font-bold block">
                Hamburguesas
              </span>
              <span className="text-xl font-serif font-black text-[#FFF8E9] leading-tight">
                del Campo
              </span>
            </div>
          </div>

          {/* Col 2: Pedidos WhatsApp */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
              Pedidos
            </span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappOrders}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFF8E9] hover:text-[#D97706] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D97706]" />
              <span>WhatsApp: {BUSINESS_INFO.whatsappFormatted}</span>
            </a>
          </div>

          {/* Col 3: Contacto Administrativo */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
              Contacto Administrativo
            </span>
            <a
              href={`tel:+505${BUSINESS_INFO.adminPhone.replace('-', '')}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFF8E9] hover:text-[#D97706] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D97706]" />
              <span>Teléfono del propietario: {BUSINESS_INFO.adminPhone}</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar matching reference layout */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>Hamburguesas del Campo</p>
          <p>Sabor - Calidad - En tu mesa</p>
        </div>

      </div>
    </footer>
  );
}
