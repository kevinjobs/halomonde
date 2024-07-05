import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PostType } from '@/constants';
import { IPost } from '@/types';
import { Button, Select } from '@horen/core';

import style from './Home.module.less';
import { PostTable } from './Table';

export interface HomeProps {
  posts: IPost[];
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onEdit: (post: IPost) => void;
  onDelete: (uid: string) => void;
  onView: () => void;
  onFilter: (type: PostType) => void;
}

export default function Home({
  posts,
  hasNext,
  hasPrev,
  onPrev,
  onNext,
  onEdit,
  onDelete,
  onView,
  onFilter,
}: HomeProps) {
  const navigate = useNavigate();

  /** 点击查看详情 */
  const handleViewPost = (p: IPost) => {
    navigate(`/view/${p.type}/${p.uid}`);
    onView();
  };

  /** 点击删除 */
  const handleClickDel = (p: IPost) => {
    onDelete(p.uid);
  };

  /** 点击筛选按钮 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilter = (type: PostType) => {
    onFilter(type);
  };

  /** 点击编辑按钮 */
  const handleClickEdit = (p: IPost) => {
    onEdit(p);
  };

  return (
    <div className={''}>
      <div className={style.options}>
        <div className={style.filter}>
          <span>
            <Select
              label="类型筛选"
              value={posts?.[0].type || 'article'}
              onChange={handleFilter}>
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
            onEdit={handleClickEdit}
            onDel={handleClickDel}
            onView={handleViewPost}
          />
        </div>
        <div className={style.prevNext}>
          <Button onClick={onPrev} disabled={!hasPrev}>
            上一页
          </Button>
          <Button onClick={onNext} disabled={!hasNext}>
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
