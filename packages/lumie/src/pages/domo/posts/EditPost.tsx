import React from "react";
import WE from 'wangeditor';
import marked from 'marked';

import { useForm } from "@horen/hooks";
import { notifications } from "@horen/notifications";

import { IPost } from "@/types";
import style from './EditPost.module.less';
import { AvatarUpload, Button, Input } from "@horen/core";
import { UPLOAD_URL } from "@/constants";

export interface EditPostProps {
  mode?: 'update' | 'create';
  type?: 'article' | 'picture' | 'cover' | 'verse' | string;
  post?: IPost;
  onSubmit?(post: IPost): void;
  onCancel?(): void;
}

const renderer = {
  image(href: string, title: string, text: string): string {
    return `
      <div style="display:flex;justify-content:center;flex-wrap:wrap;">
        <img src="${href}" alt="${text || title}" style="width:80%;" />
        <div style="width:100%;text-align:center;color:#777777;padding:8px 0;">${text}</div>
      </div>
    `;
  },
};

export default function EditPost({mode, type, post, onSubmit, onCancel}: EditPostProps) {
  marked.use({ renderer });

  const DEFAULT_POST: IPost = {
    title: '',
    author: '',
    updateAt: (new Date()).valueOf(),
    createAt: (new Date()).valueOf(),
    content: '',
    uid: '',
    id: 0,
    excerpt: '',
    tags: '',
    format: 'default',
    status: 'draft',
    type: type,
    category: 'default',
  };

  const form = useForm({initial: mode === 'create' ? DEFAULT_POST : post});
  const weditor = React.useRef<WE>(null);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form.data);
  }

  const handleCancel = () => {
    if (onCancel) onCancel();
  }

  const handleUploadSuccess = (result: any) => {
    notifications.show({type: 'success', message: '上传封面成功'});
  }

  const handleUploadFailed = (msg: string) => {
    notifications.show({type: 'error', message: msg});
  }

  React.useEffect(() => {
    if (document.querySelector('#article-editor')) {
      const c = form.get('content');
      weditor.current = new WE('#article-editor');
      weditor.current.config.height = 600;
      weditor.current.config.onchange = (t: string) => c.onChange(null, t);
      weditor.current.create();
      weditor.current.txt.html(c.value);
    }
    return () => weditor.current?.destroy();
  }, []);
  
  return (
    <div className={style.editPost}>
      <div className={style.left}>
        <div className={style.editorContainer}>
          <div className="" id='article-editor'></div>
        </div>
      </div>
      <div className={style.right}>
        <EditItem label='封面'>
          <AvatarUpload
            url={UPLOAD_URL}
            defaultValue={form.get('url').value}
            onSuccess={handleUploadSuccess}
            onFailed={handleUploadFailed}
          />
        </EditItem>
        <EditItem label="ID">
          <Input name="id" {...form.get('id')} disabled />
        </EditItem>
        <EditItem label="UID">
          <Input name="uid" {...form.get('uid')} disabled />
        </EditItem>
        <EditItem label="标题">
          <Input name="title" {...form.get('title')} />
        </EditItem>
        <EditItem label="梗概">
          <Input name="excerpt" {...form.get('excerpt')} />
        </EditItem>
        <EditItem label="作者">
          <Input name="author" {...form.get('author')} />
        </EditItem>
        <div className={style.submitArea}>
          <Button onClick={handleSubmit}>
            { mode === 'create' ? '新增' : '更新' }
          </Button>
          <Button type='error' onClick={handleCancel}>取消</Button>
        </div>
      </div>
    </div>
  )
}

function EditItem({label, children}: {label: string, children: React.ReactNode}) {
  return (
    <div className={style.editItem}>
      <span className={style.itemLabel}>{label}</span>
      <span className={style.itemData}>{children}</span>
    </div>
  )
}
