import React from 'react';

import { ViewportProvider } from '@/hooks';
import { IPost } from '@/types';
import { getPostListSync } from '@/utils/apis/post';
import { randomInt } from '@horen/utils';

import Background from './background';
import Gallery from './gallery';
import { photoCompressedUrl } from '@/utils/uri';

export default function GalleryPage() {
  const [cover, setCover] = React.useState<string>();
  const [verses, setVerses] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    getPostListSync(
      { offset: 0, limit: 999, type: 'cover' },
      (postList) => {
        const randomIndex = randomInt(0, postList.length - 1);
        setCover(photoCompressedUrl(postList[randomIndex].url));
      },
      (errMsg) => console.log(errMsg),
    );
  }, []);

  React.useEffect(() => {
    getPostListSync(
      { offset: 0, limit: 999, type: 'verse' },
      (postList) => setVerses(postList),
      (errMsg) => console.log(errMsg),
    );
  }, []);

  return (
    <ViewportProvider>
      <Background
        cover={cover}
        verse={verses[randomInt(0, verses.length - 1)]}
      />
      <Gallery />
    </ViewportProvider>
  );
}
