import React from 'react';

import { useToggle, } from '@horen/hooks';

import { ComponentPage, Desc, Playground, } from '../components/_layout';

export default function ComponentSlider() {
  const [value, toggle] = useToggle();
  const [rv, toggleR] = useToggle(['0', '1', '2', '3', '4', '5', '6', '7'], 'random');
  const [fv, toggleF] = useToggle(['0', '1', '2', '3', '4', '5', '6', '7'], 'forward');
  const [rev, toggleRE] = useToggle(['0', '1', '2', '3', '4', '5', '6', '7'], 'reverse');

  return (
    <ComponentPage>
      <Desc
        title='useToggle'
        description='useToggle'
        usage="import { useToggle } from '@horen/hooks'"
      />
      <Playground>
        <div><span>boolean toggle: </span>{ String(value) }</div>
        <div><span>random toggle: </span>{ rv }</div>
        <div><span>forward toggle: </span>{ fv }</div>
        <div><span>reverse toggle: </span>{ rev }</div>
        <div><span>specific toggle: </span>{ fv }</div>
        <button onClick={() => toggle()}>toggle boolean</button>
        <button onClick={() => toggleR()}>toggle random</button>
        <button onClick={() => toggleF()}>toggle forward</button>
        <button onClick={() => toggleRE()}>toggle reverse</button>
        <button onClick={() => toggleF(v => '3')}>toggle 3</button>
      </Playground>
    </ComponentPage>
  )
}