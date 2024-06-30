import dayjs from 'dayjs';
import React, { FormEvent } from 'react';

import { store } from '@/store';
import { Button, TextInput, Select, Segment, TagInput } from '@horen/core';
import { useForm, FormCallbackData } from '@horen/hooks';
import { useStore } from '@horen/store';

import { EditPanelProps } from '..';
import { UploadCloud } from '../UploadCloud';
import { DatePicker } from '@/components/DatePicker';
import { RichTextEditor } from '@/components/RichTextEditor';

import './ArticleEditPanel.css';
import style from './ArticleEditPanel.module.less';
import { IPost } from '@/types';

export type ArticleEditPanelProps = EditPanelProps;

export function ArticleEditPanel({
  mode,
  defaultPost,
  onSubmit,
  onCancel,
}: ArticleEditPanelProps) {
  const state = useStore(store);
  const form = useForm({
    initialValues: {
      ...defaultPost,
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

  const handleSubmit = (
    data: FormCallbackData,
    evt: FormEvent<HTMLFormElement>,
  ) => {
    evt.preventDefault();
    if (onSubmit) onSubmit(data.values as IPost);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className={style.editPost}>
      <div className={style.left}>
        <div className={style.editorContainer}>
          <RichTextEditor {...form.getProps('content')} />
        </div>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={style.right}>
          <Segment
            variant="primary"
            value={form.getProps('status').value}
            onChange={(v) => form.setValue('status', v)}>
            <Segment.Item value="draft" label="草稿" />
            <Segment.Item value="publish" label="已发布" />
            <Segment.Item value="private" label="私密" />
          </Segment>
          <br />
          <br />

          <EditItem>
            <UploadCloud {...form.getProps('url')} />
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
            <Button variant="danger" size="lg" onClick={handleCancel}>
              取消
            </Button>
            <Button type="submit" size="lg">
              {mode === 'create' ? '新增' : '更新'}
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
