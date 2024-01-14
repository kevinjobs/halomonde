import React, { useEffect, useRef, useState } from "react";
import style from './Menu.module.less';
import { Icon } from "@horen/core";

type MenuProps = {
  children?: React.ReactNode;
}

type MenuGroupProps = {
  title: React.ReactNode;
  expand?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

type MenuItemProps = {
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const SIZE = 32;
const PADDING = 8;

function Menu(props: MenuProps) {
  const { children } = props;

  return (
    <div className={style.menu}>
      { children }
    </div>
  )
}

function MenuGroup(props: MenuGroupProps) {
  const {
    title,
    icon=<Icon name="dimension" />,
    expand=false,
    children,
  } = props;

  const size = SIZE + PADDING;

  const ref = useRef<HTMLDivElement>(null);
  const height = useRef<number>(0);

  const [h, setH] = useState(size);
  const [r, setR] = useState(expand ? -45 : 45);

  useEffect(() => {
    if (ref.current) {
      let heights = 0;
      const childs = ref.current.children;
      for (const child of childs) {
        heights += child.getBoundingClientRect().height;
      }
      height.current = heights;
    }
  }, [ref]);

  useEffect(() => {
    if (expand) setH(height.current);
    else setH(size);
  }, [expand]);

  return (
    <div
      className={style.menuGroup}
      ref={ref}
      style={{height: h}}
    >
      <div
        className={style.groupHeader}
        onClick={() => {
          if (h === size) setH(height.current);
          else setH(size);
          if (r === 45) {
            setR(-45);
          } else {
            setR(45);
          }
        }}
      >
        <div className={style.groupIcon}>{ icon }</div>
        <div className={style.groupTitle}>{ title }</div>
        <div className={style.groupArrow}>
          <span className={style.groupArrow1} style={{transform: `rotate(${r}deg)`}}></span>
          <span className={style.groupArrow2} style={{transform: `rotate(${-r}deg)`}}></span>
        </div>
      </div>
      { children }
    </div>
  )
}

function MenuItem(props: MenuItemProps) {
  const {
    icon=<Icon name='dimension' />,
    children,
    onClick,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
  }

  return (
    <div className={style.menuItem} onClick={handleClick}>
      <div className={style.menuItemIcon}>{ icon }</div>
      <div className={style.menuItemContent}>{ children }</div>
    </div>
  )
}

Menu.Item = MenuItem;
Menu.Group = MenuGroup;

export { Menu, MenuProps, MenuGroupProps, MenuItemProps};
