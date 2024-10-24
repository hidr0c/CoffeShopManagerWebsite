'use client'

import { useState } from 'react';
import {
    AppstoreOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
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
    { key: "home", icon: <PieChartOutlined />, label: "Trang chủ" },
    { key: "storage", icon: <DesktopOutlined />, label: "Kho hàng" },
    { key: "selling", icon: <ContainerOutlined />, label: "Bán hàng" },
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
            <div>
                {children}
            </div>
        </div>
    </>;
}