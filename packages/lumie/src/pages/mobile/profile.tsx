import React from 'react';
import styled from 'styled-components';
import { fetchUser } from '@/apis/user';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '@/types';
import COLOR_MAP from '@/styles/colors';
import dayjs from 'dayjs';
import { Male, Female, Local } from "@icon-park/react";
import { getLocation } from '@/apis/location';
import { Button } from '@/components/button';
import { clearLocalStorage } from '../admin';

const F = styled.div`
  padding: 32px 0;
  background-color: ${COLOR_MAP.white};
  margin: 0 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .avatar {
    width: 128px;
    height: 128px;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .nickname {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
  .item {
    text-align: left;
    margin: 16px 0;
    span:nth-child(1) {
      vertical-align: middle;
      display: inline-block;
      width: 84px;
      text-align: justify;
      text-align-last: justify;
      margin-right: 16px;
    }
    span:nth-child(2) {
      vertical-align: middle;
      display: inline-block;
      color: ${COLOR_MAP.white8};
      overflow: hidden;
    }
  }
  .uid {
    span:nth-child(2) {
      font-size: 10px;
    }
  }
  .more {
    width: 100%;
    margin-top: 32px;
    button {
      height: 40px;
      width: 100px;
      border-radius: 5px;
    }
  }
`;

export default function Profile() {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;
  const [user, setUser] = React.useState<IUser>(null);
  const [loc, setLoc] = React.useState(null);

  const handleLogout = () => {
    clearLocalStorage();
    window.alert('退出登录 即将跳转');
    setTimeout(() => navigate(`/mobile?time=${dayjs().unix()}`), 500);
  }

  React.useEffect(() => {
    (async() => {
      const resp = await fetchUser(username);
      if (typeof resp !== 'string') setUser(resp.data.users[0]);
      else window.alert('无法获取用户信息');
    })();
  }, []);

  React.useEffect(() => {
    (async() => {
      if (user?.location) {
        const parts = user?.location.split(',');
        const resp = await getLocation(Number(parts[0]), Number(parts[1]));
        if (resp) setLoc(resp.address);
      }
    })();
  }, []);

  return (
    <F>
      <div className='avatar'>
        <img src={user?.avatar} alt={username} />
      </div>
      <div className='nickname'>
        <h3>{ user?.nickname }</h3>
        <span>
          {
            user?.gender === 'male'
              ? <Male fill={COLOR_MAP.blue} />
              : <Female fill={COLOR_MAP.purple} />
          }
        </span>
      </div>
      <div className='infos'>
        <div className='uid item'>
          <span>用户编号 </span>
          <span>{ user?.uid }</span>
        </div>
        <div className='username item'>
          <span>用户名 </span>
          <span>{ username }</span>
        </div>
        <div className='birthday item'>
          <span>出生于 </span>
          <span>{ dayjs(user?.birthday).format('YYYY年M月d日') }</span>
        </div>
        <div className='location item'>
          <span>居住于 </span>
          <span>{ loc || user?.location }</span>
        </div>
        <div className='description item'>
          <span>其他说明</span>
          <span>{ user?.description || '还没有说明' }</span>
        </div>
        <div className='motto item'>
          <span>用户格言</span>
          <span>{ user?.motto || '还没有想说的' }</span>
        </div>
      </div>
      <div className='more'>
        <Button type='primary' onClick={e => e.preventDefault()}>编辑用户</Button>
        <Button danger onClick={handleLogout}>退出登录</Button>
      </div>
    </F>
  )
}