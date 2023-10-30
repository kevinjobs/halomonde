import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';
import { Left } from '@icon-park/react';
import { IPost } from '@/types';
import { Skeleton } from '@/components/skeleton';
import { fetchPost } from '@/apis/posts';
import { Comment } from './comment';
import COLOR_MAP from '@/styles/colors';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 16px;
  background-color: #fff;
  .back {
    padding: 0 16px;
    margin-bottom: 24px;
    div.back-txt {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 20px 8px 12px;
      background-color: ${COLOR_MAP.white3};
      width: fit-content;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: ${COLOR_MAP.white4};
      }
    }
  }
`;

const Header = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px 0;
  h2,.date,.author {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .author {
    padding: 16px 0 0 16px;
    color: ${COLOR_MAP.white7};
    font-size: 0.9rem;
  }
  .date {
    padding: 16px 16px 0 16px;
    color: ${COLOR_MAP.white7};
    font-size: 0.9rem;
  }
`;

const Content = styled.div`
  line-height: 1.8;
  padding: 0 16px 32px 16px;
`;

const Sk = styled.div`
  .item {
    margin: 16px 0;
  }
  .content {
    margin-top: 60px;
    div {
      margin: 18px 0;
    }
  }
`;

export default function ArticlePage () :React.ReactElement {
  const [article, setArticle] = React.useState<IPost>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();

  React.useEffect(() => {
    const { uid } = params;
    (async() => {
      const data = await fetchPost(uid);
      if (typeof data !== 'string') setArticle(data.data.post);
    })();
  }, []);

  return (
    <Container>
      { article ? renderContent(article) : renderLoading() }
      <div style={{marginTop:64,maxWidth:1000,padding:16}}>
        <Comment />
      </div>
    </Container>
  );
}

const renderContent = (article: IPost) => {
  return (
    <div className='article-content'>
      <div className='back'>
        <div className='back-txt' onClick={() => history.go(-1)}>
          <Left theme="outline" size="24" fill="#333"/>
          <span>返回</span>
        </div>
      </div>
      <Header className="article-page-header">
        <h2>{ article.title }</h2>
        <div className="author">
          { article.author }
        </div>
        <div className="date">
          { dayjs.unix(article.createAt).format('YYYY年M月D日') }
        </div>
      </Header>
      <Content>
        <div dangerouslySetInnerHTML={{__html: article.content}}></div>
      </Content>
    </div>
  );
};

const renderLoading = () => {
  return (
    <Sk>
      <div className='title item'>
        <Skeleton height={50} />
      </div>
      <div className='author item'>
        <Skeleton height={12} width={80} />
      </div>
      <div className='datetime item'>
        <Skeleton height={12} width={150} />
      </div>
      <div className='content item'>
        <div><Skeleton height={16} width={500} /></div>
        <div><Skeleton height={16} width={300} /></div>
        <div><Skeleton height={16} width={200} /></div>
        <div><Skeleton height={16} width={320} /></div>
        <div><Skeleton height={16} width={400} /></div>
        <div><Skeleton height={16} /></div>
        <div><Skeleton height={16} width={210} /></div>
        <div><Skeleton height={16} width={300} /></div>
        <div><Skeleton height={16} width={600} /></div>
        <div><Skeleton height={16} width={80} /></div>
        <div><Skeleton height={16} /></div>
        <div><Skeleton height={16} width={230} /></div>
        <div><Skeleton height={16} width={400} /></div>
      </div>
    </Sk>
  );
};