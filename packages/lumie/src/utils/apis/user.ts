import { API_URL } from '@/constants';
import { IUser } from '@/types';
import api from '@/utils/network';

import { ApiResponse } from './';

export type GetUserListParams = {
  username?: string;
  nickname?: string;
};

export type UserListRespData = {
  amount: number;
  users: IUser[];
  totals: number;
};

export async function getUserList(
  params?: GetUserListParams,
): ApiResponse<UserListRespData> {
  const resp = await api.get(API_URL.users, { params });
  if (resp.data.code === 0) {
    resp.data.data.users.forEach((user: IUser) => fullAvatar(user));
    return resp.data;
  }
  return resp.data.msg;
}

export async function updateUser(uid: string, newUser: IUser): ApiResponse {
  const resp = await api.put(API_URL.user, shrinkAvatar(newUser), {
    params: { uid },
  });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function addUser(data: IUser): ApiResponse {
  const resp = await api.post(API_URL.user, shrinkAvatar(data));
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function getUser(username: string): ApiResponse<UserListRespData> {
  const resp = await api.get(API_URL.user, { params: { username } });
  if (resp.data.code === 0) {
    resp.data.data.users[0].avatar =
      API_URL.base +
      resp.data.data.users[0].avatar.replace('static/', 'static/thumb-');
    resp.data.data.users[0].birthday = Number(
      String(resp.data.data.users[0].birthday).slice(0, 11),
    );
    return resp.data;
  }
  return resp.data.msg;
}

export async function deleteUser(uid: string): ApiResponse {
  const resp = await api.delete(API_URL.user, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

const fullAvatar = (user: IUser) => {
  user.avatar = API_URL.base + user.avatar;
  return user;
};
const shrinkAvatar = (user: IUser) => {
  user.avatar = user.avatar?.replace(API_URL.base, '');
  return user;
};
