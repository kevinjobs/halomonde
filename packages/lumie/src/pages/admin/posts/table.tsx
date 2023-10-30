import React from 'react';
import dayjs from 'dayjs';
import { IPost } from '@/types';
import { getLocalStorage } from '..';
import { BASE_URL } from '@/configs';
import { Button, } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { Tag } from '@/components/tag';
import { Table } from '@/components/table';
import COLOR_MAP from '@/styles/colors';

export interface PostTableProps {
  posts: IPost[];
  onEdit?(p: IPost): void;
  onDel?(p: IPost): void;
  onView?(p: IPost): void;
}

export interface TableRow {
  id?: React.ReactNode;
  uid?: React.ReactNode;
  title: React.ReactNode;
  author: React.ReactNode;
  type: React.ReactNode;
  updateAt: React.ReactNode;
  createAt: React.ReactNode;
  preview: React.ReactNode;
  tags: React.ReactNode;
  sumary: React.ReactNode;
  format: React.ReactNode;
  status: React.ReactNode;
  category: React.ReactNode;
  edit: React.ReactNode;
}

const TABLE_HEADERS = [
  { field: 'id', name: 'ID', },
  { field: 'uid', name: 'UID', width: 60, },
  { field: 'createAt', name: '创建日期', width: 100, },
  { field: 'updateAt', name: '更新日期', width: 100, },
  { field: 'type', name: '类型', },
  { field: 'title', name: '标题', },
  { field: 'author', name: '作者', },
  // { field: 'content', name: '内容', },
  { field: 'sumary', name: '摘要', width: 200, },
  { field: 'preview', name: '预览', width: 100, },
  { field: 'status', name: '状态', },
  { field: 'tags', name: '标签', },
  { field: 'category', name: '分类', },
  { field: 'format', name: '格式', },
  // { field: 'url', name: '预览', },
  // { field: 'exif', name: '图片信息', },
  // { field: 'description', name: '描述', },
  { field: 'edit', name: '编辑', width: 120, },
];

export const PostTable: React.FC<PostTableProps> = (props: PostTableProps) => {
  const { posts, onEdit, onDel, onView } = props;

  const clickEdit = (p: IPost) => {
    if (onEdit) onEdit(p);
  };

  const clickDel = (p: IPost) => {
    if (onDel) onDel(p);
  };

  const clickView = (p: IPost) => {
    if (onView) onView(p);
  };

  return (
    <div className='post-table'>
      <Table
        data={toTableData(posts, clickEdit, clickDel, clickView)}
        heads={TABLE_HEADERS}
      />
    </div>
  );
};

function toTableData (
  posts: IPost[],
  onEdit: (p: IPost) => void,
  onDel: (p: IPost) => void,
  onView?: (p: IPost) => void
) :TableRow[] {
  if (!posts) {
    const sk = {
      id: <Skeleton width={20} />,
      uid: <Skeleton />,
      createAt: <Skeleton />,
      updateAt: <Skeleton />,
      type: <Skeleton width={40} />,
      title: <Skeleton width={140} />,
      author: <Skeleton width={60} />,
      // content: <span>{post.content}</span>,
      sumary: <Skeleton />,
      preview: <Skeleton height={80} />,
      status: <Skeleton width={40} />,
      tags: <Skeleton width={40} />,
      category: <Skeleton width={40} />,
      format: <Skeleton width={40} />,
      // url: <span>{post.url}</span>,
      // exif: <span>{post.exif}</span>,
      // description: <span>{post.description}</span>,
      edit: <Skeleton />,
    };
    const sks = [];
    for (let i=0; i<6; i++) sks.push(sk);
    return sks;
  }
  const rows:TableRow[] = posts.map((post) => {
    return {
      id: <span style={{fontSize: 14}}>{post.id}</span>,
      uid: <span style={{fontSize: 12}}>{post.uid.slice(0, 10)+'...'}</span>,
      createAt: <span>{dayjs.unix(Number(String(post.createAt).slice(0, 10))).format('YYYY-MM-DD')}</span>,
      updateAt: <span>{dayjs.unix(Number(String(post.updateAt).slice(0, 10))).format('YYYY-MM-DD')}</span>,
      type: <span>{post.type}</span>,
      title: <span onClick={() => onView(post)} style={{cursor: 'pointer', color: COLOR_MAP.primary}}>{post.title}</span>,
      author: <span>{post.author}</span>,
      // content: <span>{post.content}</span>,
      sumary: <span>{post.excerpt || post.description}</span>,
      preview: renderPreview(post.url.replace('static/', 'static/thumb-'), post.title),
      status: renderStatus(post.status),
      tags: renderTags(post.tags),
      category: renderTags(post.category),
      format: <span>{post.format}</span>,
      // url: <span>{post.url}</span>,
      // exif: <span>{post.exif}</span>,
      // description: <span>{post.description}</span>,
      edit: renderEdit(post, onEdit, onDel),
    };
  });
  return rows;
}

const renderTags = (tags: string) => {
  if (!tags) return <span></span>;
  return (
    <span>{tags.split('|').map((t, i) => <Tag key={i}>{t}</Tag>)}</span>
  );
};

const renderPreview = (cover: string, title:string) => {
  return (
    <img
      src={BASE_URL + cover}
      alt={title}
      style={{ width: 100, height: 80, objectFit: 'cover' }}
    />
  );
};

const renderStatus = (status: string) => {
  let s = '';
  if (status === 'publish') s = '已发表';
  else if (status === 'draft') s = '草稿';
  return (
    <span>{s}</span>
  );
};

const renderEdit = (
  a: IPost,
  onEdit: (a: IPost) => void,
  onDel: (a: IPost) => void
) => {
  const { token } = getLocalStorage();
  const isLogin = token === null ? false : true;
  return (
    <span>
      <Button onClick={() => onEdit(a)} disabled={!isLogin}>编辑</Button>
      <Button onClick={() => onDel(a)} danger disabled={!isLogin}>删除</Button>
    </span>
  );
};