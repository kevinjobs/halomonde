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
    accept=[],
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
    const tmp = [...fs, ...extractFiles(e.target.files)];
    if (onChange) onChange(e, tmp);
    setFs(tmp);
  }

  const extractFiles = (fileList: FileList | null) => {
    const arr = [];
    if (fileList) {
      for (const file of fileList) {
        const ext = file.type.split('/')[1];
        if (!fs.includes(file)) {
          if (accept.length === 0 || accept?.includes(ext)) {
            arr.push(file);
          }
        } 
      }
    }
    return arr;
  }

  const deepChange = () => {
    const names: number[] = [];
    for (let i=0; i<100; i++) names.push(i);
    const arr = names.slice(value.length);
    const final: Array<string | number> = [];

    for (let i=0; i<value.length; i++) {
      if (value[i]) final.push(value[i]?.name);
    }
    return [...final, ...arr];
  }

  useEffect(() => setFs(value), [...deepChange()]);

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
          title={name}
          placeholder=""
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
