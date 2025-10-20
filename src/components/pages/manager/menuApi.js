/*
 * menuApi.js
 *
 * This utility file provides functions for interacting with the menu-related endpoints.
 * It uses mock data during development and will be updated to make real HTTP requests.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

// Import the mock data from the central data directory
import { menuItems } from '../../../data/menuItems';

// Helper function to persist menu items to localStorage
const saveMenuToLocalStorage = () => {
  try {
    window.localStorage.setItem('restaurant-menu', JSON.stringify(menuItems));
  } catch (error) {
    console.error('Failed to save menu to localStorage:', error);
  }
};

/**
 * Fetches all menu items.
 * @returns {Promise<Array>} A promise that resolves to an array of menu items.
 */
export const getMenuItems = async () => {
  console.log("Fetching menu items...");
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve([...menuItems]);
};

/**
 * Creates a new menu item.
 * @param {object} itemData - The data for the new item.
 * @returns {Promise<object>} A promise resolving to the new item.
 */
export const createMenuItem = async (itemData) => {
  console.log("Creating new menu item...", itemData);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newItem = {
    id: new Date().getTime().toString(),
    ...itemData,
    price: parseFloat(itemData.price),
  };
  
  menuItems.push(newItem);
  saveMenuToLocalStorage();
  return Promise.resolve(newItem);
};

/**
 * Updates an existing menu item.
 * @param {string} itemId - The ID of the item to update.
 * @param {object} itemData - The updated data.
 * @returns {Promise<object>} A promise resolving to the updated item.
 */
export const updateMenuItem = async (itemId, itemData) => {
  console.log(`Updating menu item ${itemId}...`, itemData);
  await new Promise(resolve => setTimeout(resolve, 500));

  const itemIndex = menuItems.findIndex(item => item.id === itemId);
  if (itemIndex === -1) throw new Error('Item not found');

  const updatedItem = { ...menuItems[itemIndex], ...itemData, price: parseFloat(itemData.price) };
  menuItems[itemIndex] = updatedItem;
  saveMenuToLocalStorage();
  
  return Promise.resolve(updatedItem);
};

/**
 * Deletes a menu item by its ID.
 * @param {string} itemId - The unique ID of the item to delete.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const deleteMenuItem = async (itemId) => {
  console.log(`Deleting menu item ${itemId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));

  const itemIndex = menuItems.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    throw new Error('Item not found and could not be deleted.');
  }

  menuItems.splice(itemIndex, 1);
  saveMenuToLocalStorage();
  console.log("Item deleted successfully.");
  return Promise.resolve();
};