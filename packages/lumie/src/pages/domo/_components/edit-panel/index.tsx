import React from "react";
import { IPost } from "@/types";
import { ArticleEditPanel } from './ArticleEditPanel';
import { PhotoEditPanel } from "./PhotoEditPanel";
import { VerseEditPanel } from './VerseEditPanel';
import dayjs from "dayjs";

export interface EditPanelProps {
  mode?: 'update' | 'create';
  type?: string;
  post?: IPost;
  onSubmit?(post: IPost): void;
  onCancel?(): void;
}

export default function EditPanel(props: EditPanelProps) {
  const { type, ...restProps } = props;

  const panels: Record<string, any> = {
    article: <ArticleEditPanel {...restProps} />,
    photo: <PhotoEditPanel {...restProps} />,
    cover: (
      <PhotoEditPanel
        {...restProps}
        post={{
          ...restProps.post,
          title: `cover-${dayjs().unix()}`,
          category: 'others',
          content: 'cover',
          description: 'this is a cover for gallery page.',
        }}
      />
    ),
    verse: <VerseEditPanel {...restProps} />,
  }

  return panels[type];
}