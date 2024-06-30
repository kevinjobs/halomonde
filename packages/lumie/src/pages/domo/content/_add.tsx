import { IPost } from '@/types';
import { addPost, updatePost, deletePost } from '@/utils/apis';
import { notifications } from '@horen/notifications';

type SuccessCallback = () => void;

type FailedCallback = () => void;

export const toDelete = (
  uid: string,
  onSuccess?: SuccessCallback,
  onFailed?: FailedCallback,
) => {
  deletePost(uid).then((resp) => {
    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      if (onFailed) onFailed();
    } else {
      notifications.show({
        variant: 'success',
        message: '删除成功',
      });
      if (onSuccess) onSuccess();
    }
  });
};

/**
 * add a new post
 * @param post IPost
 * @param onSuccess success callback
 * @param onFailed failed callback
 */
export const toAdd = (
  post: IPost,
  onSuccess?: SuccessCallback,
  onFailed?: FailedCallback,
) => {
  addPost(post).then((resp) => {
    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      if (onFailed) onFailed();
    } else {
      notifications.show({
        variant: 'success',
        message: '添加成功',
      });
      if (onSuccess) onSuccess();
    }
  });
};

export const toUpdate = (
  post: IPost,
  onSuccess?: SuccessCallback,
  onFailed?: FailedCallback,
) => {
  updatePost(post.uid, post).then((resp) => {
    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      if (onFailed) onFailed();
    } else {
      notifications.show({
        variant: 'success',
        message: '成功',
      });
      if (onSuccess) onSuccess();
    }
  });
};
