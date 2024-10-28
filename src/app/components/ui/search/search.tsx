import styles from './search.module.scss';
import Image from 'next/image';

export function Search () {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Image src={'/images/search-icon.png'} alt='Search icon' width={20} height={20}/>
      </div>
      <input type="text" className="" placeholder='Tìm kiếm'/>
    </div>
  )
}
