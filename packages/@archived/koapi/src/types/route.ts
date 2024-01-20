import Koa from 'koa';

interface IRoute {
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  fn(ctx: Koa.Context): void,
  authRequired?: boolean,
  /**
   * 0: superuser
   * 1: admin
   * 2: vip
   * 3: common user
   */
  allowLevel?: 0 | 1 | 2 | 3,
  validation?: {
    body?: {
      properties: object,
    },
    params?: {
      properties: object,
    },
    query?: {
      properties: object,
    },
  },
}

export {
  IRoute,
}