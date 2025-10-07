import React from 'react'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import { useAppContext } from '../../../contexts/AppContext'

const CookView = () => {
  const { orders, cancelOrderItem, updateOrderItemStatus } = useAppContext()

  const activeOrders = (orders || []).filter(o => o.status === 'Active')

  const handleMarkReady = (orderId, itemId) => {
    updateOrderItemStatus(orderId, itemId, 'Ready')
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
          {activeOrders
            .slice()
            .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
            .map(order => (
            <Card key={order.id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Table {order.tableNumber}</h2>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">{order.status}</span>
              </div>

              <ul className="space-y-3">
                {(order.items || []).map(item => (
                  <li key={item.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">
                          {item.name || `Item ${item.id}`}
                          {item.quantity ? <span className="ml-2 text-gray-500">x{item.quantity}</span> : null}
                        </p>
                        {item.notes ? (
                          <p className="text-sm text-gray-500 mt-1">Notes: {item.notes}</p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${item.status === 'Ready' ? 'bg-green-100 text-green-700' : item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {item.status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="success"
                        className="!py-1 !px-3 text-sm"
                        disabled={item.status === 'Ready'}
                        onClick={() => handleMarkReady(order.id, item.id)}
                      >
                        Mark Ready
                      </Button>
                      <Button
                        variant="danger"
                        className="!py-1 !px-3 text-sm"
                        disabled={item.status === 'Cancelled' || item.status === 'Ready'}
                        onClick={() => cancelOrderItem(order.id, item.id)}
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
    </div>
  )
}

export default CookView
