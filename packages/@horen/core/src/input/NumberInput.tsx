import React, { useState } from 'react';
import { Icon } from '../icon';
import { Input, InputProps } from './Input';

import style from './NumberInput.module.less';

export function NumberInput(props: InputProps) {
  const { value, onChange, ...restProps } = props;
  const [data, setData] = useState<number>(Number(value));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to-do: 浮点数精度存在需要修复
    const number = Number(e.target.value.replace(/[^\d\.]/g, ''));
    setData(number);
    if (onChange) {
      onChange(number);
    }
  };

  const handleUp = () => {
    if (onChange) {
      onChange(data + 1);
    }
    setData((prev) => Number(prev) + 1);
  };

  const handleDown = () => {
    if (onChange) {
      onChange(data - 1);
    }
    setData((prev) => Number(prev) - 1);
  };

  return (
    <span className={style.numberInput}>
      <Input value={data} onInput={handleInput} {...restProps} />
      <span className={style.inputArrow}>
        <div onClick={handleUp}>
          <Icon name="up" size={12} />
        </div>
        <div onClick={handleDown}>
          <Icon name="down" size={12} />
        </div>
      </span>
    </span>
  );
}
