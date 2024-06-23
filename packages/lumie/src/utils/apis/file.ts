import { API_URL } from '@/constants';
import COS from 'cos-js-sdk-v5';

import api, { fileApi } from '../network';
import { ApiResponse } from './';
import { getLocalUser } from '../store';

export const cos = new COS({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAuthorization(_: any, callback: any) {
    const url = API_URL.sts;
    api.get(url, { params: {} }).then((resp) => {
      if (resp.data.code === 0) {
        const data = resp.data.data;
        callback({
          TmpSecretId: data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials.tmpSecretKey,
          SecurityToken: data.credentials.sessionToken,
          StartTime: data.startTime,
          ExpiredTime: data.expiredTime,
          ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
        });
      }
    });
  },
});

export type FileRespData = {
  filename: string;
  filepath: string;
  origin: string;
  url?: string;
};

export type UploadReturnType = {
  ext: string;
  filename: string;
  height: number;
  width: number;
  origin: string;
  url: string;
};

export type FileListRespData = {
  amount: number;
  files: FileRespData[];
  totals: number;
  limit: number;
  offset: number;
};

export type GetFileListParams = {
  offset?: number;
  limit?: number;
};

export async function getFileList(
  params?: GetFileListParams,
): ApiResponse<FileListRespData> {
  const resp = await api.get(API_URL.fileList, { params });
  if (resp.data.code === 0) {
    resp.data.data.files.forEach((f: FileRespData) => {
      f.url = API_URL.base + '/static/thumb-' + f.filename;
    });
    return resp.data;
  }
  return resp.data.msg;
}

export async function deleteFileByFilename(filename: string): ApiResponse {
  const resp = await api.delete(API_URL.file, { params: { filename } });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function uploadFile(
  file: File,
  onProgress?: (percent: number) => void,
): ApiResponse<UploadReturnType> {
  const formData = new FormData();
  formData.append('file', file);
  const resp = await fileApi.post(API_URL.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvt) => {
      if (onProgress) {
        onProgress(((progressEvt.loaded / progressEvt.total) * 100) | 0);
      }
    },
  });
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}

export async function uploadCloudFile(
  file: File,
  onProgress?: (percent: number) => void,
) {
  const Bucket = 'gallery-1252473272';
  const Region = 'ap-nanjing';

  return new Promise((resolve, reject) => {
    if (!getLocalUser()?.username) {
      reject('请先登录');
    }

    cos.uploadFile(
      {
        Bucket,
        Region,
        Key: `photos/${getLocalUser().username}/${file.name}`,
        Body: file,
        SliceSize: 1024 * 1024 * 5,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgress: (progressData: any) => {
          if (onProgress) {
            onProgress((progressData.percent * 100) | 0);
          }
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, data: any) => {
        if (err) reject(err.message);
        else resolve(data);
      },
    );
  });
}
