import COLOR_MAP from '@/styles/colors';
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { CloseSmall } from '@icon-park/react';

export interface DialogProps {
  title: string,
  visible: boolean,
  width?: number,
  height?: number,
  animation?: 'slide-top-down' | 'zoom-in-out',
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLSpanElement>,
  children?: React.ReactNode,
}

const DialogStyled = styled(animated.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: ${COLOR_MAP.white};
  // min-width: 400px;
  min-height: 300px;
  max-height: 95vh;
  margin: 0 auto;
  border: 1px solid ${COLOR_MAP.white4};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 4px 4px 4px 4px rgba(0,0,0,0.1);
  z-index: 999;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR_MAP.white4};
`;

const Content = styled.div`
  overflow-y: auto;
`;

export function Dialog (props: DialogProps) :React.ReactElement {
  const {
    title,
    visible,
    width,
    height,
    animation = 'zoom-in-out',
    onCancel,
    children,
  } = props;

  const slideTopToDown = useSpring({
    from: { top: '-50%', },
    to: { top: visible ? '50%' : '-50%', }
  });
  
  const zoomInOut = useSpring({
    from: {
      transform: 'translateY(-50%) translateX(-50%) scale3d(0, 0, 0)',
    },
    to: {
      transform: visible
        ? 'translateY(-50%) translateX(-50%) scale3d(1, 1, 1)'
        : 'translateY(-50%) translateX(-50%) scale3d(0, 0, 0)', 
    },
  });

  const springProps = {
    'zoom-in-out': zoomInOut,
    'slide-top-down': slideTopToDown,
  };

  return (
    <DialogStyled style={springProps[animation]}>
      <Header>
        <h3 style={{textAlign:'center', flexGrow:1,}}>{ title }</h3>
        <CloseSmall
          theme="outline"
          size="20"
          fill="#333"
          strokeWidth={2}
          onClick={onCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        />
      </Header>
      <Content style={{width:width,height:height,}}>
        { children }
      </Content>
    </DialogStyled>
  );
}
