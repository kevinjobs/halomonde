import { Input } from '@/components/input';
import COLOR_MAP from '@/styles/colors';
import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/button';
import { login } from '@/apis/auth';
import { setLocalStorage } from '../admin';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const F = styled.div`
  display: flex;
  justify-content: center;
  .login-form {
    background-color: ${COLOR_MAP.white};
    height: 500px;
    width: 320px;
    padding: 32px 16px;
    margin-top: 32px;
    border-radius: 5px;
    .title {
      text-align: center;
      margin-bottom: 48px;
    }
    .item {
      width: 260px;
      margin: 8px auto;
      display: flex;
      align-items: center;
      label {
        width: 60px;
        text-align: justify;
        text-align-last: justify;
        margin-right: 8px;
      }
    }
    .submit {
      width: 100%;
      margin: 32px 0 0 0;
      text-align: center;
      button {
        height: 32px;
        width: 64px;
        border-radius: 5px;
      }
    }
  }
`;

export default function Login() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  
  const navigate = useNavigate();

  const handleLogin = () => {
    (async() => {
      const resp = await login({username, password});
      if (typeof resp !== 'string') {
        setLocalStorage(resp.data.token, username);
        window.alert('登录成功 马上跳转');
        setTimeout(() => navigate(`/mobile?time=${dayjs().unix()}`), 500);
      } else window.alert('登录失败');
    })();
  }

  return (
    <F>
      <div className='login-form'>
        <div className='title'>
          <h2>用户登录</h2>
        </div>
        <div className='item'>
          <label>用户名</label>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='item'>
          <label>密码</label>
          <Input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='submit'>
          <Button type='primary' onClick={handleLogin}>登录</Button>
          <Button danger onClick={() => navigate(-1)}>取消</Button>
        </div>
      </div>
    </F>
  )
}