import React from "react";
import { fetchPosts } from "@/apis/posts";
import { IPost } from "@/types";
import styled from "styled-components";
import { BASE_URL } from "@/configs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Image } from "@/components/image";

const F = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  .add-photo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 8px 0;
    button {
      width: 280px;
      height: 36px;
      border-radius: 5px;
    }
  }
  .photos {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .prev-next {
    width: 100%;
    text-align: center;
    margin: 16px auto;
    button {
      height: 36px;
      width: 120px;
      border-radius: 5px;
    }
  }
`;
const I = styled.div`
  display: inline-block;
  margin: 8px;
  width: 180px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export default function Photos() {
  const LIMIT = 8;
  const navigate = useNavigate();
  const [photos, setPhotos] = React.useState<IPost[]>(null);
  const [offset, setOffset] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);

  const Item = ({p}: {p: IPost}) => {
    return (
      <I onClick={() => navigate(`/mobile/photo/${p.uid}`)}>
        <Image src={BASE_URL + p.url.replace('static/', 'static/thumb-')} alt={p.title} />
      </I>
    )
  }

  const getAndSet = (offset: number, limit=LIMIT) => {
    (async() => {
      const resp = await fetchPosts(offset, limit, {type: 'photo'});
      if (typeof resp !== 'string') {
        setPhotos(resp.data.posts);
        if (limit + offset >= resp.data.totals) setHasMore(false);
        else setHasMore(true);
      } else window.alert(resp);
    })();
  }

  React.useEffect(() => getAndSet(0), []);

  return (
    <F>
      <div className="add-photo">
        <Button type="primary" onClick={() => navigate('/mobile/photo/0')}>添加图片</Button>
      </div>
      <div className="photos">
        { photos?.map(p => <Item key={p.uid} p={p} />) }
      </div>
      <div className="prev-next">
        <Button
          disabled={offset===0}
          onClick={() => {
            if (offset >= 0) {
              getAndSet(offset - LIMIT);
              setOffset(offset - LIMIT);
            }
          }}  
        >Prev</Button>
        <Button
          disabled={!hasMore}
            onClick={() => {
            if (hasMore) {
              getAndSet(offset + LIMIT);
              setOffset(offset + LIMIT);
            }
          }}
        >Next</Button>
      </div>
    </F>
  )
}
