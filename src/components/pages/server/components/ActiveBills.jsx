/**
 * ActiveBills.jsx
 *
 * Active bills list for the Server dashboard.
 *
 * Updated by Phyo, 27 October 2025
 */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../ui/Button'
import Card from '../../../ui/Card'

/**
 * Active bills list
 *
 * Props:
 * - orders: array of active orders
 * - onViewEdit: function(orderId)
 * - onDeliverBill: function(orderId)
 * - canDeliverBill: function(order) => boolean
 * - calculateOrderTotal: function(items) => number
 */
const ActiveBills = ({ orders, onViewEdit, onDeliverBill, canDeliverBill, calculateOrderTotal }) => {
  if (orders.length === 0) {
    return (
      <Card className="text-center py-4">
        <p className="text-gray-500">No active orders</p>
        <p className="text-sm text-gray-400 mt-2">Select a table above to start a new order</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map(order => {
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
                  onClick={() => onViewEdit(order.id)}
                  className="text-sm px-3 py-1"
                >
                  View/Edit Order
                </Button>
                <Button
                  variant="success"
                  onClick={() => onDeliverBill(order.id)}
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
  )
}

export default ActiveBills

ActiveBills.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tableNumber: PropTypes.number.isRequired,
    items: PropTypes.array
  })).isRequired,
  onViewEdit: PropTypes.func.isRequired,
  onDeliverBill: PropTypes.func.isRequired,
  canDeliverBill: PropTypes.func.isRequired,
  calculateOrderTotal: PropTypes.func.isRequired,
}


