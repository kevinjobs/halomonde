import React from 'react';
import style from './Table.module.less';

export default function Td(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={style.td} {...props} />;
}
