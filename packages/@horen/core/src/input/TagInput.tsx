import React, { useEffect, useRef, useState } from 'react';

import { textToHexColor } from '@horen/utils';

import { DataInputWrapper, DataInputWrapperProps } from '../_common';
import { classnames } from '../_utils';
import { Tag } from '../tag';
import cls from './TagInput.module.less';

export type TagInputProps = {
  label?: string;
  labelPlacement?: string;
  value?: string;
  seperator?: string;
  onChange?: (tags: string) => void;
} & DataInputWrapperProps;

export function TagInput(props: TagInputProps) {
  const {
    label,
    labelPlacement = 'left',
    required = false,
    error,
    onChange,
    value = '',
    seperator = '|',
  } = props;
  const [tags, setTags] = useState<string[]>(value.split(seperator) || []);

  const ref = useRef<HTMLDivElement>(null);
  const tagRef = useRef<string[]>(value.split(seperator) || []);

  const handle = (event: KeyboardEvent) => {
    const target = event.target as HTMLDivElement;

    if (event.key === 'Enter') {
      const text = target.innerText;
      event.preventDefault();
      event.stopPropagation();
      if (includes(tagRef.current, text)) return;
      addTag(text);
      target.innerText = '';
    }

    if (event.key === 'Backspace') {
      const text = target.innerText;
      if (text === '') {
        event.preventDefault();
        event.stopPropagation();
        deleteTag();
      }
    }
  };

  const addTag = (tag: string) => {
    if (tag !== '') {
      tagRef.current = [...tagRef.current, tag];
      setTags(tagRef.current);
    }
  };

  const deleteTag = (tag?: string) => {
    if (!tag) {
      tagRef.current = tagRef.current.slice(0, -1);
    } else {
      tagRef.current = tagRef.current.filter((t) => t !== tag);
    }

    setTags(tagRef.current);
  };

  useEffect(() => {
    ref.current?.addEventListener('keydown', handle);
    return () => {
      ref.current?.removeEventListener('keydown', handle);
    };
  }, []);

  useEffect(() => {
    if (onChange) onChange(tags.filter((t) => t !== '').join(seperator));
  }, [tags]);

  return (
    <DataInputWrapper
      error={error}
      label={label}
      labelPlacement={labelPlacement}
      required={required}>
      <div className={cls.tagInput}>
        {tags.map((tag) => {
          if (tag !== '') {
            return (
              <span className={cls.tagItem} key={tag}>
                <span>
                  <Tag
                    size="sm"
                    key={tag}
                    style={{ borderRadius: 4 }}
                    fill={textToHexColor(tag)}>
                    {tag}
                    <span className={cls.close} onClick={() => deleteTag(tag)}>
                      ×
                    </span>
                  </Tag>
                </span>
              </span>
            );
          }
        })}
        <span className={cls.tagItem}>
          <span>
            <div contentEditable ref={ref} className={cls.inputArea}></div>
          </span>
        </span>
      </div>
    </DataInputWrapper>
  );
}

const includes = (arr: string[], v: string) => {
  for (const i of arr) {
    if (i === v) return true;
  }
};
