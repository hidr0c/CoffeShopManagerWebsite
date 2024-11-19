// components/Modal.tsx

"use client";

import React from 'react';
import styles from './modal.module.scss'; // Create your own styles as needed
import { Button } from '../button/button';

// modal.tsx (or wherever your Modal component is defined)

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void; // Add this line
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, onSave, style, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" style={style}>
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          {onSave && <button onClick={onSave}>Save</button>} {/* Add this line */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
