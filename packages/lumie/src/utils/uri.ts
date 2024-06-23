import { API_URL } from '@/constants';

const start = 'https://gallery-1252473272';

export function photoThumbUrl(originUrl: string) {
  if (originUrl.startsWith(start)) {
    return originUrl + '!thumb';
  } else {
    return originUrl.replace('static/', 'static/thumb-');
  }
}

export function photoOriginUrl(originUrl: string) {
  if (originUrl.startsWith(start)) {
    return originUrl + '!origin';
  } else {
    return originUrl;
  }
}

export function photoCompressedUrl(originUrl: string) {
  if (originUrl.startsWith(start)) {
    return originUrl + '!compressed';
  } else {
    return originUrl;
  }
}

export function fullfillUrl(originUrl: string) {
  if (originUrl.startsWith(start)) {
    return originUrl;
  } else {
    return API_URL.base + originUrl;
  }
}
