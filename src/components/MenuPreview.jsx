import React from 'react';
import { ArrowUpRight, Plus, ShoppingBag } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export default function MenuPreview({ onOpenMenuBook, onAddToCart }) {
  const { menuItems } = useMenu();

  // Pick top 3 featured items as seen in reference image
  // 1. Piña Campesina (or H Clásica)
  // 2. Arroz Chino del Campo (or Fajitas)
  // 3. Hamburguesa Especial / Doble Antojo
  const featured = [
    menuItems.find((i) => i.id === 'h-pina-campesina') || menuItems[0],
    menuItems.find((i) => i.id === 'arroz-chino-campo') || menuItems[10] || menuItems[1],
    menuItems.find((i) => i.id === 'h-doble-antojo') || menuItems[4] || menuItems[2],
  ].filter(Boolean);

  return (
    <section className="py-16 bg-[#FFF8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and "Ver menú ↗" Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8DFC8]">
          <div className="text-left space-y-1">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#6B1F1A] uppercase block">
              Nuestro Menú
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E1F17]">
              Del campo a tu mesa.
            </h2>
          </div>

          <button
            onClick={onOpenMenuBook}
            className="inline-flex items-center gap-2 border border-[#2E1F17] hover:bg-[#2E1F17] text-[#2E1F17] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all self-start sm:self-auto active:scale-95"
          >
            <span>Ver menú libro</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Editorial Cards Grid matching the user's reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item) => (
            <div key={item.id} className="group text-left space-y-3">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#FAF2DF] shadow-md border border-[#E8DFC8]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#6B1F1A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  C$ {item.price}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold text-[#2E1F17] group-hover:text-[#D97706] transition-colors">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-1.5 rounded-lg bg-[#FAF2DF] hover:bg-[#D97706] text-[#2E1F17] hover:text-white transition-colors"
                    title="Agregar al pedido"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#2E1F17]/70 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
