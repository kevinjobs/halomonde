import dayjs from 'dayjs';
import React from 'react';

import { IUser, } from '@/types';
import {
    Avatar, BirthdayCake, CodeOne, Female, Local, Male, User,
} from '@icon-park/react';

import style from './UserCard.module.less';

export interface UserCardProps {
  user: IUser;
  onClick?(u: IUser): void;
}

export function UserCard({ user, onClick }: UserCardProps): React.ReactElement {
  return (
    <div className={style.userCard} onClick={() => onClick(user)}>
      <div className={style.left}>
        <div className={style.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            <Avatar theme="outline" size="48" fill="#9b9b9b" strokeWidth={1} />
          )}
        </div>
      </div>
      <div className={style.right}>
        <div className={style.nickname}>
          <span className={style.name}>{user.nickname}</span>
          <span className={style.gender}>
            {user.gender === "male" && (
              <Male theme="outline" size="14" fill="#4a90e2" />
            )}
            {user.gender === "female" && (
              <Female theme="outline" size="14" fill="#bd10e0" />
            )}
          </span>
        </div>
        <div className={style.username}>
          <span className={style.icon}>
            <User theme="outline" size="14" />
          </span>
          <span>{user.username}</span>
        </div>
        <div className={style.uid}>
          <span className={style.icon}>
            <CodeOne theme="outline" size="14" />
          </span>
          <span>{user.uid}</span>
        </div>
        <div className={style.birthday}>
          <span className={style.icon}>
            <BirthdayCake theme="outline" size="14" />
          </span>
          <span>
            {user.birthday
              ? dayjs
                .unix(Number(String(user.birthday).slice(0, 10)))
                .format("YYYY-MM-DD")
              : "未知生日"}
          </span>
        </div>
        <div className={style.location}>
          <span className={style.icon}>
            <Local theme="outline" size="14" />
          </span>
          <span>无法获取具体地址</span>
        </div>
      </div>
    </div>
  );
}