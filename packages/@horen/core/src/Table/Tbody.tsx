import React from 'react';
import style from './Table.module.less';

export default function Tbody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody className={style.tbody} {...props} />;
}
