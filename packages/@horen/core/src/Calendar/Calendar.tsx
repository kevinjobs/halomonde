import React, { useState } from 'react';

import { useInputState } from '@horen/hooks';

import cls from './Calendar.module.less';
import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';
import { isSameDay } from '@horen/utils';

export interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function Calendar({ value = null, onChange }: CalendarProps) {
  const [_value, setValue] = useInputState<Date | null>(value);

  const now = new Date();

  const [year, setYear] = useState(
    value ? value.getFullYear() : now.getFullYear(),
  );
  const [month, setMonth] = useState(
    value ? value.getMonth() + 1 : now.getMonth() + 1,
  );

  const handlePrev = () => {
    if (month < 2) {
      setYear(year - 1);
      setMonth(12);
      return;
    }
    setMonth(month - 1);
  };

  const handleNext = () => {
    if (month > 11) {
      setYear(year + 1);
      setMonth(1);
      return;
    }
    setMonth(month + 1);
  };

  const handleToday = () => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  };

  const handleMonth = (month: number) => {
    setMonth(month);
  };

  const handleYear = (year: number) => {
    setYear(year);
  };

  const handleSelected = (date: Date) => {
    setValue(date);
    if (onChange) onChange(date);
  };

  return (
    <div className={cls.calendar}>
      <div className={cls.calendarTop}>
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onMonth={handleMonth}
          onYear={handleYear}
        />
      </div>
      <div className={cls.calendarMain}>
        <CalendarBody
          year={year}
          month={month}
          onSelected={handleSelected}
          selected={_value}
        />
      </div>
    </div>
  );
}
