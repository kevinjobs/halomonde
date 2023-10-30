import React from 'react';
import styled from 'styled-components';
import { Header } from './_partial/layout';
import { Upload } from '@/components/upload';
import { BASE_URL } from '@/configs';
import { addPost, fetchPosts, deletePost } from '@/apis/posts';
import { getLocalStorage } from '.';
import { CloseOne } from '@icon-park/react';

const CE = styled.div``;
const Up = styled.div`
  display: flex;
  .main {
    margin: 0 auto;
    
    .upload {
      width: 300px;
    }
    .uploaded {
      margin-top: 32px;
      width: 300px;
    }
  }
  > .preview {
    margin-left: 32px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-grow: 1;
    .preview-item {
      margin: 0 8px 16px 8px;
      height: 200px;
      width: 300px;
      position: relative;
      .del {
        position: absolute;
        right: -10px;
        top: -10px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default function CoverEdit() :React.ReactElement {
  const [url, setUrl] = React.useState(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cover, setCovers] = React.useState<any[]>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (d: any) => {
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
          window.alert('添加封面成功');
          getAllCovers();
        } else window.alert('添加失败');
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
      }
    })();
  }

  const onDelSuccess = () => {
    getAllCovers();
  }

  React.useEffect(() => {
    getAllCovers();
  }, []);

  return (
    <CE>
      <Header>
        <Header.Title>画廊封面编辑</Header.Title>
      </Header>
      <Up>
        <div className='main'>
          <div className='upload'>
            <Upload
              url={BASE_URL + '/upload'}
              onFinish={handleFinish}
              allowExtensions={['jpg', 'jpeg', 'webp', 'png']}
            />
          </div>
        </div>
        <div className='preview'>
          { cover && cover.map(c => renderPreviewItem(c, onDelSuccess)) }    
        </div>
      </Up>
    </CE>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderPreviewItem = (data: any, onDel?: () => void) => {
  const handleDel = () => {
    const uid = data.uid;
    if (window.confirm('确定删除吗')) {
      (async() => {
        const res = await deletePost(uid);
        if (typeof res !== 'string') {
          window.alert('删除成功')
          if (onDel) onDel();
        } else window.alert(res);
      })();
    }
  };

  return (
    <div className='preview-item' key={data.uid}>
      <div className='del' onClick={handleDel}>
        <CloseOne theme="outline" size="24" fill="#d0021b"/>
      </div>
      <img src={BASE_URL + data.url} alt={data.title} />
    </div>
  )
}
