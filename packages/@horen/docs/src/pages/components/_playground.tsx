import React, { useEffect, useRef } from 'react';
import jsxToString from 'jsx-to-string';
import css from './_playground.module.css';
import { useToggle } from '@horen/hooks';
import { Icon } from '@horen/core';
import hljs from '../_highlight';
import 'highlight.js/styles/routeros.css';

export interface PlaygroundProps {
  children: React.ReactNode;
}

export function Playground({children}: PlaygroundProps) {
  const [value, toggle] = useToggle(['component', 'sourceCode']);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) hljs.highlightElement(ref.current);
  }, [value]);

  return (
    <div className={css.playground}>
      <div className={css.component}>{ children }</div>
      <div className={css.footer}>
        <span onClick={() => toggle()}><Icon name='code' /></span>
      </div>
        {
          value === 'sourceCode'
          &&
          <div className={css.sourceCode}>
            <code className={'javascript'} ref={ref}>
              { jsxToString(children, {useFunctionCode: true}) }
            </code>
          </div>
        }
    </div>
  )
}