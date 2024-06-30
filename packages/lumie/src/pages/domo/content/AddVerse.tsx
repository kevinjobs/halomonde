import React from 'react';
import { EditPanel } from '../_components';
import { IPost } from '@/types';
import { toAdd } from './_add';

export function AddVersePage() {
  const handleSubmit = (post: IPost) => {
    toAdd(post);
  };

  return (
    <div>
      <EditPanel type="verse" mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
