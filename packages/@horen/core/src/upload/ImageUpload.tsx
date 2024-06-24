import React, { useEffect, useState } from 'react';
import { UploadButton, UploadButtonProps } from '../button';
import { Icon } from '../icon';
import { niceBytes } from '../_utils';

import css from './ImageUpload.module.less';

export interface ImageUploadProps
  extends Omit<UploadButtonProps, 'onChange' | 'name'> {
  description?: React.ReactNode;
  limitSize?: number;
  onChange?: (files: File) => void;
  progress?: number;
  uploadStatus: 'success' | 'failed' | '' | string;
  title?: string;
}

export function ImageUpload(props: ImageUploadProps) {
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, file: File) => {
    e.preventDefault();
    if (onChange) onChange(file);
    setPreviewFile(file);
  };

  const {
    onChange,
    accept = ['jpg', 'png', 'jpeg', 'webp'],
    description = <Desc accept={accept} onChange={handleChange} />,
    limitSize = 1024 * 1024 * 2,
    progress = 0,
    uploadStatus = '',
    title = '',
  } = props;

  const cls =
    css.imageUpload + (uploadStatus === 'failed' ? ' ' + css.uploadFailed : '');

  return (
    <div className={cls}>
      <div className={css.header}>{title && <span>{title}</span>}</div>
      <div className={css.prompt}>
        <div>
          <div className={css.uploadIcon}>
            <Icon name="upload" size={40} fill="#707070" />
          </div>
          <div className={css.desc}>{description}</div>
          <div className={css.limitSize}>
            <span>图片大小不超过: </span>
            {niceBytes(limitSize)}
          </div>
        </div>
      </div>
      <div className={css.preview}>
        {previewFile && (
          <>
            <img src={URL.createObjectURL(previewFile)} alt="preview" />
            <span>
              <div>{previewFile.name}</div>
              <div>类型: {previewFile.type}</div>
              <div>大小: {niceBytes(previewFile.size)}</div>
              <div>
                <div className={css.progressUnfinished}></div>
                <div
                  className={css.progress}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Desc({
  onClick,
  onChange,
  accept,
}: {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, file: File) => void;
  accept: string[];
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ref.current?.click();
    if (onClick) onClick(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (const file of files) {
        const ext = file.type.split('/')[1];

        if (accept.length === 0) {
          if (onChange) onChange(e, file);
          return;
        }

        if (accept?.includes(ext)) {
          if (onChange) onChange(e, file);
        }
      }
    }
  };

  return (
    <div>
      <a href="#" onClick={handleClick}>
        点击
      </a>
      <span>或拖入图片以上传</span>
      <input
        placeholder="input a file"
        name="input-file"
        type="file"
        style={{ width: 0, height: 0 }}
        ref={ref}
        onChange={handleChange}
        accept="application/*,image/*"
      />
    </div>
  );
}
