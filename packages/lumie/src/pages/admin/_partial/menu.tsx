import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu } from '@/components/menu';
import COLOR_MAP from '@/styles/colors';

import { BlocksAndArrows, CollectPicture, Config, MindmapList, User, HomeTwo } from '@icon-park/react';

const LM = styled.div`
  margin-top: 10px;
  height: calc(100vh - 70px);
  width: 250px;
  min-width: 250px;
  background-color: ${COLOR_MAP.white};
  a.active {
    color: ${COLOR_MAP.blue};
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  a {
    color: ${COLOR_MAP.dark};
    text-decoration: none;
  }
  .icon {
    margin-right: 8px;
    position: relative;
    top: 1px;
  }
`;

export default function LeftMenu() {
  return (
    <LM className="admin-navigator">
      <Menu mode="inline">
        <Menu.Item>
          <Item>
            <div className='link'>
              <NavLink to={'/admin/home'}>后台首页</NavLink>
            </div>
          </Item>
        </Menu.Item>
        <Menu.SubMenu
          title="内容管理"
          isOpen
          icon={<BlocksAndArrows theme="outline" size="20" fill="#333" strokeWidth={2}/>}
        >
          <Menu.SubMenuItem>
            <Item>
              <div className='icon'>
                <MindmapList theme="outline" size="16" fill="#4a4a4a"/>
              </div>
              <div className='link'>
                <NavLink to='/admin/post'>所有内容</NavLink>
              </div>
            </Item>
          </Menu.SubMenuItem>
          <Menu.SubMenuItem>
            <Item>
              <div className='icon'>
                <CollectPicture theme="outline" size="16" fill="#4a4a4a"/>
              </div>
              <div className='link'>
                <NavLink to='/admin/cover'>画册封面</NavLink>
              </div>
            </Item>
          </Menu.SubMenuItem>
        </Menu.SubMenu>
        <Menu.SubMenu
          title="系统管理"
          isOpen
          icon={<Config theme="outline" size="20" fill="#333" strokeWidth={2}/>}
        >
          <Menu.SubMenuItem>
            <Item>
              <div className='icon'>
                <User theme="outline" size="16" fill="#4a4a4a"/>
              </div>
              <div className='link'>
                <NavLink to='/admin/user'>用户</NavLink>
              </div>
            </Item>
          </Menu.SubMenuItem>
        </Menu.SubMenu>
      </Menu>
    </LM>
  );
}