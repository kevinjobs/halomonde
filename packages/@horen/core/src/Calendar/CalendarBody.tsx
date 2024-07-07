import React, { useMemo } from 'react';

import { isSameDay, strftime } from '@horen/utils';

import { classnames } from '../_utils';
import cls from './Calendar.module.less';

export interface CalendarBodyProps {
  year: number;
  month: number;
  selected?: Date | null;
  onSelected?: (date: Date) => void;
}

export function CalendarBody(props: CalendarBodyProps) {
  const { year, month, selected = null, onSelected } = props;

  const finalArr = useMemo(() => genWeeksArr(year, month), [year, month]);

  const dayCls = (cls1: string, d: Date) =>
    classnames({
      [cls[cls1]]: true,
      [cls.today]: isSameDay(d, new Date()),
      [cls.selectedDay]: selected ? isSameDay(d, selected) : false,
    });

  const handleSelected = (date: Date, e: React.MouseEvent<HTMLSpanElement>) => {
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
          {finalArr.map((week, i) => {
            const key = `${week[0]?.date.valueOf()}-${i}`;
            return (
              <tr key={key} data-key={key}>
                {week.map((d, j) => {
                  const key = `${d.date.valueOf()}-${i}-${j}`;
                  return (
                    <td
                      key={key}
                      className={dayCls(d.month, d.date)}
                      data-day={key}>
                      <span onClick={(e) => handleSelected(d.date, e)}>
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

/**
 * 根据给定的年月，生成日期数组
 * @param year year
 * @param month 自然月，1~12
 * @returns 日期数组，包含本月、上月、下月
 */
function genWeeksArr(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

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

  return finalArr;
}
