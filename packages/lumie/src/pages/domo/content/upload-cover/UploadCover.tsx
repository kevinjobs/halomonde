import dayjs from 'dayjs';
import React, { useState } from 'react';

import { PostType } from '@/constants';
import { addPost, updatePost } from '@/utils/apis';
import { uploadCloudFile } from '@/utils/apis/file';
import { getLocalUser } from '@/utils/store';
import { Button, ImageUpload } from '@horen/core';
import { notifications } from '@horen/notifications';

import css from './UploadCover.module.less';
import { IPost } from '@/types';
import { photoCompressedUrl } from '@/utils/uri';

export function UploadCoverDomo() {
  return <UploadCoverPanel />;
}

export interface UploadCoverPanelProps {
  coverPost?: IPost;
  mode?: 'create' | 'update';
  onSubmit?: (post: IPost) => void;
  onCancel?: () => void;
}

export function UploadCoverPanel({
  coverPost = {},
  mode = 'create',
  onSubmit,
  onCancel,
}: UploadCoverPanelProps) {
  const defaultCover = {
    type: 'cover' as PostType,
    title: 'cover-' + dayjs().valueOf(),
    author: getLocalUser()?.username || '',
    status: 'publish',
  };

  const [uploadForm, setUploadForm] = useState<IPost>({
    ...defaultCover,
    ...coverPost,
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
    if (mode === 'create') {
      addPost(uploadForm)
        .then((resp) => {
          if (typeof resp === 'string') {
            notifications.show({
              variant: 'warning',
              message: resp,
            });
          }

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
    }

    if (mode === 'update') {
      updatePost(uploadForm.uid, uploadForm)
        .then((resp) => {
          if (typeof resp === 'string') {
            notifications.show({
              variant: 'warning',
              message: resp,
            });
          }

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
    }

    if (onSubmit) onSubmit(uploadForm);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className={css.uploadCover}>
      <div className={css.coverPreview}>
        {uploadForm.url && <img src={photoCompressedUrl(uploadForm.url)} />}
      </div>
      <div className={css.uploadArea}>
        <ImageUpload
          progress={progress}
          onChange={handleChange}
          accept={[]}
          uploadStatus={status}
        />
        <div>
          <Button onClick={handleSubmit}>提交</Button>
          <Button variant="danger" onClick={handleCancel}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
