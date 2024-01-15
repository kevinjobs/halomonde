import React from 'react';

import { Switch, } from '@horen/core';

import { ComponentPage, Desc, } from './_layout';
import { Playground, } from './_playground';

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
        <Switch onChange={setOn} />
      </Playground>
      <Playground>
        <Switch defaultValue={true} onChange={() => {}} />
      </Playground>
    </ComponentPage>
  )
}