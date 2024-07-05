import React, { InputHTMLAttributes } from 'react';
import { DataInputWrapper, DataInputWrapperProps } from '../_common';

import cls from './Input.module.less';

export type InputProps = {
  onChange?(
    value: string | number,
    evt?: React.ChangeEvent<HTMLInputElement>,
  ): void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  DataInputWrapperProps;

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(evt.target.value, evt);
  };

  return (
    <DataInputWrapper
      error={error}
      label={label}
      labelPlacement={labelPlacement}
      required={required}>
      <input onChange={handleChange} {...restProps} className={cls.input} />
    </DataInputWrapper>
  );
}
