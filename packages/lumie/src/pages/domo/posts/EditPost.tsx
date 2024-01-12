import React from "react";
import WE from 'wangeditor';
import marked from 'marked';

import { useForm } from "@horen/hooks";
import { IPost } from "@/types";
import style from './EditPost.module.less';
import { Input } from "@horen/core";

export interface EditPostProps {
  post?: IPost;
}

const renderer = {
  image(href: string, title: string, text: string): string {
    return `
      <div style="display:flex;justify-content:center;flex-wrap:wrap;">
        <img src="${href}" alt="${text || title}" style="width:80%;" />
        <div style="width:100%;text-align:center;color:#777777;">${text}</div>
      </div>
    `;
  },
};

export default function EditPost({post}: EditPostProps) {
  marked.use({ renderer });

  const form = useForm({initial: post});
  const weditor = React.useRef<WE>(null);

  React.useEffect(() => {
    if (document.querySelector('#article-editor')) {
      const c = form.get('content');
      weditor.current = new WE('#article-editor');
      weditor.current.config.height = 300;
      weditor.current.config.onchange = (t: string) => c.onChange('content', t);
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
        <EditItem label="标题">
          <Input name="title" {...form.get('title')} />
        </EditItem>
        <EditItem label="ID">
          <Input name="id" {...form.get('id')} disabled />
        </EditItem>
        <EditItem label="UID">
          <Input name="uid" {...form.get('uid')} disabled />
        </EditItem>
        <EditItem label="作者">
          <Input name="author" {...form.get('author')} />
        </EditItem>
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