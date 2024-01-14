import React from 'react';
import styled from 'styled-components';
import { useDevice } from '@/hooks';
import { MasonryItem } from './item';
import { PhotoInfoPanel } from '@/pages/photo';
import { IPost } from '@/types';

export interface MasonryItem {
  width: number,
  height: number,
  src: string;
  title?: string;
  post?: IPost;
}

export interface MasonryProps {
  cols?: number, // columns
  colWidth?: number, // column width
  gutter?: number, // gutter between column,
  shadow?: boolean,
  items: MasonryItem[],
}

const Container = styled.div`
  position: relative;
`;

const genFinalSize = (width: number, height: number, clientWidth: number, clientHeight: number) => {
  /**
   * 计算预览图最终状态
   * @param item
   * @param clientWidth 窗口宽度
   * @param clientHeight 窗口高度
   */
  // 原图比例
  const ratio: number = width / height;

  let finalHeight: number;
  // 最终的高度
  // 如果原图高度大于视窗高度的 90% 则将其裁剪
  const limitHeight = clientHeight * 0.9;
  
  if (height > limitHeight) finalHeight = limitHeight;
  else finalHeight = height;

  // 根据高度计算出最终的宽度
  let finalWidth = finalHeight * ratio;
  if (finalWidth > clientWidth) {
    finalWidth = clientWidth;
    finalHeight = clientWidth / ratio;
  }
  // 计算出最终需要偏移的量
  const finalTop = (clientHeight - finalHeight) / 2;
  // 最终左偏移量，需要减去瀑布流主体距离左边的宽度
  const finalLeft = (clientWidth - finalWidth) / 2;

  return {
    finalWidth,
    finalHeight,
    finalTop,
    finalLeft,
  };
};

export const Masonry = (props: MasonryProps) => {
  const [containerHeight, setContainerHeight] = React.useState(0);
  const { clientWidth, clientHeight } = useDevice();
  const containerRef = React.useRef<HTMLDivElement>();

  const {
    cols = 3,
    colWidth = 320,
    gutter = 8,
    items,
  } = props;

  // create an arrary for col height storage
  // the length equals to cols
  const colHeigthList = Array.from({length: cols}, () => 0);
  // container height
  let tmpContainerHeight = 0;

  // the shortest column
  const getShortestColIndex = () => {
    const min = Math.min(...colHeigthList);
    return colHeigthList.indexOf(min);
  };

  // each item style
  const getItemStyle = (width: number, height: number, index: number) => {
    const shortestColIndex = getShortestColIndex();

    const offsetLeft = (colWidth + gutter) * shortestColIndex;
    const offsetTop = colHeigthList[shortestColIndex];

    const normalizedItemHeight = (colWidth / width) * height;
    colHeigthList[shortestColIndex] += (normalizedItemHeight + gutter);

    // 取列表中最长的值，作为整个组件的高度
    if (index === items.length - 1) {
      tmpContainerHeight = Math.max(...colHeigthList);
      // console.log(tmpContainerHeight);
    }

    return {
      left: offsetLeft,
      top: offsetTop,
      width: colWidth,
      height: normalizedItemHeight,
    };
  };

  const renderItem = (d: MasonryItem, i: number) => {
    const {
      left,
      top,
      width,
      height
    } = getItemStyle(d.width, d.height, i)

    const {
      finalWidth,
      finalHeight,
      finalLeft,
      finalTop
    } = genFinalSize(d.width, d.height, clientWidth, clientHeight);

    return (
      <MasonryItem
        key={d.src}
        title={d.title}
        src={d.src}
        left={left}
        top={top}
        width={width}
        height={height}
        index={i}
        finalWidth={finalWidth}
        finalHeight={finalHeight}
        finalLeft={finalLeft}
        finalTop={finalTop}
        originHeight={d.height}
        originWidth={d.width}
        post={d.post}
      />
    )
  }

  React.useEffect(() => {
    setContainerHeight(tmpContainerHeight);
  }, [...colHeigthList, items.length]);

  return (
    <Container
      style={{
        width: (colWidth+gutter)*cols-gutter,
        height: containerHeight
      }}
      ref={containerRef}
    >
      { items && items.map(renderItem) }
    </Container>
  );
};

Masonry.displayName = 'Masonry';

export default Masonry;
