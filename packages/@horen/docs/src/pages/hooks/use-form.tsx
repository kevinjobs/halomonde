import React, { useState } from 'react';
import { useForm } from '@horen/hooks';
import { Input, Switch, ImageUpload, Select } from '@horen/core';
import { ComponentPage, Desc, Playground } from '../components/_layout';

export default function ComponentSlider() {
  const form = useForm({
    initial: {
      username: 'kevinjobs',
      password: 'hello',
      gender: true,
      sex: 'female',
    }
  });

  return (
    <ComponentPage>
      <Desc
        title='useForm'
        description='useForm'
        usage="import { useForm } from '@horen/hooks'"
      />
      <Playground>
        <div>
          <Input name='username' {...form.get('username')} /><br />
          <Input name='password' {...form.get('password')} /><br />
          <Switch name='gender' {...form.get('gender')} /><br />
          <Select {...form.get('sex')}>
            <Select.Item name='男' value='male' />
            <Select.Item name='女' value='female' />
          </Select>
          <ImageUpload name='upload' multiple {...form.get('upload')} />
        </div>
        <button onClick={() => form.reset()}>重置</button>
        <button onClick={() => form.clear()}>清空</button>
        {
          Object.keys(form.data).map(k => {
            return (
              <div key={k}>
                <span>{k}: </span>
                <span>{String(form.data[k])}</span>
              </div>
            )
          })
        }
      </Playground>
    </ComponentPage>
  )
}