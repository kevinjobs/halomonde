import React, { useEffect, useState, useRef } from 'react';

import { MovePosition, useMove, useDidUpdate } from '@horen/hooks';

import style from './Draggable.module.less';

export interface DraggableProps {
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}

export function Draggable(props: DraggableProps) {
  const { children } = props;

  const [dragWidth, setDragWidth] = React.useState(0);
  const [dragHeight, setDragHeight] = React.useState(0);

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const dragRef = useRef<HTMLDivElement>(null);

  const handleChange = (p: MovePosition) => {
    const l = p.x * dragWidth;
    const t = p.y * dragHeight;
    const x = dragRef.current?.offsetLeft || 0;
    const y = dragRef.current?.offsetTop || 0;

    console.log(l, x, t, y);

    if (l > x && t > y) {
      setLeft(l);
      setTop(t);
    }
  };

  const { ref, active } = useMove<HTMLDivElement>(handleChange);

  useEffect(() => {
    if (ref.current) {
      setDragWidth(Number(ref.current?.getBoundingClientRect()?.width));
      setDragHeight(Number(ref.current?.getBoundingClientRect()?.height));
    }
  }, [ref.current]);

  return (
    <div ref={ref} className={style.container}>
      <div className={style.move} style={{ left, top }} ref={dragRef}>
        {children}
      </div>
    </div>
  );
}
