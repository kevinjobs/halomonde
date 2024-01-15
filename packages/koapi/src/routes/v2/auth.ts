import { IRoute, } from '@/types';

import { AuthController, } from '../../controllers';
import * as validation from '../../validations';

const authRoutes: IRoute[] = [
  {
    method: 'post',
    path: '/token',
    fn: AuthController.token,
    authRequired: false,
  },
  {
    method: 'post',
    path: '/register',
    fn: AuthController.register,
    authRequired: false,
    validation: validation.register,
  },
]

export default authRoutes;