import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '@/types';
import { fetchPost } from '@/utils/apis/post';
import { Skeleton } from '@horen/core';
import { Left } from '@icon-park/react';

import { Comment } from '@/pages/articles/comment';
import style from './Article.module.less';

export default function ArticlePage(): React.ReactElement {
  const [article, setArticle] = React.useState<IPost>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();

  React.useEffect(() => {
    const { uid } = params;
    (async () => {
      const data = await fetchPost(uid);
      if (typeof data !== 'string') setArticle(data.data.post);
    })();
  }, []);

  return (
    <div className={style.article}>
      <div className={style.back}>
        <div className={style.backText} onClick={() => history.go(-1)}>
          <Left theme="outline" size="24" fill="#333" />
          <span>返回</span>
        </div>
      </div>
      {article ? renderContent(article) : renderLoading()}
      <div style={{ marginTop: 64, maxWidth: 1000, padding: 16 }}>
        <Comment />
      </div>
    </div>
  );
}

const renderContent = (article: IPost) => {
  return (
    <div className={style.articleContent}>
      <div className={style.pageHeader}>
        <h2>{article.title}</h2>
        <div className={style.author}>{article.author}</div>
        <div className={style.date}>
          {dayjs.unix(article.createAt).format('YYYY年M月D日')}
        </div>
      </div>
      <div className={style.content}>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>
    </div>
  );
};

const renderLoading = () => {
  return (
    <div>
      <div className={style.skeletonItem}>
        <Skeleton height={40} />
      </div>
      <div className={style.skeletonItem}>
        <Skeleton height={12} width={80} />
      </div>
      <div className={style.skeletonItem}>
        <Skeleton height={12} width={150} />
      </div>
      <div className={style.skeletonContent}>
        <div>
          <Skeleton height={16} width={500} />
        </div>
        <div>
          <Skeleton height={16} width={300} />
        </div>
        <div>
          <Skeleton height={16} width={200} />
        </div>
        <div>
          <Skeleton height={16} width={320} />
        </div>
        <div>
          <Skeleton height={16} width={400} />
        </div>
        <div>
          <Skeleton height={16} />
        </div>
        <div>
          <Skeleton height={16} width={210} />
        </div>
        <div>
          <Skeleton height={16} width={300} />
        </div>
        <div>
          <Skeleton height={16} width={600} />
        </div>
        <div>
          <Skeleton height={16} width={80} />
        </div>
        <div>
          <Skeleton height={16} />
        </div>
        <div>
          <Skeleton height={16} width={230} />
        </div>
        <div>
          <Skeleton height={16} width={400} />
        </div>
      </div>
    </div>
  );
};
