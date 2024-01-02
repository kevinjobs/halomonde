import React, { useState } from 'react';
import { Icon } from '../icon';
import { UploadButton } from '../button';
import css from './avatar-upload.module.less';

export interface UploadProps<T> {
  url: string;
  defaultValue?: string;
  onSuccess?(result: T): void;
  onFailed?(err: any): void;
}

export function AvatarUpload<T>(props: UploadProps<T>) {
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
        onFailed: (err) => {
          setStatus(FAILED);
          if (onFailed) onFailed(err);
        } ,
        onSuccess: (result) => {
          setStatus(SUCCESS);
          if (onSuccess) onSuccess(result);
        },
        onProgress: (per) => {
          setStatus(UPLOADING);
          setMaskWidth(`${per}%`);
        }
      })
    })();
  }

  return (
    <div className={css.componentAvatarUpload}>
      <div className={css.avatarPreview}>
        {
          (pickFiles && pickFiles?.length > 0)
           ? <img src={genUrl(pickFiles)} alt="avatar-preview" />
           : (defaultValue && <img src={defaultValue} alt="avatar-preview" />)
        }
        <div
          className={css.avatarStatusMask}
          style={{width: maskWidth}}
        ></div>
        <div className={css.avatarStatus}>
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
  onFailed?(msg: string): void;
}

async function upload({file, url, onProgress, onSuccess, onFailed}: UploadParams) {
  const formdata = new FormData();
  formdata.append('file', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
    }
  }
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const per = Math.ceil((e.loaded / e.total) * 100);
      onProgress(per);
    }
  }
  xhr.upload.onload = (e) => {

  }
  xhr.send(formdata);
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
