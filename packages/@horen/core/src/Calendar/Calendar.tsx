import React, { useMemo, useState } from 'react';
import { Icon } from '../icon';
import { isSameDay } from '@horen/utils';

import cls from './Calendar.module.less';
import { classnames } from '../_utils';

export function Calendar() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(12);
  const [selected, setSelected] = useState<Date>();

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

  return (
    <div className={cls.calendar}>
      <div className={cls.calendarTop}>
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
      </div>
      <div className={cls.calendarMain}>
        <CalendarDate
          year={year}
          month={month}
          onSelected={setSelected}
          selected={selected}
        />
      </div>
    </div>
  );
}

export interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
}

export function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const months = [
    'Janunary',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const cnMonths = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  const handlePrev = () => {
    if (onPrev) onPrev();
  };

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleToday = () => {
    if (onToday) onToday();
  };

  return (
    <div className={cls.header}>
      <div className={cls.headerLeft}>
        <span>{months[month - 1]}</span>
        <span>{year}</span>
      </div>
      <div className={cls.headerCenter}>
        <span onClick={handleToday}>今</span>
      </div>
      <div className={cls.headerRight}>
        <span onClick={handlePrev}>
          <Icon name="up" />
        </span>
        <span onClick={handleNext}>
          <Icon name="down" />
        </span>
      </div>
    </div>
  );
}

export interface CalendarDateProps {
  year: number;
  month: number;
  selected?: Date;
  onSelected?: (date: Date) => void;
}

export function CalendarDate({
  year,
  month,
  selected,
  onSelected,
}: CalendarDateProps) {
  const date = useMemo(() => {
    return new Date(year, month - 1, 1);
  }, [year, month]);

  const weekday = date.getDay() === 0 ? 7 : date.getDay();
  const thisMonthDays = getMonthDays(year, month);

  const lastYear = month === 1 ? year - 1 : year;
  const lastMonth = month === 1 ? 12 : month - 1;

  const lastMonthDays = getMonthDays(lastYear, lastMonth);

  const counts = weekday - 1 + thisMonthDays;

  const daysArr = [];
  const finalArr = [];

  for (let i = 1; i <= counts; i++) {
    let t;
    if (i < weekday) {
      t = {
        month: 'last',
        day: lastMonthDays - weekday + i + 1,
        date: new Date(
          month === 1 ? year - 1 : year,
          month === 1 ? 11 : month - 2,
          lastMonthDays - weekday + i + 1,
        ),
      };
    } else {
      t = {
        month: 'this',
        day: i - weekday + 1,
        date: new Date(year, month - 1, i - weekday + 1),
      };
    }
    daysArr.push(t);
  }

  const week1 = daysArr.slice(0, 7);
  const week2 = daysArr.slice(7, 14);
  const week3 = daysArr.slice(14, 21);
  const week4 = daysArr.slice(21, 28);
  const week5 = daysArr.slice(28, 35);
  const week6 = daysArr.slice(35, 42);

  if (week5.length < 7) {
    const len = week5.length;
    for (let i = 0; i < 7 - len; i++) {
      week5.push({
        month: 'next',
        day: i + 1,
        date: new Date(
          month === 12 ? year + 1 : year,
          month === 12 ? 0 : month,
          i + 1,
        ),
      });
    }
  }

  if (counts > 35) {
    const len = week6.length;
    if (week6.length < 7) {
      for (let j = 0; j < 7 - len; j++) {
        week6.push({
          month: 'next',
          day: j + 1,
          date: new Date(
            month === 12 ? year + 1 : year,
            month === 12 ? 0 : month,
            j + 1,
          ),
        });
      }
    }
  }

  finalArr.push(week1, week2, week3, week4, week5, week6);

  const dayCls = (cls1: string, d: Date) =>
    classnames({
      [cls[cls1]]: true,
      [cls.today]: isSameDay(d, new Date()),
      [cls.selectedDay]: selected ? isSameDay(d, selected) : false,
    });

  const handleSelected = (e: React.MouseEvent<HTMLSpanElement>, date: Date) => {
    if (onSelected) onSelected(date);
  };

  return (
    <div className={cls.date}>
      <table>
        <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
        <tbody>
          {finalArr.map((week) => {
            return (
              <tr key={week[0]?.day || 'empty'}>
                {week.map((d) => {
                  return (
                    <td
                      key={d.date.toDateString()}
                      className={dayCls(d.month, d.date)}
                      data-day={d.date.toDateString()}>
                      <span onClick={(e) => handleSelected(e, d.date)}>
                        <span>{d.day}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const getMonthDays = (year: number, month: number) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    days[1] = 29;
  }
  return days[month - 1];
};
