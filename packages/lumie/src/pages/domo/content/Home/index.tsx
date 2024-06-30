import React, { useEffect, useState } from 'react';
import Home from './Home';
import EditModal from './EditModal';
import { PostListRespData, getPostListSync } from '@/utils/apis';
import { IPost } from '@/types';
import { DOMO_POSTS_STATE, DomoPostsState, PostType } from '@/constants';
import { toDelete, toUpdate } from '../_add';

export function ContentHomePage() {
  const [pageLimit, setPageLimit] = useState(8);
  const [pickPost, setPickPost] = useState<IPost>(null);
  const [pageData, setPageData] = useState<Partial<PostListRespData>>(null);
  // computed

  const hasPrev = pageData?.offset > 0;
  const hasNext = pageData?.offset + pageData?.limit < pageData?.totals;

  /** 刷新 */
  const refreshPosts = (offset = 0, limit: number, typ: PostType) => {
    setPageData(null);
    setTimeout(() => {
      getPostListSync(
        {
          offset,
          limit,
          type: typ,
          status: 'all',
        },
        (_, __, ___, data) => {
          setPageData(data);
          localStorage.setItem(
            DOMO_POSTS_STATE,
            JSON.stringify({
              data,
            }),
          );
        },
        (errMsg) => console.log(errMsg),
      );
    }, 16);
  };

  const handleClickPrev = () => {
    if (hasPrev)
      refreshPosts(
        pageData.offset - pageLimit,
        pageLimit,
        pageData.posts[0].type,
      );
  };

  const handleClickNext = () => {
    if (hasNext)
      refreshPosts(
        pageData.offset + pageLimit,
        pageLimit,
        pageData.posts[0].type,
      );
  };

  const handleDelete = (uid: string) => {
    toDelete(uid, () => {
      refreshPosts(pageData.offset, pageLimit, pageData.posts[0].type);
    });
  };

  const handleEdit = (post: IPost) => {
    setPickPost(post);
  };

  const handleFilter = (type: PostType) => {
    refreshPosts(0, pageLimit, type);
  };

  const handleView = () => {
    console.log('view');
  };

  const closeEditModal = () => {
    setPickPost(null);
  };

  const updatePost = (post: IPost) => {
    toUpdate(
      post,
      () => {
        setPickPost(null);
      },
      () => {
        setPickPost(null);
      },
    );
  };

  useEffect(() => {
    const ps = localStorage.getItem(DOMO_POSTS_STATE);
    if (ps) {
      const { data } = JSON.parse(ps) as DomoPostsState;

      console.log(data);

      setPageLimit(pageLimit);
      if (data) setPageData(data);
      else refreshPosts(0, pageLimit, 'article');
    } else {
      refreshPosts(0, pageLimit, 'article');
    }
  }, []);

  return (
    <div>
      <Home
        posts={pageData?.posts}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onPrev={handleClickPrev}
        onNext={handleClickNext}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onFilter={handleFilter}
        onView={handleView}
      />
      <EditModal
        visible={Boolean(pickPost)}
        onSubmit={updatePost}
        onClose={closeEditModal}
        mode="update"
        post={pickPost}
      />
    </div>
  );
}
