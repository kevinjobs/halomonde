import React, { ButtonHTMLAttributes } from 'react';

import _css from './Button.module.less';

export type ButtonProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'dark'
    | 'light'
    | 'line';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, ...restProps } = props;

  return (
    <button className={_css[variant]} {...restProps}>
      {children}
    </button>
  );
}
