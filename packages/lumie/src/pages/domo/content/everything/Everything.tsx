import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
import {
  addPost,
  deletePost,
  getPostListSync,
  PostListRespData,
  updatePost,
} from '@/utils/apis';
import { Button, Modal, Select } from '@horen/core';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import style from './Everything.module.less';
import { PostTable } from './Table';

export default function PostsEverything(): React.ReactElement {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<Partial<PostListRespData>>(null);
  const [pageLimit, setPageLimit] = useState(8);
  const [selectedUid, setSelectedUid] = useState<string>(null);
  const [newPost, setNewPost] = useState<IPost>(null);
  // computed
  const selectedPost = pageData?.posts?.find((p) => p.uid === selectedUid);
  const hasPrev = pageData?.offset > 0;
  const hasNext = pageData?.offset + pageData?.limit < pageData?.totals;
  const state = useStore(store);

  const handleClickPrev = () => {
    if (hasPrev)
      refreshPosts(
        pageData.offset - pageLimit,
        pageLimit,
        pageData.posts[0].type,
      );
  };

  const handleClickNext = () => {
    if (hasNext)
      refreshPosts(
        pageData.offset + pageLimit,
        pageLimit,
        pageData.posts[0].type,
      );
  };

  /** 点击查看详情 */
  const handleViewPost = (p: IPost) => {
    navigate(`/${p.type}/${p.uid}`);
  };

  /** 点击删除 */
  const handleClickDel = (p: IPost) => {
    const uid = p.uid;
    if (confirm('确定要删除？')) {
      (async () => {
        const resp = await deletePost(uid);
        if (typeof resp !== 'string') {
          notifications.show({ variant: 'success', message: '删除成功' });
          refreshPosts(pageData.offset, pageLimit, p.type);
        } else window.alert(resp);
      })();
    }
  };

  /** 刷新 */
  const refreshPosts = (offset = 0, limit: number, typ: PostType) => {
    setPageData(null);
    setTimeout(() => {
      getPostListSync(
        {
          offset,
          limit,
          type: typ,
          status: 'all',
        },
        (_, __, ___, data) => {
          setPageData(data);
          localStorage.setItem(
            DOMO_POSTS_STATE,
            JSON.stringify({
              data,
            }),
          );
        },
        (errMsg) => console.log(errMsg),
      );
    }, 16);
  };

  /** 点击筛选按钮 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilter = (_: any, type: PostType) => {
    refreshPosts(0, pageLimit, type);
  };

  /** 点击编辑按钮 */
  const handleClickEdit = (p: IPost) => {
    setSelectedUid(p.uid);
  };

  /** 点击新增 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    setNewPost(postTemplate);
  };

  /** 处理提交事件 */
  const handleUpdatePost = (post: IPost) => {
    updatePost(post.uid, post).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({ variant: 'danger', message: resp });
        setSelectedUid(null);
      } else {
        notifications.show({ variant: 'success', message: '更新成功' });
        setSelectedUid(null);
        refreshPosts(pageData.offset, pageLimit, post.type);
      }
    });
  };

  const handleCreatePost = (post: IPost) => {
    addPost(post).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({ variant: 'danger', message: resp });
        setNewPost(null);
      } else {
        notifications.show({ variant: 'success', message: '添加成功' });
        setNewPost(null);
        refreshPosts(0, pageLimit, post.type);
      }
    });
  };

  const handleCancelEditPanel = () => {
    setNewPost(null);
    setSelectedUid(null);
  };

  useEffect(() => {
    const ps = localStorage.getItem(DOMO_POSTS_STATE);
    if (ps) {
      const { data } = JSON.parse(ps) as DomoPostsState;
      setPageLimit(pageLimit);
      if (data) setPageData(data);
      else refreshPosts(0, pageLimit, 'article');
    } else {
      refreshPosts(0, pageLimit, 'article');
    }
  }, []);

  return (
    <div className={''}>
      <div className={style.options}>
        <div className={style.filter}>
          <span className={style.filterText}>类型筛选</span>
          <span>
            <Select
              value={pageData?.posts[0].type || 'article'}
              onChange={handleFilter}
              arrow>
              <Select.Item name="文章" value="article" />
              <Select.Item name="照片" value="photo" />
              <Select.Item name="封面" value="cover" />
              <Select.Item name="诗文" value="verse" />
            </Select>
          </span>
        </div>
        <div
          className={style.addOne}
          style={{ display: state?.user ? 'flex' : 'none' }}>
          <span className={style.addText}>新增</span>
          <span>
            <Button onClick={() => handleCreate(null, 'article')}>文章</Button>
            <Button variant="dark" onClick={() => handleCreate(null, 'photo')}>
              照片
            </Button>
            <Button
              variant="success"
              onClick={() => handleCreate(null, 'cover')}>
              封面
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleCreate(null, 'verse')}>
              诗文
            </Button>
          </span>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.table}>
          <PostTable
            posts={pageData?.posts}
            onEdit={handleClickEdit}
            onDel={handleClickDel}
            onView={handleViewPost}
          />
        </div>
        <div className={style.prevNext}>
          <Button onClick={handleClickPrev} disabled={!hasPrev}>
            上一页
          </Button>
          <Button onClick={handleClickNext} disabled={!hasNext}>
            下一页
          </Button>
        </div>
      </div>
      <Modal
        visible={Boolean(selectedUid || newPost)}
        onClose={handleCancelEditPanel}
        fullScreen>
        <Modal.Header>
          <h2>
            {newPost && '创建'}
            {newPost && POST_TYPES[newPost.type]}
            {selectedUid && '更新'}
            {selectedPost && POST_TYPES[selectedPost.type]}
          </h2>
        </Modal.Header>
        <Modal.Content>
          {newPost && (
            <EditPanel
              mode="create"
              type={newPost?.type}
              post={newPost}
              onSubmit={handleCreatePost}
              onCancel={handleCancelEditPanel}
            />
          )}
          {selectedPost && (
            <EditPanel
              mode="update"
              type={selectedPost?.type}
              post={selectedPost}
              onSubmit={handleUpdatePost}
              onCancel={handleCancelEditPanel}
            />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
