import React, { useRef, useState } from 'react';
import { strftime } from '@horen/utils';
import { useInputState } from '@horen/hooks';

import { Popover } from '../Popover';
import { Calendar } from '../Calendar';
import { DataInputWrapper, DataInputWrapperProps } from '../_common';
import cls from './DatePicker.module.less';
import { Icon } from '../icon';

export interface DatePickerProps extends DataInputWrapperProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePicker(props: DatePickerProps) {
  const {
    value = null,
    onChange,
    label,
    labelPlacement,
    required,
    error,
  } = props;

  const [open, setOpen] = React.useState(false);

  const [_value, setValue] = useInputState({ value, onChange });

  const ref = useRef<HTMLSpanElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (ref.current && ref.current.contains(e.target as HTMLSpanElement)) {
      setValue(null);
    } else {
      setOpen(!open);
    }
  };

  return (
    <DataInputWrapper
      label={label}
      labelPlacement={labelPlacement}
      required={required}
      error={error}>
      <Popover
        open={open}
        onClickOutside={() => setOpen(false)}
        onClickContent={() => setOpen(true)}
        onClickTarget={handleClose}>
        <Popover.Target>
          <div className={cls.target}>
            <div>
              <span>{_value && strftime(_value, 'yyyy-MM-dd')}</span>
              <span className={cls.close} ref={ref}>
                <Icon name="close" />
              </span>
            </div>
          </div>
        </Popover.Target>
        <Popover.Content>
          <div className={cls.content}>
            <Calendar value={_value} onChange={onChange} />
          </div>
        </Popover.Content>
      </Popover>
    </DataInputWrapper>
  );
}
