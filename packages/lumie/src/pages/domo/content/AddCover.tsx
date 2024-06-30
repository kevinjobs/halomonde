import React from 'react';
import { EditPanel } from '../_components';
import { IPost } from '@/types';
import { toAdd } from './_add';

export function AddCoverPage() {
  const handleSubmit = (post: IPost) => {
    toAdd(post);
  };

  return (
    <div>
      <EditPanel type="cover" mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
