import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string
): [T[], (value: T) => void, () => void] {
  const [storedValues, setStoredValues] = useState<T[]>(() => {
    try {
      const items = localStorage.getItem(key);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error retrieving localStorage value:', error);
      return [];
    }
  });

  const setValue = (value: T) => {
    setStoredValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues;
      }

      return [...prevValues, value];
    });
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValues));
  }, [key, storedValues]);

  const removeHandler = () => {
    setStoredValues([]);
    // localStorage.setItem(key, JSON.stringify([]));
  };

  return [storedValues, setValue, removeHandler];
}
