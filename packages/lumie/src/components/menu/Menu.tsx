import React from "react";
import style from './Menu.module.less';

export type MenuProps = {
  shrink?: boolean;
  children?: typeof MenuItem;
}

export type MenuItemProps = {
  children?: React.ReactNode;
}

export default function Menu(props: MenuProps) {
  const {
    shrink=false,
    children,
    ...restProps
  } = props;

  return (
    <div className={style.menu}>

    </div>
  )
}

export function MenuItem(props: MenuItemProps) {
  return (
    <div className={style.menuItem}></div>
  )
}