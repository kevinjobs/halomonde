import api from "@/utils/network";
import { IPost } from "@/types";
import { ApiResponse } from ".";
import { API_URL } from "@/constants";
import { covertToUnixStamp10 } from "@/utils/datetime";

export type PostListRespData = {
  amount: number;
  offset: number;
  limit: number;
  posts: IPost[];
  totals: number;
}

export type GetPostListParams = {
  publish?: string;
  author?: string;
  category?: string;
  type?: string;
  status?: string;
}

/**
 * 抓取 post 列表
 * @param offset 偏移量
 * @param limit 限制量
 * @param prs 查询参数
 * @returns post 列表
 */
export async function getPostList(
  offset: number,
  limit: number,
  prs: GetPostListParams
): ApiResponse<PostListRespData> {
  let params = { offset, limit, status: 'publish' };
  if (prs) params = {...params, ...prs};
  const resp = await api.get(API_URL.posts, {params});
  if (resp.data.code === 0) {
    const d = resp.data;
    const posts: IPost[] = d.data.posts;
    d.data['posts'] = posts.map(p => {
      fullUrl(p);

      p.createAt = covertToUnixStamp10(p.createAt);
      p.updateAt = covertToUnixStamp10(p.updateAt);
      p.publishAt = covertToUnixStamp10(p.publishAt);

      return p;
    })
    return d;
  }
  return resp.data.msg;
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
  shrinkUrl(data);

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
  shrinkUrl(data);

  const resp = await api.post(API_URL.post, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 通过 uid 抓取 post
 * @param uid uid
 * @returns 
 */
export async function fetchPost(uid: string): ApiResponse<{post: IPost}> {
  const resp = await api.get(API_URL.post, { params: { uid } });
  if (resp.data.code === 0) {
    const data = resp.data;

    fullUrl(data.data.post);

    data.data.post['updateAt'] = covertToUnixStamp10(data.data.post['updateAt']);
    data.data.post['createAt'] = covertToUnixStamp10(data.data.post['createAt']);
    data.data.post['publishAt'] = covertToUnixStamp10(data.data.post['publishAt']);
    return data;
  }
  return resp.data.msg;
}

const fullUrl = (post: IPost) => post.url = API_URL.base + post.url;
const shrinkUrl = (post: IPost) => post.url = post.url?.replace(API_URL.base, '');
