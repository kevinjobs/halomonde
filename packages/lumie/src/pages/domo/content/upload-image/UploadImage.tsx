import React, { useRef, useState } from 'react';
import { Button, ImageUpload, Input, Segment, TagInput } from '@horen/core';
import { notifications } from '@horen/notifications';
import Datepicker from 'react-datepicker';
import { useForm } from '@horen/hooks';
import { useStore } from '@horen/store';
import { store } from '@/store';
import { uploadCloudFile } from '@/utils/apis/file';
import dayjs from 'dayjs';
import css from './UploadImage.module.less';
import { EXIF_NAME, IExif, getExifs } from '@/utils/exif';
import { addPost } from '@/utils/apis';
import { nowStamp, stampToDate } from '@/utils/datetime';

export default function UploadImage() {
  const state = useStore(store);
  const form = useForm({
    initial: {
      title: '',
      type: 'photo',
      author: state?.user?.username,
      status: 'publish',
      exif: '',
      tags: '',
      description: '',
      format: '',
      createAt: null,
      updateAt: null,
      url: '',
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
    getExifs(file).then((tags) => {
      form.setState('exif', JSON.stringify(tags));
      form.setState('format', tags.fileType);
      // 从 exif 中读取图片时间，如果没有则设为当前时间
      form.setState('createAt', tags.createDate || nowStamp());
      form.setState('updateAt', tags.modifyDate || nowStamp());
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
        form.setState('url', 'https://' + resp.Location);
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
        form.clear();
        form.reset();
      }
    });
  };

  return (
    <div className={css.uploadImage}>
      <div className={css.main}>
        <div className={css.left}>
          <EditItem label="标题" required>
            <Input name="title" {...form.get('title')} />
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
              value={form.get('tags').value?.split('|') || []}
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
              selected={stampToDate(form.get('createAt').value)}
              onChange={(d) =>
                form.get('createAt').onChange(null, dayjs(d).unix())
              }
              dateFormat={'yyyy-MM-dd HH:mm:ss'}
            />
          </EditItem>

          <EditItem label="更新时间">
            <Datepicker
              selected={stampToDate(form.get('updateAt').value)}
              onChange={(d) =>
                form.get('updateAt').onChange(null, dayjs(d).unix())
              }
              dateFormat={'yyyy-MM-dd HH:mm:ss'}
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

          <ExifInfo
            exifData={form.data.exif ? JSON.parse(form.get('exif').value) : {}}
            onChange={(exif) => form.setState('exif', exif)}
          />
        </div>

        <div className={css.bottom}>
          <div>
            <Button variant="danger">清空</Button>
            <Button onClick={handleSubmit}>提交</Button>
          </div>
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
