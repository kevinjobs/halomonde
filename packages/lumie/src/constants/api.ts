const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://api.kevinjobs.com:5000';

const UPLOAD_URL = BASE_URL + '/upload';

const FILE_LIST_URL = BASE_URL + '/file/list';

const FILE_URL = BASE_URL + '/file';

const TOKEN_URL = BASE_URL + '/token';

const POSTS_URL = BASE_URL + '/post/list';

const POST_URL = BASE_URL + '/p';

const USERS_URL = BASE_URL + '/user/list';

const USER_URL = BASE_URL + '/user';

const INVITATION_LIST_URL = BASE_URL + '/invitation/list';

const GEN_INVITATION_LIST_URL = BASE_URL + '/genInvitations';

const STS_SERVER_URL = BASE_URL + '/sts';

export const API_URL = {
  /** base url */
  base: BASE_URL,
  /** 文件上传 */
  upload: UPLOAD_URL,
  /** 文件列表 */
  fileList: FILE_LIST_URL,
  /** 文件 */
  file: FILE_URL,
  /** 登录 */
  token: TOKEN_URL,
  /** 文章列表 */
  posts: POSTS_URL,
  /** 文章 */
  post: POST_URL,
  /** 用户列表 */
  users: USERS_URL,
  /** 用户 */
  user: USER_URL,
  /** 邀请码 */
  invitationList: INVITATION_LIST_URL,
  /** 生成邀请码 */
  genInvitationList: GEN_INVITATION_LIST_URL,
  /** sts server */
  sts: STS_SERVER_URL,
};

export type PostType = 'article' | 'photo' | 'verse' | 'cover';

export const POST_TYPES: Record<PostType, string> = {
  article: '文章',
  photo: '照片',
  verse: '诗文',
  cover: '封面',
};
