import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';
import {
  SUB_MENU_PADDING,
  ITEM_HEIGHT,
  ITEM_LEFT_PADDING,
  ITEM_FONT_SIZE
} from './constant';

export type MenuItemProps = {
  children: React.ReactNode,
  icon?: React.ReactNode,
}

const basicPadding = (ITEM_HEIGHT - ITEM_FONT_SIZE)/2;

const ItemStyled = styled.div`
  padding: ${basicPadding}px 0px ${basicPadding}px ${ITEM_LEFT_PADDING}px;;
  font-size: ${ITEM_FONT_SIZE};
  display: flex;
  align-items: center;
  &:hover {
    color: ${COLOR_MAP.blue}
  }
  &:nth-child(1) {
    padding-top: ${basicPadding + SUB_MENU_PADDING}px;
  }
  &:last-child {
    padding-bottom: ${basicPadding + SUB_MENU_PADDING}px;
  }
`;

function Item (props: MenuItemProps) :React.ReactElement {
  const { children, icon } = props;

  return (
    <ItemStyled className="menu-item">
      { icon }
      <span style={{marginLeft: 8}}>{ children }</span>
    </ItemStyled>
  );
}


export default Item;