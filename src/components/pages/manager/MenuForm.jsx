/*
 * MenuForm.jsx
 *
 * A form component for creating and editing menu items, styled with Tailwind CSS.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a form for adding or editing a menu item.
 *
 * @param {object} props
 * @param {function} props.onSubmit - Callback on form submission.
 * @param {function} props.onClose - Callback to close the form/modal.
 * @param {object|null} props.itemToEdit - Item data to pre-fill the form.
 * @returns {React.ReactElement} JSX element containing the menu form.
 */
const MenuForm = ({ onSubmit, onClose, itemToEdit = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main',
  });

  // Effect to pre-fill form when itemToEdit changes
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        description: itemToEdit.description,
        price: itemToEdit.price,
        category: itemToEdit.category,
      });
    } else {
      setFormData({ name: '', description: '', price: '', category: 'Main' });
    }
  }, [itemToEdit]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Name and Price are required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        step="0.01"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="Appetizer">Appetizer</option>
        <option value="Main">Main</option>
        <option value="Dessert">Dessert</option>
        <option value="Beverage">Beverage</option>
      </select>

      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{itemToEdit ? 'Save Changes' : 'Add Item'}</button>
      </div>
    </form>
  );
};

MenuForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  itemToEdit: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.oneOf(['Appetizer', 'Main', 'Dessert', 'Beverage']),
  }),
};

export default MenuForm;