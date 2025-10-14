/*
 * useLocalStorage.js
 *
 * Custom hook for managing state that persists to localStorage.
 * Provides automatic synchronization between React state and localStorage.
 *
 * Created by Ryan, 29 September 2025
 */

import { useState, useEffect } from 'react';

/*
 * Manage state with localStorage persistence
 *
 * Parameters:
 * key - string, localStorage key to store the value under
 * initialValue - any, default value if no stored value exists
 *
 * Returns:
 * storedValue - any, current stored value
 * setStoredValue - function, setter function for updating the stored value
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;

