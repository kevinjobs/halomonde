import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import React from 'react';
import Datepicker from 'react-datepicker';

import { API_URL } from '@/constants';
import { store } from '@/store';
import { IPost } from '@/types';
import { getExifs } from '@/utils/exif';
import {
  AvatarUpload,
  Button,
  Input,
  Select,
  TextArea,
  TagInput,
  Segment,
} from '@horen/core';
import { useForm } from '@horen/hooks';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import { EditPanelProps } from './';
import { default as _style } from './ArticleEditPanel.module.less';
import { default as _s } from './PhotoEditPanel.module.less';

const style = { ..._style, ..._s };

export interface PhotoEditPanelProps extends EditPanelProps {}

export function PhotoEditPanel({
  mode,
  post,
  onSubmit,
  onCancel,
}: PhotoEditPanelProps) {
  const state = useStore(store);
  const form = useForm({
    initial: {
      ...post,
      author: state?.user.username,
    },
  });

  const handleSubmit = (post: IPost) => {
    if (onSubmit) onSubmit(post);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any, file: File) => {
    getExifs(file).then((tags) => {
      form.setState('url', result.data.url);
      form.setState('exif', JSON.stringify(tags));
      form.setState('format', tags.fileType);
      notifications.show({ variant: 'success', message: '上传封面成功' });
    });
  };

  const handleUploadFailed = (msg: string) => {
    notifications.show({ variant: 'danger', message: msg });
  };

  return (
    <div className={style.editPost}>
      <div className={style.left}>
        <div className={style.photoPreview}>
          <img
            src={API_URL.base + form.data.url.replace(API_URL.base, '')}
            alt={form.data.title}
          />
        </div>
      </div>
      <div className={style.right}>
        <EditItem label="封面">
          <AvatarUpload
            url={API_URL.upload}
            defaultValue={form.get('url').value}
            onSuccess={handleUploadSuccess}
            onFailed={handleUploadFailed}
            token={state.user?.token}
          />
        </EditItem>
        <EditItem label="ID">
          <Input name="id" {...form.get('id')} disabled />
        </EditItem>
        <EditItem label="UID">
          <Input name="uid" {...form.get('uid')} disabled />
        </EditItem>
        <EditItem label="Type">
          <Select {...form.get('type')}>
            <Select.Item name="文章" value="article" />
            <Select.Item name="照片" value="photo" />
            <Select.Item name="封面" value="cover" />
            <Select.Item name="诗句" value="verse" />
          </Select>
        </EditItem>
        <EditItem label="Exif">
          <TextArea name="exif" rows={8} {...form.get('exif')} />
        </EditItem>
        <EditItem label="分类">
          <Select {...form.get('category')}>
            <Select.Item name="生活" value="life" />
            <Select.Item name="旅途" value="travel" />
            <Select.Item name="其他" value="others" />
          </Select>
        </EditItem>
        <EditItem label="状态">
          <Segment
            variant="primary"
            value={form.get('status').value}
            onChange={(v) => form.setState('status', v)}>
            <Segment.Item value="draft" label="草稿" />
            <Segment.Item value="publish" label="已发布" />
            <Segment.Item value="private" label="私密" />
          </Segment>
        </EditItem>
        <EditItem label="格式">
          <Select {...form.get('format')}>
            <Select.Item name="JPG" value="jpg" />
            <Select.Item name="JPEG" value="jpeg" />
            <Select.Item name="PNG" value="png" />
            <Select.Item name="WEBP" value="webp" />
          </Select>
        </EditItem>
        <EditItem label="标题">
          <Input name="title" {...form.get('title')} />
        </EditItem>
        <EditItem label="简介">
          <Input name="content" {...form.get('content')} />
        </EditItem>
        <EditItem label="创建时间">
          <Datepicker
            selected={
              form?.data.createAt && dayjs.unix(form?.data.createAt).toDate()
            }
            onChange={(d) =>
              form.get('createAt').onChange(null, dayjs(d).unix())
            }
            dateFormat={'yyyy-MM-dd'}
          />
        </EditItem>
        <EditItem label="更新时间">
          <Datepicker
            selected={
              form?.data.updateAt && dayjs.unix(form?.data.updateAt).toDate()
            }
            onChange={(d) =>
              form.get('updateAt').onChange(null, dayjs(d).unix())
            }
            dateFormat={'yyyy-MM-dd'}
          />
        </EditItem>
        <EditItem label="作者">
          <Input
            name="author"
            placeholder="请输入作者姓名"
            {...form.get('author')}
          />
        </EditItem>
        <EditItem label="标签">
          <TagInput
            value={form.get('tags').value.split('|')}
            onChange={(tags) => form.setState('tags', tags.join('|'))}
          />
        </EditItem>
        <EditItem label="备注">
          <Input
            name="description"
            placeholder="请输入其他情况"
            {...form.get('description')}
          />
        </EditItem>
        <div className={style.submitArea}>
          <Button onClick={() => handleSubmit(form.data)}>
            {mode === 'create' ? '新增' : '更新'}
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}

function EditItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={style.editItem}>
      <span className={style.itemLabel}>{label}</span>
      <span className={style.itemContent}>{children}</span>
    </div>
  );
}
