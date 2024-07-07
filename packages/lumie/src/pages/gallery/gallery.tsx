import React from 'react';
import styled from 'styled-components';

import { Loading } from '@/components/loading';
import { Masonry, MasonryItem } from '@/components/masonry';
import { useDevice, useScroll } from '@/hooks';
import { IPost } from '@/types';
import { getPostListSync } from '@/utils/apis';
import { IExif } from '@/utils/exif';

import { photoCompressedUrl } from '@/utils/uri';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.9);
  // z-index: 1;
  position: relative;
`;

const ImageMasonry = styled.div`
  margin: 48px 0;
`;

type PhotoItem = MasonryItem & IPost;

function GalleryPage(): React.ReactElement {
  const [nowOffset, setNowOffset] = React.useState(0);
  const [photos, setPhotos] = React.useState<Array<PhotoItem>>([]);
  const [hasMore, setHasMore] = React.useState(false);

  const { clientWidth, device } = useDevice();
  const { toBottom } = useScroll();

  const pageLimit = 12;

  // 获取图片
  const getImageList = async (page: number, size = 12) => {
    getPostListSync(
      { offset: page, limit: size, type: 'photo' },
      (postList, hasPrev, hasNext) => {
        setPhotos(photos.concat(covertImageList(postList)));
        setHasMore(hasNext);
        setNowOffset(page + size);
      },
      (errMsg) => console.log(errMsg),
    );
  };

  React.useEffect(() => {
    // 获取图片
    getImageList(nowOffset, pageLimit);
  }, []);

  React.useEffect(() => {
    if (hasMore && toBottom < 500) {
      getImageList(nowOffset, pageLimit);
    }
    // console.log(hasMore, nowOffset);
  }, [toBottom]);

  return (
    <Container>
      <ImageMasonry>
        {photos.length !== 0 ? (
          <Masonry
            items={photos as PhotoItem[]}
            cols={device === 'mobile' ? 2 : 4}
            colWidth={device === 'mobile' ? (clientWidth - 12) / 2 : 320}
            gutter={device === 'mobile' ? 4 : 24}
            shadow
          />
        ) : (
          <Loading />
        )}
      </ImageMasonry>
      {hasMore && <Loading />}
    </Container>
  );
}

// covert the raw image list to the masonry required.
export const covertImageList = (imageList: Array<IPost>): Array<PhotoItem> => {
  return imageList.map((img: IPost) => {
    let exif: IExif;
    try {
      exif = JSON.parse(img.exif);
    } catch (e) {
      console.log(e);
    }

    const src = photoCompressedUrl(img.url);
    return {
      src: src,
      width: exif?.width,
      height: exif?.height,
      post: img,
    };
  });
};

export default React.memo(GalleryPage);
