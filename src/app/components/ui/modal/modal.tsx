// components/Modal.tsx

"use client";

import React from 'react';
import styles from './modal.module.scss'; // Create your own styles as needed
import { Button } from '../button/button';

// modal.tsx (or wherever your Modal component is defined)

// modal.tsx

// modal.tsx

interface ModalProps {
  style?: React.CSSProperties;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
  action?: string;
  onAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, onAction, action, title, children, style }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={style}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <div className={styles.modalBody}>
          {children}
        </div>
        <div className={styles.btnContainer}>
          <Button onClick={onClose}>Hủy</Button>
          {action && <Button onClick={onAction}>{action}</Button>}
          {onSave && <Button onClick={onSave}>Lưu</Button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
export type { ModalProps };