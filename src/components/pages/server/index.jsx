/**
 * ServerView.jsx
 *
 * Server interface for managing tables and orders
 *
 * Created by Phyo, 10 October 2025
 */

import React, { useState, useMemo } from 'react'

import { useAppContext } from '../../../contexts/AppContext'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import ModalServer from '../../ui/ModalServer'
import ServerTables from './components/ServerTables'
import ActiveBills from './components/ActiveBills'
import ReadyForPickup from './components/ReadyForPickup'
import ServerNotification from '../../ui/shared/ServerNotification'

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
  const [expandedTables, setExpandedTables] = useState(new Set())
  
  const TOTAL_TABLES = 12
  const STATUS = {
    Accepted: 'Accepted',
    Ready: 'Ready',
    Served: 'Served',
  }

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
        if (item.status === STATUS.Ready) {
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

  const readyItemsByTable = useMemo(() => {
    const grouped = {}
    readyItems.forEach(item => {
      if (!grouped[item.tableNumber]) {
        grouped[item.tableNumber] = []
      }
      grouped[item.tableNumber].push(item)
    })
    return grouped
  }, [readyItems])

  const toggleTableExpanded = (tableNumber) => {
    setExpandedTables(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tableNumber)) {
        newSet.delete(tableNumber)
      } else {
        newSet.add(tableNumber)
      }
      return newSet
    })
  }

  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber)
    const existingOrder = activeOrders.find(order => order.tableNumber === tableNumber)
    
    if (existingOrder) {
      setCurrentOrderId(existingOrder.id)
      // Only load items that are NOT protected (not Accepted, Ready, or Served)
      const editableItems = existingOrder.items.filter(item =>
        item.status !== STATUS.Accepted &&
        item.status !== STATUS.Ready &&
        item.status !== STATUS.Served
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
    if (selectedTable) {
      // For new orders, require at least one item
      // For existing orders, allow update even with zero items (to remove all items)
      if (!currentOrderId && currentOrderItems.length === 0) {
        return; // Can't place new order with no items
      }
      
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
    updateOrderItemStatus(orderId, itemId, STATUS.Served)
  }

  const canDeliverBill = (order) => {
    return order.items.every(item => item.status === STATUS.Served)
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

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ServerTables
              totalTables={TOTAL_TABLES}
              occupiedTables={occupiedTables}
              selectedTable={selectedTable}
              onSelectTable={handleTableSelect}
            />

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Active Bills ({activeOrders.length})
              </h2>
              
              <ActiveBills
                orders={activeOrders}
                onViewEdit={handleViewEditOrder}
                onDeliverBill={handleDeliverBill}
                canDeliverBill={canDeliverBill}
                calculateOrderTotal={calculateOrderTotal}
              />
            </div>
          </div>

          <div className="w-full lg:w-96">
            <Card className="lg:sticky lg:top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ready for Pickup</h2>
              
              <ReadyForPickup
                readyItemsByTable={readyItemsByTable}
                expandedTables={expandedTables}
                onToggleExpanded={toggleTableExpanded}
                onServeItem={handleServeItem}
              />
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
      <ServerNotification />
    </div>
  )
}

export default ServerView
