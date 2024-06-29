import dayjs from 'dayjs';
import React, { FormEvent, useRef, useState } from 'react';
import Datepicker from 'react-datepicker';

import { IPost } from '@/types';
import { addPost, updatePost } from '@/utils/apis';
import { uploadCloudFile } from '@/utils/apis/file';
import { nowStamp, stampToDate } from '@/utils/datetime';
import { EXIF_NAME, getExifs, IExif } from '@/utils/exif';
import { getLocalUser } from '@/utils/store';
import { photoThumbUrl } from '@/utils/uri';
import { Button, ImageUpload, TextInput, Segment, TagInput } from '@horen/core';
import { useForm } from '@horen/hooks';
import { notifications } from '@horen/notifications';

import css from './UploadPhoto.module.less';

export default function UploadImageDomo() {
  return (
    <div className={css.uploadImage}>
      <UploadImagePanel />
    </div>
  );
}

export interface UploadImagePanelProps {
  photoPost?: IPost;
  mode?: 'create' | 'update';
  onSubmit?: (post: IPost) => void;
  onCancel?: () => void;
}

export function UploadImagePanel({
  photoPost = {},
  mode = 'create',
  onSubmit,
  onCancel,
}: UploadImagePanelProps) {
  const form = useForm({
    initialValues: {
      title: '',
      type: 'photo',
      author: getLocalUser()?.username,
      status: 'publish',
      exif: '',
      tags: '',
      description: '',
      format: '',
      createAt: null,
      updateAt: null,
      url: '',
      ...photoPost,
    },
    validation: {
      title: (value) => (value ? null : '标题不能为空'),
      url: (value) => (value ? null : '图片不能为空'),
      tags: (value) => (value ? null : '标签不能为空'),
      author: (value) => (value ? null : '作者不能为空'),
    },
  });

  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = async (file: File) => {
    getExifs(file).then((tags) => {
      form.setValue('exif', JSON.stringify(tags));
      form.setValue('format', tags.fileType);
      // 从 exif 中读取图片时间，如果没有则设为当前时间
      form.setValue('createAt', tags.createDate || nowStamp());
      form.setValue('updateAt', tags.modifyDate || nowStamp());
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: any = await uploadCloudFile(file, (percent) => {
      setProgress(percent);
    }).catch((err) => {
      notifications.show({
        variant: 'warning',
        message: err,
      });
    });

    if (!resp) return;

    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      setStatus('failed');
    } else {
      notifications.show({
        variant: 'success',
        message: '上传成功',
      });
      setStatus('success');

      if (resp.Location) {
        form.setValue('url', 'https://' + resp.Location);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any, evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (Object.keys(values.errors).length === 0) {
      toSubmit();
    } else {
      notifications.show({
        variant: 'warning',
        message: '请检查表单',
      });
    }
  };

  const toSubmit = () => {
    if (mode === 'create') toAdd();
    if (mode === 'update') toUpdate();
  };

  const toUpdate = () => {
    updatePost(form.getValues().uid, form.getValues()).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({
          variant: 'warning',
          message: resp,
        });
      } else {
        notifications.show({
          variant: 'success',
          message: '成功',
        });
        form.clear();
        form.reset();
      }
    });
  };

  const toAdd = () => {
    addPost(form.getValues()).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({
          variant: 'warning',
          message: resp,
        });
      } else {
        notifications.show({
          variant: 'success',
          message: '成功',
        });
        form.clear();
        form.reset();
      }
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  return (
    <div className={css.uploadImage}>
      <div className={css.main}>
        <form className={css.left} onSubmit={form.onSubmit(handleSubmit)}>
          <EditItem>
            <TextInput
              label="标题"
              labelPlacement="top"
              name="title"
              required
              {...form.getProps('title')}
            />
          </EditItem>

          <EditItem>
            <label>状态</label>
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
            <TagInput
              label="标签"
              labelPlacement="top"
              value={form.getProps('tags').value?.split('|') || []}
              onChange={(tags) => form.setValue('tags', tags.join('|'))}
            />
          </EditItem>

          <EditItem>
            <TextInput
              label="简介"
              name="content"
              labelPlacement="top"
              {...form.getProps('content')}
            />
          </EditItem>

          <EditItem>
            <TextInput
              label="文件格式"
              name="format"
              labelPlacement="top"
              {...form.getProps('format')}
            />
          </EditItem>

          <EditItem>
            <label>创建日期</label>
            <Datepicker
              selected={stampToDate(form.getProps('createAt').value)}
              onChange={(d) =>
                form.getProps('createAt').onChange(null, dayjs(d).unix())
              }
              dateFormat={'yyyy-MM-dd HH:mm:ss'}
            />
          </EditItem>

          <EditItem>
            <label>更新日期</label>
            <Datepicker
              selected={stampToDate(form.getProps('updateAt').value)}
              onChange={(d) =>
                form.getProps('updateAt').onChange(null, dayjs(d).unix())
              }
              dateFormat={'yyyy-MM-dd HH:mm:ss'}
            />
          </EditItem>

          <EditItem>
            <TextInput
              label="作者"
              name="author"
              placeholder="请输入作者姓名"
              labelPlacement="top"
              required
              {...form.getProps('author')}
            />
          </EditItem>

          <div className={css.bottom}>
            <Button type="submit">提交</Button>
            <Button variant="danger" onClick={handleCancel}>
              取消
            </Button>
          </div>
        </form>

        <div className={css.right}>
          <ImageUpload
            defaultPreviewURL={photoThumbUrl(form.getProps('url').value)}
            progress={progress}
            onChange={handleChange}
            accept={[]}
            uploadStatus={status}
          />

          <ExifInfo
            exifData={
              form.getValues().exif
                ? JSON.parse(form.getProps('exif').value)
                : {}
            }
            onChange={(exif) => form.setValue('exif', exif)}
          />
        </div>
      </div>
    </div>
  );
}

function EditItem({
  children,
}: {
  label?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return <div className={css.editItem}>{children}</div>;
}

function ExifInfo({
  exifData,
  onChange,
}: {
  exifData: IExif;
  onChange: (exif: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (onChange) onChange(JSON.stringify({ ...exifData, [name]: value }));
  };

  const exifs = [];

  for (const key in exifData) {
    exifs.push(
      <div key={key} className={css.exifItem}>
        <label>{EXIF_NAME[key]}</label>
        <span>
          <input
            title="hello"
            name={key}
            defaultValue={exifData[key]}
            value={exifData[key]}
            onChange={handleChange}
          />
        </span>
      </div>,
    );
  }

  return (
    <div className={css.exifInfo} ref={ref}>
      {exifs}
    </div>
  );
}
