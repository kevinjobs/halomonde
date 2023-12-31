export const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://api.kevinjobs.com:5000';

export const UPLOAD_URL = BASE_URL + '/upload';

export const FILE_LIST_URL = BASE_URL + '/file/list';

export const FILE_URL = BASE_URL + '/file';

export const LOGIN_URL = BASE_URL + '/token';

export const POSTS_URL = BASE_URL + '/post/list';

export const POST_URL = BASE_URL + '/p';

export const USERS_URL = BASE_URL + '/user/list';

export const USER_URL = BASE_URL + '/user';

export const INVITATION_URL = BASE_URL + '/invitation/list';
