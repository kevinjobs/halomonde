import React from 'react';
import { Loading } from '../loading';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function Image(props: ImageProps) {
  const { style, ...rest } = props;
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = () => {
    setLoaded(true);
  }

  return (
    <>
      <img
        {...rest}
        onLoad={handleLoad}
        style={{...style, display: loaded ? 'block' : 'none'}}
      />
      { loaded && <Loading type='2' /> }
    </>
  )
}