import React, { useState } from 'react';

import { Button, TextInput } from '@horen/core';

import { EditPanelProps } from '.';
import style from './VerseEditPanel.module.less';
import { nowStamp } from '@/utils/datetime';

export type VerseEditPanelProps = EditPanelProps;

export function VerseEditPanel({
  defaultPost = {},
  onSubmit,
  onCancel,
  mode,
}: VerseEditPanelProps) {
  const [verse1, setVerse1] = useState<string>(
    defaultPost?.content?.split('|')[0] || '',
  );
  const [verse2, setVerse2] = useState<string>(
    defaultPost?.content?.split('|')[1] || '',
  );
  const [author, setAuthor] = useState<string>(defaultPost.author);
  const [title, setTitle] = useState(defaultPost.title);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        ...defaultPost,
        author,
        title,
        content: [verse1, verse2].join('|'),
        createAt: mode === 'create' && nowStamp(),
        updateAt: mode === 'update' && nowStamp(),
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className={style.verseEdit}>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>标题</span>
        <TextInput
          value={title}
          onChange={(value) => setTitle(String(value))}
        />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>第一句</span>
        <TextInput
          value={verse1}
          onChange={(value) => setVerse1(String(value))}
        />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>第二句</span>
        <TextInput
          value={verse2}
          onChange={(value) => setVerse2(String(value))}
        />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>作者</span>
        <TextInput
          value={author}
          onChange={(value) => setAuthor(String(value))}
        />
      </div>
      <div className={style.submitVerse}>
        <Button onClick={handleSubmit}>
          {mode === 'create' ? '新增' : '更新'}
        </Button>
        <Button onClick={handleCancel} variant="danger">
          取消
        </Button>
      </div>
    </div>
  );
}
