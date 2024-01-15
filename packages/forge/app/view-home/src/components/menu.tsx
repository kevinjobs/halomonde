import React from "react";
import { useNavigate } from "react-router-dom";
import './menu.less';

export type MenuProps = {
  children: React.ReactNode;
}

export type MenuItemProps = {
  title: string;
  key: string | number;
  icon?: React.ReactNode;
  onClick?(): void;
  onHover?(): void;
  to?: string;
}

function Menu({children}: MenuProps) {
  return (
    <div className="menu">{children}</div>
  )
}

function Item({title, key, icon, onClick, onHover, to}: MenuItemProps) {
  const nav = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (to) {
        nav(to);
        document.title = title;
      }
    }    
  }

  const handleMouseEnter = () => {
    // do something when mouse enter
  }

  const handleMouseMove = () => {
    if (onHover) onHover();
  }

  const handleMouseLeave = () => {
    // do something when mouse leave
  }

  return(
    <div
      className="menu-item"
      key={key}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {title}
    </div>
  )
}

Menu.Item = Item;

export default Menu;
