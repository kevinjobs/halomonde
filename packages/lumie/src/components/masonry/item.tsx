import { useScroll } from '@/hooks';
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
  
  const { toTop } = useScroll();
  const [picked, setPicked] = React.useState(false);
  const [rect, setRect] = React.useState<Partial<DOMRect>>(null);

  const outRef = React.useRef<HTMLDivElement>(); 

  const [styles, api] = useSpring(() => ({
    width,
    height,
    left,
    top,
    position: 'absolute',
  }))

  const handleClick = () => {
    if (picked) {
      setPicked(false);

      api.start({
        to: {
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
          position: 'fixed',
        }
      });

      setTimeout(() => {
        api.set({
          width,
          height,
          left,
          top,
          position: 'absolute',
        })
      }, 500);
    } else {
      setPicked(true);

      api.set({
        position: 'fixed',
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      })

      setTimeout(() => {
        api.start({
          to: {
            position: 'fixed',
            width: finalWidth,
            height: finalHeight,
            left: finalLeft,
            top: finalTop,
          }
        })
      }, 500);
    }
  }

  React.useEffect(() => {
    const rect = outRef.current?.getBoundingClientRect();
    setRect(rect);
  }, [toTop]);

  return (
    <div ref={outRef} onClick={handleClick} style={{width, height}}>
      <div
        className='masonry-item'
        key={props.title}
        style={{width, height, top, left}}
      >
        <img src={props.src} alt={props.title} />
      </div>
      <animated.div
        className='masonry-item copy'
        key={props.title}
        style={styles as any}
      >
        <img src={props.src} alt={props.title} />
      </animated.div>
    </div>
  );
};
