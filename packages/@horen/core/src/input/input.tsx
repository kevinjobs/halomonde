import React, { InputHTMLAttributes } from 'react';

import { classnames } from '../_utils';

import style from './Input.module.less';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?(
    value: string | number,
    evt?: React.ChangeEvent<HTMLInputElement>,
  ): void;
  label?: string;
  labelPlacement?: 'left' | 'top';
  error?: string;
  required?: boolean;
}

export function Input(props: InputProps) {
  const {
    className = '',
    onChange,
    label,
    labelPlacement = 'left',
    error,
    required = false,
    ...restProps
  } = props;

  const cls = classnames({
    [style.horenInput]: true,
    [style.leftMode]: labelPlacement === 'left',
    [className]: true,
  });

  const inputCls = classnames({
    [style.inputArea]: true,
    [style.inputAreaError]: Boolean(error),
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(evt.target.value, evt);
  };

  return (
    <span className={cls}>
      <span className={style.labelWrapper}>
        <label className={style.label}>
          {label}
          {required && <span className={style.requiredStar}>*</span>}
        </label>
      </span>
      <span className={style.inputAreaWrapper}>
        <input onChange={handleChange} {...restProps} className={inputCls} />
        <div className={style.errorText}>
          <span>{error}</span>
        </div>
      </span>
    </span>
  );
}
