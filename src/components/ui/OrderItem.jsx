/**
 * OrderItem.jsx
 *
 * Reusable order item component for displaying items in order cart and bill
 *
 * Created by Phyo, 6 October 2025
 */

import React from 'react'
import Button from './Button'

/**
 * Display an order item with quantity, name, price, and controls
 *
 * Props:
 * item - object, order item with { id, name, price, quantity }
 * onRemove - function, callback when remove button is clicked (itemId) => void (optional)
 * onUpdateQuantity - function, callback when quantity changes (itemId, newQuantity) => void (optional)
 * showControls - boolean, whether to show quantity controls (optional, defaults to true)
 * className - string, additional CSS classes (optional)
 *
 * Returns: JSX element containing order item UI
 */
const OrderItem = ({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  showControls = true, 
  className = '' 
}) => {
  const totalPrice = item.price * item.quantity

  const handleQuantityChange = (newQuantity) => {
    if (onUpdateQuantity && newQuantity >= 0) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id)
    }
  }

  return (
    <div className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border ${className}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <span className="text-lg font-bold text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-600">${item.price.toFixed(2)} each</span>
          {showControls && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm"
                disabled={item.quantity <= 0}
              >
                -
              </button>
              <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm"
              >
                +
              </button>
              {onRemove && (
                <Button
                  variant="danger"
                  onClick={handleRemove}
                  className="text-xs px-2 py-1 ml-2"
                >
                  Remove
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderItem
