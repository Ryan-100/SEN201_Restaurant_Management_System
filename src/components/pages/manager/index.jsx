/*
 * index.jsx
 *
 * The main view component for the Manager role.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React, {useState} from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import ModalManager from '../../ui/ModalManager';
import MenuForm from '../../ui/MenuForm';

// main dashboard of the Manager
const ManagerView = () => {
  const {menu, addMenuItem, updateMenuItem, deleteMenuItem} = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowAddModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData) => {
    const isUpdating = selectedItem !== null;
    if (isUpdating) {
      updateMenuItem({...selectedItem, ...formData});
    } else {
      addMenuItem(formData);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (itemId, itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      deleteMenuItem(itemId);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <button onClick={handleShowAddModal} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 font-medium text-gray-800">{item.name}</td>
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

      <ModalManager isOpen={isModalOpen} onClose={handleCloseModal}>
        <MenuForm 
          onSubmit={handleFormSubmit} 
          onClose={handleCloseModal} 
          itemToEdit={selectedItem} 
        />
      </ModalManager>
    </div>
  );
};

export default ManagerView;