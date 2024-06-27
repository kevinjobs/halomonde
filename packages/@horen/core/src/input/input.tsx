import React, { InputHTMLAttributes } from 'react';

import style from './Input.module.less';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?(
    value: string | number,
    evt?: React.ChangeEvent<HTMLInputElement>,
  ): void;
  label?: string;
  error?: string;
}

export function Input(props: InputProps) {
  const { className, onChange, label, error, ...restProps } = props;

  const cls = className ? style.horenInput + ' ' + className : style.horenInput;

  const inputCls = error ? style.errorInput : '';

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(evt.target.value, evt);
  };

  return (
    <span className={cls}>
      <span>{label && <label>{label}</label>}</span>
      <span>
        <div>
          <input onChange={handleChange} {...restProps} className={inputCls} />
        </div>
        <div className={style.error}>
          <span>{error}</span>
        </div>
      </span>
    </span>
  );
}
