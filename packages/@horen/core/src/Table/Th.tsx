import React from 'react';
import style from './Table.module.less';

export default function Th(
  props: React.HTMLAttributes<HTMLTableHeaderCellElement>,
) {
  return <th className={style.th} {...props} />;
}
