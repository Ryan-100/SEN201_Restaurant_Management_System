/**
 * TableCard.jsx
 *
 * Reusable table card component for displaying table status and selection
 *
 * Created by Phyo, 6 October 2025
 */

import React from 'react'

/**
 * Display a table card with status and selection state
 *
 * Props:
 * tableNumber - number, table number to display
 * isSelected - boolean, whether this table is currently selected
 * isOccupied - boolean, whether this table is occupied (optional, defaults to false)
 * onClick - function, callback when table is clicked
 * className - string, additional CSS classes (optional)
 *
 * Returns: JSX element containing table card UI
 */
const TableCard = ({ 
  tableNumber, 
  isSelected = false, 
  isOccupied = false, 
  onClick, 
  className = '' 
}) => {
  const getStatusText = () => {
    if (isSelected) return 'Selected'
    if (isOccupied) return 'Occupied'
    return 'Available'
  }

  const getStatusColor = () => {
    if (isSelected) return 'bg-blue-600 text-white'
    if (isOccupied) return 'bg-red-500 text-white hover:bg-red-600'
    return 'bg-green-500 text-white hover:bg-green-600'
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-6 text-center font-semibold shadow-sm border transition-colors duration-150 ${getStatusColor()} ${className}`}
    >
      <div className="text-xl">Table {tableNumber}</div>
      <div className="text-sm opacity-90">{getStatusText()}</div>
    </button>
  )
}

export default TableCard
