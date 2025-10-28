/**
 * ReadyForPickup.jsx
 *
 * Panel listing items marked Ready, grouped by table, with Serve/Serve All.
 *
 * Created by Phyo, 27 October 2025
 * Updated by Phyo, 27 October 2025
 */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../ui/Button'
import Card from '../../../ui/Card'

/**
 * Ready items panel
 *
 * Props:
 * - readyItemsByTable: Record<tableNumber, items[]>
 * - expandedTables: Set<number>
 * - onToggleExpanded: function(tableNumber)
 * - onServeItem: function(orderId, itemId)
 */
const ReadyForPickup = ({ readyItemsByTable, expandedTables, onToggleExpanded, onServeItem }) => {
  const entries = Object.entries(readyItemsByTable)
  if (entries.length === 0) {
    return <p className="text-gray-500 text-center py-8">No items are ready.</p>
  }

  return (
    <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
      {entries.map(([tableNum, items]) => {
        const tableNumInt = Number.parseInt(tableNum, 10)
        const isExpanded = expandedTables.has(tableNumInt)
        return (
          <Card key={tableNum} className="p-0 overflow-hidden border-l-4 border-yellow-500">
            <button
              onClick={() => onToggleExpanded(tableNumInt)}
              className="w-full flex justify-between items-center p-4 hover:bg-yellow-50 transition bg-yellow-100 bg-opacity-30"
            >
              <div>
                <div className="font-semibold text-gray-800">Table {tableNum}</div>
                <div className="text-sm text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} ready</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    items.forEach(item => onServeItem(item.orderId, item.id))
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
                >
                  Serve All
                </button>
                <span className="text-gray-600 text-lg">{isExpanded ? '▼' : '▶'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-gray-200 p-3 space-y-2 bg-white">
                {items.map(item => (
                  <div
                    key={`${item.orderId}-${item.id}`}
                    className="flex justify-between items-start gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      {item.notes && <div className="text-xs text-gray-500 mt-1">Note: {item.notes}</div>}
                    </div>
                    <Button
                      variant="success"
                      onClick={() => onServeItem(item.orderId, item.id)}
                      className="text-xs px-2 py-1 whitespace-nowrap"
                    >
                      Serve
                    </Button>
                  </div>
                ))}
                {/* Bottom Serve All removed (header button is sufficient) */}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default ReadyForPickup

ReadyForPickup.propTypes = {
  readyItemsByTable: PropTypes.object.isRequired,
  expandedTables: PropTypes.instanceOf(Set).isRequired,
  onToggleExpanded: PropTypes.func.isRequired,
  onServeItem: PropTypes.func.isRequired,
}


