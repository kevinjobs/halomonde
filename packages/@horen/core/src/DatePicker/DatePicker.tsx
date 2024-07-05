import React from 'react';
import { strftime } from '@horen/utils';
import { Popover } from '../Popover';
import { Calendar } from '../Calendar';
import { DataInputWrapper, DataInputWrapperProps } from '../_common';
import cls from './DatePicker.module.less';

export interface DatePickerProps extends DataInputWrapperProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange, label, labelPlacement, required, error } = props;
  const [open, setOpen] = React.useState(false);

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
        onClickTarget={() => setOpen(!open)}>
        <Popover.Target>
          <div className={cls.target}>
            <div>
              <span>{strftime(value, 'yyyy-MM-dd')}</span>
            </div>
          </div>
        </Popover.Target>
        <Popover.Content>
          <div className={cls.content}>
            <Calendar value={value} onChange={onChange} />
          </div>
        </Popover.Content>
      </Popover>
    </DataInputWrapper>
  );
}
