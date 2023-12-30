import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

const MODAL = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-container {
    background-color: #fff;
    border-radius: 5px;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    text-align: center;
    &.full-screen {
      inset: 0;
      position: fixed;
      left: 0%;
      transform: none;
    }
    .close-modal {
      text-align: right;
      .close-modal-frame {
        display: inline-block;
        position: relative;
        right: 4px;
        top: 2px;
        border-radius: 3px;
        &:hover {
          background-color: #f2f3f4; 
        }
      }
      span {
        display: inline-block;
        transform: rotate(45deg);
        zoom: 1.6;
        position: relative;
        right: -1px;
        height: 1rem;
        line-height: 1rem;
        user-select: none;
        font-weight: 200;
      }
    }
    .modal-main {
      padding: 0px 28px 28px 28px;
    }
  }
`;

const HEADER = styled.div``;
const CONTENT = styled.div``;

export interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  visible?: boolean;
  onClose?(e: React.MouseEvent<HTMLSpanElement>): void;
  fullScreen?: boolean;
}

export interface ModalHeaderProps {
  children?: React.ReactNode;
}

export interface ModalContentProps {
  children?: React.ReactNode;
}

function Modal(props: ModalProps) {
  const {
    title,
    visible = false,
    onClose,
    fullScreen = false,
    children,
    ...restProps
  } = props;
  
  const cls = fullScreen
    ? 'modal-container' + ' full-screen'
    : 'modal-container';

  return (
    <MODAL {...restProps} style={{display: visible ? 'block' : 'none'}}>
      <div className={cls}>
        <div className='close-modal'>
          <div className='close-modal-frame'>
            <span onClick={(e) => {if (onClose) onClose(e);}}>＋</span>
          </div>
        </div>
        <div className='modal-main'>{ children }</div>
      </div>
    </MODAL>
  )
}

function ModalHeader({children}: ModalHeaderProps) {
  return (
    <HEADER className='modal-header'>
       {children}
    </HEADER>
  )
}

function ModalContent({children}: ModalContentProps) {
  return (
    <CONTENT className='modal-content'>
      {children}
    </CONTENT>
  )
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export { Modal };
