import dayjs from 'dayjs';
import React from 'react';

import { Table } from '@/components/table';
import { store } from '@/store';
import COLOR_MAP from '@/styles/colors';
import { IPost } from '@/types';
import { Button, Skeleton, Tag } from '@horen/core';
import { useStore } from '@horen/store';

export interface PostTableProps {
  posts?: IPost[];
  onEdit(p: IPost): void;
  onDel(p: IPost): void;
  onView(p: IPost): void;
}

export interface TableRow {
  id?: React.ReactNode;
  uid?: React.ReactNode;
  title: React.ReactNode;
  author: React.ReactNode;
  type: React.ReactNode;
  updateAt?: React.ReactNode;
  createAt: React.ReactNode;
  preview: React.ReactNode;
  tags: React.ReactNode;
  sumary?: React.ReactNode;
  format: React.ReactNode;
  status: React.ReactNode;
  category: React.ReactNode;
  edit: React.ReactNode;
}

const TABLE_HEADERS = [
  { field: 'index', name: '序号' },
  // { field: 'id', name: 'ID', },
  // { field: 'uid', name: 'UID', width: 60, },
  { field: 'createAt', name: '创建日期', width: 100 },
  { field: 'updateAt', name: '更新日期', width: 100 },
  { field: 'type', name: '类型' },
  { field: 'title', name: '标题', width: 200 },
  { field: 'author', name: '作者' },
  // { field: 'content', name: '内容', },
  // { field: 'sumary', name: '摘要', width: 200, },
  { field: 'preview', name: '预览', width: 100 },
  { field: 'status', name: '状态' },
  { field: 'tags', name: '标签' },
  { field: 'category', name: '分类' },
  { field: 'format', name: '格式' },
  // { field: 'url', name: '预览', },
  // { field: 'exif', name: '图片信息', },
  // { field: 'description', name: '描述', },
  { field: 'edit', name: '编辑', width: 160 },
];

export function PostTable(props: PostTableProps) {
  const { posts = null, onEdit, onDel, onView } = props;
  const state = useStore(store);
  const isLogin = state.user?.token ? true : false;

  return (
    <div className="post-table">
      <Table
        data={toTableData(posts, onEdit, onDel, onView, isLogin)}
        heads={TABLE_HEADERS}
      />
    </div>
  );
}

function toTableData(
  posts: IPost[],
  onEdit: (p: IPost) => void,
  onDel: (p: IPost) => void,
  onView: (p: IPost) => void,
  isLogin: boolean,
): TableRow[] {
  if (posts?.length === 0 || !posts) {
    const sk = {
      index: <Skeleton width={20} />,
      // id: <Skeleton width={20} />,
      // uid: <Skeleton />,
      createAt: <Skeleton />,
      updateAt: <Skeleton />,
      type: <Skeleton width={40} />,
      title: <Skeleton width={140} />,
      author: <Skeleton width={60} />,
      // content: <span>{post.content}</span>,
      // sumary: <Skeleton />,
      preview: <Skeleton height={50} />,
      status: <Skeleton width={40} />,
      tags: <Skeleton width={80} />,
      category: <Skeleton width={40} />,
      format: <Skeleton width={40} />,
      // url: <span>{post.url}</span>,
      // exif: <span>{post.exif}</span>,
      // description: <span>{post.description}</span>,
      edit: <Skeleton />,
    };
    const sks = [];
    for (let i = 0; i < 6; i++) sks.push(sk);
    return sks;
  }
  const rows: TableRow[] = posts.map((post, index) => {
    return {
      index: <span style={{ fontSize: 12 }}>{index + 1}</span>,
      // id: <span style={{fontSize: 14}}>{post.id}</span>,
      // uid: <span style={{fontSize: 12}}>{post.uid.slice(0, 10)+'...'}</span>,
      createAt: (
        <span>
          {dayjs
            .unix(Number(String(post.createAt).slice(0, 10)))
            .format('YYYY-MM-DD')}
        </span>
      ),
      updateAt: (
        <span>
          {dayjs
            .unix(Number(String(post.updateAt).slice(0, 10)))
            .format('YYYY-MM-DD')}
        </span>
      ),
      type: <span>{post.type}</span>,
      title: (
        <span
          onClick={() => onView(post)}
          style={{ cursor: 'pointer', color: COLOR_MAP.primary }}>
          {post.title}
        </span>
      ),
      author: <span>{post.author}</span>,
      // content: <span>{post.content}</span>,
      // sumary: <span>{post.excerpt || post.description}</span>,
      preview: renderPreview(
        post.url.replace('static/', 'static/thumb-'),
        post.title,
      ),
      status: renderStatus(post.status),
      tags: renderTags(post.tags, 'primary'),
      category: renderTags(post.category),
      format: <span>{post.format}</span>,
      // url: <span>{post.url}</span>,
      // exif: <span>{post.exif}</span>,
      // description: <span>{post.description}</span>,
      edit: renderEdit(post, onEdit, onDel, isLogin),
    };
  });
  return rows;
}

const renderTags = (tags: string, variant: any = 'secondary') => {
  if (!tags) return <span></span>;
  return (
    <span>
      {tags.split('|').map((t, i) => (
        <Tag variant={variant} key={i}>
          {t}
        </Tag>
      ))}
    </span>
  );
};

const renderPreview = (cover: string, title: string) => {
  return (
    <img
      src={cover}
      alt={title}
      style={{ width: 50, height: 40, objectFit: 'cover' }}
    />
  );
};

const renderStatus = (status: string) => {
  let s = '';
  if (status === 'publish') s = '已发表';
  else if (status === 'draft') s = '草稿';
  return <span>{s}</span>;
};

const renderEdit = (
  a: IPost,
  onEdit: (a: IPost) => void,
  onDel: (a: IPost) => void,
  isLogin: boolean,
) => {
  return (
    <div>
      <Button onClick={() => onEdit(a)} disabled={!isLogin}>
        编辑
      </Button>
      <Button variant="danger" onClick={() => onDel(a)} disabled={!isLogin}>
        删除
      </Button>
    </div>
  );
};
