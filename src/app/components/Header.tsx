'use client'

import styles from "../../../styles/Header.module.css";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                Phan Café
            </div>
            <div className={styles.link}>
                <a href="#">Nhà cung cấp</a>
                <a href="#">Khách hàng</a>
                <a href="#">Hỗ trợ</a>
            </div>
        </div>
    );
}
