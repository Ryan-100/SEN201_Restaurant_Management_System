/**
 * MenuItem.jsx
 *
 * Reusable menu item component for displaying food items with add to cart functionality
 *
 * Created by Phyo, 6 October 2025
 */

import React from 'react'
import Button from './Button'

/**
 * Display a menu item with name, price, and add to cart functionality
 *
 * Props:
 * item - object, menu item with { id, name, price }
 * onAddToCart - function, callback when add button is clicked (item) => void
 * quantity - number, current quantity in cart (optional, defaults to 0)
 * onUpdateQuantity - function, callback when quantity changes (itemId, newQuantity) => void (optional)
 * className - string, additional CSS classes (optional)
 *
 * Returns: JSX element containing menu item UI
 */
const MenuItem = ({ 
  item, 
  onAddToCart, 
  quantity = 0, 
  onUpdateQuantity, 
  className = '' 
}) => {
  const handleAddToCart = () => {
    onAddToCart(item)
  }

  const handleQuantityChange = (newQuantity) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className={`flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      
      <button
        onClick={handleAddToCart}
        className="w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-bold text-sm"
      >
        +
      </button>
    </div>
  )
}

export default MenuItem
