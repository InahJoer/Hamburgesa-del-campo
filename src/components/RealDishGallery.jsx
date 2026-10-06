import React, { useState } from 'react';
import { Camera, ZoomIn, X, Sparkles, Heart, ChefHat, Eye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealDishGallery({ onAddToCart }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const realDishes = [
    {
      id: 'gallery-guardabarranco',
      title: 'H Guardabarranco Especial del Chef',
      category: 'Hamburguesa de la Casa',
      image: '/images/guardabarranco.jpg',
      price: 'C$ 300',
      description: 'Pan verde esmeralda artesanal, doble torta de res jugosa, corona de papas fritas bañadas en salsas artesanales y tocino ahumado.',
      tags: ['Pan Verde', 'Doble Carne', 'Torre de Papas'],
      rating: '5.0 ★'
    },
    {
      id: 'gallery-doble-antojo',
      title: 'Hamburguesa Doble Antojo',
      category: 'Pan Rosado Artesanal',
      image: '/images/doble-antojo.jpg',
      price: 'C$ 220',
      description: 'Icónico pan rosa de receta secreta, doble carne de res jugosa, queso fundido, vegetales frescos y crujientes papas fritas doradas.',
      tags: ['Pan Rosa', 'Doble Queso', 'Papas Incluidas'],
      rating: '4.9 ★'
    },
    {
      id: 'gallery-fajitas',
      title: 'Fajitas de Res del Campo',
      category: 'Plato Fuerte Campestre',
      image: '/images/fajitas-res.jpg',
      price: 'C$ 200',
      description: 'Tiras de res salteadas con vegetales frescos en salsa de la casa, servidas con tostones de plátano verde, arroz blanco y pico de gallo.',
      tags: ['Tostones', 'Arroz', 'Pico de Gallo'],
      rating: '4.9 ★'
    },
    {
      id: 'gallery-pollo-plancha',
      title: 'Pollo a la Plancha',
      category: 'Especialidades',
      image: '/images/pollo-plancha.jpg',
      price: 'C$ 200',
      description: 'Filete de pechuga dorada al comal con sazón criollo, servido con papas fritas doradas, arroz blanco y salsas de la casa.',
      tags: ['Pechuga Jugosa', 'Papas Fritas', 'Arroz'],
      rating: '4.8 ★'
    },
    {
      id: 'gallery-menu-board',
      title: 'Nuestra Tabla de Menú Rústica Original',
      category: 'Tradición y Calidad',
      image: '/images/menu-board.jpg',
      price: 'Precios desde C$ 20',
      description: 'La auténtica carta de Hamburguesas del Campo grabada en madera y cuero: más de 30 opciones para deleitar a tu familia.',
      tags: ['Carta Completa', 'Precios Oficiales', '100% Managua'],
      rating: 'Orgullo 🇳🇮'
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-[#FFF8E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#6B1F1A] text-[#FFF8E9] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Fotografía 100% Real</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2E1F17] font-serif">
            Nuestros Platos en <span className="text-[#D97706]">Vivo y Directo</span>
          </h2>

          <p className="text-sm sm:text-base text-[#2E1F17]/80 max-w-2xl mx-auto font-medium">
            Lo que ves es lo que llega a tu mesa. Conoce nuestras preparaciones reales elaboradas a diario con amor en Villa Jerusalén, Sabana Grande.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realDishes.map((dish, idx) => (
            <div
              key={dish.id}
              onClick={() => setSelectedPhoto(dish)}
              className="group bg-[#FAF2DF] rounded-3xl overflow-hidden border-2 border-[#D5C5A3] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-black/10">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F17] via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-[#2E1F17]/80 backdrop-blur-md text-amber-300 text-xs font-black px-2.5 py-1 rounded-full border border-amber-400/40">
                  {dish.rating}
                </div>

                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-[#D97706] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                  {dish.price}
                </div>

                {/* Zoom overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-[#2E1F17]/90 text-[#FFF8E9] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-[#D97706]/40 shadow-xl">
                    <ZoomIn className="w-4 h-4 text-[#D97706]" />
                    <span>Ver en Grande</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase text-[#6B1F1A] tracking-wider">
                    {dish.category}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#2E1F17] mt-0.5 group-hover:text-[#D97706] transition-colors">
                    {dish.title}
                  </h3>
                  <p className="text-xs text-[#2E1F17]/75 mt-2 line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D5C5A3] flex flex-wrap gap-1.5">
                  {dish.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-[#2E1F17]/10 text-[#2E1F17] text-[10px] font-bold px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Zoom View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2E1F17] border-2 border-[#D97706] rounded-3xl overflow-hidden max-w-3xl w-full text-white shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#D97706] text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              <div className="p-6 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase text-amber-400">
                      {selectedPhoto.category}
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-[#FFF8E9]">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                  <span className="text-xl font-black text-[#D97706]">
                    {selectedPhoto.price}
                  </span>
                </div>

                <p className="text-sm text-white/80 mt-2 leading-relaxed">
                  {selectedPhoto.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    {selectedPhoto.tags.map((t, idx) => (
                      <span key={idx} className="bg-white/10 text-xs px-2.5 py-1 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/50575067035?text=${encodeURIComponent(`¡Hola! Vi la foto de "${selectedPhoto.title}" en la página web y quiero pedirlo.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <span>Pedir este plato por WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
