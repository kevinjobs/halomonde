import React, { useState } from 'react';

import { Icon } from '../icon';
import { Popover } from '../Popover';
import cls from './Calendar.module.less';

export interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  onMonth?: (month: number) => void;
  onYear?: (year: number) => void;
}

export function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  onMonth,
  onYear,
}: CalendarHeaderProps) {
  const [isYearOpened, setIsYearOpened] = useState(false);
  const [isMonthOpened, setIsMonthOpened] = useState(false);

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

  const YEARS = (() => {
    const ys: number[] = [];
    for (const y of yearsGenerator(year)) {
      ys.push(y);
    }
    return ys;
  })();

  const handlePrev = () => {
    if (onPrev) onPrev();
  };

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleToday = () => {
    if (onToday) onToday();
  };

  const handleClick = (month: number) => {
    setIsYearOpened(false);
    if (onMonth) onMonth(month);
  };

  const handleYear = (year: number) => {
    setIsYearOpened(false);
    if (onYear) onYear(year);
  };

  return (
    <div className={cls.header}>
      <div className={cls.headerLeft}>
        <span>
          <Popover
            open={isMonthOpened}
            onClickContent={() => setIsMonthOpened(false)}
            onClickTarget={() => setIsMonthOpened(!isMonthOpened)}
            onClickOutside={() => setIsMonthOpened(false)}>
            <Popover.Target>
              <span className={cls.monthText}>
                <span>{months[month - 1]}</span>
              </span>
            </Popover.Target>
            <Popover.Content>
              <div className={cls.monthList + ' ' + 'perfect-scrollbar'}>
                {months.map((m, index) => (
                  <div
                    key={m}
                    className={cls.monthListItem}
                    onClick={(e) => handleClick(index + 1)}>
                    {m}
                  </div>
                ))}
              </div>
            </Popover.Content>
          </Popover>
        </span>
        <span>
          <Popover
            open={isYearOpened}
            onClickContent={() => setIsYearOpened(false)}
            onClickTarget={() => setIsYearOpened(!isYearOpened)}
            onClickOutside={() => setIsYearOpened(false)}>
            <Popover.Target>
              <span className={cls.yearText}>
                <span>{year}</span>
              </span>
            </Popover.Target>
            <Popover.Content>
              <div className={cls.yearList + ' ' + 'perfect-scrollbar'}>
                {YEARS.map((m) => (
                  <div
                    key={m}
                    className={cls.yearListItem}
                    onClick={(e) => handleYear(m)}>
                    {m}
                  </div>
                ))}
              </div>
            </Popover.Content>
          </Popover>
        </span>
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

function* yearsGenerator(year: number) {
  for (let i = year - 10; i < year + 10; i++) {
    yield i;
  }
}
