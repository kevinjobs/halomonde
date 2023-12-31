import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonProps } from "./button";
import { Icon } from '../icon';

export type UploadButtonProps = {
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange?(e: React.ChangeEvent<HTMLInputElement>, value: File[]): void;
  name: string;
  /**
   * 是否接受多文件上传，默认为 false
   */
  multiple?: boolean;
  /**
   * 可接受上传的文件类型，默认为所有文件
   */
  accept?: string[];
  value?: File[];
} & Omit<ButtonProps, 'onClick' | 'onChange' | 'value'>;

export function UploadButton(props: UploadButtonProps) {
  const {
    onClick,
    onChange,
    name,
    multiple=false,
    accept,
    value=[],
    ...restProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [fs, setFs] = useState<File[]>(value);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.click();
    if (onClick) onClick(e);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e, [...fs, ...extractFiles(e.target.files)]);
    }
    setFs([...fs, ...extractFiles(e.target.files)]);
  }

  const extractFiles = (fileList: FileList | null) => {
    const arr = [];
    if (fileList) {
      for (const file of fileList) {
        const ext = file.type.split('/')[1];
        if (!fs.includes(file) && accept?.includes(ext)) arr.push(file);
      }
    }
    return arr;
  }

  useEffect(() => setFs(value), [value.length]);

  return (
    <Button
      style={{
        height: 32,
        padding: '4px 16px',
      }}
      type="line"
      onClick={handleClick}
      {...restProps}
    >
      <div style={{display: 'flex', alignItems: 'center',}}>
        <input
          type="file"
          style={{width: 0, height: 0,}}
          ref={ref}
          name={name}
          data-name={name}
          onChange={handleInputChange}
          multiple
          accept={accept?.map(a => '.'+a).join(',')}
        />
        <Icon name="upload" size={22} />
        <span
          style={{
            display: 'inline-block',
            height: 22,
            verticalAlign: 'top',
            lineHeight: '22px',
            marginLeft: 4
          }}
        >点击上传</span>
      </div>
    </Button>
  )
}
