export { getToken, getInvitationList, GetTokenParams, TokenRespData, InvitationListRespData} from './auth';
export { getFileList as fetchFileList, deleteFileByFilename, FileRespData, FileListRespData, GetFileListParams } from './file';
export {
  fetchPost,
  getPostList as fetchPosts,
  addPost,
  updatePost,
  deletePost,
  type PostListRespData,
  type GetPostListParams,
} from './post';
export {
  getUserList as fetchUserList,
  updateUser,
  addUser,
  fetchUser,
  type UserListRespData,
  type GetUserListParams,
} from './user';

export type ApiResponse<T = undefined> = Promise<{
  code: number;
  msg: string;
  data?: T
} | string>;

