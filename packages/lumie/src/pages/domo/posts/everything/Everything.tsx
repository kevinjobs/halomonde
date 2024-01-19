import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DOMO_POSTS_STATE,
  DomoPostsState,
  POST_TYPES,
  PostType,
} from '@/constants';
import EditPanel from '@/pages/domo/_components/edit-panel';
import { store } from '@/store';
import { IPost } from '@/types';
import { addPost, deletePost, getPostListSync, updatePost } from '@/utils/apis';
import { Button, Modal, Select } from '@horen/core';
import { useDidUpdate, useSetState, useUnmount } from '@horen/hooks';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import style from './Everything.module.less';
import { PostTable } from './Table';

const MODES: Record<string, any> = {
  create: '新增',
  update: '更新',
};

export default function PostAdmin(): React.ReactElement {
  const PAGE_LIMIT = 6;
  const navigate = useNavigate();
  const [pageState, setPageState] = useSetState<DomoPostsState>({
    offset: 0,
    postType: 'article',
    postList: null,
    hasPrev: false,
    hasNext: true,
  });
  const [pickPost, setPickPost] = React.useState<IPost>(null);
  //
  const state = useStore(store);

  const mode: 'update' | 'create' = pickPost?.uid ? 'update' : 'create';

  const handleClickPrev = () => {
    setPageState({
      offset: pageState.offset - PAGE_LIMIT,
      postList: null,
    });
  };

  const handleClickNext = () => {
    setPageState({
      offset: pageState.offset + PAGE_LIMIT,
      postList: null,
    });
  };

  /** 点击查看详情 */
  const handleViewPost = (p: IPost) => {
    navigate(`/${p.type}/${p.uid}`);
  };

  /** 点击删除 */
  const handleDeletePost = (p: IPost) => {
    const uid = p.uid;
    if (confirm('确定要删除？')) {
      (async () => {
        const data = await deletePost(uid);
        if (typeof data !== 'string') {
          notifications.show({ variant: 'success', message: '删除成功' });
          refreshPosts(pageState.offset, PAGE_LIMIT, pageState.postType);
        } else window.alert(data);
      })();
    }
  };

  /** 刷新 */
  const refreshPosts = (offset = 0, limit: number, typ: PostType) => {
    getPostListSync(
      {
        offset,
        limit,
        type: typ,
      },
      (postList, hasPrev, hasNext) => {
        setPageState({ postList, hasPrev, hasNext });
      },
      (errMsg) => console.log(errMsg),
    );
  };

  const reloadTable = (type: PostType) => {
    setPageState({ offset: 0, postType: type, postList: null });
    setTimeout(() => {
      refreshPosts(0, PAGE_LIMIT, type);
    }, 16);
  };

  /** 点击筛选按钮 */
  const handleFilter = (_: any, type: PostType) => {
    reloadTable(type);
  };

  /** 点击编辑按钮 */
  const handleUpdatePost = (p: IPost) => {
    setPickPost(p);
  };

  /** 点击新增 */
  const handleCreate = (_: any, type: PostType) => {
    const postTemplate: IPost = {
      title: '',
      author: '',
      updateAt: dayjs().unix(),
      createAt: dayjs().unix(),
      content: '',
      uid: '',
      id: 0,
      excerpt: '',
      tags: '',
      format: 'default',
      status: 'draft',
      type,
      url: '',
      category: 'default',
    };
    setPickPost(postTemplate);
  };

  /** 处理提交事件 */
  const handleSubmitPost = (post: IPost) => {
    if (mode === 'update') {
      updatePost(post.uid, post).then((resp) => {
        if (typeof resp === 'string') {
          notifications.show({ variant: 'danger', message: resp });
        } else {
          notifications.show({ variant: 'success', message: '更新成功' });
          setPickPost(null);
          reloadTable(post.type);
        }
      });
    }

    if (mode === 'create') {
      addPost(post).then((resp) => {
        if (typeof resp === 'string') {
          notifications.show({ variant: 'danger', message: resp });
        } else {
          notifications.show({ variant: 'success', message: '添加成功' });
          setPickPost(null);
          reloadTable(post.type);
        }
      });
    }
  };

  const handleCancelEditPanel = () => {
    setPickPost(null);
  };

  React.useEffect(() => {
    const ps = localStorage.getItem(DOMO_POSTS_STATE);
    if (ps) {
      const { offset, postType, postList, hasNext, hasPrev } = JSON.parse(
        ps,
      ) as DomoPostsState;
      setPageState({ offset, postType, postList, hasNext, hasPrev });
    } else {
      refreshPosts(0, PAGE_LIMIT, 'article');
    }
  }, []);

  useDidUpdate(() => {
    refreshPosts(pageState.offset, PAGE_LIMIT, pageState.postType);
  }, [pageState.offset, pageState.postType]);

  useUnmount(() => {
    // 组件卸载时 将其保存在 localStorage中
    // 这样可以在下次加载时重新取出以恢复状态
    // 在本页面中，只需要保存这两个状态就可以恢复整个页面
    // 针对不同的页面，可能需要保存不同的值
    localStorage.setItem(DOMO_POSTS_STATE, JSON.stringify(pageState));
  });

  return (
    <div className={''}>
      <div className={style.options}>
        <div className={style.filter}>
          <span className={style.filterText}>类型筛选</span>
          <span>
            <Select value={pageState.postType} onChange={handleFilter} arrow>
              <Select.Item name="文章" value="article" />
              <Select.Item name="照片" value="photo" />
              <Select.Item name="封面" value="cover" />
              <Select.Item name="诗文" value="verse" />
            </Select>
          </span>
        </div>
        <div
          className={style.addOne}
          style={{ display: state?.user ? 'block' : 'none' }}>
          <span className={style.addText}>新增</span>
          <span>
            <Select value="article" onChange={handleCreate} arrow>
              <Select.Item name="文章" value="article" />
              <Select.Item name="照片" value="photo" />
              <Select.Item name="封面" value="cover" />
              <Select.Item name="诗文" value="verse" />
            </Select>
          </span>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.table}>
          <PostTable
            posts={pageState.postList}
            onEdit={handleUpdatePost}
            onDel={handleDeletePost}
            onView={handleViewPost}
          />
        </div>
        <div className={style.prevNext}>
          <Button onClick={handleClickPrev} disabled={!pageState.hasPrev}>
            Prev
          </Button>
          <Button onClick={handleClickNext} disabled={!pageState.hasNext}>
            Next
          </Button>
        </div>
      </div>
      <Modal
        visible={pickPost ? true : false}
        onClose={() => setPickPost(null)}
        fullScreen>
        <Modal.Header>
          <h2>
            {MODES[mode]}
            {
              POST_TYPES[
                mode === 'create' ? pickPost?.type : pageState.postType
              ]
            }
          </h2>
        </Modal.Header>
        <Modal.Content>
          {pickPost && (
            <EditPanel
              mode={mode}
              type={pickPost?.type}
              post={pickPost}
              onSubmit={handleSubmitPost}
              onCancel={handleCancelEditPanel}
            />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
