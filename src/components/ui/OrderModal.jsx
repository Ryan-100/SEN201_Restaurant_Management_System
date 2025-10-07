import React from 'react'
import Button from './Button'
import MenuItem from './MenuItem'
import OrderItem from './OrderItem'

const OrderModal = ({ 
  isOpen, 
  onClose, 
  tableNumber, 
  menuItems = [], 
  orderItems = [], 
  onAddItem, 
  onUpdateQuantity, 
  onRemoveItem, 
  onUpdateOrder 
}) => {
  if (!isOpen) return null

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Order for Table {tableNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Menu Section (Left) */}
          <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={() => onAddItem(item)}
                />
              ))}
            </div>
          </div>

          {/* Current Order Section (Right) */}
          <div className="w-1/2 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Current Order</h3>
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items in order</p>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <Button 
            variant="primary" 
            onClick={onUpdateOrder}
            className="px-6 py-2"
          >
            Update Order
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderModal
