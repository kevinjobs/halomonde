import React, { useEffect, useRef, useState } from 'react';

import { Arrow } from './Arrow';
import style from './Select.module.less';

export interface SelectProps {
  onChange?(value: string, e: React.MouseEvent<HTMLDivElement> | null): void;
  value: string;
  border?: boolean;
  arrow?: boolean;
  children: React.ReactNode;
}

export interface SelectItemProps {
  name: string;
  value: string;
}

function Select({
  onChange,
  children,
  border = true,
  arrow = true,
  value,
}: SelectProps) {
  const [kw, setKw] = useState<Record<string, any>>({});
  const [state, setValue] = useState(value);
  const [expand, setExpand] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setExpand(!expand);
    const target = e.target as HTMLDivElement;
    const v = target.dataset['value'];

    if (v) {
      setValue(v);
      if (onChange) onChange(v, e);
    }
  };

  const handleBlur = () => {
    setExpand(false);
  };

  useEffect(() => {
    if (ref.current) {
      const tmpKw: Record<string, any> = {};
      for (const child of ref.current.children) {
        const name = (child as HTMLDivElement).dataset['name'];
        const value = (child as HTMLDivElement).dataset['value'];
        if (typeof value === 'string') tmpKw[value] = name;
      }
      setKw(tmpKw);
    }
  }, [ref.current?.children]);

  useEffect(() => setValue(value), [value]);

  return (
    <div
      className={style.select}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex={1}>
      <div className={style.selectHeader}>
        <div>{kw[state]}</div>
        {arrow && (
          <div className={style.headerArrow}>
            <Arrow up={expand} />
          </div>
        )}
      </div>
      <div
        className={style.selectItems}
        style={{ display: expand ? 'block' : 'none' }}
        ref={ref}>
        {children}
      </div>
    </div>
  );
}

function Item({ name, value }: SelectItemProps) {
  return (
    <div className={style.selectItem} data-name={name} data-value={value}>
      {name}
    </div>
  );
}

Select.Item = Item;

export { Select };
