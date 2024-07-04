import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement = any>(
  handler: () => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      const target = evt.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);

  return ref;
}
