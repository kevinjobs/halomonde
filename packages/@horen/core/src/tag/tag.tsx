import React, { AllHTMLAttributes } from 'react';
import { BaseVariant } from '../_types';
import { classnames } from '../_utils';

import cls from './Tag.module.less';

export type TagVariant = BaseVariant;

export interface TagProps extends React.AllHTMLAttributes<HTMLSpanElement> {
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
  const variants: Record<TagVariant, string> = {
    primary: cls.primary,
    secondary: cls.secondary,
    success: cls.success,
    warning: cls.warning,
    danger: cls.danger,
    info: cls.info,
  };
  const className = classnames([cls.tag, variants[variant]]);

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
