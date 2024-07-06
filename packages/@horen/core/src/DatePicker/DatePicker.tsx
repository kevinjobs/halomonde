import React, { useRef, useState } from 'react';
import { strftime } from '@horen/utils';
import { Popover } from '../Popover';
import { Calendar } from '../Calendar';
import { DataInputWrapper, DataInputWrapperProps } from '../_common';
import cls from './DatePicker.module.less';
import { Icon } from '../icon';

export interface DatePickerProps extends DataInputWrapperProps {
  value?: Date;
  onChange: (date: Date) => void;
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
  const [innerValue, setInnerValue] = useState<Date | null>(value);

  const ref = useRef<HTMLSpanElement>(null);
  const innerValueRef = useRef<Date | null>(value);

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (ref.current && ref.current.contains(e.target as HTMLSpanElement)) {
      setInnerValue(null);
    } else {
      setOpen(!open);
    }
  };

  React.useEffect(() => {
    if (value !== innerValueRef.current) {
      innerValueRef.current = value;
      setInnerValue(value!);
    }
  }, [value]);

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
              <span>{innerValue && strftime(innerValue, 'yyyy-MM-dd')}</span>
              <span className={cls.close} ref={ref}>
                <Icon name="close" />
              </span>
            </div>
          </div>
        </Popover.Target>
        <Popover.Content>
          <div className={cls.content}>
            <Calendar value={innerValue} onChange={onChange} />
          </div>
        </Popover.Content>
      </Popover>
    </DataInputWrapper>
  );
}
