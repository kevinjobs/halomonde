import React from 'react';
import { Tag } from '@horen/core';
import { ComponentPage, Desc, Playground, Group } from './_layout';

export default function ComponentTag() {
  return (
    <ComponentPage>
      <Desc
        title='Tag'
        description='标签可用于显示简单信息'
        usage="import { Tag } from '@horen/core'"
      />
      <Playground>
        <Group>
          一般样式 
          <Tag>hello</Tag>
        </Group>
        
        <Group>
          圆角 
          <Tag rounded>rounded</Tag>
        </Group>
        
      </Playground>
    </ComponentPage>
  )
}