import React, { useRef } from "react";
import { Button, ButtonProps } from "./button";

export type UploadButtonProps = {
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
} & Omit<ButtonProps, 'onClick'>;

export function UploadButton(props: UploadButtonProps) {
  const { onClick, onChange, ...restProps } = props;
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.click();
    if (onClick) onClick(e);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  }

  return (
    <Button
      style={{height: 32, padding: '4px 16px',}}
      type="line"
      onClick={handleClick}
      {...restProps}
    >
      <input
        type="file"
        style={{width: 0, height: 0,}}
        ref={ref}
        onChange={handleInputChange}
      />
      <span style={{margin: '0px 6px 0 0'}}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"/></svg>
      </span>
      <span
        style={{
          display: 'inline-block',
          height: 24,
          verticalAlign: 'top',
          lineHeight: '24px'
        }}
      >点击上传</span>
    </Button>
  )
}
