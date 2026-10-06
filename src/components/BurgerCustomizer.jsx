import React, { useState } from 'react';
import { Sparkles, Plus, Check, RotateCcw, MessageCircle, ShoppingBag, Flame, Layers } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function BurgerCustomizer({ onAddToCart }) {
  const [selectedBun, setSelectedBun] = useState('verde'); // 'clasico' | 'rosa' | 'verde'
  const [selectedMeat, setSelectedMeat] = useState('res-doble');
  const [selectedCheeses, setSelectedCheeses] = useState(['cheddar', 'inyeccion']);
  const [selectedToppings, setSelectedToppings] = useState(['bacon', 'papas-top', 'lechuga-tomate']);
  const [selectedSauces, setSelectedSauces] = useState(['secreta', 'bbq']);
  const [customNotes, setCustomNotes] = useState('');

  const buns = [
    { id: 'verde', name: 'Pan Verde Esmeralda (Espinaca/Hierbas)', price: 40, color: 'from-emerald-700 to-green-600', textColor: 'text-emerald-300', tag: 'Estilo Guardabarranco' },
    { id: 'rosa', name: 'Pan Rosa Suave Artesanal', price: 30, color: 'from-pink-600 to-rose-400', textColor: 'text-pink-300', tag: 'Estilo Doble Antojo' },
    { id: 'clasico', name: 'Pan Dorado Brioche Campesino', price: 20, color: 'from-amber-700 to-amber-500', textColor: 'text-amber-300', tag: 'Tradicional' },
  ];

  const meats = [
    { id: 'res-doble', name: 'Doble Torta de Res 100% Artesanal (300g)', price: 140, tag: 'Recomendado' },
    { id: 'res-simple', name: 'Torta de Res Artesanal (150g)', price: 90, tag: 'Clásica' },
    { id: 'pollo-crispy', name: 'Suprema de Pollo Extra Crispy', price: 95, tag: 'Flor de Roble' },
    { id: 'pollo-plancha', name: 'Pechuga a la Plancha Campesina', price: 85, tag: 'Ligero' },
    { id: 'desmechada', name: 'Carne Desmechada en su Jugo', price: 100, tag: '6 Horas de Cocción' },
  ];

  const cheeseOptions = [
    { id: 'cheddar', name: 'Queso Cheddar Fundido', price: 25 },
    { id: 'inyeccion', name: 'Inyección de Cheddar Líquido Caliente 🔥', price: 35 },
    { id: 'blanco', name: 'Queso Blanco Típico Asado', price: 25 },
    { id: 'mozarella', name: 'Queso Mozarella Estirable', price: 25 },
  ];

  const toppingOptions = [
    { id: 'bacon', name: 'Tiras de Tocino Ahumado Crujiente', price: 20 },
    { id: 'papas-top', name: 'Corona de Papas Fritas Bañadas', price: 30 },
    { id: 'pina', name: 'Piña Asada Caramelizada', price: 20 },
    { id: 'jalapenos', name: 'Jalapeños Salteados Volcánicos', price: 20 },
    { id: 'cebolla-caramelizada', name: 'Cebolla Morada Caramelizada', price: 15 },
    { id: 'lechuga-tomate', name: 'Lechuga Fresca & Tomate Criollo', price: 10 },
  ];

  const sauceOptions = [
    { id: 'secreta', name: 'Salsa Secreta del Campo' },
    { id: 'bbq', name: 'Salsa Barbacoa Rústica' },
    { id: 'tartara', name: 'Tártara Campesina' },
    { id: 'volcanica', name: 'Salsa Volcánica Cosigüina (Picante)' },
    { id: 'mayomostaza', name: 'Mayo-Mostaza Miel' },
  ];

  // Calculate total price
  const bunObj = buns.find(b => b.id === selectedBun) || buns[0];
  const meatObj = meats.find(m => m.id === selectedMeat) || meats[0];
  const cheeseTotal = selectedCheeses.reduce((acc, cId) => {
    const found = cheeseOptions.find(c => c.id === cId);
    return acc + (found ? found.price : 0);
  }, 0);
  const toppingTotal = selectedToppings.reduce((acc, tId) => {
    const found = toppingOptions.find(t => t.id === tId);
    return acc + (found ? found.price : 0);
  }, 0);

  const totalPrice = bunObj.price + meatObj.price + cheeseTotal + toppingTotal;

  const toggleCheese = (id) => {
    setSelectedCheeses(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleTopping = (id) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSauce = (id) => {
    setSelectedSauces(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomBurger = () => {
    const customItem = {
      id: `custom-burger-${Date.now()}`,
      name: `Hamburguesa Personalizada (${bunObj.name.split(' ')[1]})`,
      price: totalPrice,
      category: 'hamburguesas',
      image: selectedBun === 'verde' ? '/images/guardabarranco.jpg' : selectedBun === 'rosa' ? '/images/doble-antojo.jpg' : '/images/hero-dish-1.jpg',
      description: `Pan: ${bunObj.name} • Carne: ${meatObj.name} • Quesos: ${selectedCheeses.join(', ')} • Toppings: ${selectedToppings.join(', ')} • Salsas: ${selectedSauces.join(', ')}${customNotes ? ` (Nota: ${customNotes})` : ''}`,
      customized: true,
      customDetails: {
        bun: bunObj.name,
        meat: meatObj.name,
        cheeses: selectedCheeses.map(id => cheeseOptions.find(c => c.id === id)?.name),
        toppings: selectedToppings.map(id => toppingOptions.find(t => t.id === id)?.name),
        sauces: selectedSauces.map(id => sauceOptions.find(s => s.id === id)?.name),
        notes: customNotes,
      }
    };
    onAddToCart(customItem);
  };

  const handleDirectWhatsApp = () => {
    const text = `🍔 ¡Hola Hamburguesas del Campo! Quiero pedir una Hamburguesa Personalizada creada en la web:
- *Pan:* ${bunObj.name}
- *Carne:* ${meatObj.name}
- *Quesos:* ${selectedCheeses.map(id => cheeseOptions.find(c => c.id === id)?.name).join(', ') || 'Ninguno'}
- *Toppings:* ${selectedToppings.map(id => toppingOptions.find(t => t.id === id)?.name).join(', ') || 'Ninguno'}
- *Salsas:* ${selectedSauces.map(id => sauceOptions.find(s => s.id === id)?.name).join(', ') || 'Ninguna'}
${customNotes ? `- *Notas:* ${customNotes}\n` : ''}
*Total estimado:* C$ ${totalPrice}
¿Podrían confirmarme para entrega en Villa Jerusalén/Managua?`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="armador" className="py-20 bg-gradient-to-b from-[#24150D] via-[#2E1F17] to-[#1F130B] text-[#FFF8E9] relative overflow-hidden">
      
      {/* Decorative fire glowing blurs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6B1F1A]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#D97706] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            <Flame className="w-3.5 h-3.5" />
            <span>El Taller del Chef</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-[#FFF8E9]">
            Arma tu Hamburguesa <span className="text-[#D97706]">a tu Gusto</span>
          </h2>

          <p className="text-sm sm:text-base text-[#FFF8E9]/80 max-w-2xl mx-auto">
            Combina nuestros panes artesanales de colores, carnes jugosas, baños de queso e ingredientes del campo. Calculamos tu precio al instante y la enviamos a la cocina.
          </p>
        </div>

        {/* Builder Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ingredient Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Pan Artesanal */}
            <div className="bg-[#3D291F]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D97706]/30 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg font-serif text-amber-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-sans font-black">1</span>
                  Elige tu Pan Artesanal
                </h3>
                <span className="text-xs text-amber-400/80 font-mono">Horneado hoy</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {buns.map((bun) => (
                  <button
                    key={bun.id}
                    onClick={() => setSelectedBun(bun.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      selectedBun === bun.id
                        ? 'bg-[#5C2C16] border-[#D97706] shadow-lg ring-2 ring-[#D97706]/50'
                        : 'bg-[#241710] border-amber-950/60 hover:bg-[#2E1F17]'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-black/40 ${bun.textColor}`}>
                        {bun.tag}
                      </span>
                      <p className="text-xs font-bold text-white mt-1.5 line-clamp-2 leading-tight">
                        {bun.name}
                      </p>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-xs font-black text-amber-300">C$ {bun.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Carne & Proteína */}
            <div className="bg-[#3D291F]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D97706]/30 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg font-serif text-amber-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-sans font-black">2</span>
                  Selecciona tu Proteína
                </h3>
              </div>

              <div className="space-y-2">
                {meats.map((meat) => (
                  <button
                    key={meat.id}
                    onClick={() => setSelectedMeat(meat.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedMeat === meat.id
                        ? 'bg-[#5C2C16] border-[#D97706] shadow-md ring-1 ring-[#D97706]'
                        : 'bg-[#241710] border-amber-950/60 hover:bg-[#2E1F17]'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">{meat.name}</p>
                      <span className="text-[10px] text-amber-300/80 uppercase font-black">{meat.tag}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-amber-300">C$ {meat.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quesos & Fundidos */}
            <div className="bg-[#3D291F]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D97706]/30 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg font-serif text-amber-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-sans font-black">3</span>
                  Quesos & Baños (Elige varios)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cheeseOptions.map((cheese) => {
                  const isChecked = selectedCheeses.includes(cheese.id);
                  return (
                    <button
                      key={cheese.id}
                      onClick={() => toggleCheese(cheese.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#D97706]/30 border-[#D97706] text-white'
                          : 'bg-[#241710] border-amber-950/60 text-white/70 hover:bg-[#2E1F17]'
                      }`}
                    >
                      <span className="text-xs font-bold">{cheese.name}</span>
                      <span className="text-xs font-black text-amber-300">+C$ {cheese.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Toppings y Agregados */}
            <div className="bg-[#3D291F]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D97706]/30 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg font-serif text-amber-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-sans font-black">4</span>
                  Toppings & Crujientes
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toppingOptions.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleTopping(top.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#D97706]/30 border-[#D97706] text-white'
                          : 'bg-[#241710] border-amber-950/60 text-white/70 hover:bg-[#2E1F17]'
                      }`}
                    >
                      <span className="text-xs font-medium">{top.name}</span>
                      <span className="text-xs font-black text-amber-300">+C$ {top.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Salsas & Notas */}
            <div className="bg-[#3D291F]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D97706]/30 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg font-serif text-amber-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-sans font-black">5</span>
                  Salsas Campestres & Instrucciones
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {sauceOptions.map((sauce) => {
                  const isChecked = selectedSauces.includes(sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => toggleSauce(sauce.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isChecked
                          ? 'bg-[#6B1F1A] border-amber-400 text-white'
                          : 'bg-[#241710] border-amber-950/60 text-white/60 hover:bg-[#2E1F17]'
                      }`}
                    >
                      {sauce.name}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Notas especiales (ej: salsa aparte, sin cebolla, bien tostada)..."
                className="w-full px-3.5 py-2.5 bg-[#241710] rounded-xl border border-[#D97706]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D97706]"
              />
            </div>

          </div>

          {/* Right Column: Dynamic Visual Preview & Sticky Order Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-[#3B1D11] border-2 border-[#D97706] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              
              {/* Background ambient badge */}
              <div className="absolute top-3 right-3 bg-[#6B1F1A] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#D97706]/40">
                Resumen de Creación
              </div>

              {/* Visual Burger Stack Graphic */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                {/* Top Bun */}
                <div
                  className={`w-40 sm:w-48 h-10 sm:h-12 rounded-t-full shadow-lg border-b-2 border-black/30 flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ${
                    selectedBun === 'verde'
                      ? 'bg-gradient-to-b from-emerald-600 to-green-800'
                      : selectedBun === 'rosa'
                      ? 'bg-gradient-to-b from-rose-500 to-pink-700'
                      : 'bg-gradient-to-b from-amber-600 to-amber-800'
                  }`}
                >
                  <span className="opacity-80 drop-shadow">Pan {bunObj.name.split(' ')[1]}</span>
                </div>

                {/* Salsas layer */}
                {selectedSauces.length > 0 && (
                  <div className="w-36 h-2 bg-red-600/80 rounded-full my-0.5 animate-pulse"></div>
                )}

                {/* Toppings / Bacon layer */}
                {selectedToppings.includes('bacon') && (
                  <div className="w-38 sm:w-44 h-3 bg-amber-900 border border-amber-700 rounded my-0.5 flex items-center justify-center text-[9px] font-black text-amber-200">
                    🥓 Tocino Ahumado
                  </div>
                )}

                {/* Cheese layer */}
                {selectedCheeses.length > 0 && (
                  <div className="w-42 sm:w-50 h-3.5 bg-yellow-400 rounded-sm my-0.5 shadow-md flex items-center justify-center text-[9px] font-black text-amber-950">
                    🧀 {selectedCheeses.includes('inyeccion') ? 'Inyección de Cheddar Líquido' : 'Queso Fundido'}
                  </div>
                )}

                {/* Meat layer */}
                <div className="w-40 sm:w-48 h-8 bg-amber-950 rounded-xl my-0.5 shadow-inner border border-amber-900 flex items-center justify-center text-[10px] font-black text-amber-100">
                  🥩 {meatObj.name.split(' ')[0]} {meatObj.name.split(' ')[1] || ''}
                </div>

                {/* Veggies */}
                {selectedToppings.includes('lechuga-tomate') && (
                  <div className="w-42 sm:w-48 h-3 bg-green-500 rounded-full my-0.5 flex items-center justify-center text-[9px] font-bold text-white">
                    🥬 Lechuga & Tomate Criollo
                  </div>
                )}

                {/* Bottom Bun */}
                <div
                  className={`w-38 sm:w-46 h-6 rounded-b-xl shadow-lg border-t-2 border-black/20 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 ${
                    selectedBun === 'verde'
                      ? 'bg-gradient-to-b from-green-800 to-emerald-950'
                      : selectedBun === 'rosa'
                      ? 'bg-gradient-to-b from-pink-700 to-rose-950'
                      : 'bg-gradient-to-b from-amber-800 to-amber-950'
                  }`}
                >
                  <span className="opacity-80">Base</span>
                </div>
              </div>

              {/* Recipe breakdown list */}
              <div className="space-y-1.5 text-xs text-white/85 border-t border-amber-900/60 pt-4 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Pan: {bunObj.name.split('(')[0]}</span>
                  <span>C$ {bunObj.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proteína: {meatObj.name}</span>
                  <span>C$ {meatObj.price}</span>
                </div>
                {cheeseTotal > 0 && (
                  <div className="flex justify-between text-yellow-300">
                    <span>Quesos seleccionados ({selectedCheeses.length})</span>
                    <span>+C$ {cheeseTotal}</span>
                  </div>
                )}
                {toppingTotal > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Toppings & Crujientes ({selectedToppings.length})</span>
                    <span>+C$ {toppingTotal}</span>
                  </div>
                )}
                {selectedSauces.length > 0 && (
                  <div className="text-[11px] text-white/60">
                    Salsas: {selectedSauces.map(s => sauceOptions.find(opt => opt.id === s)?.name).join(', ')}
                  </div>
                )}
              </div>

              {/* Total Price Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-[#241710] border border-[#D97706]/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-white/60 uppercase font-black block">Total Personalizada</span>
                  <span className="text-3xl font-black text-[#D97706] font-mono">
                    C$ {totalPrice}
                  </span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-1 rounded-md font-bold">
                  A tu medida
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  onClick={handleAddCustomBurger}
                  className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito de Pedidos</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pedir Directo por WhatsApp (7506-7035)</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
