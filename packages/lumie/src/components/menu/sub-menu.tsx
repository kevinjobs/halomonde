import React from 'react';
import styled from 'styled-components';
import { Up, Down } from '@icon-park/react';
import COLOR_MAP from '@/styles/colors';
import { useSpring, animated } from 'react-spring';
import { ITEM_HEIGHT, ITEM_LEFT_PADDING, SUB_MENU_ITEM_PADDING } from './constant';

export type SubMenuProps = {
  children: React.ReactNode,
  title: string,
  isOpen?: boolean,
  icon?: React.ReactNode
}

const SubMenuStyled = styled.div`
  user-select: none;
  .title {
    padding: 16px ${ITEM_LEFT_PADDING}px;
    display: flex;
    align-items: center;
  }
  .items {
    background-color: ${COLOR_MAP.white2};
  }
`;

const SMI = styled.div`
  display: flex;
  align-items: center;
  height: ${ITEM_HEIGHT}px;
  padding: ${SUB_MENU_ITEM_PADDING}px 0;
  padding-left: ${ITEM_LEFT_PADDING + 4}px;
  &:hover {
    background-color: ${COLOR_MAP.white4};
  }
`;

export function SubMenu (props: SubMenuProps) {
  const { children, title, icon, isOpen = false } = props;

  const [isItemsVisible, setIsItemsVisible] = React.useState(isOpen);
  const [amount, setAmount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>();

  // react spring
  const { x } = useSpring({
    from: { x: 0, p: 0 },
    x: isItemsVisible ? ITEM_HEIGHT * amount + SUB_MENU_ITEM_PADDING * 2 * amount : 0,
  });

  const handleClick = () => {
    setIsItemsVisible(!isItemsVisible);
  };

  React.useEffect(() => {
    if (ref.current) {
      const nodes = ref.current.querySelectorAll('#submenu-item');
      setAmount(nodes.length);
    }
  }, [ref.current]);

  return (
    <SubMenuStyled>
      <div className="title" role="button" onClick={handleClick}>
        { icon }
        <span style={{marginLeft: 8}}>{ title }</span>
        {
          isItemsVisible
            ? <Up theme="outline" size="16" fill="#333" strokeWidth={2}/>
            : <Down theme="outline" size="16" fill="#333" strokeWidth={2}/>
        }
      </div>
      <animated.div
        ref={ref}
        className="items"
        style={{
          height: x,
          overflow: 'hidden',
        }}
      >
        { children }
      </animated.div>
    </SubMenuStyled>
  );
}

export const SubMenuItem = ({children}: {children: React.ReactNode}) => {
  return (
    <SMI id='submenu-item'>{ children }</SMI>
  )
}