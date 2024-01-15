import React, { ButtonHTMLAttributes, } from 'react';

import { Icon, } from '../icon';
import style from './AddButton.module.less';

export function AddButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...restProps } = props;
  return (
    <button {...restProps} className={style.addButton}>
      <div className={style.container}>
        <span className={style.icon}><Icon name="add" fill="#f1f1f1" /></span>
        {children && <span className={style.text}>{children}</span>}
      </div>
    </button>
  )
}
