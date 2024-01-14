import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { addPost, deletePost, fetchPosts, updatePost } from '@/apis/posts';
import EditPanel from '@/pages/domo/_components/edit-panel';
import { IPost } from '@/types';
import { Button, Modal, Select } from '@horen/core';
import { notifications } from '@horen/notifications';

import style from './Everything.module.less';
import { PostTable } from './Table';

const TYPES: Record<string, any> = {
  article: '文章',
  verse: '诗文',
  photo: '照片',
  cover: '封面',
}

const MODES: Record<string, any> = {
  create: '新增',
  update: '更新',
}

export default function PostAdmin(): React.ReactElement {
  const PAGE_LIMIT = 6;
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState<IPost[]>(null);
  const [offset, setOffset] = React.useState(Number(localStorage.getItem('offset')) || 0);
  const [typ, setTyp] = React.useState(localStorage.getItem('typ') || 'article');
  // 这两个状态是根据 posts 的情况计算出的，因此不需要保存
  const [hasPrev, setHasPrev] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(true);
  //
  const [pickPost, setPickPost] = React.useState<IPost>(null);

  const mode = pickPost?.uid ? 'update' : 'create';

  const handleClickPrev = () => {
    setPosts(null);
    setOffset(offset - PAGE_LIMIT);
  };

  const handleClickNext = () => {
    setPosts(null);
    setOffset(offset + PAGE_LIMIT);
  };

  /** 点击查看详情 */
  const handleViewPost = (p: IPost) => {
    navigate(`/${p.type}/${p.uid}`);
  };

  /** 点击删除 */
  const handleDeletePost = (p: IPost) => {
    const uid = p.uid;
    if (confirm('确定要删除？')) {
      (async() => {
        const data = await deletePost(uid);
        if (typeof data !== 'string') {
          notifications.show({type: 'success', message: '删除成功'});
          refreshPosts(offset, PAGE_LIMIT, typ);
        } else window.alert(data);
      })();
    }
  };

  /** 刷新 */
  const refreshPosts = (offset = 0, limit: number, typ: string) => {
    (async() => {
      const data = await fetchPosts(offset, limit, {status: 'all', type: typ});
      if (typeof data !== 'string') {
        if (offset <= 0) setHasPrev(false);
        else setHasPrev(true);

        if (offset + limit >= data.data.totals) setHasNext(false);
        else setHasNext(true);

        setPosts(data.data.posts);
      }
    })();
  };

  const reloadTable = (type: string) => {
    setTyp(type);
    setOffset(0);
    setPosts(null);
    setTimeout(() => {
      refreshPosts(0, PAGE_LIMIT, type);
    }, 16);
  }

  /** 点击筛选按钮 */
  const handleFilter = (_: any, type: string) => {
    reloadTable(type);
  }

  /** 点击编辑按钮 */
  const handleUpdatePost = (p: IPost) => {
    setPickPost(p);
  };

  /** 点击新增 */
  const handleCreate = (_: any, type: string) => {
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
  }

  /** 处理提交事件 */
  const handleSubmitPost = (post: IPost) => {
    if (mode === 'update') {
      updatePost(post.uid, post).then(resp => {
        if (typeof resp ==='string') {
          notifications.show({type: 'error', message: resp});
        } else {
          notifications.show({type:'success', message: '更新成功'});
          setPickPost(null);
          reloadTable(post.type);
        }
      });
    }

    if (mode === 'create') {
      addPost(post).then(resp => {
        if (typeof resp ==='string') {
          notifications.show({type: 'error', message: resp});
        } else {
          notifications.show({type:'success', message: '添加成功'});
          setPickPost(null);
          reloadTable(post.type);
        }
      });
    }
  }

  const handleCancelEditPanel = () => {
    setPickPost(null);
  }

  React.useEffect(() => {
    refreshPosts(offset, PAGE_LIMIT, typ);
  }, [offset]);

  React.useEffect(() => {
    refreshPosts(offset, PAGE_LIMIT, typ);
  }, []);

  React.useEffect(() => {
    // 当列表变动时将其保存在 localStorage中
    // 这样可以在下次加载时重新取出以恢复状态
    // 在本页面中，只需要保存这两个状态就可以恢复整个页面
    // 针对不同的页面，可能需要保存不同的值
    localStorage.setItem('offset', String(offset));
    localStorage.setItem('typ', typ);
  }, [offset, typ]);

  return (
    <div className={''}>
      <div className={style.options}>
        <div className={style.filter}>
          <span className={style.filterText}>类型筛选</span>
          <span>
            <Select value={typ} onChange={handleFilter} arrow>
              <Select.Item name="文章" value="article" />
              <Select.Item name="照片" value="photo" />
              <Select.Item name="封面" value="cover" />
              <Select.Item name="诗文" value="verse" />
            </Select>
          </span>
        </div>
        <div className={style.addOne}>
          <span className={style.addText}>新增</span>
          <span>
            <Select value={typ} onChange={handleCreate} arrow>
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
            posts={posts}
            onEdit={handleUpdatePost}
            onDel={handleDeletePost}
            onView={handleViewPost}
          />
        </div>
        <div className={style.prevNext}>
          <Button onClick={handleClickPrev} disabled={!hasPrev}>Prev</Button>
          <Button onClick={handleClickNext} disabled={!hasNext}>Next</Button>
        </div>
      </div>
      <Modal
        visible={pickPost ? true : false}
        onClose={() => setPickPost(null)}
        fullScreen
      >
        <Modal.Header>
          <h2>{MODES[mode]}{TYPES[typ]}</h2>
        </Modal.Header>
        <Modal.Content>
          {
            pickPost &&
            <EditPanel
              mode={mode}
              type={pickPost?.type}
              post={pickPost}
              onSubmit={handleSubmitPost}
              onCancel={handleCancelEditPanel}
            />
          }
        </Modal.Content>
      </Modal>
    </div>
  );
}
