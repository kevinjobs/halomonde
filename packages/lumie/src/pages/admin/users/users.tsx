import React, { useState } from 'react';
import { fetchUsers } from '@/apis/user';
import { UserInfo, UserSke } from './user';
import { IUser } from '@/types';
import { Header } from '../_partial/layout';
import styled from 'styled-components';
import { UserEdit } from './edit';
import { AddButton } from '@horen/core';
import { Modal } from '@horen/core';
import { notifications } from '@horen/notifications';

const Us = styled.div``;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  .preview {
    .item {
      display: inline-block;
      vertical-align: top;
    }
  }
`;

const DEFAULT_USER: IUser = {
  uid: '',
  avatar: '',
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
      else notifications.show({type: 'error', message: data});
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
        <h2>用户管理</h2>
        <div>
          <AddButton onClick={() => {
            setPickUser(null);
            setTimeout(() => setPickUser(DEFAULT_USER), 100);
          }}>新增用户</AddButton>
        </div>
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
          <Modal visible={Boolean(pickUser)} onClose={() => setPickUser(null)}>
            <Modal.Header>
              <h2>{pickUser?.uid ? '编辑' : '新增'}用户</h2>
            </Modal.Header>
            <Modal.Content>
              {
                pickUser
                &&
                <UserEdit
                  user={pickUser}
                  onSuccess={getAndSetUsers}
                  onBlur={() => setPickUser(null)}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      </Content>
    </Us>
  )
}