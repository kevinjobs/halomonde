import React from 'react';
import style from './Table.module.less';

export default function Tr(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={style.tr} {...props} />;
}
