import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, LogOut, Plus, Edit2, Trash2, Check, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export default function AdminModal({ isOpen, onClose }) {
  const {
    menuItems,
    categories,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    updateItem,
    addItem,
    deleteItem,
    resetToDefault,
  } = useMenu();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Editing state
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: 'hamburguesas',
    description: '',
    image: '',
    badge: '',
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Usuario o contraseña incorrectos.');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const startEdit = (item) => {
    setIsAddingNew(false);
    setEditingItemId(item.id);
    setEditForm({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      badge: item.badge || '',
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingItemId) {
      updateItem(editingItemId, {
        ...editForm,
        price: Number(editForm.price),
      });
      setEditingItemId(null);
    }
  };

  const handleSaveNew = (e) => {
    e.preventDefault();
    addItem({
      ...editForm,
      price: Number(editForm.price),
      ingredients: [],
    });
    setIsAddingNew(false);
    setEditForm({
      name: '',
      price: '',
      category: 'hamburguesas',
      description: '',
      image: '/images/pina-campesina.jpg',
      badge: '',
    });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = menuItems.filter(
    (item) => selectedCatFilter === 'all' || item.category === selectedCatFilter
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#FFF8E9] border border-[#D5C5A3] rounded-3xl max-w-4xl w-full text-[#2E1F17] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#2E1F17] text-[#FFF8E9] px-6 py-4 flex items-center justify-between border-b border-[#D97706]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center text-white">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight">
                    Panel de Administración
                  </h3>
                  <p className="text-[11px] text-amber-300">
                    Hamburguesas del Campo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isAdminLoggedIn && (
                  <button
                    onClick={logoutAdmin}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B1F1A] text-white text-xs font-bold hover:bg-red-800 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {!isAdminLoggedIn ? (
                /* Clean Login Form without visible credentials */
                <form onSubmit={handleLogin} className="max-w-sm mx-auto py-8 space-y-4">
                  <div className="text-center space-y-1 mb-6">
                    <h4 className="font-serif font-bold text-xl text-[#2E1F17]">
                      Acceso Restringido
                    </h4>
                    <p className="text-xs text-[#2E1F17]/70">
                      Inicia sesión para gestionar platos, precios y fotos del menú.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-medium text-center">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#2E1F17] mb-1">
                      Usuario
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nombre de usuario"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C5A3] bg-white text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2E1F17] mb-1">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C5A3] bg-white text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 text-sm"
                  >
                    Ingresar al Panel
                  </button>
                </form>
              ) : (
                /* Admin Dashboard */
                <div className="space-y-6">
                  {/* Actions bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D5C5A3]">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedCatFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          selectedCatFilter === 'all'
                            ? 'bg-[#2E1F17] text-white'
                            : 'bg-white border border-[#D5C5A3] text-[#2E1F17]'
                        }`}
                      >
                        Todos ({menuItems.length})
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCatFilter(c.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            selectedCatFilter === c.id
                              ? 'bg-[#D97706] text-white'
                              : 'bg-white border border-[#D5C5A3] text-[#2E1F17]'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingItemId(null);
                          setIsAddingNew(true);
                          setEditForm({
                            name: '',
                            price: '',
                            category: 'hamburguesas',
                            description: '',
                            image: '/images/pina-campesina.jpg',
                            badge: '',
                          });
                        }}
                        className="px-3.5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Plato</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('¿Deseas restaurar todo el menú a los valores iniciales?')) {
                            resetToDefault();
                          }
                        }}
                        className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1"
                        title="Restaurar menú original"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Restaurar</span>
                      </button>
                    </div>
                  </div>

                  {/* Form to Edit or Add */}
                  {(editingItemId || isAddingNew) && (
                    <form
                      onSubmit={isAddingNew ? handleSaveNew : handleSaveEdit}
                      className="bg-white p-5 rounded-2xl border-2 border-[#D97706] shadow-md space-y-4"
                    >
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-sm text-[#6B1F1A]">
                          {isAddingNew ? 'Agregar Nuevo Plato' : 'Editar Plato'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemId(null);
                            setIsAddingNew(false);
                          }}
                          className="text-xs text-gray-500 hover:text-gray-800"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Nombre *</label>
                          <input
                            type="text"
                            required
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#D97706]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Precio (C$) *</label>
                          <input
                            type="number"
                            required
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#D97706]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Categoría</label>
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#D97706]"
                          >
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Distintivo (opcional)</label>
                          <input
                            type="text"
                            value={editForm.badge}
                            onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                            placeholder="Ej: Pan Rojo, Familiar, etc."
                            className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Descripción</label>
                        <textarea
                          rows="2"
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      {/* Image Upload / URL */}
                      <div>
                        <label className="block text-xs font-bold mb-1">Foto del Plato</label>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden border flex-shrink-0">
                            {editForm.image ? (
                              <img
                                src={editForm.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={editForm.image}
                              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                              placeholder="/images/pina-campesina.jpg o enlace"
                              className="w-full px-3 py-1.5 rounded-lg border text-xs"
                            />
                            <div>
                              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-[#2E1F17] hover:bg-amber-200 text-[11px] font-bold rounded-lg transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Subir foto desde archivo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageFileChange}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemId(null);
                            setIsAddingNew(false);
                          }}
                          className="px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg shadow"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Items Table */}
                  <div className="bg-white rounded-2xl border border-[#D5C5A3] overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#FAF2DF] text-[#2E1F17] font-bold border-b border-[#D5C5A3]">
                        <tr>
                          <th className="p-3">Foto</th>
                          <th className="p-3">Nombre</th>
                          <th className="p-3">Categoría</th>
                          <th className="p-3">Precio</th>
                          <th className="p-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredItems.map((item) => (
                          <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                            <td className="p-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-md border"
                              />
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-[#2E1F17]">{item.name}</p>
                              <p className="text-[10px] text-gray-500 line-clamp-1">
                                {item.description}
                              </p>
                            </td>
                            <td className="p-3 text-gray-600 capitalize">
                              {item.category}
                            </td>
                            <td className="p-3 font-bold text-[#6B1F1A]">
                              C$ {item.price}
                            </td>
                            <td className="p-3 text-right">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => startEdit(item)}
                                  className="p-1.5 hover:bg-amber-100 rounded-lg text-amber-700"
                                  title="Editar"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`¿Eliminar ${item.name} del menú?`)) {
                                      deleteItem(item.id);
                                    }
                                  }}
                                  className="p-1.5 hover:bg-red-100 rounded-lg text-red-600"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
