import api from "@/utils/axios";
import { IPost } from "@/types";
import { Response } from "@/types";
import { POSTS_URL, POST_URL, BASE_URL } from "@/constants";
import { unix_stamp } from "@/utils";

export interface PostsData {
  amount: number;
  offset: number;
  limit: number;
  posts: IPost[];
  totals: number;
}

export interface PostParams {
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
export async function fetchPosts(
  offset: number,
  limit: number,
  prs: PostParams
) :Response<PostsData> {
  let params = { offset, limit, status: 'publish' };
  if (prs) params = {...params, ...prs};
  const resp = await api.get(POSTS_URL, {params});
  if (resp.data.code === 0) {
    const d = resp.data;
    const posts: IPost[] = d.data.posts;
    d.data['posts'] = posts.map(p => {
      fullUrl(p);

      p.createAt = unix_stamp(p.createAt);
      p.updateAt = unix_stamp(p.updateAt);
      p.publishAt = unix_stamp(p.publishAt);
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
export async function deletePost(uid: string) :Response {
  const resp = await api.delete(POST_URL, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 通过 uid 更新 post
 * @param uid uid
 * @param data post
 * @returns 
 */
export async function updatePost(uid: string, data: IPost) :Response {
  shrinkUrl(data);

  const resp = await api.put(POST_URL, data, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 新增 post
 * @param data post
 * @returns 
 */
export async function addPost(data: IPost) :Response {
  shrinkUrl(data);

  const resp = await api.post(POST_URL, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

/**
 * 通过 uid 抓取 post
 * @param uid uid
 * @returns 
 */
export async function fetchPost(uid: string) :Response<{post: IPost}> {
  const resp = await api.get(POST_URL, { params: { uid } });
  if (resp.data.code === 0) {
    const data = resp.data;

    fullUrl(data.data.post);

    data.data.post['updateAt'] = unix_stamp(data.data.post['updateAt']);
    data.data.post['createAt'] = unix_stamp(data.data.post['createAt']);
    data.data.post['publishAt'] = unix_stamp(data.data.post['publishAt']);
    return data;
  }
  return resp.data.msg;
}

const fullUrl = (post: IPost) => post.url = BASE_URL + post.url;
const shrinkUrl = (post: IPost) => post.url = post.url.replace(BASE_URL, '');
