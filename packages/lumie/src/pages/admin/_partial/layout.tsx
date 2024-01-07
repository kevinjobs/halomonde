import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';
import { IPost } from '@/types';

const StyledHeader = styled.div`
  margin: 8px 0 16px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR_MAP.white4};
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.h3``;

const StyledAdd = styled.div`
  margin-left: 8px;
`;

interface HeaderProps {
  children?: React.ReactNode
}

function Header (props: HeaderProps) :React.ReactElement {
  const { children } = props;

  return (
    <StyledHeader>
      { children }
    </StyledHeader>
  );
}

Header.Title = StyledTitle;
Header.Add = StyledAdd;

const CONTAINER = styled.div`
  padding-bottom: 64px;
`;

interface ContainerProps {
  children?: React.ReactNode,
}

export default function Container (props: ContainerProps) :React.ReactElement {
  const { children } = props;

  return (
    <CONTAINER>
      { children }
    </CONTAINER>
  );
}

const Wrapper = styled.div`
  margin: 8px;
  display: inline-block;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.45;
`;

interface WrapperProps {
  width?: number,
  height?: number,
  p: IPost,
  onEdit: (e: React.MouseEvent<HTMLDivElement>, p: IPost) => void,
  children?: React.ReactNode
}

function Card (props: WrapperProps) :React.ReactElement {
  const [isHover, setIsHover] = React.useState(false);

  const {
    width = 300,
    height = 400,
    p,
    onEdit,
    children
  } = props;

  const styles = {
    position:'absolute',
    top:height/2,
    left:width/2,
    transform: 'translate(-14px, -14px)',
    zIndex:999,
    visibility: isHover ? 'visible' : 'hidden',
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <Wrapper
      style={{width:width,height:height,}}
      onMouseEnter={e => {e.preventDefault();setIsHover(true);}}
      onMouseLeave={e => {e.preventDefault();setIsHover(false);}}
    >
      { children }
      <div style={styles} onClick={e => onEdit(e, p)}>
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
          <path d="M7 42H43" stroke="#e4e4e4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z" fill="none" stroke="#e4e4e4" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      { isHover ? <Mask /> : '' }
    </Wrapper>
  );
}

Card.Img = Img;

export { Header, Container }
