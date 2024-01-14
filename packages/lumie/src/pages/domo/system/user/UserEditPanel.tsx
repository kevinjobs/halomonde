import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { addUser, updateUser, deleteUser } from '@/utils/apis/user';
import { API_URL } from '@/constants';
import { IUser } from '@/types';
import { AvatarUpload, Button, Input, Select } from '@horen/core';
import { useForm } from '@horen/hooks';
import { notifications } from '@horen/notifications';
import { setLoginedUser, store } from '@/store';
import { useStore } from '@horen/store';

import style from './UserEditPanel.module.less';

export interface UserEditProps {
  user?: IUser
  onSubmitSuccess?(): void;
  onSubmitFailed?(): void;
  onDeleteSuccess?(): void;
  onDeleteFailed?(): void;
  onBlur?(): void;
}

export function UserEditPanel({
  user,
  onSubmitSuccess,
  onSubmitFailed,
  onDeleteSuccess,
  onDeleteFailed,
  onBlur,
}: UserEditProps) :React.ReactElement {
  const form = useForm({initial: {...user, password: ''}});
  const state = useStore(store);

  const handleSubmit = () => {
    if (form.data.uid) {
      (async() => {
        const data = await updateUser(form.data.uid, form.data);
        if (typeof data !== 'string') {
          notifications.show({type: 'success', message: '更新成功'});
          // 如果修改的是当前用户则更新用户
          if (form.data.uid === state.user.uid) {
            setLoginedUser({
              ...state.user,
              ...form.data,
              avatar: API_URL.base + form.data.avatar,
            });
          }
          if (onSubmitSuccess) onSubmitSuccess();
        } else {
          notifications.show({type: 'error', message: '添加失败'});
        }
      })();
    } else {
      (async() => {
        const data = await addUser(form.data);
        if (typeof data !== 'string') {
          notifications.show({type: 'success', message: '添加成功'});
          if (onSubmitSuccess) onSubmitSuccess();
        } else {
          notifications.show({type: 'error', message: '添加失败'});
        }
      })();
    }
  }

  const handleDeleteUser = () => {
    if (window.confirm('确定删除用户?')) {
      deleteUser(form.data.uid).then(resp => {
        if (typeof resp === 'string') {
          notifications.show({type: 'error', message: resp});
        } else {
          notifications.show({type: 'success', message: resp.msg});
          if (onDeleteSuccess) onDeleteSuccess();
        }
      })
    }
  }

  const handleUploadSuccess = (result: any) => {
    form.setState('avatar', result.data.url);
    notifications.show({type: 'success', message: '上传封面成功'});
  }

  return (
    <div tabIndex={0}>
      <div className={style.content}>
        <div>
          <div className={style.item}>
            <label>头像</label>
            <span>
              <AvatarUpload
                defaultValue={form.data.avatar}
                url={API_URL.upload}
                onSuccess={handleUploadSuccess}
                token={state.user?.token}
              />
            </span>
          </div>
          <div className={style.item}>
            <label>用户编码</label>
            <span>
              <Input disabled {...form.get('id')} />
            </span>
          </div>
          <div className={style.item}>
            <label>邀请码</label>
            <span>
              <Input
                data-name='invitation'
                disabled={Boolean(form.data.uid)}
                {...form.get('invitation')}
              />
            </span>
          </div>
          <div className={style.item}>
            <label>用户名</label>
            <span><Input {...form.get('username')} /></span>
          </div>
          <div className={style.item}>
            <label>密码</label>
            <span><Input type="password" {...form.get('password')} /></span>
          </div>
          <div className={style.item}>
            <label>昵称</label>
            <span><Input {...form.get('nickname')} /></span>
          </div>
          <div className={style.item}>
            <label>性别</label>
            <span>
              <Select {...form.get('gender')} >
                <Select.Item value="unkown" name='未知性别' />
                <Select.Item value="male" name='男性' />
                <Select.Item value="female" name='女性' />
              </Select>
            </span>
          </div>
          <div className={style.item}>
            <label>生日</label>
            <span>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={dayjs.unix(form.data.birthday).toDate()}
                onChange={d => form.setState('birthday', dayjs(d).unix())}
              />
            </span>
          </div>
          <div className={style.item}>
            <label>所在地</label>
            <span><Input {...form.get('location')} /></span>
          </div>
          <div className={style.item}>
            <label>用户描述</label>
            <span><Input {...form.get('description')} /></span>
          </div>
          <div className={style.item}>
            <label>格言</label>
            <span><Input {...form.get('motto')} /></span>
          </div>
          <div className={style.item}>
            <label>角色</label>
            <span><Input {...form.get('role')} /></span>
          </div>
          <div className={style.item}>
            <label>用户组</label>
            <span><Input {...form.get('group')} /></span>
          </div>
        </div>
        <div className={style.submit}>
          <Button type="error" onClick={handleDeleteUser}>
            删除用户
          </Button>
          <Button type='primary' onClick={handleSubmit}>
            { form.data.uid ? '更新' : '注册' }
          </Button>
        </div>
      </div>
    </div>
  )
}