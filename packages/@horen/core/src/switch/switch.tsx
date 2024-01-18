import React, { AllHTMLAttributes } from 'react';
import { DataInputProps, OnChangeCallback } from '../_types';
import { classnames } from '../_utils';
import cls from './Switch.module.less';
import themes from '../themes.module.less';

import { useToggle } from '@horen/hooks';

export type SwitchProps = {
  onChange: OnChangeCallback<React.MouseEvent<HTMLSpanElement>, boolean>;
} & DataInputProps<boolean> &
  Omit<AllHTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue'>;

export function Switch({
  onChange,
  name,
  value,
  variant = 'primary',
  disabled = false,
  defaultValue = false,
  ...restProps
}: SwitchProps) {
  const [on, toggle] = useToggle([defaultValue, !defaultValue]);
  const switchClassName = classnames([
    cls.switch,
    on ? themes[variant + 'BorderColor'] : themes['infoBorderColor'],
    disabled ? themes['disabledBorderColor'] : '',
  ]);
  const trackClassName = classnames([
    cls.track,
    disabled ? themes['disabledBackgroundColor'] : '',
    on ? themes[variant + 'BackgroundColor'] : themes['infoBackgroundColor'],
  ]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onChange) onChange(e, !on);
    toggle();
  };

  React.useEffect(() => {
    if (typeof value !== 'undefined') toggle(value);
  }, [value]);

  return (
    <span
      className={switchClassName}
      onClick={handleClick}
      data-name={name}
      data-value={value}
      {...restProps}>
      <span
        className={trackClassName}
        data-name={name}
        style={{
          left: on && !disabled ? '50%' : '5%',
        }}
      />
    </span>
  );
}
