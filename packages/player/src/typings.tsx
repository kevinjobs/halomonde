export interface Artist {
  name: string;
}

export interface Album {
  title: string;
  artist: Artist;
  artists?: Artist[];
}

export interface Track {
  title: string;
  artist: Artist;
  artists?: Artist[];
  album: Album;
  duration: number;
  cover: string;
}
