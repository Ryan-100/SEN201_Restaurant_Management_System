/**
 * ModalServer.jsx
 *
 * Modal component for server order management
 *
 * Created by Phyo, 10 October 2025
 */

import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Card from './Card'

/**
 * Modal for taking and managing table orders
 *
 * Props:
 * isOpen - boolean, controls modal visibility
 * onClose - function, callback to close modal
 * tableNumber - number, table number for the order
 * menuItems - array, list of available menu items
 * orderItems - array, current items in the order
 * onAddItem - function, callback to add item to order
 * onUpdateQuantity - function, callback to update item quantity
 * onRemoveItem - function, callback to remove item from order
 * onSubmitOrder - function, callback to submit the order
 * isEditing - boolean, indicates if editing existing order
 *
 * Returns: JSX modal element for order management
 */
const ModalServer = ({
  isOpen,
  onClose,
  tableNumber,
  menuItems = [],
  orderItems = [],
  onAddItem,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
  isEditing = false
}) => {
  if (!isOpen) return null

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const price = Number(item.price) || 0
      const quantity = Number(item.quantity) || 0
      return total + (price * quantity)
    }, 0)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Order for Table {tableNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Menu</h3>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Card key={item.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => onAddItem(item)}
                      className="w-8 h-8 rounded-full text-lg p-0"
                    >
                      +
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-1/2 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Order</h3>
            {orderItems.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-gray-500">No items in order</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item) => {
                  const totalPrice = item.price * item.quantity
                  
                  return (
                    <Card key={item.id} className={`p-3 ${item.status === 'Accepted' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          {item.status === 'Accepted' && (
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                              Accepted
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.status === 'Accepted' || item.status === 'Ready' || item.status === 'Cancelled'}
                            className="w-7 h-7 rounded-full text-sm p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="secondary"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.status === 'Accepted' || item.status === 'Ready' || item.status === 'Cancelled'}
                            className="w-7 h-7 rounded-full text-sm p-0"
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => onRemoveItem(item.id)}
                            disabled={item.status === 'Accepted' || item.status === 'Ready' || item.status === 'Cancelled'}
                            className="text-xs px-2 py-1 ml-2"
                          >
                            {item.status === 'Accepted' ? 'Accepted' : 'Remove'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={onSubmitOrder}
              className="px-6 py-2"
              disabled={orderItems.length === 0 && !isEditing}
            >
              {isEditing ? 'Update Order' : (orderItems.length === 0 ? 'Add Items' : 'Submit Order')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalServer

ModalServer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired,
}

