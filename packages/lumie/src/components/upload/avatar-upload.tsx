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
  const [pickFiles, setPickFiles] = useState<File[]>();
  const [status, setStatus] = useState('');
  const [maskWidth, setMaskWidth] = useState<string | number>('100%');

  const SUCCESS = 'success';
  const FAILED = 'failed';
  const UPLOADING = 'uploading';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, values: File[]) => {
    setPickFiles(values);
    (async() => {
      await upload({
        url: url,
        file: lastOne(values),
        onProgress: (per) => {
          setStatus(UPLOADING);
          setMaskWidth(`${per*100}%`);
        },
        onSuccess: (result) => {
          setStatus(SUCCESS);
          if (onSuccess) onSuccess(result);
        },
        onFailed: () => {
          setStatus(FAILED);
          if (onFailed) onFailed();
        }
      })
    })();
  }

  return (
    <div className='component-avatar-upload'>
      <div className='avatar-preview'>
        {
          pickFiles?.length > 0
           ? <img src={genUrl(pickFiles)} alt="avatar-preview" />
           : (defaultValue && <img src={defaultValue} alt="avatar-preview" />)
        }
        <div
          className='avatar-status-mask'
          style={{width: maskWidth}}
        ></div>
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

const lastOne = (arr: any[]) => {
  const a = [...arr];
  const f = a.reverse()[0];
  return f;
}

const genUrl = (files: File[]) => {
  const last = lastOne(files);
  if (last) return window.webkitURL.createObjectURL(last);
}
