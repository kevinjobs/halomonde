export { getToken, getInvitationList, genInvitations } from './auth';
export type {
  GetTokenParams,
  TokenRespData,
  InvitationListRespData,
} from './auth';
export { getFileList as fetchFileList, deleteFileByFilename } from './file';
export type { FileRespData, FileListRespData, GetFileListParams } from './file';
export {
  fetchPost,
  getPostList,
  addPost,
  updatePost,
  deletePost,
} from './post';
export type { PostListRespData, GetPostListParams } from './post';
export {
  getUserList as fetchUserList,
  updateUser,
  addUser,
  getUser,
} from './user';
export type { UserListRespData, GetUserListParams } from './user';

export type ApiResponse<T = undefined> = Promise<
  | {
      code: number;
      msg: string;
      data?: T;
    }
  | string
>;
