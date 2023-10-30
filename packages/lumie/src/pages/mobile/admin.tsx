import React from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import PhotoEdit from './photo';
import COLOR_MAP from '@/styles/colors';
import Photos from './photos';
import Articles from './articles';
import Users from './users';
import { Down } from '@icon-park/react';
import { getLocalStorage } from '../admin';
import { IUser } from '@/types';
import { fetchUser } from '@/apis/user';
import Login from './login';
import Profile from './profile';

const HEIGHT = 58;
const AVATAR_SIZE = 24;

const F = styled.div`
  height: 100vh;
`;

const RouteArea = styled.div`
  padding: 8px 0;
`;

const TitleArea = styled.div`
  height: ${HEIGHT}px;
  background-color: ${COLOR_MAP.dark};
  color: ${COLOR_MAP.white3};
  transition: height .15s ease-in-out;
  position: relative;
  overflow: hidden;
  .avatar {
    position: absolute;
    left: 8px;
    top: ${(HEIGHT - AVATAR_SIZE)/2-8}px;
    width: 40px;
    height: 40px;
    background-color: ${COLOR_MAP.white5};
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
`;

const NavItem = styled.div`
  height: ${HEIGHT}px;
  color: ${COLOR_MAP.white3};
  text-align: center;
  span {
    color: inherit;
    text-decoration: none;
    line-height: ${HEIGHT}px;
    > .icon {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
`;

const ITEMS = [
  {
    title: (
      <>
        <span>后台管理</span>
        <span className='icon'>
          <Down theme="outline" size="16" fill="#fff"/>
        </span>
      </>
    ),
  },
  {
    title: '照片',
    to: 'photos',
  },
  {
    title: '文章',
    to: 'articles',
  },
  {
    title: '用户',
    to: 'users',
  }
]

export function MobileAdmin() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [items, setItems] = React.useState(ITEMS);
  const [navH, setNavH] = React.useState(HEIGHT);
  const [user, setUser] = React.useState<IUser>(null);
  const [isLogin, setIsLogin] = React.useState(false);

  const renderItem = (item: {title: React.ReactNode, to?: string}) => {
    return (
      <NavItem key={item.to || 'dasiasdig'}>
        <span onClick={(e) => {
          if (item.to) navigate(item.to);
          e.stopPropagation();
          if (navH !== HEIGHT ) setNavH(HEIGHT);
          else setNavH(HEIGHT * ITEMS.length + 8);
        }}>{item.title}</span>
      </NavItem>
    )
  }

  const handleClickAvatar = () => {
    if (getLocalStorage().name) {
      navigate(`/mobile/profile/${getLocalStorage().name}`);
    } else {
      navigate('/mobile/login');
    }
  }

  React.useEffect(() => {
    const { token, name } = getLocalStorage();
    if (token && name) {
      setIsLogin(true);
      (async() => {
        const resp = await fetchUser(getLocalStorage().name);
        if (typeof resp !== 'string') setUser(resp.data.users[0]);
      })();
    } else {
      setIsLogin(false);
    }
  }, [isLogin, search.get('time')]);

  React.useEffect(() => navigate('/mobile/photos'), [search.get('time')]);

  return (
    <F className='mobile-admin'>
      <TitleArea
        style={{height: navH}}
        onBlur={() => setNavH(HEIGHT)}
        tabIndex={0}
      >
        <div className='avatar' onClick={handleClickAvatar}>
          { isLogin && <img src={user?.avatar} alt={user?.username} /> }
        </div>
        { items.map(i => renderItem(i)) }
      </TitleArea>
      <RouteArea>
        <Routes>
          <Route path='photo/:uid' element={<PhotoEdit />} />
          <Route path='photos' element={<Photos />} />
          <Route path='articles' element={<Articles />} />
          <Route path='users' element={<Users />} />
          <Route path='login' element={<Login />} />
          <Route path='profile/:username' element={<Profile />} />
        </Routes>
      </RouteArea>
    </F>
  )
}

