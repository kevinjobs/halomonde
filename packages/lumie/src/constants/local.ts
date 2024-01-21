import { PostType } from './api';
import { PostListRespData } from '@/utils/apis';

export const DOMO_POSTS_STATE = 'domo-posts-state';
export interface DomoPostsState {
  pageLimit: number;
  postType: PostType;
  data: PostListRespData;
}
