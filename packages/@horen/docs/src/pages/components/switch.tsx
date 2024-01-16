import React from 'react';

import { Switch } from '@horen/core';

import { ComponentPage, Desc } from '../../components/_layout';
import { Playground } from '../../components/_playground';

export default function ComponentSlider() {
  const [on, setOn] = React.useState<boolean>(false);
  return (
    <ComponentPage>
      <Desc
        title="Switch"
        description="简单的开关"
        usage="import { Switch } from '@horen/core'"
      />
      <Playground>
        <Switch onChange={(_, on) => setOn(on)} />
      </Playground>
      <Playground>
        <Switch value={true} onChange={() => {}} />
      </Playground>
    </ComponentPage>
  );
}
