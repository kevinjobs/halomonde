import React from 'react';
import { fetchUsers } from '@/apis/user';
import { UserInfo, UserSke } from './user';
import { IUser } from '@/types';
import { Header } from '../_partial/layout';
import styled from 'styled-components';
import { UserEdit } from './edit';
import { Button } from '@/components/button';

const Us = styled.div``;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  .preview {
    width: 1040px;
    .item {
      display: inline-block;
      vertical-align: top;
    }
  }
  .edit-area {
    width: 300px;
    margin: 12px 32px;
    .user-edit {
      width: 300px;
    }
  }
`;

const DEFAULT_USER: IUser = {
  uid: '',
  invitation: '',
  username: '',
  nickname: '',
  password: '',
  gender: '',
  birthday: 0,
  location: '',
  description: '',
  motto: '',
  role: '',
  group: '',
}

export function UserAdmin() :React.ReactElement {
  const [users, setUsers] = React.useState<IUser[]>();
  const [pickUser, setPickUser] = React.useState<IUser>(null);

  const getAndSetUsers = () => {
    (async() => {
      const data = await fetchUsers();
      if (typeof data !== 'string') setUsers(data.data.users);
      else window.alert(data);
    })();
  }

  React.useEffect(() => getAndSetUsers(), []);

  const handleClickUser = (u: IUser) => {
    setPickUser(null);
    setTimeout(() => setPickUser(u), 100);
  }

  return (
    <Us>
      <Header>
        <Header.Title>用户管理</Header.Title>
        <Header.Add>
          <Button onClick={() => {
            setPickUser(null);
            setTimeout(() => setPickUser(DEFAULT_USER), 100);
          }}>新增用户</Button>
        </Header.Add>
      </Header>
      <Content>
        <div className='preview'>
          {
            users
              ?
              users.map(u => (
                <div
                  key={u.uid}
                  className='item'
                >
                  <UserInfo user={u} onClick={handleClickUser} />
                </div>
              ))
              :
              <>
                <div className='item'><UserSke /></div>
                <div className='item'><UserSke /></div>
                <div className='item'><UserSke /></div>
                <div className='item'><UserSke /></div>
              </>
          }
        </div>
        <div className='edit-area'>
          <div className='user-edit'>
            {
              pickUser &&
              <UserEdit
                user={pickUser}
                onSuccess={getAndSetUsers}
                onBlur={() => setPickUser(null)}
              />
            }
          </div>
        </div>
      </Content>
    </Us>
  )
}