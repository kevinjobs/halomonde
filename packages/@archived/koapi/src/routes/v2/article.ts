import { IRoute, } from '@/types';

import { ArticleController, } from '../../controllers';

const articleRoutes: IRoute[] = [
  // 文章系列
  { method: 'get', path: '/articles', fn: ArticleController.getList, authRequired: false,  },
  { method: 'get', path: '/article', fn: ArticleController.get, authRequired: false, },
  { method: 'post', path: '/article', fn: ArticleController.post, authRequired: true, },
  { method: 'put', path: '/article', fn: ArticleController.put, authRequired: true, },
  { method: 'delete', path: '/article', fn: ArticleController.delete, authRequired: true, },
]

export default articleRoutes;