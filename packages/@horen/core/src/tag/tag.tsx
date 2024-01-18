import React, { AllHTMLAttributes } from 'react';
import { BaseVariant } from '../_types';
import { classnames } from '../_utils';

import cls from './Tag.module.less';
import themes from '../themes.module.less';

export type TagVariant = BaseVariant;

export interface TagProps extends AllHTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  color?: string;
  children?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
}

export function Tag({
  variant = 'primary',
  color,
  children,
  rounded = false,
  style: styles,
  ...restProps
}: TagProps) {
  const className = classnames([cls.tag, themes[variant + 'BackgroundColor']]);

  const style: React.CSSProperties = {
    borderRadius: rounded ? 3 : 0,
    backgroundColor: color,
    ...styles,
  };

  return (
    <span className={className} {...restProps} style={style}>
      {children}
    </span>
  );
}
