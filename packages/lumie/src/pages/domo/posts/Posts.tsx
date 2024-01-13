import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@horen/core';
import { Button } from '@/components/button';
import { IPost } from '@/types';
import { fetchPosts, deletePost } from '@/apis/posts';
import { PostTable } from './table';
import style from './Posts.module.less';
import EditPost from './EditPost';

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

  React.useEffect(() => {
    // 当列表变动时将其保存在 localStorage中
    // 这样可以在下次加载时重新取出以恢复状态
    // 在本页面中，只需要保存这两个状态就可以恢复整个页面
    // 针对不同的页面，可能需要保存不同的值
    localStorage.setItem('offset', String(offset));
    localStorage.setItem('typ', typ);
  }, [offset, typ]);

  const clickAdd = (type: string) => {
    return;
  };

  const clickPrev = () => {
    setPosts(null);
    setOffset(offset - PAGE_LIMIT);
  };

  const clickNext = () => {
    setPosts(null);
    setOffset(offset + PAGE_LIMIT);
  };

  const editTableRow = (p: IPost) => {
    setPickPost(p);
  };

  const clickViewPost = (p: IPost) => {
    navigate(`/${p.type}/${p.uid}`);
  };

  const clickDelRow = (p: IPost) => {
    const uid = p.uid;
    if (confirm('确定要删除？')) {
      (async() => {
        const data = await deletePost(uid);
        if (typeof data !== 'string') {
          window.alert('删除成功');
          getAndSet(offset, PAGE_LIMIT, typ);
        } else window.alert(data);
      })();
    }
  };

  const getAndSet = (offset = 0, limit: number, typ: string) => {
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

  const handleFilter = (t: string) => {
    setTyp(t);
    setOffset(0);
    setPosts(null);
    setTimeout(() => {
      getAndSet(0, PAGE_LIMIT, t);
    }, 100);
  }

  React.useEffect(() => {
    getAndSet(offset, PAGE_LIMIT, typ);
  }, [offset]);

  React.useEffect(() => {
    getAndSet(offset, PAGE_LIMIT, typ);
  }, []);

  return (
    <div className={''}>
      <div className={style.options}>
      <div>
        <Button onClick={() => clickAdd('article')}>新增文章</Button>
        <Button onClick={() => clickAdd('photo')}>添加图片</Button>
      </div>
      <div className={style.filter}>
        <span>点击筛选</span>
        <Button type={typ === 'article' ? 'primary' : 'light'} onClick={() => handleFilter('article')}>文章</Button>
        <Button type={typ === 'photo' ? 'primary' : 'light'} onClick={() => handleFilter('photo')}>照片</Button>
        <Button type={typ === 'cover' ? 'primary' : 'light'} onClick={() => handleFilter('cover')}>封面</Button>
      </div>
      </div>
      <div className={style.container}>
        <div className={style.table}>
          <PostTable
            posts={posts}
            onEdit={editTableRow}
            onDel={clickDelRow}
            onView={clickViewPost}
          />
        </div>
        <div className={style.prevNext}>
          <Button onClick={clickPrev} disabled={!hasPrev}>Prev</Button>
          <Button onClick={clickNext} disabled={!hasNext}>Next</Button>
        </div>
      </div>
      <Modal
        visible={pickPost ? true : false}
        onClose={() => setPickPost(null)}
        fullScreen
      >
        <Modal.Header>
          <h2>编 辑 内 容</h2>
        </Modal.Header>
        <Modal.Content>
          {
            pickPost &&
            <EditPost
              mode={pickPost?.uid ? 'update' : 'create'}
              type={typ}
              post={pickPost}
              onCancel={() => setPickPost(null)}
            />
          }
        </Modal.Content>
      </Modal>
    </div>
  );
}
