import React from 'react';
import style from './Table.module.less';

export default function Thead(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <thead className={style.thead} {...props} />;
}
