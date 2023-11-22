import { useState, useEffect } from 'react';

const useLocalStorage = (key, fallback) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      // Check if the stored item is a valid JSON string
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          // If parsing fails, the item is likely a plain string, return as is
          return item;
        }
      }

      return fallback;
    } catch (error) {
      console.error('Error fetching and parsing from localStorage', error);
      return fallback;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error storing data to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
