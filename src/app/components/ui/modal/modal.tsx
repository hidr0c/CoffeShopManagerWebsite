// components/Modal.tsx

"use client";

import React from 'react';
import styles from './modal.module.scss'; // Create your own styles as needed
import { Button } from '../button/button';

interface ModalProps {
  style?: any,
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  action?:string;
  onAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAction, action, title, children,style }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}  style={style}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <div className={styles.modalBody}>
          {children}
        </div>
        <div className={styles.btnContainer}>
        <Button onClick={onClose}>Hủy</Button>
        {action && <Button onClick={onAction}>{action}</Button>}

        </div>

      </div>
    </div>
  );
};

export default Modal;
