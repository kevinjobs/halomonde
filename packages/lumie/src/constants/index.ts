const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'https://api.kevinjobs.com:5000'
  : 'https://api.kevinjobs.com:5000';

export const UPLOAD_URL = BASE_URL + '/upload';
