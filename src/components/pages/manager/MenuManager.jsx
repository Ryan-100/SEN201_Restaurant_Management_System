/*
 * MenuManager.jsx
 *
 * This component serves as the main interface for a manager to view and manage menu items.
 * It fetches menu data and handles all CRUD operations, styled with Tailwind CSS.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React, { useState, useEffect } from 'react';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from './menuApi';
import Modal from '../../ui/Modal';
import MenuForm from './MenuForm';

/**
 * Manages and displays the list of menu items.
 *
 * @returns {React.ReactElement} JSX element containing the menu management UI.
 */
const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMenu = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (err) {
      setError(err.message || 'Failed to load menu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // --- EVENT HANDLERS ---
  const handleShowAddModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData) => {
    const isUpdating = selectedItem !== null;
    const action = isUpdating
      ? updateMenuItem(selectedItem.id, formData)
      : createMenuItem(formData);

    try {
      await action;
      handleCloseModal();
      await fetchMenu();
    } catch (err) {
      console.error("Failed to save item:", err);
      setError(err.message || 'Failed to save the item.');
    }
  };

  const handleDeleteItem = async (itemId, itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      try {
        await deleteMenuItem(itemId);
        await fetchMenu();
      } catch (err) {
        console.error("Failed to delete item:", err);
        setError(err.message || 'Failed to delete the item.');
      }
    }
  };

  // --- COMPONENT RENDER ---
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <button onClick={handleShowAddModal} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add New Item
        </button>
      </div>

      {isLoading && <p>Loading menu...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Category</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button onClick={() => handleShowEditModal(item)} className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id, item.name)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MenuForm 
          onSubmit={handleFormSubmit} 
          onClose={handleCloseModal} 
          itemToEdit={selectedItem} 
        />
      </Modal>
    </div>
  );
};

export default MenuManager;