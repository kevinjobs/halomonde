import React from 'react';
import styled from 'styled-components';
import { fetchPosts } from '@/apis/posts';
import { IPost, IExif } from '@/types';
import { Masonry, MasonryItem } from '@/components/masonry';
import { Loading } from '@/components/loading';
import { useDevice, useScroll } from '@/hooks';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  position: relative;
`;

const ImageMasonry = styled.div`
  margin: 48px 0;
`;

const Mask = styled.div``;
const MaskDesc = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .mask-desc-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 8px;
  }
  .i-icon {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

const maskStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255,249,247,1)',
  zIndex: 10,
  transition: 'all .3s ease-in-out',
  filter: 'opacity(98%)',
} as React.CSSProperties;

type PhotoItem = MasonryItem & IPost;

function GalleryPage () :React.ReactElement {
  const [nowOffset, setNowOffset] = React.useState(0);
  const [photos, setPhotos] = React.useState<Array<PhotoItem>>([]);
  const [hasMore, setHasMore] = React.useState(false);

  const { clientWidth, device } = useDevice();
  const { toBottom } = useScroll();

  const pageLimit = 12;

  // 获取图片
  const getImageList = async (page: number, size = 12) => {
    const data = await fetchPosts(page, size, {type: 'photo'});
    if (typeof data !== 'string') {
      setPhotos(photos.concat(covertImageList(data.data.posts)));
      if (pageLimit + nowOffset >= data.data.totals) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setNowOffset(nowOffset + pageLimit);
      }
    }
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
        {
          photos.length !== 0
            ? 
            <Masonry
              items={photos as PhotoItem[]}
              cols={device === 'mobile' ? 2 : 4}
              colWidth={device === 'mobile' ? (clientWidth - 12)/2 : 320}
              gutter={device === 'mobile' ? 4 : 24}
              shadow
            />
            :
            <Loading />
        }
      </ImageMasonry>
      { hasMore && <Loading /> }
    </Container>
  );
}

// covert the raw image list to the masonry required.
const covertImageList = (imageList: Array<IPost>) :Array<PhotoItem> => {
  return imageList.map((img: IPost) => {
    let exif: IExif;
    try {
      exif = JSON.parse(img.exif);
    } catch (e) {
      console.log(e);
    }

    const src = img.url;
    return {
      'src': src,
      'width': exif?.width,
      'height': exif?.height,
    };
  });
};

export default React.memo(GalleryPage);
