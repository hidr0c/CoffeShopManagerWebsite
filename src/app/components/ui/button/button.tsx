"use client"

import styles from './button.module.scss';
import React, { ReactNode} from 'react'
interface ButtonProps {
  style?: any,
  children: ReactNode,
  onClick: () => void
}

export function Button ({style, children, onClick}: ButtonProps) {
  return (
    <button className={styles.button} style={style} onClick={() => onClick()}>
      {children}
    </button>
  )
}
