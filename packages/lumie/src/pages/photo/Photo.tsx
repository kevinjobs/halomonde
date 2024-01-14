import React, { useEffect, useState } from "react";
import { fetchPost } from "@/utils/apis";
import { IPost } from "@/types";
import { useParams } from 'react-router-dom';
import style from './Photo.module.less';
import dayjs from "dayjs";
import { Icon, Skeleton } from "@horen/core";
import { IExif } from "@/utils/exif";
import { useViewport } from '@horen/hooks';
import { Arrow } from "./Arrow";

export default function Photo() {
  const params: any = useParams();
  const [post, setPost] = useState<IPost>();
  const [visible, setVisible] = useState<boolean>(false);
  
  const refreshPost = () => {
    const { uid } = params;
    fetchPost(uid).then(resp => {
      if (typeof resp === "string") {

      } else {
        setPost(resp.data.post);
      }
    })
  }

  const handleClickView = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    refreshPost();
  }, []);

  return (
    <div className={style.photo}>
      <div className={style.preview}>
        {
          post
          ? <img src={post?.url} alt="preview" />
          : <Skeleton height={600} width={800} />
        }
      </div>
      <PhotoInfo post={post} visible={visible} onClickView={handleClickView} />
    </div>
  );
}

function PhotoInfo({
  post,
  visible,
  onClickView
}: {
  post: IPost,
  visible: boolean,
  onClickView: () => void
}) {
  const exif: IExif = post?.exif ? JSON.parse(post?.exif) : null;
  const { width } = useViewport();
  const cls = width < 1080 ? style.hidedInfo : style.info;

  return (
    <div className={cls} style={{top: visible ? 'calc(100vh - 500px)' : 'calc(100vh - 50px)'}}>
        {
          width < 1080 &&
          <div className={style.clickToView} onClick={onClickView}>
            <Arrow up={visible} />
          </div>
        }
        <div className={style.infoContainer}>
          <div className={style.title}>
            {
              post?.title
              ? <span>{post?.title}</span>
              : <span><Skeleton height={24} width={180} /></span>
            }
          </div>
          <div className={style.author}>
            <span><Icon name="user" fill="#f1f1f1" size={20} /></span>
            {
              post?.author
              ? <span>{post?.author}</span>
              : <span><Skeleton height={16} width={80} /></span>
            }
          </div>
          <div className={style.date}>
            <span><Icon name="date" fill="#f1f1f1" size={20} /></span>
            {
              exif
                ? <span>{dayjs.unix(exif.createDate).format('YYYY年M月D日')}</span>
                : <span><Skeleton height={16} width={120} /></span>
            }
          </div>
          <div className={style.description}>
            <span><Icon name="info" fill="#f1f1f1" size={22}  /></span>
            {
              post
                ? <span>{post?.content || '没有描述'}</span>
                : <span><Skeleton height={16} width={180} /></span>
            }
          </div>
          <div className={style.iso}>
            <span><Icon name="iso" fill="#dcdcdc" size={20}  /></span>
            {
              exif
                ? <span>{exif.iso || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>
          <div className={style.exposure}>
            <span><Icon name="clock" fill="#dcdcdc" size={22}  /></span>
            {
              exif
                ? <span>{exif.exposure || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>
          <div className={style.focal}>
            <span><Icon name="aperture" fill="#dcdcdc" size={19}  /></span>
            {
              exif
                ? <span>{exif.focalNumber || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>
          <div className={style.infoItem}>
            <span><Icon name="focal" fill="#dcdcdc" size={20}  /></span>
            {
              exif
                ? <span>{exif.focalLength || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>
          <div className={style.model}>
            <span><Icon name="camera" fill="#dcdcdc" size={20}  /></span>
            {
              exif
                ? <span>{exif.model || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>
          <div className={style.lens}>
            <span><Icon name="lens" fill="#dcdcdc" size={20}  /></span>
            {
              exif
                ? <span>{exif.lens || '未知'}</span>
                : <span><Skeleton height={16} width={30} /></span>
            }
          </div>  
        </div>
      </div>
  )
}