import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const deepDeps = (value: any) => {
  const ref = useRef(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

const isEqual = (obj1: any, obj2: any) => {
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 !== 'object') return obj1 === obj2;
  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2keys.length) return false;
  for (let key of obj1Keys) {
    if (!isEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}

export function useDeepEffect(effect: EffectCallback, deps?: DependencyList) {
  return useEffect(effect, deepDeps(deps));
}
