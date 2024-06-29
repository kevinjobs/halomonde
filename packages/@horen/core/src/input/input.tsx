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
      {label && labelPlacement === 'left' && (
        <>
          {required && <span className={style.requiredLeft}>*</span>}
          <label className={style.leftLabel}>{label}</label>
        </>
      )}
      <span className={style.inputAreaWrapper}>
        {label && labelPlacement === 'top' && (
          <>
            {required && <span className={style.requiredTop}>*</span>}
            <label className={style.topLabel}>{label}</label>
          </>
        )}
        <input onChange={handleChange} {...restProps} className={inputCls} />
        <div className={style.errorText}>
          <span>{error}</span>
        </div>
      </span>
    </span>
  );
}
