import { useState, useEffect } from 'react';

function useDebounceCall<TValue>(value: TValue, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounceCall;