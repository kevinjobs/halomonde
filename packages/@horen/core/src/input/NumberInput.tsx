import React, { useState } from 'react';
import { Icon } from '../icon';
import { Input, InputProps } from './Input';

import style from './NumberInput.module.less';

export function NumberInput(props: InputProps) {
  const { value, onInput, ...restProps } = props;
  const [data, setData] = useState(value);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to-do: 浮点数精度存在需要修复
    setData(e.target.value.replace(/[^\d\.]/g, ''));
    if (onInput) {
      onInput(e);
    }
  };

  const handleUp = () => {
    setData((prev) => Number(prev) + 1);
  };

  const handleDown = () => {
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
