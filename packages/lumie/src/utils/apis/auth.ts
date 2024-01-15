import { API_URL } from '@/constants';
import api from '@/utils/network';

import { ApiResponse } from './';

export type GetTokenParams = {
  username: string;
  password: string;
};

export type TokenRespData = {
  token: string;
};

export type InvitationListRespData = {
  invitations: {
    code: string;
    createAt: number;
    registerAt: number;
    registerBy: string;
    valid: boolean;
  }[];
};

export async function getToken(
  params: GetTokenParams,
): ApiResponse<TokenRespData> {
  const resp = await api.post(API_URL.token, params);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function getInvitationList(): ApiResponse<InvitationListRespData> {
  const resp = await api.get(API_URL.invitationList);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function genInvitations(): ApiResponse {
  const resp = await api.post(API_URL.genInvitationList);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}
