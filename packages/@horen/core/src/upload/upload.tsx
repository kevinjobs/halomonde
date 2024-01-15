import React from 'react';

import { UploadButton, UploadButtonProps, } from '../button';
import css from './upload.module.less';

export interface UploadProps extends UploadButtonProps {}

export function Upload(props: UploadProps) {
  const { name='uploadFile', ...restProps } = props;

  return (
    <div className={css.upload}>
      <UploadButton name={name} {...restProps} />
    </div>
  )
}