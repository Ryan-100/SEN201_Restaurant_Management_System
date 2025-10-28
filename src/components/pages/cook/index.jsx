/**
 * CookView.jsx
 *
 * Kitchen screen that shows active orders and allows cooks to accept, mark ready, and cancel items.
 *
 * Created by Ko Sett, 6 October 2025
 */

import React from 'react'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import { useAppContext } from '../../../contexts/AppContext'
import CookNotification from '../../ui/shared/CookNotification'

const CookView = () => {
  const { orders, cancelOrderItem, markItemReady, acceptOrderItem } = useAppContext()

  // Get active orders with their items, organized by table
  const activeOrders = (orders || [])
    .filter(order => order.status === 'Active')
    .map(order => ({
      ...order,
      items: (order.items || [])
        .filter(item => item.status !== 'Ready' && item.status !== 'Cancelled' && item.status !== 'Served')
        .map(item => ({
          ...item,
          orderId: order.id,
          tableNumber: order.tableNumber,
          orderCreatedAt: order.createdAt
        }))
    }))
    .filter(order => order.items.length > 0) // Only show orders that have active items
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))

  const handleMarkReady = (orderId, itemId) => {
    markItemReady(orderId, itemId) // This will trigger server notification
  }

  const handleAccept = (orderId, itemId) => {
    acceptOrderItem(orderId, itemId)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Kitchen Queue</h1>

      {activeOrders.length === 0 ? (
        <Card>
          <p className="text-gray-600">No active orders right now.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeOrders.map(order => (
            <Card key={order.id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Table {order.tableNumber}</h2>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">{order.status}</span>
              </div>

              <ul className="space-y-3">
                {order.items.map(item => (
                  <li key={`${item.orderId}-${item.id}`} className="border rounded-md p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">
                          {item.name || `Item ${item.id}`}
                        </p>
                        {item.notes ? (
                          <p className="text-sm text-gray-500 mt-1">Notes: {item.notes}</p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.status === 'Accepted' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {item.status !== 'Accepted' && (
                        <Button
                          variant="primary"
                          className="!py-1 !px-3 text-sm"
                          onClick={() => handleAccept(item.orderId, item.id)}
                        >
                          Accept
                        </Button>
                      )}
                      
                      <Button
                        variant="success"
                        className="!py-1 !px-3 text-sm"
                        disabled={item.status !== 'Accepted'}
                        onClick={() => handleMarkReady(item.orderId, item.id)}
                      >
                        Mark Ready
                      </Button>
                      
                      <Button
                        variant="danger"
                        className="!py-1 !px-3 text-sm"
                        onClick={() => cancelOrderItem(item.orderId, item.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
      <CookNotification />
    </div>
  )
}

export default CookView
