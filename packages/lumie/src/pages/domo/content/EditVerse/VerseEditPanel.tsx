import React, { useState } from 'react';

import { Button, Input } from '@horen/core';

import { EditPanelProps } from '../../_components/EditPanel';
import style from './VerseEditPanel.module.less';

export interface VerseEditPanelProps extends EditPanelProps {}

export function VerseEditPanel({
  post,
  onSubmit,
  onCancel,
  mode,
}: VerseEditPanelProps) {
  const [verse1, setVerse1] = useState<string>(
    post.content.split('|')[0] || '',
  );
  const [verse2, setVerse2] = useState<string>(
    post.content.split('|')[1] || '',
  );
  const [author, setAuthor] = useState<string>(post.author);
  const [title, setTitle] = useState(post.title);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        ...post,
        author,
        title,
        content: [verse1, verse2].join('|'),
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
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>第一句</span>
        <Input value={verse1} onChange={(e) => setVerse1(e.target.value)} />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>第二句</span>
        <Input value={verse2} onChange={(e) => setVerse2(e.target.value)} />
      </div>
      <div className={style.verseEditItem}>
        <span className={style.itemLabel}>作者</span>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
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
