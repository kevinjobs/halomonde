import React from 'react';
import { useSpring, animated } from 'react-spring';

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
    finalLeft,
    finalHeight,
    finalWidth,
    finalTop,
    index,
  } = props;
  
  const [picked, setPicked] = React.useState(false);

  const outRef = React.useRef<HTMLDivElement>(); 

  const [styles, api] = useSpring(
    () => ({
      left: 0,
      top: 0,
      width,
      height,
      position: 'absolute',
      zIndex: 1,
      visibility: 'hidden'
    }),
    []
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = outRef?.current?.getBoundingClientRect();

    if (!picked) {
      
      api.start({
        from: {
          position: 'fixed',
          width: width,
          height: height,
          left: rect.left,
          top: rect.top,
          zIndex: 999,
          visibility: 'visible'
        },
        to: {
          position: 'fixed',
          width: finalWidth,
          height: finalHeight,
          left: finalLeft,
          top: finalTop,
          zIndex: 999,
          visibility: 'visible'
        },
        config: { mass: 0.5, tension: 270, friction: 16 },
      })
      setPicked(true);
    } else {
      setPicked(false);
      api.start({
        from: {
          position: 'fixed',
          width: finalWidth,
          height: finalHeight,
          left: finalLeft,
          top: finalTop,
          zIndex: 999,
          visibility: 'visible'
        },
        to: {
          position: 'fixed',
          width: width,
          height: height,
          left: rect.left,
          top: rect.top,
          zIndex: 1,
          visibility: 'visible'
        },
        config: { mass: 0.8, tension: 280, friction: 26 },
      })
      setTimeout(() => {
        api.set({
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          visibility: 'hidden'
        })
      }, 250);
    }
  }

  return (
    <div
      key={props.title}
      ref={outRef}
      onClick={handleClick}
      className='masonry-item'
      style={{width, height, top, left}}
    >
      <div>
        <img src={props.src} alt={props.title} />
      </div>
      <animated.div style={{...styles as any}}>
        <img src={props.src} alt={props.title} />
      </animated.div>
    </div>
  );
};
