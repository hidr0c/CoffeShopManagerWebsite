"use client"

import styles from './Sidebar.module.scss'
import React, { ReactNode } from 'react'
import Image from 'next/image'
import { BiHomeAlt } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import { usePathname } from 'next/navigation';

import Link from 'next/link';


export default function Sidebar() {

  return (
    <div className={styles.container}>
      <SideBarItem
        icon={<Image src={'/images/sidebar/home.png'}
          width={20} height={20}
          alt='Trang chủ'
        />}
        iconHover={<Image src={'/images/sidebar/home-hover.png'}
          width={20} height={20}
          alt='Trang chủ'
        />
        }
        label='Trang chủ'
        href='/dashboard/' />
      <SideBarItem
        icon={<Image src={'/images/sidebar/warehouse.png'}
          width={20} height={20}
          alt='Kho hàng'
        />}
        iconHover={<Image src={'/images/sidebar/warehouse-hover.png'}
          width={20} height={20}
          alt='Kho hàng'
        />
        }
        label='Kho hàng'
        href='/dashboard/warehouse' />
      <SideBarItem
        icon={<Image src={'/images/sidebar/statistic.png'}
          width={20} height={20}
          alt='Bán hàng'
        />}
        iconHover={<Image src={'/images/sidebar/statistic-hover.png'}
          width={20} height={20}
          alt='Bán hàng'
        />
        }
        label='Bán hàng'
        href='/dashboard/sell' />

      <SideBarItem
        icon={<Image src={'/images/sidebar/statistic.png'}
          width={20} height={20}
          alt='Thực đơn'
        />}
        iconHover={<Image src={'/images/sidebar/statistic-hover.png'}
          width={20} height={20}
          alt='Thực đơn'
        />
        }
        label='Thực đơn'
        href='/dashboard/menu' />
      <SideBarItem
        icon={<Image src={'/images/sidebar/staff.png'}
          width={20} height={20}
          alt='Nhân viên'
        />}
        iconHover={<Image src={'/images/sidebar/staff-hover.png'}
          width={20} height={20}
          alt='Nhân viên'
        />
        }
        label='Nhân viên'
        href='/dashboard/employee' />
      <SideBarItem
        icon={<Image src={'/images/sidebar/statistic.png'}
          width={20} height={20}
          alt='Hóa đơn'
        />}
        iconHover={<Image src={'/images/sidebar/statistic-hover.png'}
          width={20} height={20}
          alt='Hóa đơn'
        />
        }
        label='Hóa đơn'
        href='/dashboard/invoice' />
    </div>
  )
}

interface SideBarItemProps {
  icon: ReactNode,
  iconHover: ReactNode,
  label: string,
  href: string,
}

export function SideBarItem({ icon, iconHover, label, href }: SideBarItemProps) {
  const path = usePathname()
  return (
    <Link className={path == href ? styles.itemActive : styles.item} href={href} >
      <div className={styles.icon}>{icon}</div> <div className={styles.iconHover}>{iconHover}</div> {label}
    </Link>
  )
}
