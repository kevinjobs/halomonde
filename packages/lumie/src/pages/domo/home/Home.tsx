import React, { useState } from 'react';

import { useUnmount } from '@horen/hooks';
import { DatePicker } from '@/components/DatePicker';

import style from './Home.module.less';

export default function Home() {
  const [date, setDate] = useState(new Date());

  useUnmount(() => {
    console.log('unmount');
  });

  return (
    <div className={style.home}>
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
}
