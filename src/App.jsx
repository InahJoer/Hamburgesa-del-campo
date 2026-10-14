import React, { useState, useEffect } from 'react';
import { MenuProvider } from './context/MenuContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuPreview from './components/MenuPreview';
import InteractiveMenuBook from './components/InteractiveMenuBook';
import AboutSection from './components/AboutSection';
import AdminModal from './components/AdminModal';
import OrderDrawer from './components/OrderDrawer';
import Footer from './components/Footer';
import { MessageCircle, ShoppingBag, BookOpen } from 'lucide-react';
import { BUSINESS_INFO } from './data/menuData';

import Toast from './components/Toast';

function MainLayout() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persistent customer checkout form (survives drawer close & page refresh)
  const [customerForm, setCustomerForm] = useState(() => {
    try {
      const saved = localStorage.getItem('hdc_customer_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved customer data:', e);
    }
    return {
      name: '',
      phone: '',
      address: '',
      notes: '',
      lat: null,
      lng: null,
      mapsUrl: '',
      locationShared: false,
    };
  });

  const handleFormChange = (newForm) => {
    setCustomerForm(newForm);
    try {
      localStorage.setItem('hdc_customer_data', JSON.stringify(newForm));
    } catch (e) {
      console.error('Error saving customer data:', e);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    // Disparar toast no intrusivo con auto-cierre
    setToast({ name: item.name, price: item.price });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToMenuBook = () => {
    const el = document.getElementById('menu-libro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#2E1F17] pb-16 md:pb-0">
      {/* Navbar */}
      <Navbar
        onOpenMenuBook={handleScrollToMenuBook}
        onOpenAdmin={() => setIsAdminOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Narrative */}
      <main className="flex-grow">
        {/* Clean Hero section */}
        <Hero onOpenMenuBook={handleScrollToMenuBook} />

        {/* 3 Featured dishes preview matching reference */}
        <MenuPreview
          onOpenMenuBook={handleScrollToMenuBook}
          onAddToCart={handleAddToCart}
        />

        {/* The single interactive Flipbook Menu with 3D page flip effect */}
        <InteractiveMenuBook
          onAddToCart={handleAddToCart}
        />

        {/* Sobre Nosotros / Aquí te esperamos in deep crimson */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Order Drawer with WhatsApp checkout */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        form={customerForm}
        onFormChange={handleFormChange}
      />

      {/* Floating Add to Cart Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2E1F17] border-t border-[#D97706]/30 px-4 py-2.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={handleScrollToMenuBook}
          className="flex flex-col items-center gap-1 text-white/80 hover:text-white"
        >
          <BookOpen className="w-4 h-4 text-[#D97706]" />
          <span className="text-[10px] font-bold">Ver Menú</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-white/80 hover:text-white"
        >
          <ShoppingBag className="w-4 h-4 text-[#D97706]" />
          <span className="text-[10px] font-bold">Mi Pedido</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-[#D97706] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>

        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappOrders}?text=${encodeURIComponent('¡Hola! Me gustaría hacer un pedido.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <MainLayout />
    </MenuProvider>
  );
}
