import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DataInputWrapper, DataInputWrapperProps } from '../_common';
import cls from './Segment.module.less';
import themes from '../themes.module.less';
import { BaseVariant } from '../_types';
import { classnames } from '../_utils';

type SegmentProps = {
  onChange?: (value: string) => void;
  children: React.ReactNode;
  value?: string;
  variant?: BaseVariant;
} & DataInputWrapperProps;

type SegmentItemProps = {
  value: string;
  label?: string;
};

type Seg = {
  width: number;
  height: number;
  target: HTMLDivElement;
  toLeft: number;
} & SegmentItemProps;

function Segment(props: SegmentProps) {
  const {
    onChange,
    children,
    value,
    variant = 'light',
    error,
    label,
    labelPlacement,
    required,
  } = props;
  const [segs, setSegs] = useState<Seg[]>([]);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).dataset['value'];
    setIdx(findIdx(segs, value));
    if (onChange) onChange(value || '');
  };

  const findIdx = (arr: Seg[], value?: string) => {
    for (const s of arr) {
      if (s.value === value) return arr.indexOf(s);
    }
    return 0;
  };

  useLayoutEffect(() => {
    if (ref.current) {
      const tmpSegs = [];
      for (const child of ref.current.children) {
        const label = (child as HTMLDivElement).dataset['label'];
        const value = (child as HTMLDivElement).dataset['value'];
        if (typeof value === 'string') {
          const target = child as HTMLDivElement;
          tmpSegs.push({
            label,
            value,
            target,
            width: target.offsetWidth,
            height: target.offsetHeight,
            toLeft: (child as HTMLDivElement).offsetLeft,
          });
        }
      }
      setSegs(tmpSegs);
    }
  }, [ref.current?.children]);

  useLayoutEffect(() => {
    const i = findIdx(segs, value);
    setIdx(i);
  }, [value, segs]);

  useLayoutEffect(() => {
    for (const seg of segs) {
      if (segs.indexOf(seg) === idx) {
        if (variant === 'light') {
          seg.target.style.color = '#333';
        } else {
          seg.target.style.color = '#fff';
        }
      } else {
        seg.target.style.color = '#333';
      }
    }
  }, [idx, value, ref.current?.children, segs]);

  const className = classnames([
    cls.track,
    themes[variant + 'BackgroundColor'],
  ]);

  return (
    <DataInputWrapper
      error={error}
      label={label}
      required={required}
      labelPlacement={labelPlacement}>
      <div className={cls.segment} onClick={handleClick}>
        <span
          className={className}
          style={{
            left: segs[idx]?.toLeft,
            width: segs[idx]?.width,
            height: segs[idx]?.height,
          }}></span>
        <div ref={ref} className={cls.itemsContainer}>
          {children}
        </div>
      </div>
    </DataInputWrapper>
  );
}

function SegmentItem({ value, label }: SegmentItemProps) {
  return (
    <div className={cls.segmentItem} data-value={value} data-label={label}>
      {label || value}
    </div>
  );
}

Segment.Item = SegmentItem;

export { SegmentItem, Segment, type SegmentProps };
