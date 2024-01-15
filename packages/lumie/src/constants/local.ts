import { IPost } from '@/types';
import { PostType } from './api';

export const DOMO_POSTS_STATE = 'domo-posts-state';
export interface DomoPostsState {
  offset: number;
  postType: PostType;
  postList: IPost[];
  hasPrev: boolean;
  hasNext: boolean;
}
