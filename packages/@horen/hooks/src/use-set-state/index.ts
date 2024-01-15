import { useState, } from 'react';

export function useSetState<T extends Record<string, any>>(initialState: T): readonly [T, (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) => void]{
  const [value, setter] = useState(initialState);
  const newSetter = (obj: object) => {
    setter((prev => ({...prev, ...obj})));
  }
  return [value, newSetter];
}