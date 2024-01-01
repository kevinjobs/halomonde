import api from "@/utils/axios";
import { BASE_URL, FILE_LIST_URL, FILE_URL } from "@/constants";
import { IFile, Response } from "@/types";

interface FileListData {
  amount: number;
  files: IFile[];
  totals: number;
  limit: number;
  offset: number;
}

interface FileListParams {
  offset?: number;
  limit?: number;
}

export async function fetchFileList(params?: FileListParams) :Response<FileListData> {
  const resp = await api.get(FILE_LIST_URL, {params});
  if (resp.data.code === 0) {
    resp.data.data.files.forEach((f: IFile) => {
      f.url = BASE_URL + '/static/thumb-' + f.filename;
    });
    return resp.data;
  };
  return resp.data.msg;
}

export async function deleteFileByFilename(filename: string) :Response {
  const resp = await api.delete(FILE_URL, {params: {filename}});
  if (resp.data.code === 0) return resp.data;
  return resp.data.msg;
}
