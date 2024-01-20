import { useEffect, useRef, useState } from 'react';
import { useToggle } from '../use-toggle';

export type UsePaginationParams = {
  size?: number;
  total: number;
  setCurrent?: (set: (current: number) => void) => void;
};
export function usePagination({
  size = 7,
  total,
  setCurrent,
}: UsePaginationParams) {
  const originPages = useRef(arrayFromInt(total));
  const [pages, setPages] = useState(originPages.current);
  const [current, toggle] = useToggle(originPages.current);

  const next = () => {
    const idx = pages.indexOf(current);
    if (idx < pages.length) {
      toggle(pages[idx + 1]);
    }
  };

  const prev = () => {
    const idx = pages.indexOf(current);
    if (idx > 0) {
      toggle(pages[idx - 1]);
    }
  };

  useEffect(() => {
    const half = Math.ceil(size / 2);
    if (originPages.current.indexOf(current) > half) {
      setPages(['1', '...', ...slice(originPages.current, 2, 2)]);
    }
  }, [total, size, current]);

  return {
    current,
    pages,
    next: next,
    prev: prev,
    setCurrent: toggle,
  };
}

const slice = (arr: string[], start: number, end: number) => {
  const a = [...arr];
  return [...a.slice(start, end)];
};

const arrayFromInt = (size: number) => {
  const p: string[] = [];
  for (let i = 0; i < size; i++) {
    p.push(String(i + 1));
  }
  return p;
};
