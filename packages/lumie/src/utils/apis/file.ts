import { API_URL, } from '@/constants';

import api from '../network';
import { ApiResponse, } from './';

export type FileRespData = {
  filename: string;
  filepath: string;
  origin: string;
  url?: string;
}

export type UploadReturnType = {
  ext: string;
  filename: string;
  height: number;
  width: number;
  origin: string;
  url: string;
}

export type FileListRespData = {
  amount: number;
  files: FileRespData[];
  totals: number;
  limit: number;
  offset: number;
}

export type GetFileListParams = {
  offset?: number;
  limit?: number;
}

export async function getFileList(params?: GetFileListParams) :ApiResponse<FileListRespData> {
  const resp = await api.get(API_URL.fileList, {params});
  if (resp.data.code === 0) {
    resp.data.data.files.forEach((f: FileRespData) => {
      f.url = API_URL.base + '/static/thumb-' + f.filename;
    });
    return resp.data;
  };
  return resp.data.msg;
}

export async function deleteFileByFilename(filename: string) :ApiResponse {
  const resp = await api.delete(API_URL.file, {params: {filename}});
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}
