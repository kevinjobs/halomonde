import React from 'react';

export interface ItemProps {
  originWidth: number;
  originHeight: number;
  title: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  index: number;
  finalWidth: number;
  finalHeight: number;
  finalTop: number;
  finalLeft: number;
}

export const MasonryItem = (props: ItemProps) => {
  const {
    width,
    height,
    top,
    left,
  } = props;
  const ref = React.useRef<HTMLDivElement>();

  const handleClick = () => {}

  return (
    <>
      <div
        className='masonry-item'
        key={props.title}
        style={{width, height, top, left}}
        ref={ref}
        onClick={handleClick}
      >
        <img src={props.src} alt={props.title} />
      </div>
    </>
  );
};
