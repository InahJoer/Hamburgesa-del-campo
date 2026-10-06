import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS as initialItems, MENU_CATEGORIES } from '../data/menuData';

const MenuContext = createContext();

const STORAGE_KEY = 'hamburgesas_campo_menu_v1';
const AUTH_KEY = 'hamburgesas_campo_auth';

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialItems;
    } catch {
      return initialItems;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage:', e);
    }
  }, [menuItems]);

  const loginAdmin = (username, password) => {
    // Trimmed and normalized
    if ((username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'carlos') && password === 'campo123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const updateItem = (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const addItem = (newItem) => {
    setMenuItems((prev) => [
      ...prev,
      { ...newItem, id: newItem.id || `item-${Date.now()}` }
    ]);
  };

  const deleteItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setMenuItems(initialItems);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories: MENU_CATEGORIES,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateItem,
        addItem,
        deleteItem,
        resetToDefault,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
