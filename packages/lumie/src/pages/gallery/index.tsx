import React from 'react';

import { ViewportProvider } from '@/hooks';
import { fetchPosts } from '@/apis/posts';
import { random_int } from '@/utils';

import Background from './background';
import Gallery from './gallery';
import { IPost } from '@/types';

export default function GalleryPage () {
  const [cover, setCover] = React.useState<string>();
  const [verses, setVerses] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    (async() => {
      const data = await fetchPosts(0, 10, {type: 'cover'});
      if (typeof data !== 'string') {
        const amount = data.data.amount;
        const idx = random_int(0, amount);
        setCover(data.data.posts[idx].url);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async() => {
      const data = await fetchPosts(0, 999, {type: 'verse'});
      if (typeof data !== 'string') {
        setVerses(data.data.posts);
      }
    })();
  }, [])

  return (
    <ViewportProvider>
      <Background
        cover={cover}
        verse={verses[random_int(0, verses.length)]}
      />
      <Gallery />
    </ViewportProvider>
  );
}