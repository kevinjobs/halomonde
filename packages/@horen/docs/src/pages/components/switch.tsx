import React from 'react';
import { Switch } from '@horen/core';
import { ComponentPage, Desc, Playground } from './_layout';

export default function ComponentSlider() {
  const [on, setOn] = React.useState<boolean>(false);
  return (
    <ComponentPage>
      <Desc
        title='Switch'
        description='简单的开关'
        usage="import { Switch } from '@horen/core'"
      />
      <Playground>
        <p>current: {String(on)}</p>
        <Switch onChange={setOn} />
        <p>defaultValue is true</p>
        <Switch defaultValue={true} onChange={() => {}} />
      </Playground>
    </ComponentPage>
  )
}