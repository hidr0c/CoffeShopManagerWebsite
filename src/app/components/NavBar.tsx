'use client'

import Image from "next/image";
import { Input } from 'antd'
import styles from "../../../styles/NavBar.module.css";

export default function NavBar() {
    const onSearch = () => { }

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                Phan Café
            </div>
            {/* <Input.Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}>

            </Input.Search> */}
            <div className={styles.link}>
                <a href="#">Nhà cung cấp</a>
                <a href="#">Khách hàng</a>
                <a href="#">Hỗ trợ</a>
            </div>
        </div>
    );
}
