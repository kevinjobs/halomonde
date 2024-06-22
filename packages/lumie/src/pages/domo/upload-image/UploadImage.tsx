import React, { useState } from 'react';
import {
  Button,
  ImageUpload,
  Input,
  Segment,
  TagInput,
  TextArea,
} from '@horen/core';
import { notifications } from '@horen/notifications';
import Datepicker from 'react-datepicker';
import { useForm } from '@horen/hooks';
import { useStore } from '@horen/store';
import { store } from '@/store';
import { uploadFile } from '@/utils/apis/file';
import dayjs from 'dayjs';
import css from './UploadImage.module.less';
import { getExifs } from '@/utils/exif';
import { addPost } from '@/utils/apis';

export default function UploadImage() {
  const state = useStore(store);
  const form = useForm({
    initial: {
      type: 'photo',
      author: state?.user?.username,
      status: 'publish',
    },
    required: {
      title: '标题不能为空',
      url: '图片不能为空',
      tags: '标签不能为空',
      author: '作者不能为空',
    },
  });

  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = async (file: File) => {
    const resp = await uploadFile(file, (percent) => {
      setProgress(percent);
    });
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

      const data = resp.data;
      if (data) {
        getExifs(file).then((tags) => {
          form.setState('url', data.url);
          form.setState('exif', JSON.stringify(tags));
          form.setState('format', tags.fileType);
        });
      }
    }
  };

  const handleSubmit = () => {
    if (form.required) {
      const empties = [];
      for (const key in form.required) {
        if (!form.get(key).value) {
          empties.push(form.required[key]);
        }
      }

      if (empties.length > 0) {
        notifications.show({
          variant: 'warning',
          message: empties.join(','),
        });
      } else {
        toSubmit();
      }
    } else {
      toSubmit();
    }
  };

  const toSubmit = () => {
    addPost(form.data).then((resp) => {
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
      }
    });
  };

  return (
    <div className={css.uploadImage}>
      <div className={css.left}>
        <EditItem label="标题" required>
          <Input name="title" {...form.get('title')} />
        </EditItem>

        <EditItem label="Exif">
          <TextArea name="exif" rows={8} {...form.get('exif')} />
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

        <EditItem label="标签" required>
          <TagInput
            value={form.get('tags').value?.split('|')}
            onChange={(tags) => form.setState('tags', tags.join('|'))}
          />
        </EditItem>

        <EditItem label="简介">
          <Input name="content" {...form.get('content')} />
        </EditItem>

        <EditItem label="文件格式">
          <Input name="format" {...form.get('format')} />
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

        <EditItem label="作者" required>
          <Input
            name="author"
            placeholder="请输入作者姓名"
            {...form.get('author')}
          />
        </EditItem>
      </div>

      <div className={css.right}>
        <ImageUpload
          progress={progress}
          onChange={handleChange}
          accept={[]}
          uploadStatus={status}
        />
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

function EditItem({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className={css.editItem}>
      <label>
        {label}
        {required && <span className={css.required}>*</span>}
      </label>
      {children}
    </div>
  );
}
