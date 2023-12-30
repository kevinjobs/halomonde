import React from 'react';
import { Modal, Button } from '@horen/core';
import { ComponentPage, Desc, Playground } from './_layout';

export default function ComponentSlider() {
  const [v, setV] = React.useState(false);
  const [v2, setV2] = React.useState(false);

  return (
    <ComponentPage>
      <Desc
        title='Modal'
        description='模态窗口'
        usage="import { Modal } from '@horen/core'"
      />
      <Playground>
        <Button onClick={() => setV(!v)}>open modal</Button>
        <Modal visible={v} onClose={() => setV(false)}>
          <Modal.Header>
            <div>hello</div>
          </Modal.Header>
          <Modal.Content>
            <input />
            <div><input /></div>
            <button>submit</button>
          </Modal.Content>
        </Modal>
      </Playground>
      <Playground>
        <Button onClick={() => setV2(!v2)}>open full screen modal</Button>
        <Modal visible={v2} onClose={() => setV2(false)} fullScreen>
          <Modal.Header>
            <h2>hello</h2>
          </Modal.Header>
          <Modal.Content>
            <input />
            <div><input /></div>
            <button>submit</button>
          </Modal.Content>
        </Modal>
      </Playground>
    </ComponentPage>
  )
}