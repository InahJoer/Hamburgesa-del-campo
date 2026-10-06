import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export default function InteractiveMenuBook({ onAddToCart }) {
  const { menuItems } = useMenu();
  const [currentPage, setCurrentPage] = useState(0); // For desktop spread (0 to 3)
  const [mobilePage, setMobilePage] = useState(0); // For mobile single page (0 to 7)
  const [direction, setDirection] = useState(0);
  const [addedItemEffect, setAddedItemEffect] = useState(null);

  // Single pages array for mobile (and paired for desktop)
  const singlePages = [
    {
      id: 'hamburguesas-1',
      categoryTab: 'Hamburguesas',
      title: 'Hamburguesas del Campo',
      subtitle: 'Carne 100% artesanal y panes horneados a diario',
      pageNum: 1,
      items: menuItems.filter((i) => i.category === 'hamburguesas').slice(0, 5),
    },
    {
      id: 'hamburguesas-2',
      categoryTab: 'Hamburguesas',
      title: 'Creaciones del Chef',
      subtitle: 'Sabor a la brasa con papas crujientes',
      pageNum: 2,
      items: menuItems.filter((i) => i.category === 'hamburguesas').slice(5, 10),
    },
    {
      id: 'especialidades-1',
      categoryTab: 'Especialidades',
      title: 'Especialidades & Carnes',
      subtitle: 'Fajitas campesinas y cortes jugosos',
      pageNum: 3,
      items: menuItems.filter((i) => i.category === 'especialidades').slice(0, 5),
    },
    {
      id: 'especialidades-2',
      categoryTab: 'Especialidades',
      title: 'Arroces & Platos Fuertes',
      subtitle: 'Arroces al wok y platos familiares',
      pageNum: 4,
      items: menuItems.filter((i) => i.category === 'especialidades').slice(5, 10),
    },
    {
      id: 'entradas',
      categoryTab: 'Entradas',
      title: 'Entradas & Snacks',
      subtitle: 'Alitas crujientes, totopos y canastitas',
      pageNum: 5,
      items: menuItems.filter((i) => i.category === 'entradas'),
    },
    {
      id: 'quesadillas',
      categoryTab: 'Quesadillas',
      title: 'Quesadillas al Comal',
      subtitle: 'Doradas con abundante queso fundido',
      pageNum: 6,
      items: menuItems.filter((i) => i.category === 'quesadillas'),
    },
    {
      id: 'bebidas',
      categoryTab: 'Bebidas & Postres',
      title: 'Bebidas & Postres',
      subtitle: 'Cacao frío artesanal, chocobananos y limonadas',
      pageNum: 7,
      items: menuItems.filter((i) => i.category === 'bebidas-postres'),
    },
    {
      id: 'extras',
      categoryTab: 'Extras',
      title: 'Extras & Adicionales',
      subtitle: 'Porciones extra para tu plato',
      pageNum: 8,
      items: menuItems.filter((i) => i.category === 'extras'),
    },
  ];

  // Desktop Spreads (2 pages each)
  const desktopSpreads = [
    {
      id: 'hamburguesas',
      title: 'Hamburguesas',
      leftPage: singlePages[0],
      rightPage: singlePages[1],
    },
    {
      id: 'especialidades',
      title: 'Especialidades',
      leftPage: singlePages[2],
      rightPage: singlePages[3],
    },
    {
      id: 'entradas-quesadillas',
      title: 'Entradas & Quesadillas',
      leftPage: singlePages[4],
      rightPage: singlePages[5],
    },
    {
      id: 'bebidas-extras',
      title: 'Bebidas & Extras',
      leftPage: singlePages[6],
      rightPage: singlePages[7],
    },
  ];

  const handleNextDesktop = () => {
    if (currentPage < desktopSpreads.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevDesktop = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextMobile = () => {
    if (mobilePage < singlePages.length - 1) {
      setDirection(1);
      setMobilePage((prev) => prev + 1);
    }
  };

  const handlePrevMobile = () => {
    if (mobilePage > 0) {
      setDirection(-1);
      setMobilePage((prev) => prev - 1);
    }
  };

  const handleAddItem = (item) => {
    onAddToCart(item);
    setAddedItemEffect(item.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  const currentDesktopSpread = desktopSpreads[currentPage];
  const currentMobilePage = singlePages[mobilePage];

  return (
    <section id="menu-libro" className="py-12 sm:py-20 bg-[#FAF3E0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1 sm:space-y-2">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#6B1F1A] uppercase block">
            Menú Virtual Interactivo
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E1F17]">
            El Gran Libro del Campo
          </h2>
          <p className="text-[11px] sm:text-sm text-[#2E1F17]/75 font-medium">
            Desliza las páginas para revisar todos nuestros platos y precios en córdobas.
          </p>
        </div>

        {/* Category Tabs for Mobile */}
        <div className="lg:hidden flex overflow-x-auto gap-1.5 pb-2 mb-4 scrollbar-none justify-start sm:justify-center">
          {singlePages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => {
                setDirection(idx > mobilePage ? 1 : -1);
                setMobilePage(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                mobilePage === idx
                  ? 'bg-[#6B1F1A] text-white shadow-md'
                  : 'bg-white/80 border border-[#E8DFC8] text-[#2E1F17]'
              }`}
            >
              Pág. {page.pageNum}
            </button>
          ))}
        </div>

        {/* Category Bookmark Tabs for Desktop */}
        <div className="hidden lg:flex flex-wrap items-center justify-center gap-2 mb-6">
          {desktopSpreads.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setDirection(idx > currentPage ? 1 : -1);
                setCurrentPage(idx);
              }}
              className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-serif font-bold transition-all ${
                currentPage === idx
                  ? 'bg-[#3D1A16] text-[#FFF8E9] shadow-md -translate-y-1 border-t-2 border-[#D97706]'
                  : 'bg-[#6B1F1A]/15 text-[#6B1F1A] hover:bg-[#6B1F1A]/25'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW (Single Page - Optimized dimensions fitting screen)          */}
        {/* ========================================================================= */}
        <div className="lg:hidden max-w-sm sm:max-w-md mx-auto">
          <div className="bg-[#2B140B] p-2 sm:p-3 rounded-2xl shadow-xl border-2 border-[#502213]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={mobilePage}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FFFDF7] text-[#2E1F17] rounded-xl shadow border border-[#E8DFC8] p-3.5 sm:p-4 text-left flex flex-col justify-between"
              >
                {/* Mobile Page Header */}
                <div className="pb-2.5 border-b border-[#E8DFC8] mb-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#6B1F1A] uppercase tracking-wider">
                    <span>Hamburguesas del Campo</span>
                    <span className="bg-amber-100 text-[#6B1F1A] px-2 py-0.5 rounded font-mono text-[9px]">
                      Página {currentMobilePage.pageNum} de 8
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2E1F17] mt-0.5">
                    {currentMobilePage.title}
                  </h3>
                  <p className="text-[10px] text-[#2E1F17]/70 italic">
                    {currentMobilePage.subtitle}
                  </p>
                </div>

                {/* Mobile Items List */}
                <div className="space-y-2.5">
                  {currentMobilePage.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-lg bg-[#FAF3E0]/40 flex items-center gap-2.5 border-b border-dashed border-[#E8DFC8] pb-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover bg-amber-50 border flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1">
                          <h4 className="font-serif font-bold text-xs text-[#2E1F17] truncate">
                            {item.name}
                          </h4>
                          <span className="font-bold text-xs text-[#6B1F1A] whitespace-nowrap">
                            C$ {item.price}
                          </span>
                        </div>
                        {item.badge && (
                          <span className="text-[8px] font-bold uppercase text-[#D97706] tracking-wider block">
                            {item.badge}
                          </span>
                        )}
                        <p className="text-[10px] text-[#2E1F17]/70 line-clamp-1">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddItem(item)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                          addedItemEffect === item.id
                            ? 'bg-green-600 text-white'
                            : 'bg-[#D97706] text-white active:scale-95'
                        }`}
                        title="Pedir"
                      >
                        {addedItemEffect === item.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Mobile Page Turn Controls */}
                <div className="pt-3 border-t border-[#E8DFC8] flex items-center justify-between mt-3">
                  <button
                    onClick={handlePrevMobile}
                    disabled={mobilePage === 0}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      mobilePage === 0
                        ? 'opacity-30 text-gray-400'
                        : 'bg-[#2E1F17] text-white active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>

                  <span className="text-[11px] font-bold text-[#6B1F1A]">
                    {mobilePage + 1} / 8
                  </span>

                  <button
                    onClick={handleNextMobile}
                    disabled={mobilePage === singlePages.length - 1}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      mobilePage === singlePages.length - 1
                        ? 'opacity-30 text-gray-400'
                        : 'bg-[#D97706] text-white active:scale-95'
                    }`}
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (2-Page Spread with Book Spine)                             */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative bg-[#2B140B] p-6 md:p-8 rounded-3xl shadow-2xl border-4 border-[#502213] max-w-5xl mx-auto">
          {/* Subtle leather spine divider */}
          <div className="absolute top-4 bottom-4 left-1/2 w-3 -ml-1.5 bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-20 pointer-events-none rounded-full"></div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ opacity: 0, rotateY: direction > 0 ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: direction > 0 ? -10 : 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-[#FFFDF7] text-[#2E1F17] rounded-2xl shadow-xl border border-[#E8DFC8] p-8 min-h-[580px] flex flex-col justify-between"
            >
              <div className="grid grid-cols-2 gap-12 text-left">
                {/* Left Page */}
                <div className="pr-4 flex flex-col justify-between">
                  <div className="pb-3 border-b border-[#E8DFC8] mb-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#6B1F1A] uppercase tracking-wider">
                      <span>Hamburguesas del Campo</span>
                      <span className="font-mono bg-amber-100 text-[#6B1F1A] px-2 py-0.5 rounded text-[10px]">
                        Pág. {currentDesktopSpread.leftPage.pageNum}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#2E1F17] mt-1">
                      {currentDesktopSpread.leftPage.title}
                    </h3>
                    <p className="text-[11px] text-[#2E1F17]/70 italic">
                      {currentDesktopSpread.leftPage.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3.5 flex-1">
                    {currentDesktopSpread.leftPage.items.map((item) => (
                      <div
                        key={item.id}
                        className="group p-2.5 rounded-xl hover:bg-[#FAF3E0] transition-colors flex items-start gap-3 border-b border-dashed border-[#E8DFC8] pb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-13 h-13 rounded-lg object-cover bg-amber-50 border border-[#E8DFC8] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1.5">
                            <h4 className="font-serif font-bold text-sm text-[#2E1F17] truncate">
                              {item.name}
                            </h4>
                            <span className="font-bold text-sm text-[#6B1F1A] whitespace-nowrap">
                              C$ {item.price}
                            </span>
                          </div>
                          {item.badge && (
                            <span className="inline-block text-[9px] font-bold uppercase text-[#D97706] tracking-wider">
                              {item.badge}
                            </span>
                          )}
                          <p className="text-[11px] text-[#2E1F17]/70 line-clamp-2 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleAddItem(item)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                            addedItemEffect === item.id
                              ? 'bg-green-600 text-white'
                              : 'bg-[#D97706] hover:bg-[#B45309] text-white active:scale-95'
                          }`}
                          title="Pedir"
                        >
                          {addedItemEffect === item.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E8DFC8]/60 mt-4 flex items-center justify-between text-[11px] text-[#2E1F17]/50 font-serif">
                    <span>Villa Jerusalén • Managua</span>
                    <span>Página {currentDesktopSpread.leftPage.pageNum}</span>
                  </div>
                </div>

                {/* Right Page */}
                <div className="pl-4 flex flex-col justify-between">
                  <div className="pb-3 border-b border-[#E8DFC8] mb-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#6B1F1A] uppercase tracking-wider">
                      <span>Sabor de Managua</span>
                      <span className="font-mono bg-amber-100 text-[#6B1F1A] px-2 py-0.5 rounded text-[10px]">
                        Pág. {currentDesktopSpread.rightPage.pageNum}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#2E1F17] mt-1">
                      {currentDesktopSpread.rightPage.title}
                    </h3>
                    <p className="text-[11px] text-[#2E1F17]/70 italic">
                      {currentDesktopSpread.rightPage.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3.5 flex-1">
                    {currentDesktopSpread.rightPage.items.map((item) => (
                      <div
                        key={item.id}
                        className="group p-2.5 rounded-xl hover:bg-[#FAF3E0] transition-colors flex items-start gap-3 border-b border-dashed border-[#E8DFC8] pb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-13 h-13 rounded-lg object-cover bg-amber-50 border border-[#E8DFC8] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1.5">
                            <h4 className="font-serif font-bold text-sm text-[#2E1F17] truncate">
                              {item.name}
                            </h4>
                            <span className="font-bold text-sm text-[#6B1F1A] whitespace-nowrap">
                              C$ {item.price}
                            </span>
                          </div>
                          {item.badge && (
                            <span className="inline-block text-[9px] font-bold uppercase text-[#D97706] tracking-wider">
                              {item.badge}
                            </span>
                          )}
                          <p className="text-[11px] text-[#2E1F17]/70 line-clamp-2 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleAddItem(item)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                            addedItemEffect === item.id
                              ? 'bg-green-600 text-white'
                              : 'bg-[#D97706] hover:bg-[#B45309] text-white active:scale-95'
                          }`}
                          title="Pedir"
                        >
                          {addedItemEffect === item.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E8DFC8]/60 mt-4 flex items-center justify-between text-[11px] text-[#2E1F17]/50 font-serif">
                    <span>Sabor • Calidad • En tu mesa</span>
                    <span>Página {currentDesktopSpread.rightPage.pageNum}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Controls */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between mt-4">
                <button
                  onClick={handlePrevDesktop}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentPage === 0
                      ? 'opacity-30 cursor-not-allowed text-gray-400'
                      : 'bg-[#2E1F17] hover:bg-[#6B1F1A] text-white shadow'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Página anterior</span>
                </button>

                <div className="text-xs font-serif text-[#2E1F17]/70">
                  Despliegue {currentPage + 1} de {desktopSpreads.length}
                </div>

                <button
                  onClick={handleNextDesktop}
                  disabled={currentPage === desktopSpreads.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentPage === desktopSpreads.length - 1
                      ? 'opacity-30 cursor-not-allowed text-gray-400'
                      : 'bg-[#D97706] hover:bg-[#B45309] text-white shadow'
                  }`}
                >
                  <span>Siguiente página</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
