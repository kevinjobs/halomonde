import React from 'react';

import { useSetState } from '@horen/hooks';

import { ComponentPage, Desc, Playground } from '../../components/_layout';

export default function ComponentSlider() {
  const [obj, setObj] = useSetState<any>({});

  return (
    <ComponentPage>
      <Desc
        title="useToggle"
        description="useToggle"
        usage="import { useToggle } from '@horen/hooks'"
      />
      <Playground>
        <div>
          {Object.keys(obj).map((k) => {
            return (
              <>
                <span>
                  {k}: {obj[k]}
                </span>
                <br />
              </>
            );
          })}
        </div>
        <button onClick={() => setObj({ hello: 'nohello' })}>hello</button>
        <button onClick={() => setObj({ noword: 'nohello' })}>noword</button>
        <button
          onClick={() =>
            setObj({
              hello: undefined,
              noword: undefined,
            })
          }>
          clear
        </button>
      </Playground>
    </ComponentPage>
  );
}
