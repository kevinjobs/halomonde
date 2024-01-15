import React, { HtmlHTMLAttributes, } from 'react';
import ReactDOM from 'react-dom';

import { Icon, } from '../icon';
import css from './Modal.module.less';

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
    ? css.modalContainer + ' ' +  css.fullScreen
    : css.modalContainer;

  return ReactDOM.createPortal(
    <div
      {...restProps}
      style={{display: visible ? 'block' : 'none'}}
      className={css.modal}
    >
      <div className={cls}>
        <div className={css.closeModal}>
          <div className={css.closeModalFrame}>
            <span
              className={css.closeIcon}
              onClick={(e) => {if (onClose) onClose(e);}}
            >
              <Icon name='close' />
            </span>
          </div>
        </div>
        <div className={css.modalMain}>{ children }</div>
      </div>
    </div>,
    document.body);
}

function ModalHeader({children}: ModalHeaderProps) {
  return (
    <div className={css.modalHeader}>
       {children}
    </div>
  )
}

function ModalContent({children}: ModalContentProps) {
  return (
    <div className={css.modalContent}>
      {children}
    </div>
  )
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export { Modal };
