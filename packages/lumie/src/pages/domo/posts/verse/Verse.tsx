import React, { useEffect, useState } from 'react';
import {
  Delete,
  FileEditing,
} from '@icon-park/react';
import { Button, Icon } from '@horen/core';
import { notifications } from '@horen/notifications';
import { Dialog } from '@/components/dialog';
import { IPost } from '@/types';
import { addPost, fetchPosts, deletePost, updatePost } from '@/apis/posts';
import './Verse.css';

const VERSE_TPL = {
  author: '',
  content: '',
  title: '',
}

export default function AdminVerse() {
  const [verses, setVerses] = useState<IPost[]>(null);
  const [pickVerse, setPickVerse] = useState<IPost>(null);
  const [mode, setMode] = useState('add');

  const handleSubmit = (p: IPost) => {
    if (mode === 'add') {
      (async() => {
        p.type = 'verse';
        p.status = 'publish';
        const res = await addPost(p);
        if (typeof res !== 'string') {
          notifications.show({type: 'success', message: res.msg});
          fetchVerses();
          setPickVerse(null);
        } else {
          notifications.show({type: 'error', message: res});
        }
      })();
    }

    if (mode === 'update') {
      (async() => {
        const res = await updatePost(p.uid, p);
        if (typeof res !== 'string') {
          notifications.show({type: 'success', message: res.msg});
          fetchVerses();
          setPickVerse(null);
        } else {
          notifications.show({type: 'error', message: res});
        }
      })();
    }
  }

  const handleDelete = (p: IPost) => {
    if (window.confirm('确定要删除吗？')) {
      (async () => {
        const resp = await deletePost(p.uid);
        if (typeof resp !== 'string') {
          notifications.show({type: 'success', message: resp.msg});
          fetchVerses();
        } else notifications.show({type: 'error', message: resp});
      })();
    }
  }

  const handleEdit = (p: IPost) => {
    setPickVerse(p);
    setMode('update');
  }

  const fetchVerses = () => {
    (async() => {
      const resp = await fetchPosts(0, 999, {type: 'verse'});
      if (typeof resp !== 'string') {
        setVerses(resp.data.posts);
      } else {
        notifications.show({message: resp});
      }
    })();
  }

  useEffect(() => {
    fetchVerses();
  }, [])

  return (
    <div>
      <div>
          <Button onClick={() => {
            // 每次重新生成，否则是旧的值
            VERSE_TPL.title = 'verse-' + (new Date()).valueOf();
            setPickVerse(VERSE_TPL);
            setMode('add');
          }}>
            <Icon name='add' fill='#fff' />
            <span>添加诗文</span>
          </Button>
        </div>
      <div className='verse-list'>
        {verses && verses.map(p => {
          return (
            <VerseItem
              key={p.uid}
              post={p}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        })}
      </div>
      <Dialog
        title={(mode === 'add' ? '添加' : '更新') + "诗句"}
        visible={Boolean(pickVerse)}
        onCancel={() => setPickVerse(null)}
      >
        {
          pickVerse &&
          <VerseEdit post={pickVerse} onSubmit={handleSubmit} mode={mode} />
        }
      </Dialog>
    </div>
  )
}

type VerseItemProps = {
  post: IPost;
  onEdit(p: IPost): void;
  onDelete(p: IPost): void;
}

type VerseEditProps = {
  post: IPost;
  onSubmit(p: IPost): void;
  mode: string;
}

function VerseItem({post, onDelete, onEdit}: VerseItemProps) {
  return (
    <div className='verse-item'>
      <div className='verse-item-edit' onClick={() => onEdit(post)}>
        <FileEditing theme="outline" size="18"/>
      </div>
      <div className='verse-item-delete' onClick={() => onDelete(post)}>
        <Delete theme="outline" size="20" fill="#dd4e4e"/>
      </div>
      <div className='verse-item-content'>
        {post.content.replace('|', ', ') + '。'}
      </div>
      <div className='verse-item-author'>
        ——{post.author}
      </div>
    </div>
  )
}

function VerseEdit({post, onSubmit, mode}: VerseEditProps) {
  const [verse1, setVerse1] = useState<string>(post.content.split('|')[0]);
  const [verse2, setVerse2] = useState<string>(post.content.split('|')[1]);
  const [author, setAuthor] = useState<string>(post.author);
  const [title, setTitle] = useState(post.title);

  return (
    <div className='verse-edit'>
      <div className='verse-edit-item'>
        <span className='item-label'>标题</span>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className='verse-edit-item'>
        <span className='item-label'>第一句</span>
        <input value={verse1} onChange={e => setVerse1(e.target.value)} />
      </div>
      <div className='verse-edit-item'>
        <span className='item-label'>第二句</span>
        <input value={verse2} onChange={e => setVerse2(e.target.value)} />
      </div>
      <div className='verse-add-one'>
        <Button>增加一条</Button>
      </div>
      <div className='verse-edit-item'>
        <span className='item-label'>作者</span>
        <input value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div id="submit-verse">
        <Button onClick={() => {
          onSubmit({
            author, title, content: [verse1, verse2].join('|')
          })
        }}>{mode === 'add' ? '新增' : '更新'}</Button>
      </div>
    </div>
  )
}