import React, { useState } from 'react';
import ExifReader, { Tags as ExifTags } from 'exifreader';
import axios, { AxiosRequestConfig } from 'axios';
import { UploadButton, Icon } from '@horen/core';
import './avatar-upload.css';
import { UploadReturnType } from '@/types';

export interface UploadProps {
  url: string;
  defaultValue?: string;
  onSuccess?(result: UploadReturnType): void;
  onFailed?(): void;
}

export function AvatarUpload(props: UploadProps) {
  const { url, defaultValue, onSuccess, onFailed } = props;
  const [pickFiles, setPickFiles] = useState<File[]>([]);
  const [status, setStatus] = useState('');

  const SUCCESS = 'success';
  const FAILED = 'failed';

  const handleChange = (_: any, values: File[]) => {
    setPickFiles([values.pop()]);
    upload({
      url: url,
      file: values.pop(),
      onProgress: (per) => {},
      onSuccess: (result) => {
        setStatus(SUCCESS);
        if (onSuccess) onSuccess(result);
      },
      onFailed: () => {
        setStatus(FAILED);
        if (onFailed) onFailed();
      }
    });
  }

  return (
    <div className='component-avatar-upload'>
      <div className='avatar-preview'>
        {
          pickFiles.length > 0
           ? <img src={genUrl(pickFiles[0])} />
           : <img src={defaultValue} />
        }
        {
          (status === SUCCESS || status === FAILED)
          && <div className='avatar-status-mask'></div>
        }
        <div className='avatar-status'>
          {status === SUCCESS && <Icon name='correct' />}
          {status === FAILED && <Icon name='error' />}
        </div>
      </div>
      <UploadButton
        name='avatar-upload'
        onChange={handleChange}
        multiple={false}
        value={pickFiles}
      />
    </div>
  )
}

type UploadParams = {
  file: File;
  url: string;
  onProgress(per: number): void;
  onSuccess(result: any): void;
  onFailed(msg: string): void;
}

async function upload({file, url, onProgress, onSuccess, onFailed}: UploadParams) {
  const formdata = new FormData();
  formdata.append('file', file);
  const config: AxiosRequestConfig = {
    method: 'post',
    data: formdata,
    url: url,
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    onUploadProgress(progressEvent) {
      const per = Number((progressEvent.loaded / progressEvent.total).toFixed(1));
      onProgress(per);
    },
  };
  const resp = await axios(config);
  if (resp.data.code === 0) onSuccess(resp.data.data);
  else onFailed(resp.data.msg);
}

async function readExif(file: File) {
  return await ExifReader.load(file);
}

const genUrl = (file: File) => {
  return window.webkitURL.createObjectURL(file);
}