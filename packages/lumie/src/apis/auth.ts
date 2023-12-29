import api from '@/utils/axios';
import { LOGIN_URL, INVITATION_URL } from '@/constants';
import { Response } from '@/types';

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export interface InvitationCode {
  code: string;
  createAt: number;
  registerAt: number;
  registerBy: string;
  valid: boolean;
}

interface Invitations {
  invitations: InvitationCode[];
}

export async function login(data: {username: string; password: string}) :Response<LoginData> {
  const resp = await api.post(LOGIN_URL, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function getInvitations() :Response<Invitations> {
  const resp = await api.get(INVITATION_URL);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}
