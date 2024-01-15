import { IUser } from '@/types';

interface User extends Partial<IUser> {
  token?: string;
}

export const getLocalUser = (): User => {
  return JSON.parse(localStorage.getItem('user'));
};

export const setLocalUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearLocalUser = () => {
  localStorage.removeItem('user');
};
