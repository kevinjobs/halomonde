import React from 'react';
import { Switch } from '@horen/core';
import { ComponentPage, Desc, Playground } from './_layout';

export default function ComponentSlider() {
  return (
    <ComponentPage>
      <Desc
        title='Switch'
        description='click switch to turn on or off'
        usage="import { Switch } from '@horen/core'"
      />
      <Playground>
        <p>default style</p>
        <Switch onChange={() => {}} />
        <p>defaultValue is true</p>
        <Switch defaultValue={true} onChange={() => {}} />
      </Playground>
    </ComponentPage>
  )
}