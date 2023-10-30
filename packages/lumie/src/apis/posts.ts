import api from "@/utils/axios";
import { IPost } from "@/types";
import { Response } from "@/types";
import { POSTS_URL, POST_URL } from "./_url";

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

export const unix_stamp = (n: number | string) => {
  return Number(String(n).slice(0, 10));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      p.createAt = unix_stamp(p.createAt);
      p.updateAt = unix_stamp(p.updateAt);
      p.publishAt = unix_stamp(p.publishAt);
      return p;
    })
    return d;
  }
  return resp.data.msg;
}

export async function deletePost(uid: string) :Response {
  const resp = await api.delete(POST_URL, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function updatePost(uid: string, data: IPost) :Response {
  const resp = await api.put(POST_URL, data, { params: { uid } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function addPost(data: IPost) :Response {
  const resp = await api.post(POST_URL, data);
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function fetchPost(uid: string) :Response<{post: IPost}> {
  const resp = await api.get(POST_URL, { params: { uid } });
  if (resp.data.code === 0) {
    const data = resp.data;
    data.data.post['updateAt'] = unix_stamp(data.data.post['updateAt']);
    data.data.post['createAt'] = unix_stamp(data.data.post['createAt']);
    data.data.post['publishAt'] = unix_stamp(data.data.post['publishAt']);
    return data;
  }
  return resp.data.msg;
}