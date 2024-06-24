import dayjs from 'dayjs';
import React from 'react';

import { IPost } from '@/types';

import { ArticleEditPanel } from './ArticleEditPanel';
import { VerseEditPanel } from './VerseEditPanel';
import { UploadCoverPanel } from '../../content/upload-cover';
import { UploadImagePanel } from '../../content/upload-image/UploadImage';

export interface EditPanelProps {
  mode?: 'update' | 'create';
  type?: string;
  post?: IPost;
  onSubmit?(post: IPost): void;
  onCancel?(): void;
}

export default function EditPanel(props: EditPanelProps) {
  const { type, ...restProps } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const panels: Record<string, any> = {
    article: <ArticleEditPanel {...restProps} />,
    photo: <UploadImagePanel {...restProps} photoPost={restProps.post} />,
    cover: (
      <UploadCoverPanel
        {...restProps}
        coverPost={{
          ...restProps.post,
          title: `cover-${dayjs().unix()}`,
          category: 'others',
          content: 'cover',
          description: 'this is a cover for gallery page.',
        }}
      />
    ),
    verse: <VerseEditPanel {...restProps} />,
  };

  return panels[type];
}
