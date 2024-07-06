import React, { AllHTMLAttributes } from 'react';
import { DataInputProps, OnChangeCallback } from '../_types';
import { classnames } from '../_utils';
import _cls from './Switch.module.less';

import { useToggle } from '@horen/hooks';

export type SwitchProps = {
  onChange: OnChangeCallback<React.MouseEvent<HTMLSpanElement>, boolean>;
  size?: 'sm' | 'md' | 'lg';
} & DataInputProps<boolean> &
  Omit<AllHTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue' | 'size'>;

export function Switch({
  onChange,
  name,
  value,
  variant = 'primary',
  disabled = false,
  defaultValue = false,
  size = 'md',
  ...restProps
}: SwitchProps) {
  const [on, toggle] = useToggle([defaultValue, !defaultValue]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onChange) onChange(e, !on);
    toggle();
  };

  React.useEffect(() => {
    if (typeof value !== 'undefined') toggle(value);
  }, [value]);

  const cls = classnames({
    [_cls.switch]: true,
    [_cls.size]: true,
    [_cls.on]: on,
    [_cls.off]: !on,
  });

  return (
    <span
      className={cls}
      onClick={handleClick}
      data-name={name}
      data-value={value}
      {...restProps}>
      <span data-name={name} />
    </span>
  );
}
