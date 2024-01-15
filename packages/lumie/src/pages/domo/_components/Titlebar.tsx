import React from 'react';

import style from './Titlebar.module.less';

export type TitlebarProps = {
  /** 后台 logo */
  logo?: React.ReactNode;
  /** 可以为后台命名 */
  title?: React.ReactNode;
  /** 通过 children 添加自定义的模块 */
  children?: React.ReactNode;
}

export default function Titlebar(props: TitlebarProps) {
  const {
    logo,
    title="Domo HOSTILE",
    children
  } = props;

  return (
    <div className={style.titlebar}>
      <div className={style.logoArea}>
        {logo && <div className={style.logo}>{logo}</div>}
        {title && <div className={style.title}>{title}</div>}
      </div>
      {children && <div className={style.children}>{children}</div>}
    </div>
  )
}