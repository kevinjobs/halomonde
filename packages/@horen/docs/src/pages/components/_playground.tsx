import React from 'react';
import jsxToString from 'jsx-to-string';
import css from './_playground.module.css';
import { useToggle } from '@horen/hooks';

export interface PlaygroundProps {
  children: React.ReactNode;
}

export function Playground({children}: PlaygroundProps) {
  const [value, toggle] = useToggle(['component', 'sourceCode']);

  return (
    <div className={css.playground}>
      <div className={css.header}>
        <span
          className={css.setComponent}
          onClick={() => toggle('component')}
        >Componet</span>
        <span
          className={css.setSourceCode}
          onClick={() => toggle('sourceCode')}
        >SourceCode</span>
      </div>
      {
        value === 'component'
        && <div className={css.component}>{ children }</div>
      }
      {
        value === 'sourceCode'
        &&
        (
          <div className={css.sourceCode}>
            { jsxToString(children, {useFunctionCode: true}) }
          </div>
        )
      }
    </div>
  )
}