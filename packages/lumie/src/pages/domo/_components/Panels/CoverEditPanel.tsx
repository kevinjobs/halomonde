import dayjs from 'dayjs';
import React, { useState } from 'react';

import css from './CoverEditPanel.module.less';
import { IPost } from '@/types';
import { photoCompressedUrl } from '@/utils/uri';
import { UploadCloud } from '../UploadCloud';

import { EditPanelProps } from '.';
import { Button } from '@horen/core';
import { getLocalUser } from '@/utils/store';

export type CoverEditPanelProps = EditPanelProps;

export function CoverEditPanel({
  mode,
  defaultPost = {},
  onSubmit,
  onCancel,
}: CoverEditPanelProps) {
  const [coverForm, setCoverForm] = useState<IPost>({
    ...defaultPost,
    type: 'cover',
    title: `cover-${dayjs().unix()}`,
    category: 'others',
    content: 'cover',
    description: 'this is a cover for gallery page.',
    author: getLocalUser().username || 'no-name',
  });

  const handleSubmit = () => {
    if (onSubmit) onSubmit(coverForm);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className={css.uploadCover}>
      <div className={css.coverPreview}>
        {coverForm.url && (
          <img
            title="cover"
            alt="cover"
            src={photoCompressedUrl(coverForm.url)}
          />
        )}
      </div>
      <div>
        <UploadCloud
          value={coverForm.url}
          onChange={(url) => setCoverForm((prev) => ({ ...prev, url }))}
        />
        <Button onClick={handleSubmit}>
          {mode === 'create' ? '新增' : '更新'}
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
