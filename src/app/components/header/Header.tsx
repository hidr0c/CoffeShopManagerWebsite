"use client"

import styles from './Header.module.scss';
import { Search } from '../ui/search/search';
import Link from 'next/link';
import { Icon } from '../ui/icon/icon';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname()
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Phan Cafe</div>
      <div className={styles.search}>
        <Search />
      </div>

      <div className={styles.right}>
        <nav className="">
          <Link href={'/supplier'} className={path == '/supplier' ? styles.navItemActive : styles.navItem}>Nhà cung cấp</Link>
          <Link href={'/customer'} className={path == '/customer' ? styles.navItemActive : styles.navItem}>Khách hàng</Link>
          <Link href={'/'} className={styles.navItem}>Hỗ trợ</Link>
        </nav>
        <div className={styles.profile}>
          <Icon icon={
            <Image src={'/images/notifications.png'} alt='Notification' width={20} height={20} />
          }
            count={3}
          />
          <Icon icon={
            <Image src={'/images/account_circle.png'} alt='Avatar' width={30} height={30} />
          }
          />
        </div>
      </div>

    </div>
  )
}
