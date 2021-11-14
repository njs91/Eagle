import { useState } from 'react';

export const useDebounce = (callback, debounceTime) => {
  const [timer, setTimer] = useState(null);
  return (value) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        callback(value);
      }, debounceTime)
    );
  };
};

// e.g. const debouncedFn = useDebounce(someFn, 500);
