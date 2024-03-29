import React, { useEffect, useRef, useState } from 'react';
import { Tag } from '../tag';
import cls from './TagInput.module.less';

export type TagInputProps = {
  value?: string[];
  onChange?: (tags: string[]) => void;
};

export function TagInput(props: TagInputProps) {
  const { onChange, value } = props;
  const [tags, setTags] = useState<string[]>(value || []);

  const ref = useRef<HTMLDivElement>(null);
  const tagRef = useRef<string[]>(value || []);

  const handle = (event: KeyboardEvent) => {
    const target = event.target as HTMLDivElement;

    if (event.key === 'Enter') {
      const text = target.innerText;
      event.preventDefault();
      event.stopPropagation();
      if (text !== '') {
        tagRef.current = [...tagRef.current];
        if (!includes(tagRef.current, text)) {
          tagRef.current = [...tagRef.current, text];
        }
        setTags(tagRef.current);
      }
      target.innerText = '';
    }

    if (event.key === 'Backspace') {
      const text = target.innerText;
      if (text === '') {
        event.preventDefault();
        event.stopPropagation();
        tagRef.current = tagRef.current.slice(0, -1);
        setTags(tagRef.current);
      }
    }
  };

  useEffect(() => {
    ref.current?.addEventListener('keydown', handle);
    return () => {
      ref.current?.removeEventListener('keydown', handle);
    };
  }, []);

  useEffect(() => {
    // console.log(tags);
    if (onChange) onChange(tags);
  }, [tags]);

  return (
    <div className={cls.tagInput}>
      <span>
        {tags.map((tag) => {
          if (tag !== '') {
            return (
              <Tag key={tag} style={{ borderRadius: '10px' }}>
                {tag}
                <span
                  className={cls.close}
                  onClick={() =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                  }>
                  ×
                </span>
              </Tag>
            );
          }
        })}
      </span>
      <div contentEditable ref={ref} className={cls.input}></div>
    </div>
  );
}

const includes = (arr: string[], v: string) => {
  for (const i of arr) {
    if (i === v) return true;
  }
};
