import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { API_URL } from '@/constants';
import { setLoginedUser, store } from '@/store';
import { IUser } from '@/types';
import { addUser, deleteUser, updateUser } from '@/utils/apis/user';
import { AvatarUpload, Button, TextInput, Select } from '@horen/core';
import { useForm } from '@horen/hooks';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import style from './UserEditPanel.module.less';

export interface UserEditProps {
  user?: IUser;
  onSubmitSuccess?(): void;
  onSubmitFailed?(): void;
  onDeleteSuccess?(): void;
  onDeleteFailed?(): void;
  onBlur?(): void;
}

export function UserEditPanel({
  user,
  onSubmitSuccess,
  onDeleteSuccess,
}: UserEditProps): React.ReactElement {
  const form = useForm({
    initialValues: { ...user, password: '' },
    validation: {},
  });
  const state = useStore(store);

  const handleSubmit = () => {
    if (form.getValues().uid) {
      (async () => {
        const data = await updateUser(form.getValues().uid, form.getValues());
        if (typeof data !== 'string') {
          notifications.show({ variant: 'success', message: '更新成功' });
          // 如果修改的是当前用户则更新用户
          if (form.getValues().uid === state.user.uid) {
            setLoginedUser({
              ...state.user,
              ...form.getValues(),
              avatar: API_URL.base + form.getValues().avatar,
            });
          }
          if (onSubmitSuccess) onSubmitSuccess();
        } else {
          notifications.show({ variant: 'danger', message: '添加失败' });
        }
      })();
    } else {
      (async () => {
        const data = await addUser(form.getValues());
        if (typeof data !== 'string') {
          notifications.show({ variant: 'success', message: '添加成功' });
          if (onSubmitSuccess) onSubmitSuccess();
        } else {
          notifications.show({ variant: 'danger', message: '添加失败' });
        }
      })();
    }
  };

  const handleDeleteUser = () => {
    if (window.confirm('确定删除用户?')) {
      deleteUser(form.getValues().uid).then((resp) => {
        if (typeof resp === 'string') {
          notifications.show({ variant: 'danger', message: resp });
        } else {
          notifications.show({ variant: 'success', message: resp.msg });
          if (onDeleteSuccess) onDeleteSuccess();
        }
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    form.setValue('avatar', result.data.url);
    notifications.show({ variant: 'success', message: '上传封面成功' });
  };

  return (
    <div tabIndex={0}>
      <div className={style.content}>
        <div>
          <div className={style.item}>
            <label>头像</label>
            <span>
              <AvatarUpload
                defaultValue={form.getValues().avatar}
                url={API_URL.upload}
                onSuccess={handleUploadSuccess}
                token={state.user?.token}
              />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput disabled {...form.getProps('id')} label="用户编码" />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput
                label="邀请码"
                data-name="invitation"
                disabled={Boolean(form.getValues().uid)}
                {...form.getProps('invitation')}
              />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="用户名" {...form.getProps('username')} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput
                label="密码"
                type="password"
                {...form.getProps('password')}
              />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="昵称" {...form.getProps('nickname')} />
            </span>
          </div>
          <div className={style.item}>
            <label>性别</label>
            <span>
              <Select {...form.getProps('gender')}>
                <Select.Item value="unkown" name="未知性别" />
                <Select.Item value="male" name="男性" />
                <Select.Item value="female" name="女性" />
              </Select>
            </span>
          </div>
          <div className={style.item}>
            <label>生日</label>
            <span>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={dayjs.unix(form.getValues().birthday).toDate()}
                onChange={(d) => form.setValue('birthday', dayjs(d).unix())}
              />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="所在地" {...form.getProps('location')} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="用户描述" {...form.getProps('description')} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="用户宣言" {...form.getProps('motto')} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="用户等级" {...form.getProps('role')} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              <TextInput label="用户组别" {...form.getProps('group')} />
            </span>
          </div>
        </div>
        <div className={style.submit}>
          <Button variant="danger" onClick={handleDeleteUser}>
            删除用户
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {form.getValues().uid ? '更新' : '注册'}
          </Button>
        </div>
      </div>
    </div>
  );
}
