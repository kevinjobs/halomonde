import React from 'react';
import { strftime } from '@horen/utils';
import { Popover } from '../Popover';
import { Calendar } from '../Calendar';
import cls from './DatePicker.module.less';

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange } = props;
  const [open, setOpen] = React.useState(false);

  return (
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
  );
}
