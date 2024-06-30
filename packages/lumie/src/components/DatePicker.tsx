import React from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cls from './DatePicker.module.less';

export interface DatePickerProps {
  label?: string;
  value: Date;
  onChange?: (value: Date) => void;
  dateFormat?: string;
}

export function DatePicker({
  value,
  label = '日期选择',
  onChange,
  dateFormat = 'yyyy-MM-dd',
}: DatePickerProps) {
  const handleChange = (value: Date) => {
    onChange?.(value);
  };

  return (
    <div className={cls.datepicker}>
      <span>
        <label>{label}</label>
      </span>
      <span>
        <Datepicker
          selected={value}
          onChange={handleChange}
          dateFormat={dateFormat}
        />
      </span>
    </div>
  );
}
