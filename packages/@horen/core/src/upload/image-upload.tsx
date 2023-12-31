import React, { useEffect, useState } from 'react';
import { UploadButton, UploadButtonProps } from '../button';
import css from './image-upload.module.less';

export interface ImageUploadProps extends UploadButtonProps {}

export function ImageUpload(props: ImageUploadProps) {
  const {
    onChange,
    name,
    accept=['jpg', 'png', 'jpeg', 'webp'],
    value=[],
    ...restProps
  } = props;
  const [files, setFiles] = useState<File[]>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: File[]) => {
    setFiles(value);
    if (onChange) onChange(e, value);
  }

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>, file: File) => {
    const idx = files.indexOf(file);
    const arr = [...files];
    arr.splice(idx, 1);
    setFiles(arr);
    if (onChange) onChange(e as any, arr);
  }

  // 当文件列表长度变化时更新数据
  // to-do: 应当通过深比较更新数据
  useEffect(() => setFiles(value), [value.length]);

  return (
    <div className={css.imageUpload}>
      <UploadButton
        onChange={handleChange}
        name={name}
        value={files}
        accept={accept}
        {...restProps}
      />
      <div className={css.preview}>
        {files.map(f => (
          <PreviewItem
            file={f}
            name={name}
            key={f.name + f.size}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

const PreviewItem = ({file, name, onDelete}: {file: File, name: string, onDelete(e: React.MouseEvent<HTMLSpanElement>, file: File): void}) => (
  <div className={css.previewItem}>
    <img  src={genUrl(file)} alt={file.name} className={css.previewDesc} />
    <div className={css.previewDesc}>
      <span>{file.name}</span>
    </div>
    <div className={css.previewDel}>
      <span onClick={e => onDelete(e, file)} data-name={name}>×</span>
    </div>
  </div>
)

const genUrl = (file: File) => {
  return window.webkitURL.createObjectURL(file);
}
