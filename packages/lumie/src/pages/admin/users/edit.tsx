import React from 'react';
import styled from 'styled-components';
import { IUser } from '@/types';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Select, Option } from '@/components/select';
import { AvatarUpload } from '@/components/upload';
import { UPLOAD_URL } from '@/constants';
import { updateUser, addUser } from '@/apis/user';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { notifications } from '@horen/notifications';
import "react-datepicker/dist/react-datepicker.css";

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px 16px;
  justify-content: center;
  .item {
    display: flex;
    align-items: center;
    margin: 4px 0;
    label {
      margin-right: 8px;
      width: 68px;
      text-align: justify;
      text-align-last: justify;
    }
  }
  .submit {
    margin: 8px 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export interface UserEditProps {
  user?: IUser
  onSuccess?(): void;
  onBlur?(): void;
}

interface Action {
  type: string;
  payload: Partial<IUser>;
}

const reducer = (state: IUser, action: Action) => {
  return { ...state, ...action.payload };
};

export function UserEdit({user, onSuccess}: UserEditProps) :React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, user)

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.dataset['name'];
    const value = e.target.value;
    dispatch({ type: '', payload: { [name]: value } });
  }

  const handleSubmit = () => {
    if (state.uid) {
      (async() => {
        const data = await updateUser(state.uid, state);
        if (typeof data !== 'string') {
          notifications.show({type: 'success', message: '更新成功'});
          if (onSuccess) onSuccess();
        } else {
          notifications.show({type: 'error', message: '添加失败'});
        }
      })();
    } else {
      (async() => {
        const data = await addUser(state);
        if (typeof data !== 'string') {
          notifications.show({type: 'success', message: '添加成功'});
          if (onSuccess) onSuccess();
        } else {
          notifications.show({type: 'error', message: '添加失败'});
        }
      })();
    }
  }

  return (
    <div tabIndex={0}>
      <Content>
        <div className='edit-form'>
          <div className='item'>
            <label>头像</label>
            <AvatarUpload
              defaultValue={state.avatar}
              url={UPLOAD_URL}
              onSuccess={(result) => dispatch({type: '', payload: {avatar: result.url}})}
            />
          </div>
          <div className='item'>
            <label>用户编码</label>
            <Input
              data-name='uid'
              value={state.uid}
              onChange={setValue}
              disabled
            />
          </div>
          <div className='item'>
            <label>邀请码</label>
            <Input
              data-name='invitation'
              value={state.invitation}
              onChange={setValue}
              disabled={Boolean(state.uid)}
            />
          </div>
          <div className='item'>
            <label>用户名</label>
            <Input
              data-name='username'
              value={state.username}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>密码</label>
            <Input
              data-name='password'
              value={state.password}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>昵称</label>
            <Input
              data-name='nickname'
              value={state.nickname}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>性别</label>
            <div style={{width: 188}}>
              <Select defaultValue={user.gender} onChange={v => dispatch({ type: '', payload: { gender: v } })}>
                <Option value={''} name='未知性别' />
                <Option value={'male'} name='男性' />
                <Option value={'female'} name='女性' />
              </Select>
            </div>
          </div>
          <div className='item'>
            <label>生日</label>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={dayjs.unix(state.birthday).toDate()}
              onChange={d => dispatch({ type: '', payload: { birthday: dayjs(d).unix() } })}
            />
          </div>
          <div className='item'>
            <label>所在地</label>
            <Input
              data-name='location'
              value={state.location}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>用户描述</label>
            <Input
              data-name='description'
              value={state.description}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>格言</label>
            <Input
              data-name='motto'
              value={state.motto}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>角色</label>
            <Input
              data-name='role'
              value={state.role}
              onChange={setValue}
            />
          </div>
          <div className='item'>
            <label>用户组</label>
            <Input
              data-name='group'
              value={state.group}
              onChange={setValue}
            />
          </div>
        </div>
        <div className='submit'>
          <Button
            type='primary'
            style={{width: 200, height: 40}}
            onClick={handleSubmit}
          >
            { state.uid ? '更新' : '注册' }
          </Button>
        </div>
      </Content>
    </div>
  )
}