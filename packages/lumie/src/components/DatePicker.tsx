import React from 'react';
import Datepicker from 'react-datepicker';

import { stampToDate, dateToStamp } from '@/utils/datetime';

import 'react-datepicker/dist/react-datepicker.css';
import cls from './DatePicker.module.less';

export interface DatePickerProps {
  label?: string;
  value: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (stamp: number, evt: React.SyntheticEvent<any, Event>) => void;
  dateFormat?: string;
}

export function DatePicker({
  value,
  label,
  onChange,
  dateFormat = 'yyyy-MM-dd',
}: DatePickerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value: Date, evt: React.SyntheticEvent<any, Event>) => {
    if (onChange) onChange(dateToStamp(value), evt);
  };

  return (
    <div className={cls.datepicker}>
      {label && (
        <span>
          <label>{label}</label>
        </span>
      )}
      <span>
        <Datepicker
          selected={stampToDate(value)}
          onChange={handleChange}
          dateFormat={dateFormat}
        />
      </span>
    </div>
  );
}
