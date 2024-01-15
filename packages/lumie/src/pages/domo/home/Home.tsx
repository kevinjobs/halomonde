import React from 'react';

import { useUnmount } from '@horen/hooks';

import style from './Home.module.less';

export default function Home() {
  useUnmount(() => {
    console.log('unmount');
  });

  return <div className={style.home}>home</div>;
}
