import React, { AllHTMLAttributes } from 'react';
import { BaseVariant, BaseSize } from '../_types';
import { classnames } from '../_utils';

import styl from './Tag.module.less';

export type TagVariant = 'dark' | 'light' | BaseVariant;

export interface TagProps
  extends Omit<AllHTMLAttributes<HTMLSpanElement>, 'size'> {
  variant?: TagVariant;
  fill?: string;
  children?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
  size?: BaseSize;
}

export function Tag({
  variant = 'primary',
  fill,
  children,
  style,
  className = '',
  size = 'sm',
  ...restProps
}: TagProps) {
  const cls = classnames({
    [styl.tag]: true,
    [className]: Boolean(className),
    [styl[size]]: true,
  });

  return (
    <span
      className={cls}
      style={{ ...style, backgroundColor: fill }}
      {...restProps}>
      {children}
    </span>
  );
}
