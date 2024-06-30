import React, { ButtonHTMLAttributes } from 'react';

import { BaseSize } from '../_types';
import { classnames } from '../_utils';

import _css from './Button.module.less';

export type ButtonProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'dark'
    | 'light'
    | 'line';
  size?: BaseSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    type = 'button',
    size = 'md',
    children,
    ...restProps
  } = props;

  const cls = classnames({
    [_css[variant]]: true,
    [_css[size]]: true,
  });

  return (
    <button className={cls} type={type} {...restProps}>
      {children}
    </button>
  );
}
