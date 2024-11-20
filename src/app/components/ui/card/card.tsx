import styles from './card.module.scss';
import React, { ReactNode } from 'react';

interface CardProps {
  textColor: string,
  icon: ReactNode,
  number: string | number | ReactNode,
  label: string,
}

export function Card({ textColor, icon, number, label }: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.number} style={{ color: textColor }}>{number}</div>
        <div className={styles.icon}>{icon}</div>
      </div>
      <div className={styles.footer}>{label}</div>
    </div>
  )
}
