import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import marked from 'marked';
import React, { FormEvent } from 'react';
import WE from 'wangeditor';

import { API_URL } from '@/constants';
import { store } from '@/store';
import {
  AvatarUpload,
  Button,
  TextInput,
  Select,
  Segment,
  TagInput,
} from '@horen/core';
import { useForm, FormData } from '@horen/hooks';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import { EditPanelProps } from '../../_components/EditPanel';
import { DatePicker } from '@/components/DatePicker';

import './ArticleEditPanel.css';
import style from './ArticleEditPanel.module.less';
import { IPost } from '@/types';

export type ArticleEditPanelProps = EditPanelProps;

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

export function ArticleEditPanel({
  mode,
  post,
  onSubmit,
  onCancel,
}: ArticleEditPanelProps) {
  marked.use({ renderer });

  const state = useStore(store);
  const form = useForm({
    initialValues: {
      ...post,
      format: 'html',
      author: state?.user.username,
    },
    validation: {
      title: (value) => {
        if (!value) return '标题不能为空';
        if (value.length > 50) return '标题不能超过50个字符';
        return null;
      },
      author: (value) => {
        if (!value) return '作者不能为空';
        if (value.length > 10) return '作者不能超过10个字符';
        return null;
      },
    },
  });
  const weditor = React.useRef<WE>(null);

  const handleSubmit = (data: FormData, evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(data.values);
    // if (onSubmit) onSubmit(data.values as IPost);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    form.setValue('url', result.data.url);
    notifications.show({ variant: 'success', message: '上传封面成功' });
  };

  const handleUploadFailed = (msg: string) => {
    notifications.show({ variant: 'danger', message: msg });
  };

  React.useEffect(() => {
    if (document.querySelector('#article-editor')) {
      const c = form.getProps('content');
      weditor.current = new WE('#article-editor');
      weditor.current.config.height = 600;
      weditor.current.config.onchange = (t: string) => c.onChange(t);
      weditor.current.create();
      weditor.current.txt.html(c.value);
    }
    return () => weditor.current?.destroy();
  }, []);

  return (
    <div className={style.editPost}>
      <div className={style.left}>
        <div className={style.editorContainer}>
          <div className="" id="article-editor"></div>
        </div>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={style.right}>
          <EditItem>
            <AvatarUpload
              url={API_URL.upload}
              defaultValue={form.getProps('url').value}
              onSuccess={handleUploadSuccess}
              onFailed={handleUploadFailed}
              token={state.user?.token}
            />
          </EditItem>

          <EditItem>
            <TextInput label="ID" name="id" {...form.getProps('id')} disabled />
          </EditItem>

          <EditItem>
            <TextInput
              label="UID"
              name="uid"
              {...form.getProps('uid')}
              disabled
            />
          </EditItem>

          <EditItem>
            <Select {...form.getProps('category')} label="分类">
              <Select.Item name="科幻" value="fiction" />
              <Select.Item name="小说" value="novel" />
              <Select.Item name="生活" value="life" />
            </Select>
          </EditItem>

          <EditItem>
            <label>Status</label>
            <Segment
              variant="primary"
              value={form.getProps('status').value}
              onChange={(v) => form.setValue('status', v)}>
              <Segment.Item value="draft" label="草稿" />
              <Segment.Item value="publish" label="已发布" />
              <Segment.Item value="private" label="私密" />
            </Segment>
          </EditItem>

          <EditItem>
            <Select {...form.getProps('format')} label="文本格式">
              <Select.Item name="网页" value="html" />
              <Select.Item name="Markdown" value="md" />
              <Select.Item name="纯文本" value="text" />
            </Select>
          </EditItem>

          <EditItem>
            <TextInput
              name="title"
              {...form.getProps('title')}
              label="标题"
              required
            />
          </EditItem>

          <EditItem>
            <TextInput
              name="excerpt"
              {...form.getProps('excerpt')}
              label="文章概括"
            />
          </EditItem>

          <EditItem>
            <DatePicker
              value={
                form.getValues().createAt &&
                dayjs.unix(form.getValues().createAt).toDate()
              }
              onChange={(d) =>
                form.getProps('createAt').onChange(null, dayjs(d).unix())
              }
            />
          </EditItem>

          <EditItem>
            <DatePicker
              value={
                form.getValues().updateAt &&
                dayjs.unix(form.getValues().updateAt).toDate()
              }
              onChange={(d) =>
                form.getProps('updateAt').onChange(null, dayjs(d).unix())
              }
            />
          </EditItem>

          <EditItem>
            <TextInput
              label="作者"
              name="author"
              placeholder="请输入作者姓名"
              {...form.getProps('author')}
              required
            />
          </EditItem>

          <EditItem>
            <TagInput {...form.getProps('tags')} label="标签" />
          </EditItem>

          <EditItem>
            <TextInput
              label="其他描述"
              name="description"
              placeholder="请输入其他需要描述的情况"
              {...form.getProps('description')}
            />
          </EditItem>
          <div className={style.submitArea}>
            <Button type="submit">{mode === 'create' ? '新增' : '更新'}</Button>
            <Button variant="danger" onClick={handleCancel}>
              取消
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function EditItem({ children }: { children: React.ReactNode }) {
  return <div className={style.editItem}>{children}</div>;
}
