import api from '@/utils/axios';
import { LOGIN_URL } from './_url';
import { Response } from '@/types';

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export async function login(data: {username: string; password: string}) :Response<LoginData> {
  const resp = await api.post(LOGIN_URL, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}
