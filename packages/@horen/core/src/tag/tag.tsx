import React, { AllHTMLAttributes } from 'react';
import { BaseVariant } from '../_types';
import { classnames } from '../_utils';

import styl from './Tag.module.less';

export type TagVariant = 'dark' | 'light' | BaseVariant;

export interface TagProps extends AllHTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  fill?: string;
  children?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
}

export function Tag({
  variant = 'primary',
  fill,
  children,
  style,
  className = '',
  ...restProps
}: TagProps) {
  const cls = classnames({
    [styl.tag]: true,
    [className]: Boolean(className),
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
