import React from 'react';
import { Tag } from '@horen/core';
import { ComponentPage, Desc, Playground } from './_layout';

export default function ComponentTag() {
  return (
    <ComponentPage>
      <Desc
        title='Tag'
        description='标签可用于显示简单信息'
        usage="import { Tag } from '@horen/core'"
      />
      <Playground>
        <Tag>hello</Tag>
      </Playground>
    </ComponentPage>
  )
}