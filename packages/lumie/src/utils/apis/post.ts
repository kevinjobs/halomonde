import { API_URL, PostType } from '@/constants';
import { IPost } from '@/types';
import { covertToUnixStamp10 } from '@/utils/datetime';
import api from '@/utils/network';

import { ApiResponseType, ApiResponse } from './';
import { fullfillUrl } from '../uri';

export type PostListRespData = {
  amount: number;
  offset: number;
  limit: number;
  posts: IPost[];
  totals: number;
};

export type GetPostListParams = {
  publish?: string;
  author?: string;
  category?: string;
  type?: PostType;
  status?: string;
  offset?: number;
  limit?: number;
};

type GetPostListSuccessCallback = (
  /** Post 列表 */
  postList: IPost[],
  /** 是否有上一页 */
  hasPrev?: boolean,
  /** 是否有下一页 */
  hasNext?: boolean,
  data?: PostListRespData,
) => void;

type FailedCallback = (errMsg: string) => void;

/**
 * 伪同步方式获取 PostList
 * @param params 参数
 * @param onSuccess 获取数据成功时的回调
 * @param onFailed 获取数据失败时的回调
 */
export function getPostListSync(
  params: GetPostListParams,
  onSuccess: GetPostListSuccessCallback,
  onFailed: FailedCallback,
) {
  api
    .get(API_URL.posts, { params: { status: 'publish', ...params } })
    .then((resp) => {
      const respData = resp.data as ApiResponseType<PostListRespData>;
      if (respData.code === 0) {
        respData.data.posts = convertPosts(respData.data.posts);
        onSuccess(
          respData.data.posts,
          respData.data.offset > 0,
          respData.data.offset + respData.data.limit < respData.data.totals,
          respData.data,
        );
      } else {
        onFailed(resp.data.msg);
      }
    })
    .catch((err) => onFailed(err));
}

/**
 * 通过 uid 删除 post
 * @param uid uid
 * @returns
 */
export async function deletePost(uid: string): ApiResponse {
  const resp = await api.delete(API_URL.post, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 通过 uid 更新 post
 * @param uid uid
 * @param data post
 * @returns
 */
export async function updatePost(uid: string, data: IPost): ApiResponse {
  const resp = await api.put(API_URL.post, data, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 新增 post
 * @param data post
 * @returns
 */
export async function addPost(data: IPost): ApiResponse {
  const resp = await api.post(API_URL.post, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 通过 uid 抓取 post
 * @param uid uid
 * @returns
 */
export async function fetchPost(uid: string): ApiResponse<{ post: IPost }> {
  const resp = await api.get(API_URL.post, { params: { uid } });
  if (resp.data.code === 0) {
    const data = resp.data;

    data.data.post.url = fullfillUrl(data.data.post.url);

    data.data.post['updateAt'] = covertToUnixStamp10(
      data.data.post['updateAt'],
    );
    data.data.post['createAt'] = covertToUnixStamp10(
      data.data.post['createAt'],
    );
    data.data.post['publishAt'] = covertToUnixStamp10(
      data.data.post['publishAt'],
    );
    return data;
  }
  return resp.data.msg;
}

const convertPosts = (posts: IPost[]) => {
  return posts.map((p) => {
    p.url = fullfillUrl(p.url);

    p.createAt = covertToUnixStamp10(p.createAt);
    p.updateAt = covertToUnixStamp10(p.updateAt);
    p.publishAt = covertToUnixStamp10(p.publishAt);

    return p;
  });
};
