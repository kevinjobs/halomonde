import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '@/components/menu';
import css from './Menu.module.less';

export interface LeftMenuItem {
  title: string;
  icon?: React.ReactNode;
  expand?: boolean;
  items?: LeftSubMenuItem[];
  children: ReactNode;
  arrow?: boolean;
  to?: string;
}

export type LeftSubMenuItem = Omit<LeftMenuItem, 'children'>;

export default function LeftMenu({items}: {items: LeftSubMenuItem[]}) {
  const MenuGroup = ({children, ...rest}: LeftMenuItem) => (
    <Menu.Group {...rest}>
      {children}
    </Menu.Group>
  )

  const MenuItem = ({icon, to, title}: LeftSubMenuItem) => (
    <Menu.Item icon={icon}>
      <div className={css.leftMenuItem}>
        <NavLink to={to}>{title}</NavLink>
      </div>
    </Menu.Item>
  )

  const render = (items: Omit<LeftMenuItem, 'children'>[]) =>
    items?.map(item => {
      if (item.to) {
        return (
          <MenuItem key={item.to} {...item} />
        )
      } else {
        return (
          <MenuGroup {...item} key={item.title}>
            {item.items?.map(i => (
              <MenuItem {...i} key={i.title}/>
            ))}
          </MenuGroup>
        )
      }
    })

  return (
    <div className={css.leftMenu}>
      <Menu>
        {render(items)}
      </Menu>
    </div>
  );
}