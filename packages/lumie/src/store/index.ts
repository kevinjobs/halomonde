import { IUser, } from '@/types';
import { clearLocalUser, setLocalUser, } from '@/utils/store';
import { createStore, } from '@horen/store';

interface MyStore {
  user?: Partial<IUser> & { token?: string }
}

export const store = createStore<MyStore>({});

export const setLoginedUser = (user: MyStore['user']) => {
  store.setState({user});
  setLocalUser(user);
}

export const clearLoginedUser = (): void => {
  store.setState({user: null});
  clearLocalUser();
}
