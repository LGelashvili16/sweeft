import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 700) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearInterval(timeout);
  }, [value, delay]);

  return debouncedValue;
}
