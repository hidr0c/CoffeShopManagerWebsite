'use client'

import { useState } from 'react';
import {
    HomeOutlined,
    ShopOutlined,
    BarChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import NavBar from "../components/NavBar";
import SideBarItem from '../components/SideBarItem';
import styles from "./layout.module.css";
import { useRouter } from 'next/navigation';

interface MenuItem {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
}

// type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: "/", icon: <HomeOutlined />, label: "Trang chủ" },
    { key: "storage", icon: <ShopOutlined />, label: "Kho hàng" },
    { key: "selling", icon: <BarChartOutlined />, label: "Bán hàng" },
];

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [activeIndex, setActive] = useState(items[0].key);
    const router = useRouter();

    return <>
        <NavBar />
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.topPart}>
                    {items.map(item => (
                        <SideBarItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            selected={item.key === activeIndex}
                            onClick={() => {
                                setActive(item.key)
                                router.push("/dashboard/" + item.key)
                            }} />
                    ))}
                </div>
                <div className={styles.bottomPart}>
                    <SideBarItem
                        key="logout"
                        icon={<LogoutOutlined />}
                        label="Logout"
                        onClick={() => { }}
                    />
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </>;
}