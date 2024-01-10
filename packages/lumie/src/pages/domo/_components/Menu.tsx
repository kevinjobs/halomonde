import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from '@/components/menu';
import css from './Menu.module.less';

export interface SubMenuProps {
  title: string;
  icon?: React.ReactNode;
  isOpen?: boolean;
  items?: SubMenuItemProps[];
  children: ReactNode;
  arrow?: boolean;
  to?: string;
}

export type SubMenuItemProps = Omit<SubMenuProps, 'children'>;

export default function LeftMenu({items}: {items: Omit<SubMenuProps, 'children'>[]}) {
  const SubMenu = ({children, ...rest}: SubMenuProps) => (
    <Menu.SubMenu {...rest}>
      {children}
    </Menu.SubMenu>
  )

  const SubMenuItem = ({icon, to, title}: SubMenuItemProps) => (
    <Menu.SubMenuItem>
      <div className={css.item}>
        <div className={css.icon}>{icon}</div>
        <div className={css.link}>
          <NavLink to={to}>{title}</NavLink>
        </div>
      </div>
    </Menu.SubMenuItem>
  )

  const render = (items: Omit<SubMenuProps, 'children'>[]) =>
    items?.map(item => {
      return (
        <SubMenu {...item} key={item.title}>
          {item.items?.map(i => (
            <SubMenuItem {...i} key={i.title}/>
          ))}
        </SubMenu>
      )
    })

  return (
    <div className={css.menu}>
      <Menu mode="inline">
        {render(items)}
      </Menu>
    </div>
  );
}