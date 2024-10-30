import styles from './icon.module.scss'
import React, { ReactNode} from 'react'

interface IconProps {
  icon: ReactNode,
  count?: number,
}

export function Icon({icon, count}: IconProps) {
  return (
    <div className={styles.container}>
        {icon}
        {count && <div className={styles.count}>{count}</div>}
    </div>
  )
}
