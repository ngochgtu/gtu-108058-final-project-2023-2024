import { useState, useEffect } from 'react';

const useLocalStorage = (key, fallback) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) ?? fallback);

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);
    
      return [value, setValue];
    };
    

export default useLocalStorage;
