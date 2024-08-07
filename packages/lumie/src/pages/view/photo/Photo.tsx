import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '@/types';
import { fetchPost } from '@/utils/apis';
import { IExif } from '@/utils/exif';
import { Icon, Skeleton } from '@horen/core';
import { useViewport } from '@horen/hooks';
import { photoCompressedUrl } from '@/utils/uri';

import { Arrow } from './Arrow';
import style from './Photo.module.less';

export default function Photo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();
  const [post, setPost] = useState<IPost>();
  const [visible, setVisible] = useState<boolean>(false);

  const refreshPost = () => {
    const { uid } = params;
    fetchPost(uid).then((resp) => {
      if (typeof resp === 'string') {
        //
      } else {
        setPost(resp.data.post);
      }
    });
  };

  const handleClickView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    refreshPost();
  }, []);

  return (
    <div className={style.photo}>
      <div className={style.preview}>
        {post ? (
          <img src={photoCompressedUrl(post?.url)} alt="preview" />
        ) : (
          <Skeleton height={600} width={800} />
        )}
      </div>
      <PhotoInfoPanel
        post={post}
        infoVisible={visible}
        onClickView={handleClickView}
      />
    </div>
  );
}

export function PhotoInfoPanel({
  post,
  infoVisible,
  onClickView,
  alwaysShow = false,
}: {
  post: IPost;
  infoVisible: boolean;
  onClickView?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  alwaysShow?: boolean;
}) {
  const exif: IExif = post?.exif ? JSON.parse(post?.exif) : null;
  const { width } = useViewport();
  const cls =
    width < 1080 ? style.hidedInfo : alwaysShow ? style.hidedInfo : style.info;

  return (
    <div
      className={cls}
      style={{
        top: infoVisible ? 'calc(100vh - 460px)' : 'calc(100vh - 50px)',
        width: width < 1080 ? '80%' : '200px',
      }}
      onClick={(e) => e.stopPropagation()}>
      {(width < 1080 || alwaysShow) && (
        <div
          className={style.clickToView}
          onClick={onClickView}
          onTouchEnd={() => onClickView()}>
          <Arrow up={infoVisible} />
        </div>
      )}
      <div
        className={style.infoContainer}
        style={{
          width: width < 1080 ? '100%' : '200px',
        }}>
        <div className={style.title}>
          {post?.title ? (
            <span>{post?.title}</span>
          ) : (
            <span>
              <Skeleton height={24} width={180} />
            </span>
          )}
        </div>
        <div className={style.author}>
          <span>
            <Icon name="user" fill="#f1f1f1" size={20} />
          </span>
          {post?.author ? (
            <span>{post?.author}</span>
          ) : (
            <span>
              <Skeleton height={16} width={80} />
            </span>
          )}
        </div>
        <div className={style.date}>
          <span>
            <Icon name="date" fill="#f1f1f1" size={20} />
          </span>
          {exif ? (
            <span>
              {dayjs
                .unix(exif.createDate || post?.createAt)
                .format('YYYY年M月D日')}
            </span>
          ) : (
            <span>
              <Skeleton height={16} width={120} />
            </span>
          )}
        </div>
        <div className={style.description}>
          <span>
            <Icon name="info" fill="#f1f1f1" size={22} />
          </span>
          {post ? (
            <span>
              {post?.content ||
                post?.excerpt ||
                post?.description ||
                '没有描述'}
            </span>
          ) : (
            <span>
              <Skeleton height={16} width={180} />
            </span>
          )}
        </div>
        <div className={style.iso}>
          <span>
            <Icon name="iso" fill="#dcdcdc" size={20} />
          </span>
          {exif ? (
            <span>{exif.iso || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
        <div className={style.exposure}>
          <span>
            <Icon name="clock" fill="#dcdcdc" size={22} />
          </span>
          {exif ? (
            <span>{exif.exposure || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
        <div className={style.focal}>
          <span>
            <Icon name="aperture" fill="#dcdcdc" size={19} />
          </span>
          {exif ? (
            <span>{exif.focalNumber || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
        <div className={style.infoItem}>
          <span>
            <Icon name="focal" fill="#dcdcdc" size={20} />
          </span>
          {exif ? (
            <span>{exif.focalLength || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
        <div className={style.model}>
          <span>
            <Icon name="camera" fill="#dcdcdc" size={20} />
          </span>
          {exif ? (
            <span>{exif.model || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
        <div className={style.lens}>
          <span>
            <Icon name="lens" fill="#dcdcdc" size={20} />
          </span>
          {exif ? (
            <span>{exif.lens || '未知'}</span>
          ) : (
            <span>
              <Skeleton height={16} width={30} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
