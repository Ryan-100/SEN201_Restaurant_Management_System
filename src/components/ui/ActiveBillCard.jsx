/**
 * ActiveBillCard.jsx
 *
 * Reusable card component for displaying active bills with order details and actions
 *
 * Created by Phyo, 6 October 2025
 */

import React from 'react'
import Button from './Button'
import Card from './Card'

/**
 * Display an active bill card with order details and action buttons
 *
 * Props:
 * order - object, order with { id, tableNumber, items, total }
 * canDeliverBill - boolean, whether bill can be delivered
 * onViewEdit - function, callback when View/Edit button is clicked (orderId) => void
 * onDeliverBill - function, callback when Deliver Bill button is clicked (orderId) => void
 * className - string, additional CSS classes (optional)
 *
 * Returns: JSX element containing active bill card UI
 */
const ActiveBillCard = ({ 
  order, 
  canDeliverBill = false, 
  onViewEdit, 
  onDeliverBill, 
  className = '' 
}) => {
  const itemCount = order.items?.length || 0
  const total = order.total || 0

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">Table {order.tableNumber}</div>
          <div className="text-sm text-gray-600">
            {itemCount} item{itemCount !== 1 ? 's' : ''} | Total: ${total.toFixed(2)}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="secondary"
            onClick={() => onViewEdit?.(order.id)}
            className="text-sm px-3 py-1"
          >
            View/Edit Order
          </Button>
          <Button 
            variant="success"
            onClick={() => onDeliverBill?.(order.id)}
            disabled={!canDeliverBill}
            className="text-sm px-3 py-1"
            title={!canDeliverBill ? "All items must be 'Served' to deliver the bill" : ""}
          >
            Deliver Bill
          </Button>
        </div>
      </div>
      
      {!canDeliverBill && (
        <div className="mt-2 text-xs text-gray-500">
          All items must be 'Served' to deliver the bill
        </div>
      )}
    </Card>
  )
}

export default ActiveBillCard
