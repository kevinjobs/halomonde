import api from "@/utils/axios";
import { IUser } from "@/types";
import { USERS_URL, USER_URL } from "./_url";
import { Response } from "@/types";
import { BASE_URL } from "@/configs";

interface UserParams {
  username?: string;
  nickname?: string;
}

interface UsersData {
  amount: number;
  users: IUser[];
  totals: number;
}

export async function fetchUsers(params?: UserParams) :Response<UsersData> {
  const resp = await api.get(USERS_URL, {params});
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function updateUser(uid: string,data: IUser) :Response {
  const resp = await api.put(USER_URL, data, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function addUser(data: IUser) :Response {
  const resp = await api.post(USER_URL, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function fetchUser(username: string) :Response<UsersData> {
  const resp = await api.get(USER_URL, { params: { username }});
  if (resp.data.code === 0) {
    resp.data.data.users[0].avatar =
      BASE_URL + resp.data.data.users[0].avatar.replace('static/', 'static/thumb-');
    resp.data.data.users[0].birthday =
      Number(String(resp.data.data.users[0].birthday).slice(0,11));
    return resp.data;
  };
  return resp.data.msg;
}
