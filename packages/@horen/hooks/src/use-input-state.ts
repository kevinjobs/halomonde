import { useEffect, useRef, useState } from 'react';

type StateType<T> = T | null;

export function useInputState<T>(
  value: StateType<T> = null,
  equals?: (a: StateType<T>, b: StateType<T>) => boolean,
): [StateType<T>, (value: StateType<T>) => void] {
  const [state, setState] = useState(value);

  const oldState = useRef<StateType<T>>(value);

  const isEqual = (a: StateType<T>, b: StateType<T>) => {
    if (equals) return equals(a, b);
    return a === b;
  };

  const handleChange = (value: T | null) => {
    setState(value);
  };

  if (!isEqual(oldState.current, value)) {
    oldState.current = value;
    setState(value);
  }

  return [state as StateType<T>, handleChange];
}
