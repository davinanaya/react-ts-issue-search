import { useState, useEffect } from 'react';

const useDebouncedState = (defaultValue: string, delay: number) => {
  const [lastValue, setLastValue] = useState<string>(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(lastValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [lastValue, delay]);

  return [debouncedValue, setLastValue] as const;
};

export { useDebouncedState };
