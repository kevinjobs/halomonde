import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import React from 'react';
import Datepicker from 'react-datepicker';

import { UPLOAD_URL, BASE_URL } from '@/constants';
import { IPost } from '@/types';
import { AvatarUpload, Button, Input, Select } from '@horen/core';
import { useForm } from '@horen/hooks';
import { notifications } from '@horen/notifications';

import { EditPanelProps } from '.';
import style from './ArticleEditPanel.module.less';

export interface PhotoEditPanelProps extends EditPanelProps {}

export function PhotoEditPanel({mode, post, onSubmit, onCancel}: PhotoEditPanelProps) {
  const form = useForm({initial: post});

  const handleSubmit = (post: IPost) => {
    if (onSubmit) onSubmit(post);
  }

  const handleCancel = () => {
    if (onCancel) onCancel();
  }

  const handleUploadSuccess = (result: any) => {
    form.setState('url', result.data.url);
    notifications.show({type: 'success', message: '上传封面成功'});
  }

  const handleUploadFailed = (msg: string) => {
    notifications.show({type: 'error', message: msg});
  }
  
  return (
    <div className={style.editPost}>
      <div className={style.left}>
        <div className={style.photoPreview}>
          <img
            src={BASE_URL + form.data.url.replace(BASE_URL, '')}
            alt={form.data.title}
          />
        </div>
      </div>
      <div className={style.right}>
        <EditItem label='封面'>
          <AvatarUpload
            url={UPLOAD_URL}
            defaultValue={form.get('url').value}
            onSuccess={handleUploadSuccess}
            onFailed={handleUploadFailed}
            token={localStorage.getItem('token')}
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
        <EditItem label="分类">
          <Select {...form.get('category')}>
            <Select.Item name="生活" value="life" />
            <Select.Item name="旅途" value="travel" />
            <Select.Item name="其他" value="others" />
          </Select>
        </EditItem>
        <EditItem label="状态">
          <Select {...form.get('status')}>
            <Select.Item name="已发布" value="publish" />
            <Select.Item name="草稿" value="draft" />
            <Select.Item name="私密" value="private" />
          </Select>
        </EditItem>
        <EditItem label="格式">
          <Select {...form.get('format')}>
            <Select.Item name="JPG" value="jpeg" />
            <Select.Item name="JPEG" value="JPEG" />
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
            selected={form?.data.createAt && dayjs.unix(form?.data.createAt).toDate()}
            onChange={d => form.get('createAt').onChange(null, dayjs(d).unix())}
            dateFormat={'yyyy-MM-dd'}
          />
        </EditItem>
        <EditItem label="更新时间">
          <Datepicker
            selected={form?.data.updateAt && dayjs.unix(form?.data.updateAt).toDate()}
            onChange={d => form.get('updateAt').onChange(null, dayjs(d).unix())}
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
          <Input name="tags" {...form.get('tags')} />
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
      <span className={style.itemContent}>{children}</span>
    </div>
  )
}
