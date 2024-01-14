import React from 'react';

import { fetchUsers } from '@/apis/user';
import { IUser } from '@/types';
import { Modal, Skeleton } from '@horen/core';
import { notifications } from '@horen/notifications';

import { UserCard } from './UserCard';
import { UserEditPanel } from './UserEditPanel';
import style from './Users.module.less';

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
      if (typeof data !== 'string') {
        setUsers(data.data.users);
        setPickUser(null);
      } else notifications.show({type: 'error', message: data});
    })();
  }

  React.useEffect(() => getAndSetUsers(), []);

  const handleClickUser = (u: IUser) => {
    setPickUser(null);
    setTimeout(() => setPickUser(u), 100);
  }

  return (
    <div className={style.users}>
      <div className={style.container}>
        <div className='preview'>
          {
            users
              ?
              users.map(u => (
                <div
                  key={u.uid}
                  className={style.item}
                >
                  <UserCard user={u} onClick={handleClickUser} />
                </div>
              ))
              :
              <>
                <div className={style.item}><UserSkeletion /></div>
                <div className={style.item}><UserSkeletion /></div>
                <div className={style.item}><UserSkeletion /></div>
                <div className={style.item}><UserSkeletion /></div>
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
                <UserEditPanel
                  user={pickUser}
                  onSuccess={getAndSetUsers}
                  onBlur={() => setPickUser(null)}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </div>
  )
}

function UserSkeletion() {
  return (
    <div className={style.userSkeletion}>
      <div>
        <Skeleton width={108} height={108} />
      </div>
      <div>
        <span className={style.skeletion}>
          <Skeleton width={170} height={12} />
        </span>
        <span className={style.skeletion}>
          <Skeleton width={40} height={12} />
        </span>
        <span className={style.skeletion}>
          <Skeleton width={60} height={12} />
        </span>
        <span className={style.skeletion}>
          <Skeleton width={80} height={12} />
        </span>
        <span className={style.skeletion}>
          <Skeleton width={100} height={12} />
        </span>
      </div>
    </div>
  );
}
