import { DependencyList, EffectCallback, useEffect, useRef, } from 'react';

import { isEqual, } from '@horen/utils';

const deepDeps = (value: any) => {
  const ref = useRef(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export function useDeepEffect(effect: EffectCallback, deps?: DependencyList) {
  return useEffect(effect, deepDeps(deps));
}
