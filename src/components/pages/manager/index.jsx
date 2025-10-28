/*
 * index.jsx
 *
 * The main view component for the Manager role. 
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import ModalManager from '../../ui/ModalManager';
import MenuForm from '../../ui/MenuForm';

// calculate the total for a single order's items
const calculateOrderTotal = (items) => {
  if (!Array.isArray(items)) {
    return 0;
  }
  return items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
};

// get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Main dashboard for the Manager, containing all features.
const ManagerView = () => {
  const { menu, orders, addMenuItem, updateMenuItem, deleteMenuItem } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState(getTodayDateString());
  const [reportData, setReportData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reportError, setReportError] = useState(null);

  const handleShowAddModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData) => {
    const isUpdating = selectedItem !== null;
    if (isUpdating) {
      updateMenuItem({ id: selectedItem.id, ...formData });
    } else {
      addMenuItem(formData);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (itemId, itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      deleteMenuItem(itemId);
    }
  };

  const handleGenerateReport = useCallback(() => {

    setReportError(null);
    setReportData(null);
    setSummary(null);

    if (!startDate || !endDate) {
      setReportError('Please select a start and end date');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setReportError('End date must be after start date');
      return;
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const filteredOrders = orders.filter(order =>
      order.status === 'Paid' &&
      order.paidAt &&
      order.paidAt >= start.getTime() &&
      order.paidAt <= end.getTime()
    );

    const totalRevenue = filteredOrders.reduce((total, order) => total + calculateOrderTotal(order.items), 0);
    const totalOrders = filteredOrders.length;
    setSummary({ totalRevenue, totalOrders });
    setReportData(filteredOrders);
  }, [startDate, endDate, orders]);

  useEffect(() => {
    handleGenerateReport();
  }, []);

  return (
    <div className="space-y-6">
      {/* Menu Management Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
          <button onClick={handleShowAddModal} className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Add New Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-2 px-4">${parseFloat(item.price).toFixed(2)}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button onClick={() => handleShowEditModal(item)} className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id, item.name)} className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalManager isOpen={isModalOpen} onClose={handleCloseModal}>
          <MenuForm onSubmit={handleFormSubmit} onClose={handleCloseModal} itemToEdit={selectedItem} />
        </ModalManager>
      </div>

      {/* Report Generation Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Revenue Report</h1>
        <div className="flex flex-wrap items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setReportError(null);
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setReportError(null);
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full sm:w-auto self-end">
            <button onClick={handleGenerateReport} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>

        {reportError && 
          <p className="w-full text-center text-red-600 text-sm mt-2 mb-2">
            {reportError}
          </p>
        }

        {summary && reportData && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-900">${summary.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-800">Total Orders Paid</h3>
                <p className="text-3xl font-bold text-indigo-900">{summary.totalOrders}</p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">Paid Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Table</th>
                    <th className="text-left py-2 px-4">Date Paid</th>
                    <th className="text-left py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.length > 0 ? reportData.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4 text-sm text-gray-600">{order.id}</td>
                      <td className="py-2 px-4">{order.tableNumber}</td>
                      <td className="py-2 px-4">{new Date(order.paidAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4 font-medium">${calculateOrderTotal(order.items).toFixed(2)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">No paid orders found in this date range.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerView;