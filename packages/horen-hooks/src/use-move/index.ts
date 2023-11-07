import React from 'react';

export interface MovePosition {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

export interface UseMoveProps {
  onMove(p: MovePosition): void;
}

export function useMove<T extends HTMLElement = any>({onMove}: UseMoveProps) {
  const ref = React.useRef<T>(null);
  
  React.useEffect(() => {
    const target = ref.current as T;
    target.onmousemove = (e) => {
      const rect = target.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const y = e.pageY - rect.top;
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      onMove({x, y, percentX, percentY});
    }
  }, [ref]);
  
  return { ref };
}
