import React from 'react';
import { Sparkles, Heart, ShieldCheck, Flame, Award, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export default function StoryAndQuality() {
  const features = [
    {
      icon: Flame,
      title: 'Carne 100% Artesanal',
      desc: 'Nuestras tortas de carne se preparan con cortes selectos, sazonadas a mano sin conservantes para un sabor auténtico de campo.',
    },
    {
      icon: Sparkles,
      title: 'Panes de Colores Únicos',
      desc: 'Horneamos diariamente nuestros famosos panes Rosa Suave y Verde Guardabarranco de hierbas para una experiencia visual y de sabor fuera de serie.',
    },
    {
      icon: Award,
      title: 'Sabor Casero Genuino',
      desc: 'Desde nuestras fajitas con tostones hasta las alitas y quesadillas, cada plato se cocina al momento para garantizar frescura y calidad.',
    },
    {
      icon: Heart,
      title: 'Calidez & Pasión Familiar',
      desc: 'En Villa Jerusalén te recibimos con la alegría y el cariño que caracterizan al pueblo nicaragüense. ¡Aquí comes como en casa!',
    },
  ];

  return (
    <section className="py-20 bg-[#24150E] text-[#FFF8E9] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase text-[#D97706] tracking-widest bg-[#D97706]/10 px-4 py-1.5 rounded-full border border-[#D97706]/30">
            Nuestra Filosofía
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-[#FFF8E9]">
            Lo Mejor del Campo <br />
            <span className="text-[#D97706]">Directo a tu Mesa</span>
          </h2>

          <p className="text-sm sm:text-base text-[#FFF8E9]/80 font-medium">
            No somos comida rápida común. Cuidamos cada ingrediente para transformar una hamburguesa en un momento especial para compartir.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#2E1F17]/90 rounded-3xl p-6 border border-[#D97706]/30 hover:border-[#D97706] shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] mb-5 group-hover:scale-110 group-hover:bg-[#D97706] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#FFF8E9] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFF8E9]/70 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Slogan Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#6B1F1A] via-[#3D1A16] to-[#6B1F1A] rounded-3xl p-8 sm:p-10 border-2 border-[#D97706]/40 shadow-2xl text-center space-y-4">
          <p className="text-xs sm:text-sm uppercase font-black tracking-widest text-[#FBBF24]">
            Hamburguesas del Campo • Managua
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white max-w-2xl mx-auto leading-snug">
            "{BUSINESS_INFO.slogan}"
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
            {BUSINESS_INFO.tagline}
          </p>
        </div>

      </div>
    </section>
  );
}
