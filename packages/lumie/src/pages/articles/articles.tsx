import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import COLOR_MAP from '@/styles/colors';
import { IPost } from '@/types';
import { getPostListSync } from '@/utils/apis/post';
import { Skeleton } from '@horen/core';
import { photoCompressedUrl } from '@/utils/uri';

const width = '880px';

const Container = styled.div`
  padding: 48px 0;
  background-color: ${COLOR_MAP.white};
`;

const ArticleList = styled.div`
  margin: 0 auto;
  max-width: ${width};
`;

const ArticleItem = styled.div`
  margin: 16px;
  border-radius: 5px;
  position: relative;
  transition: all 0.3s ease-in-out;
  display: flex;
  border: 1px solid ${COLOR_MAP.white4};
  &:hover {
    border-color: ${COLOR_MAP.primary};
  }
`;

const Cover = styled.div`
  width: 44%;
  min-height: 160px;
  max-height: 200px;
  transition: width 0.2s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px 0 0 5px;
  }
`;

const Info = styled.div`
  position: relative;
  width: 56%;
  color: ${COLOR_MAP.dark};
  border-radius: 0 4px 4px 0;
  flex-grow: 1;
  h3.info-item {
    cursor: pointer;
    &:hover {
      color: ${COLOR_MAP.blue};
    }
  }
  .info-author-date {
    position: absolute;
    left: 16px;
    bottom: 16px;
    font-size: 12px;
    color: ${COLOR_MAP.dark};
    .info-author,
    .info-date {
      display: inline-block;
      margin-right: 16px;
    }
    .info-date {
      color: ${COLOR_MAP.white6};
    }
  }
`;

const LoadMore = styled.div`
  max-width: ${width};
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: ${COLOR_MAP.primary};
  }
  > div {
    border: 1px solid ${COLOR_MAP.white4};
    padding: 16px;
    border-radius: 4px;
  }
`;

const Sk = styled.div`
  background-color: ${COLOR_MAP.white1};
  margin: 16px;
  display: flex;
  .right {
    margin-left: 16px;
  }
  .item {
    margin: 0 0 20px 0;
  }
`;

function transformList(origin: IPost[]): IPost[] {
  const arr = [];
  for (let i = 0; i < origin?.length; i++) {
    const n = origin[i];
    n.url = n.url.replace('static/', 'static/thumb-');
    arr.push(n);
  }
  return arr;
}

export function ArticlesPage(): React.ReactElement {
  const [articleList, setArticleList] = React.useState<IPost[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  const pageLimit = 5;
  const navigate = useNavigate();

  const handleClickMore = () => {
    refreshArticleList(offset);
  };

  const handleClickArticle = (a: IPost) => {
    navigate(`/view/article/${a.uid}`);
  };

  const refreshArticleList = (offset: number, limit = pageLimit) => {
    getPostListSync(
      { offset, limit, type: 'article' },
      (postList, _, hasNext) => {
        setArticleList([...articleList, ...transformList(postList)]);
        setHasMore(hasNext);
        setOffset(offset + limit);
      },
      (errMsg) => console.log(errMsg),
    );
  };

  const PostItem = ({ a }: { a: IPost }) => {
    return (
      <ArticleItem key={a.uid}>
        <Cover onClick={() => handleClickArticle(a)} className="cover">
          <img src={photoCompressedUrl(a.url)} alt={a.title} />
        </Cover>
        <Info>
          <div style={{ margin: 16 }}>
            <h3 className="info-item" onClick={() => handleClickArticle(a)}>
              {a.title}
            </h3>
            <div className="info-item" style={{ color: COLOR_MAP.white7 }}>
              {a.excerpt}
            </div>
            <div className="info-author-date info-item">
              <div className="info-author">{a.author}</div>
              <div className="info-date">
                {dayjs.unix(a.updateAt).format('YYYY年M月D日')}
              </div>
            </div>
          </div>
        </Info>
      </ArticleItem>
    );
  };

  // 组件加载时获取文章列表
  React.useEffect(() => refreshArticleList(offset), []);

  return (
    <Container>
      <ArticleList>
        {articleList.length > 0
          ? articleList.map((p) => <PostItem key={p.uid} a={p} />)
          : renderSkeleton()}
      </ArticleList>
      {hasMore && (
        <LoadMore role="button" onClick={handleClickMore}>
          <div>点击加载更多</div>
        </LoadMore>
      )}
    </Container>
  );
}

const renderSkeleton = () => {
  const sk = [];
  for (let i = 0; i < 6; i++) {
    sk.push(
      <Sk className="wait" key={i}>
        <div className="left">
          <Skeleton height={200} width={320} />
        </div>
        <div className="right">
          <div className="item">
            <Skeleton height={20} width={460} />
          </div>
          <div className="item">
            <Skeleton height={16} width={260} />
          </div>
          <div className="item">
            <Skeleton height={16} width={180} />
          </div>
          <div className="item">
            <Skeleton height={16} width={240} />
          </div>
          <div className="item">
            <Skeleton height={16} width={300} />
          </div>
          <div className="item">
            <Skeleton height={12} width={380} />
          </div>
        </div>
      </Sk>,
    );
  }
  return <>{sk}</>;
};
