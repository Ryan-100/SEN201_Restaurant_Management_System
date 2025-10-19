/**
 * ServerView.jsx
 *
 * Server interface for managing tables and orders
 *
 * Created by Phyo, 10 October 2025
 */

import React from 'react'
import { useState, useMemo } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import ModalServer from '../../ui/ModalServer'

/**
 * Server dashboard for managing restaurant tables and orders
 *
 * Props: None
 *
 * Returns: JSX element containing server interface with table management,
 * order taking modal, active bills, and ready-for-pickup section
 */
const ServerView = () => {
  const { menu, orders, placeOrder, updateOrder, deliverBill, updateOrderItemStatus } = useAppContext()
  
  const [selectedTable, setSelectedTable] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [currentOrderItems, setCurrentOrderItems] = useState([])
  const [currentOrderId, setCurrentOrderId] = useState(null)
  
  const TOTAL_TABLES = 12

  const activeOrders = useMemo(() => 
    orders.filter(order => order.status === 'Active'),
    [orders]
  )

  const occupiedTables = useMemo(() => 
    new Set(activeOrders.map(order => order.tableNumber)),
    [activeOrders]
  )

  const readyItems = useMemo(() => {
    const items = []
    activeOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.status === 'Ready') {
          items.push({
            ...item,
            tableNumber: order.tableNumber,
            orderId: order.id
          })
        }
      })
    })
    return items
  }, [activeOrders])

  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber)
    const existingOrder = activeOrders.find(order => order.tableNumber === tableNumber)
    
    if (existingOrder) {
      setCurrentOrderId(existingOrder.id)
      // Only load items that are NOT protected (not Accepted, Ready, or Served)
      const editableItems = existingOrder.items.filter(item =>
        item.status !== 'Accepted' &&
        item.status !== 'Ready' &&
        item.status !== 'Served'
      )
      setCurrentOrderItems(editableItems.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        // Mark as already expanded so expandToPerUnitItems won't re-expand
        alreadyExpanded: true
      })))
    } else {
      setCurrentOrderId(null)
      setCurrentOrderItems([])
    }
    
    setIsOrderModalOpen(true)
  }

  const handleAddItem = (menuItem) => {
    setCurrentOrderItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id)
      
      if (existingItem) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...menuItem, quantity: 1 }]
      }
    })
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId)
    } else {
      setCurrentOrderItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const handleRemoveItem = (itemId) => {
    setCurrentOrderItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleSubmitOrder = () => {
    if (currentOrderItems.length > 0 && selectedTable) {
      if (currentOrderId) {
        updateOrder(currentOrderId, currentOrderItems)
      } else {
        placeOrder(selectedTable, currentOrderItems)
      }
      handleCloseModal()
    }
  }

  const handleCloseModal = () => {
    setIsOrderModalOpen(false)
    setSelectedTable(null)
    setCurrentOrderItems([])
    setCurrentOrderId(null)
  }

  const handleViewEditOrder = (orderId) => {
    const order = activeOrders.find(o => o.id === orderId)
    if (order) {
      handleTableSelect(order.tableNumber)
    }
  }

  const handleDeliverBill = (orderId) => {
    deliverBill(orderId)
  }

  const handleServeItem = (orderId, itemId) => {
    updateOrderItemStatus(orderId, itemId, 'Served')
  }

  const canDeliverBill = (order) => {
    return order.items.every(item => item.status === 'Served')
  }

  const calculateOrderTotal = (orderItems) => {
    return orderItems.reduce((total, item) => 
      total + (item.price * (item.quantity || 1)), 0
    )
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Server Dashboard</h1>
          <p className="text-gray-600 mt-1">Select a table to take or edit orders</p>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tables</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: TOTAL_TABLES }, (_, i) => i + 1).map(tableNumber => {
              const isOccupied = occupiedTables.has(tableNumber)
              const isSelected = selectedTable === tableNumber
              
              let cardStyle = 'bg-green-500 hover:bg-green-600 text-white'
              if (isSelected) {
                cardStyle = 'bg-blue-600 text-white ring-4 ring-blue-300'
              } else if (isOccupied) {
                cardStyle = 'bg-red-500 hover:bg-red-600 text-white'
              }
              
              let statusText = 'Available'
              if (isSelected) {
                statusText = 'Selected'
              } else if (isOccupied) {
                statusText = 'Occupied'
              }
              
              return (
                <button
                  key={tableNumber}
                  onClick={() => handleTableSelect(tableNumber)}
                  className={`rounded-lg shadow-md p-6 text-center transition-all duration-150 ${cardStyle}`}
                >
                  <div className="text-xl font-bold">Table {tableNumber}</div>
                  <div className="text-sm mt-1">{statusText}</div>
                </button>
              )
            })}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Active Bills ({activeOrders.length})
              </h2>
              
              {activeOrders.length === 0 ? (
                <Card className="text-center py-4">
                  <p className="text-gray-500">No active orders</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Select a table above to start a new order
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {activeOrders.map(order => {
                    const orderTotal = calculateOrderTotal(order.items)
                    const itemCount = order.items?.length || 0
                    
                    return (
                      <Card key={order.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-lg">Table {order.tableNumber}</div>
                            <div className="text-sm text-gray-600">
                              {itemCount} item{itemCount !== 1 ? 's' : ''} | Total: ${orderTotal.toFixed(2)}
                            </div>
                          </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="secondary"
                          onClick={() => handleViewEditOrder(order.id)}
                          className="text-sm px-3 py-1"
                        >
                          View/Edit Order
                        </Button>
                        <Button 
                          variant="success"
                          onClick={() => handleDeliverBill(order.id)}
                          disabled={!canDeliverBill(order)}
                          className="text-sm px-3 py-1"
                        >
                          Deliver Bill
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

          <div className="w-96">
            <Card className="sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ready for Pickup</h2>
              
              {readyItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items are ready.</p>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {readyItems.map(item => (
                    <div 
                      key={`${item.orderId}-${item.id}`}
                      className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-lg"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{item.name}</div>
                          <div className="text-sm text-gray-600">For Table {item.tableNumber}</div>
                        </div>
                        <Button 
                          variant="success"
                          onClick={() => handleServeItem(item.orderId, item.id)}
                          className="text-sm px-3 py-1 whitespace-nowrap"
                        >
                          Serve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <ModalServer
        isOpen={isOrderModalOpen}
        onClose={handleCloseModal}
        tableNumber={selectedTable}
        menuItems={menu}
        orderItems={currentOrderItems}
        onAddItem={handleAddItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSubmitOrder={handleSubmitOrder}
        isEditing={currentOrderId !== null}
      />
    </div>
  )
}

export default ServerView
