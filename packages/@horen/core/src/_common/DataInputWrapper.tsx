import React from 'react';
import { classnames } from '../_utils';
import cls from './DataInputWrapper.module.less';

export interface DataInputWrapperProps {
  label?: string;
  labelPlacement?: 'top' | 'left';
  required?: boolean;
  error?: string;
  children?: React.ReactNode;
}

export function DataInputWrapper(props: DataInputWrapperProps) {
  const { label, labelPlacement = 'left', required, error, children } = props;

  const classname = classnames({
    [cls.wrapper]: true,
    [cls[labelPlacement]]: true,
    [cls.error]: Boolean(error),
  });

  return (
    <div className={classname}>
      <div>
        <div className={cls.label + ' horen-data-input-label'}>
          <span>{label}</span>
          {required && <span className={cls.required}>*</span>}
        </div>
        <div className={cls.content + ' horen-data-input-content'}>
          <div>{children}</div>
          {error && <div className={cls.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
