import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { CalendarThirtyTwo, CrossRingTwo } from '@icon-park/react';
import { fetchPosts } from '@/apis/posts';
import { IPost, IExif } from '@/types';
import { Masonry, MasonryItem } from '@/components/masonry';
import { Image } from '@/components/image';
import { Loading } from '@/components/loading';
import { useDevice, useScroll } from '@/hooks';
import { BASE_URL } from '@/configs';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateoriginalSize = (item: PhotoItem, clientWidth: number, clientHeight: number) => {
  /**
   * 计算预览图最终状态
   * @param item
   * @param clientWidth 窗口宽度
   * @param clientHeight 窗口高度
   */
  // 原图比例
  const ratio: number = item.width / item.height;

  let finalHeight: number;
  // 最终的高度
  // 如果原图高度大于视窗高度的 90% 则将其裁剪
  const limitHeight = clientHeight * 0.8;
  if (item.height > limitHeight) {
    finalHeight = limitHeight;
  } else {
    finalHeight = item.height;
  }
  // 根据高度计算出最终的宽度
  let finalWidth = finalHeight * ratio;
  if (finalWidth > clientWidth) {
    finalWidth = clientWidth;
    finalHeight = clientWidth / ratio;
  }
  // 计算出最终需要偏移的量
  const finalTop = 50; //(clientHeight - finalHeight) / 2;
  // 最终左偏移量，需要减去瀑布流主体距离左边的宽度
  const finalLeft = (clientWidth - finalWidth) / 2;

  return {
    finalWidth,
    finalHeight,
    finalTop,
    finalLeft,
  };
};

export default function GalleryPage () :React.ReactElement {
  const [nowOffset, setNowOffset] = React.useState(0);
  const [photos, setPhotos] = React.useState<Array<PhotoItem>>([]);
  const [hasMore, setHasMore] = React.useState(false);

  const [pickItem, setPickItem] = React.useState<PhotoItem>();
  const [pickItemIdx, setPickItemIdx] = React.useState<number>();
  const [maskPadding, setMaskPadding] = React.useState<number>(0);

  const { clientWidth, clientHeight, device } = useDevice();
  const { toBottom } = useScroll();

  const masonryRef = React.useRef<HTMLDivElement>();

  const pageLimit = 12;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickPreview = (e: any, item: PhotoItem) => {
    /**
     * 处理点击图片预览事件
     */
    e.preventDefault();

    const current = masonryRef.current;
    // 点击选中的 item index
    const index = e.target.parentNode.dataset.index;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oldItem: any = current !== undefined ? current.children[index] : '';
    
    const animationDelay = 400; // 300ms

    // 复制一份原有的图片
    const previewItem = oldItem.cloneNode(true);

    // 记录下原有的位置和长宽信息
    const oldWidth = oldItem.getBoundingClientRect().width;
    const oldHeight = oldItem.getBoundingClientRect().height;
    const oldTop = oldItem.getBoundingClientRect().top;
    const oldLeft = oldItem.getBoundingClientRect().left;

    // 计算最终的位置及长宽
    const {
      finalWidth,
      finalHeight,
      finalTop,
      finalLeft,
    } = calculateoriginalSize(item, clientWidth, clientHeight);

    // 将复制的图片，采用绝对布局
    previewItem.style.transition = `all ${animationDelay/1000}s ease-in-out`;
    previewItem.style.position = 'fixed';
    previewItem.style.boxShadow = '4px 4px 16px 8px rgba(0,0,0,0.35)';
    previewItem.style.zIndex = 999999;

    previewItem.style.width = oldWidth + 'px';
    previewItem.style.height = oldHeight + 'px';
    previewItem.style.left = oldLeft + 'px';
    previewItem.style.top = oldTop + 'px';
    
    oldItem.style.display = 'none';      // 隐藏原有图片
    current.append(previewItem);         // 样式设置好后，将其插入原有结构中

    setPickItem(item);                      // set item selected
    setPickItemIdx(index);                // set item index selected
    setMaskPadding(finalHeight + finalTop);   // set the mask description position to top;

    // 20ms later, 操作 dom 设置放大预览样式
    setTimeout(() => {
      previewItem.style.width = finalWidth + 'px';
      previewItem.style.height = finalHeight + 'px';
      previewItem.style.left = finalLeft + 'px';
      previewItem.style.top = finalTop + 'px';
    }, 20);

    // 点击预览图时，重新缩回小样
    previewItem.onclick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      previewItem.style.width = oldWidth + 'px';
      previewItem.style.height = oldHeight + 'px';
      previewItem.style.left = oldLeft + 'px';
      previewItem.style.top = oldTop + 'px';
      // 动画效果结束后，删除预览图片，并回复原有图片显示
      setTimeout(() => {
        current.removeChild(previewItem);
        oldItem.style.display = 'block';
      }, animationDelay);

      setPickItemIdx(undefined);  // set item index selected undefined;
      setPickItem(undefined);       // set item selected undefined;
    };
  };

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
    console.log(hasMore, nowOffset);
  }, [toBottom]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLockScroll = (e: any) => {
    if (pickItemIdx) {
      e.preventDefault(pickItemIdx);
    }
  };

  React.useEffect(() => {
    window.addEventListener('wheel', handleLockScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleLockScroll);
    };
  }, [pickItemIdx]);

  return (
    <Container>
      <ImageMasonry>
        {
          photos.length !== 0
            ? 
            <Masonry
              data={photos as PhotoItem[]}
              cols={device === 'mobile' ? 2 : 4}
              colWidth={device === 'mobile' ? (clientWidth - 12)/2 : 320}
              gutter={device === 'mobile' ? 4 : 24}
              onPreview={handleClickPreview}
              ref={masonryRef}
              shadow
            />
            :
            <Loading />
        }
        <Mask style={pickItemIdx && maskStyle}>
          <MaskDesc
            style={{
              visibility: pickItemIdx ? 'visible' : 'hidden',
              position: 'absolute',
              top: maskPadding + 8,
              left: '50%',
              transform: 'translateX(-50%)',
              // transition: 'all .1s ease-in',
              flexWrap: device === 'mobile' ? 'wrap' : 'wrap',
            }}
          >
            { pickItem && renderDesc(pickItem) }
          </MaskDesc>
        </Mask>
      </ImageMasonry>
      { hasMore && <Loading /> }
    </Container>
  );
}

// covert the raw image list to the masonry required.
const covertImageList = (imageList: Array<IPost>) :Array<PhotoItem> => {
  return imageList.map((img: IPost, index: number) => {
    let exif: IExif;
    try {
      exif = JSON.parse(img.exif);
    } catch (e) {
      console.log(e);
    }

    const src = BASE_URL + img.url;
    return {
      'id': img.id,
      'uid': img.uid,
      'source': src,
      'key': img.uid,
      'createAt': Number(String(img.createAt).slice(0, 10)),
      'updateAt': Number(String(img.updateAt).slice(0, 10)),
      'description': img.excerpt,
      'title': img.title,
      'child': <Image src={src} data-index={index} alt={img.title} style={{width:'100%', height: '100%'}} />,
      'width': exif?.width,
      'height': exif?.height,
    };
  });
};

const renderDesc = (pickItem: PhotoItem) => {
  return (
    <>
      <div style={{width:'100%',textAlign:'center',}}>
        <h3>{ pickItem.title }</h3>
      </div>
      <span className="mask-desc-item">
        <CalendarThirtyTwo theme="outline" size="20" fill="#333" strokeWidth={2}/>
        <span style={{ margin: '0 8px'}}>
          { dayjs.unix(pickItem.createAt).format('YYYY-MM-DD') }
        </span>
      </span>
      <span className="mask-desc-item">
        <CrossRingTwo theme="outline" size="20" fill="#333" strokeWidth={2}/>
        <span style={{margin: '0 8px'}}>
          {pickItem.description || '还没有图片说明' }
        </span>
      </span>
    </>
  );
};
