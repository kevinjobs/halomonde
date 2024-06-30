import React from 'react';

import { IPost } from '@/types';

import { ArticleEditPanel } from './ArticleEditPanel';
import { VerseEditPanel } from './VerseEditPanel';
import { CoverEditPanel } from './CoverEditPanel';
import { PhotoEditPanel } from './PhotoEditPanel';

export interface EditPanelProps {
  mode: 'update' | 'create';
  type?: string;
  defaultPost?: IPost;
  onSubmit(post: IPost): void;
  onCancel?(): void;
}

export default function EditPanel(props: EditPanelProps) {
  const { type, ...restProps } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const panels: Record<string, any> = {
    article: <ArticleEditPanel {...restProps} />,
    photo: <PhotoEditPanel {...restProps} />,
    cover: <CoverEditPanel {...restProps} />,
    verse: <VerseEditPanel {...restProps} />,
  };

  return panels[type];
}

export * from './ArticleEditPanel';
export * from './CoverEditPanel';
export * from './PhotoEditPanel';
export * from './VerseEditPanel';
