import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';
import { IPost } from '@/types';
import { fetchPosts, deletePost } from '@/apis/posts';

import { Header } from '../_partial/layout';
import { PostTable } from './table';

const Article = styled.div`
  .options {
    display: flex;
    align-items: center;
  }
`;

const TableContainer = styled.div`
  margin-top: 16px;
  width: 90%;
  .table {
    text-align: center;
  }
  .prev-next {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }
`;

export default function PostAdmin(): React.ReactElement {
  const PAGE_LIMIT = 6;
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState<IPost[]>(null);
  const [offset, setOffset] = React.useState(0);
  const [typ, setTyp] = React.useState('all');
  const [hasPrev, setHasPrev] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(true);

  const clickAdd = (t: string) => {
    navigate(`/admin/edit/add/${t}/0`);
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
    navigate(`/admin/edit/update/${p.type}/${p.uid}`);
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
          getAndSet();
        } else window.alert(data);
      })();
    }
  };

  const getAndSet = async (offset = 0, limit=PAGE_LIMIT) => {
    const data = await fetchPosts(offset, limit, {status: 'all', type: typ});
    if (typeof data !== 'string') {
      if (offset <= 0) setHasPrev(false);
      else setHasPrev(true);

      if (offset + limit >= data.data.totals) setHasNext(false);
      else setHasNext(true);

      setPosts(data.data.posts);
    }
  };

  React.useEffect(() => {
    getAndSet(offset, PAGE_LIMIT);
  }, [offset]);

  React.useEffect(() => {
    setOffset(0);
    getAndSet(0, PAGE_LIMIT);
  }, [typ]);

  return (
    <Article>
      <Header>
        <Header.Title>内容管理</Header.Title>
        <Header.Add>
          <Button onClick={() => clickAdd('article')}>新增文章</Button>
          <Button onClick={() => clickAdd('photo')}>添加图片</Button>
        </Header.Add>
        <div style={{marginLeft: 32}}>
          <span>点击筛选</span>
          <Button type='primary' onClick={() => setTyp('all')}>所有</Button>
          <Button type='primary' onClick={() => setTyp('article')}>文章</Button>
          <Button type='primary' onClick={() => setTyp('photo')}>照片</Button>
          <Button type='primary' onClick={() => setTyp('cover')}>封面</Button>
        </div>
      </Header>
      <TableContainer>
        <div className="table">
          <PostTable
            posts={posts}
            onEdit={editTableRow}
            onDel={clickDelRow}
            onView={clickViewPost}
          />
        </div>
        <div className="prev-next">
          <Button onClick={clickPrev} disabled={!hasPrev}>Prev</Button>
          <Button onClick={clickNext} disabled={!hasNext}>Next</Button>
        </div>
      </TableContainer>
    </Article>
  );
}
