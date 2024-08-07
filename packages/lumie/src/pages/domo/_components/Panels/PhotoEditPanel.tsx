import React, { FormEvent, useRef } from 'react';

import { dateToStamp, stampToDate } from '@/utils/datetime';
import { EXIF_NAME, getExifs, IExif } from '@/utils/exif';
import { getLocalUser } from '@/utils/store';
import { Button, DatePicker, Segment, TagInput, TextInput } from '@horen/core';
import { FormCallbackData, useForm } from '@horen/hooks';

import { UploadCloud } from '../UploadCloud';
import { EditPanelProps } from './';
import css from './PhotoEditPanel.module.less';

export type PhotoEditPanelProps = EditPanelProps;

export function PhotoEditPanel({
  mode,
  defaultPost = {},
  onSubmit,
  onCancel,
}: PhotoEditPanelProps) {
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
      ...defaultPost,
    },
    validation: {
      title: (value) => (value ? null : '标题不能为空'),
      url: (value) => (value ? null : '图片不能为空'),
      // tags: (value) => (value ? null : '标签不能为空'),
      author: (value) => (value ? null : '作者不能为空'),
    },
  });

  const handleChange = (url: string, file: File) => {
    form.setValue('url', url);
    getExifs(file).then((exif) => {
      form.setValue('format', exif.fileType);
      form.setValue('createAt', exif.createDate);
      form.setValue('updateAt', exif.modifyDate);

      form.setValue('exif', JSON.stringify(exif));
    });
  };

  const handleSubmit = (
    data: FormCallbackData,
    evt: FormEvent<HTMLFormElement>,
  ) => {
    evt.preventDefault();
    console.log(data);
    if (Object.keys(data.errors).length === 0) {
      if (onSubmit) onSubmit(data.values);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  return (
    <div className={css.uploadImage}>
      <div>
        <div className={css.main}>
          <div className={css.right}>
            <UploadCloud {...form.getProps('url')} onChange={handleChange} />

            <ExifInfo
              exifData={
                form.getValues().exif
                  ? JSON.parse(form.getProps('exif').value)
                  : {}
              }
              onChange={(exif) => form.setValue('exif', exif)}
            />
          </div>

          <form className={css.left} onSubmit={form.onSubmit(handleSubmit)}>
            <EditItem>
              <span>
                <Segment
                  label="状态"
                  variant="primary"
                  value={form.getProps('status').value}
                  onChange={(v) => form.setValue('status', v)}>
                  <Segment.Item value="draft" label="草稿" />
                  <Segment.Item value="publish" label="已发布" />
                  <Segment.Item value="private" label="私密" />
                </Segment>
              </span>
            </EditItem>

            <EditItem>
              <TextInput
                label="标题"
                name="title"
                required
                {...form.getProps('title')}
              />
            </EditItem>

            <EditItem>
              <TagInput label="标签" {...form.getProps('tags')} />
            </EditItem>

            <EditItem>
              <TextInput
                label="简介"
                name="content"
                {...form.getProps('content')}
              />
            </EditItem>

            <EditItem>
              <TextInput
                label="文件格式"
                name="format"
                {...form.getProps('format')}
              />
            </EditItem>

            <EditItem>
              <DatePicker
                label="创建时间"
                value={stampToDate(form.getValue('createAt'))}
                onChange={(v) => form.setValue('createAt', dateToStamp(v))}
              />
            </EditItem>

            <EditItem>
              <DatePicker
                label="更新时间"
                value={stampToDate(form.getValue('updateAt'))}
                onChange={(v) => form.setValue('updateAt', dateToStamp(v))}
              />
            </EditItem>

            <EditItem>
              <TextInput
                label="作者"
                name="author"
                placeholder="请输入作者姓名"
                required
                {...form.getProps('author')}
              />
            </EditItem>

            <div className={css.bottom}>
              <Button type="submit" size="lg">
                {mode === 'create' ? '新增' : '更新'}
              </Button>
              <Button variant="danger" onClick={handleCancel} size="lg">
                取消
              </Button>
            </div>
          </form>
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
