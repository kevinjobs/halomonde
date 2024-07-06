import { useEffect, useRef, useState } from 'react';

interface UseInputState<T> {
  value?: T | null;
  onChange?: (value: T | null, ...payload: any[]) => void;
}

export function useInputState<T>(
  options: UseInputState<T>,
): [T | null, (value: T | null) => void] {
  const { value = null, onChange } = options;
  const [state, setState] = useState(value);

  const oldState = useRef<T | null>(value);

  if (oldState.current !== value) {
    oldState.current = value;
    setState(value);
  }

  const handleChange = (value: T | null) => {
    setState(value);
    if (onChange) {
      onChange(value, ...arguments);
    }
  };

  return [state as T, handleChange];
}
