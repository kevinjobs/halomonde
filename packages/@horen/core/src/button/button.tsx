import React, { ButtonHTMLAttributes, } from 'react';

import _css from './Button.module.less';

export type ButtonProps = {
  type?: 'primary' | 'success' | 'warning' | 'dark' | 'light' | 'error' | 'line';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export function Button(props: ButtonProps) {
  const { type='primary', children, ...restProps } = props;

  return (
    <button className={_css[type]} {...restProps}>{children}</button>
  )
}
