import React from 'react';
import styled from 'styled-components';

export interface MasonryItem {
  width: number,
  height: number,
  key: string | number,
  child: React.ReactNode,
}

export interface MasonryProps {
  cols?: number, // columns
  colWidth?: number, // column width
  gutter?: number, // gutter between column,
  shadow?: boolean,
  data: MasonryItem[],
  onPreview?: (e: React.MouseEvent<HTMLElement>, item: MasonryItem) => void,
  ref: React.RefObject<HTMLDivElement>,
}

const Container = styled.div`
  position: relative;
`;
const Item = styled.div``;

export const Masonry = React.forwardRef((props: MasonryProps, ref: React.RefObject<HTMLDivElement>) => {
  const [containerHeight, setContainerHeight] = React.useState(0);

  const {
    cols = 3,
    colWidth = 320,
    gutter = 8,
    data,
    onPreview,
    shadow = false,
  } = props;

  // create an arrary for col height storage
  // the length equals to cols
  const colHeigthList = Array.from({length: cols}, () => 0);
  // container height
  let tmpContainerHeight = 0;

  const handlePreview = (e: React.MouseEvent<HTMLElement>, item: MasonryItem) => {
    onPreview(e, item);
  };

  // the shortest column
  const getShortestColIndex = () => {
    const min = Math.min(...colHeigthList);
    return colHeigthList.indexOf(min);
  };

  // each item style
  const getItemStyle = (item: MasonryItem, index: number) => {
    const shortestColIndex = getShortestColIndex();

    const offsetLeft = (colWidth + gutter) * shortestColIndex;
    const offsetTop = colHeigthList[shortestColIndex];

    const normalizedItemHeight = (colWidth / item.width) * item.height;
    colHeigthList[shortestColIndex] += (normalizedItemHeight + gutter);

    // 取列表中最长的值，作为整个组件的高度
    if (index === data.length - 1) {
      tmpContainerHeight = Math.max(...colHeigthList);
      // console.log(tmpContainerHeight);
    }

    return {
      left: offsetLeft,
      top: offsetTop,
      position: 'absolute',
      width: colWidth,
      height: normalizedItemHeight,
      cursor: 'pointer',
      boxShadow: shadow ? '4px 4px 4px rgba(0,0,0,0.35)' : '',
    } as React.CSSProperties;
  };

  const renderItem = (item: MasonryItem, index: number) => {
    const { key, child, } = item;
    const style = getItemStyle(item, index);

    return (
      <Item
        style={{...style,}}
        key={key}
        data-key={key}
        data-index={index}
        onClick={e => handlePreview(e, item)}
      >{ child }</Item>
    );
  };

  React.useEffect(() => {
    setContainerHeight(tmpContainerHeight);
    // console.log(tmpContainerHeight);
  }, [...colHeigthList, data.length]);

  return (
    <Container
      style={{
        width: (colWidth+gutter)*cols-gutter,
        height: containerHeight
      }}
      ref={ref}
    >
      { data && data.map(renderItem) }
    </Container>
  );
});

Masonry.displayName = 'Masonry';

export default Masonry;