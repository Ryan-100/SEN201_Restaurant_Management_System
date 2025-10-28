/**
 * ServerTables.jsx
 *
 * Tables grid for the Server dashboard. Renders selectable table cards
 * with occupancy and selection state.
 *
 * Updated by Phyo, 27 October 2025
 */

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Tables grid
 *
 * Props:
 * - totalTables: number, total number of tables to render
 * - occupiedTables: Set<number>, tables currently occupied
 * - selectedTable: number|null, currently selected table
 * - onSelectTable: function(tableNumber), invoked when a table is clicked
 *
 * Returns: JSX grid of table cards
 */
const ServerTables = ({ totalTables, occupiedTables, selectedTable, onSelectTable }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tables</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: totalTables }, (_, i) => i + 1).map(tableNumber => {
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
              onClick={() => onSelectTable(tableNumber)}
              className={`rounded-lg shadow-md p-6 text-center transition-all duration-150 ${cardStyle}`}
            >
              <div className="text-xl font-bold">Table {tableNumber}</div>
              <div className="text-sm mt-1">{statusText}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ServerTables

ServerTables.propTypes = {
  totalTables: PropTypes.number.isRequired,
  occupiedTables: PropTypes.instanceOf(Set).isRequired,
  selectedTable: PropTypes.number,
  onSelectTable: PropTypes.func.isRequired,
}


