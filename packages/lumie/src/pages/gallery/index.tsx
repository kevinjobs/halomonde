import React from 'react';

import { ViewportProvider, } from '@/hooks';
import { IPost, } from '@/types';
import { getPostList, } from '@/utils/apis/post';
import { randomInt, } from '@horen/utils';

import Background from './background';
import Gallery from './gallery';

export default function GalleryPage () {
  const [cover, setCover] = React.useState<string>();
  const [verses, setVerses] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    (async() => {
      const data = await getPostList(0, 999, {type: 'cover'});
      if (typeof data !== 'string') {
        const amount = data.data.amount;
        const idx = randomInt(0, amount-1);
        setCover(data.data.posts[idx]?.url);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async() => {
      const data = await getPostList(0, 999, {type: 'verse'});
      if (typeof data !== 'string') {
        setVerses(data.data.posts);
      }
    })();
  }, [])

  return (
    <ViewportProvider>
      <Background
        cover={cover}
        verse={verses[randomInt(0, verses.length)]}
      />
      <Gallery />
    </ViewportProvider>
  );
}