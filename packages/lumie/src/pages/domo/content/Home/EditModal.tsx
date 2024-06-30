import React from 'react';
import { Modal } from '@horen/core';
import { POST_TYPES } from '@/constants';
import { IPost } from '@/types';
import { EditPanel } from '../../_components';

export interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (post: IPost) => void;
  mode: 'create' | 'update';
  post: IPost;
}

export default function EditModal({
  visible,
  onClose,
  onSubmit,
  mode,
  post,
}: EditModalProps) {
  const handleSubmit = (post: IPost) => {
    if (onSubmit) onSubmit(post);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} fullScreen>
      <Modal.Header>
        <h2>
          {mode === 'create' ? '创建' : '更新'}
          {POST_TYPES[post?.type]}
        </h2>
      </Modal.Header>
      <Modal.Content>
        {post && (
          <EditPanel
            mode="create"
            type={post?.type}
            defaultPost={post}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
      </Modal.Content>
    </Modal>
  );
}
