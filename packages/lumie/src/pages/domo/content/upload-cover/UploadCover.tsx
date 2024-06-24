import dayjs from 'dayjs';
import React, { useState } from 'react';

import { PostType } from '@/constants';
import { addPost } from '@/utils/apis';
import { uploadCloudFile } from '@/utils/apis/file';
import { getLocalUser } from '@/utils/store';
import { Button, ImageUpload } from '@horen/core';
import { notifications } from '@horen/notifications';

import css from './UploadCover.module.less';
import { IPost } from '@/types';
import { photoCompressedUrl } from '@/utils/uri';

export function UploadCover() {
  const [uploadForm, setUploadForm] = useState<IPost>({
    type: 'cover' as PostType,
    title: 'cover-' + dayjs().valueOf(),
    author: getLocalUser()?.username || '',
    status: 'publish',
  });
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = async (file: File) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: any = await uploadCloudFile(file, (percent) => {
      setProgress(percent);
    }).catch((err) => {
      notifications.show({
        variant: 'warning',
        message: err,
      });
      setStatus('failed');
    });

    if (!resp) {
      setStatus('failed');
      return;
    }

    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      setStatus('failed');
    } else {
      notifications.show({
        variant: 'success',
        message: '上传成功',
      });
      setStatus('success');

      if (resp.Location) {
        setUploadForm((prev) => ({ ...prev, url: 'https://' + resp.Location }));
      }
    }
  };

  const handleSubmit = () => {
    addPost(uploadForm)
      .then(() => {
        notifications.show({
          variant: 'success',
          message: '提交成功',
        });
        setUploadForm((prev) => ({
          ...prev,
          title: 'cover-' + dayjs().valueOf(),
          url: '',
        }));
      })
      .catch((err) => {
        notifications.show({
          variant: 'danger',
          message: err,
        });
      });
  };

  return (
    <div className={css.uploadCover}>
      <div className={css.uploadArea}>
        <ImageUpload
          progress={progress}
          onChange={handleChange}
          accept={[]}
          uploadStatus={status}
        />
        <div>
          <Button onClick={handleSubmit}>提交</Button>
          <Button variant="danger">取消</Button>
        </div>
      </div>
      <div className={css.coverPreview}>
        {uploadForm.url && <img src={photoCompressedUrl(uploadForm.url)} />}
      </div>
    </div>
  );
}
