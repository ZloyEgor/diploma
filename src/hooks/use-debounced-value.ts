import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useDebouncedValue<T>(
  value: T,
  delay?: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
}
