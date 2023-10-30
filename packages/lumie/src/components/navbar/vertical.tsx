import React from 'react';
import styled from 'styled-components';
import { PullDoor, Close } from '@icon-park/react';
import { NavLink, useLocation } from 'react-router-dom';
import COLOR_MAP from '@/styles/colors';

const Right = styled.div`
  transition: all .3s ease-in-out;
  position: fixed;
  top: 0;
  height: 100vh;
  padding: 16px 0;
  z-index: 999;
`;

const RightMenus = styled.div`
  padding: 40px 0;
  text-align: center;
  .right-navi-menu-item {
    padding: 16px 0;
    transition: all .1s ease-in-out;
    &.actived {
      background-color: #777;
      a { color: #f1f1f1; }
    }
    &:hover {
      background-color: #333;
      a { color: #f1f1f1; }
    }
    a {
      text-decoration: none;
      color: ${COLOR_MAP.white4};
    }
  }
`;

export interface NavbarItem {
  title: string;
  to: string;
  icon?: React.ReactNode;
}

export interface NavbarProps {
  isOpen?: boolean,
  onClick?: React.MouseEventHandler<HTMLElement>,
  menus: NavbarItem[],
}

export function Navbar (props: NavbarProps) {
  const { isOpen=false, onClick , menus } = props;
  const [visible, setVisible] = React.useState(isOpen);

  const rightNaviWidth = 300;
  const rightNavMenuWidth = 44;

  const location = useLocation();

  const classnames = (menu: NavbarItem) => {
    const url = menu.to;

    if (url === location.pathname && visible) {
      return 'right-navi-menu-item actived';
    } else {
      return 'right-navi-menu-item';
    }
  };


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setVisible(!visible);
    if (onClick) onClick(e);
  };

  const NavbarItem = ({title, to}: NavbarItem) => {
    return (
      <div className={classnames({title, to})} onClick={handleClick}>
        <NavLink to={to}>{title}</NavLink>
      </div>
    )
  }

  React.useEffect(() => {
    const handleScroll = (e: Event) => {
      visible && e.preventDefault();
    };

    window.addEventListener('wheel', handleScroll, {passive: false});

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [visible]);

  return (
    <>
      <Right
        className="page-article-right-navi"
        style={{
          width: rightNaviWidth,
          right:visible ? 0 : rightNavMenuWidth - rightNaviWidth,
          backgroundColor: visible ? COLOR_MAP.dark : 'transparent',
        }}
      >
        <div style={{
          marginLeft:visible ? 16 : 0,
          transition:'all .5s ease-in-out',
          cursor:'pointer',
        }}>
          {
            visible
              ?
              <Close
                theme="outline"
                size="28"
                fill="#555555"
                strokeWidth={2}
                onClick={handleClick}
              />
              :
              <PullDoor
                theme="outline"
                size="28"
                fill="#d1d1d1"
                strokeWidth={2}
                onClick={handleClick}
              />
          }
        </div>
        <RightMenus style={{visibility: visible ? 'visible' : 'hidden'}}>
          { menus.map(m => <NavbarItem key={m.title} title={m.title} to={m.to} />) }
        </RightMenus>
      </Right>
    </>
  );
}
