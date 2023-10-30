import React from 'react';
import styled from 'styled-components';
import Inline from './inline';
import Item from './menu-item';
import { SubMenu, SubMenuItem } from './sub-menu';

type MenuProps = {
  mode: 'horizontal' | 'inline',
  children: React.ReactNode
}

const MenuStyled = styled.div``;

function Menu (props: MenuProps) :React.ReactElement {
  const { mode, ...restProps } = props;

  return mode === 'inline' ? <Inline {...restProps} /> : <MenuStyled />;
}

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.SubMenuItem = SubMenuItem;

export {
  Menu,
  MenuProps,
}
