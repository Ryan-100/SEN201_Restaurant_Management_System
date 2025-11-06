/*
 * MenuForm.jsx
 *
 * A form component for creating and editing menu items.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

// Renders a form for adding or editing a menu item.
const MenuForm = ({ onSubmit, onClose, itemToEdit = null }) => {
  const [formData, setFormData] = useState({
    name: itemToEdit?.name || '',
    price: itemToEdit?.price || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: itemToEdit?.name || '',
      price: itemToEdit?.price || '',
    });
    setErrors({});
  }, [itemToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'Menu item name is required';
    }
    if (!formData.price.toString().trim()) {
      validationErrors.price = 'Menu item price is required';
    } else if (isNaN(Number(formData.price))) {
      validationErrors.price = 'Menu item price must be a number';
    } else if (Number(formData.price) <= 0) {
      validationErrors.price = 'Menu item price must be greater than 0';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submissionData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
      };
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
      
      <div>
        <input
          type="text"
          name="name"
          placeholder="Menu Item Name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
      <input
        type="number"
        name="price"
        placeholder="Menu Item Price"
        value={formData.price}
        onChange={handleInputChange}
        className={`w-full p-2 border border-gray-300 rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
        step="0.01"
      />
      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
          Cancel
        </button>
        <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {itemToEdit ? 'Save Changes' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

MenuForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  itemToEdit: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default MenuForm;