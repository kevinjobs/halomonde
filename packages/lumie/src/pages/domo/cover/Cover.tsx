import React from 'react';
import { AvatarUpload } from '@horen/core';
import { addPost, fetchPosts, deletePost } from '@/apis/posts';
import { getLocalStorage } from '@/utils';
import { CloseOne } from '@icon-park/react';
import { UPLOAD_URL } from '@/constants';
import { UploadReturnType } from '@/types';
import { notifications } from '@horen/notifications';
import style from './Cover.module.less';

export default function CoverEdit() :React.ReactElement {
  const [url, setUrl] = React.useState(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cover, setCovers] = React.useState<any[]>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (d: UploadReturnType) => {
    if (d) {
      setUrl(d.url);
      (async() => {
        const data = await addPost({
          title: `gallery-cover-${(new Date()).valueOf()}`,
          author: getLocalStorage().name,
          type: 'cover',
          url: d.url,
          exif: JSON.stringify({width: d.width, height: d.height}),
          format: d.ext,
          category: 'cover',
          excerpt: '用于首页封面',
          status: 'publish',
        });

        if (data){
          notifications.show({
            type: 'success',
            title: '添加成功',
            message: '添加封面成功'
          });
          getAllCovers();
        } else {
          notifications.show({title: '失败',  message: '添加失败'})
        };
      })();
    }
  };

  const getAllCovers = () => {
    (async() => {
      const resp = await fetchPosts(0, 100, {type: 'cover'});
      if (typeof resp !== 'string') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCovers(resp.data.posts.map((p:any) => {
          p.url = p.url.replace('static/', 'static/thumb-');
          return p;
        }))
      } else {
        setCovers([]);
        notifications.show({
          type: 'warning',
          message: '无法获取或者为空'
        })
      }
    })();
  }

  const onDelSuccess = (data: any) => {
    setCovers((covers) => {
      const idx = covers.indexOf(data);
      const next = covers.splice(idx, 1);
      return next;
    })
  }

  React.useEffect(() => {
    getAllCovers();
  }, []);

  return (
    <div className={style.preview}>
      { cover && cover.map(c => renderPreviewItem(c, onDelSuccess)) }
      <div className={style.previewItem + ' ' + style.uploadTo} style={{border: '1px solid #777'}}>
        <AvatarUpload url={UPLOAD_URL} onSuccess={handleFinish} />
      </div>   
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderPreviewItem = (data: any, onDel?: (data: any) => void) => {
  const handleDel = () => {
    const uid = data.uid;
    if (window.confirm('确定删除吗')) {
      (async() => {
        const res = await deletePost(uid);
        if (typeof res !== 'string') {
          notifications.show({type: 'success', message: '删除成功'})
          if (onDel) onDel(data);
        } else notifications.show({type: 'error', message: res});
      })();
    }
  };

  return (
    <div className={style.previewItem} key={data.uid}>
      <div className={style.del} onClick={handleDel}>
        <CloseOne theme="outline" size="24" fill="#d0021b"/>
      </div>
      <img src={data.url} alt={data.title} />
    </div>
  )
}
