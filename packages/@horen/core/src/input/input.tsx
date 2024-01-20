import React, { InputHTMLAttributes } from 'react';

import style from './Input.module.less';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?(
    e: React.ChangeEvent<HTMLInputElement>,
    value?: string | number,
  ): void;
}

export function Input(props: InputProps) {
  const { className, onChange, ...restProps } = props;

  const cls = style.horenInput + ' ' + className;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e, e.target.value);
  };

  return <input className={cls} onChange={handleChange} {...restProps} />;
}
