'use client'

import { MoneyCollectOutlined } from '@ant-design/icons';
import { Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import styles from './page.module.css';
import { useState } from 'react';

const { Column, ColumnGroup } = Table;
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface MenuItem {
    key: React.Key;
    label: string;
    icon: React.ReactNode;
    color?: string;
    value?: string;
}

function renderCard(item: MenuItem) {
    return (
        <div key={item.key} className={styles.card}>
            <div className={styles.cardTop}>
                <div style={{ color: item.color }} className={styles.cardStats}>{item.value || 0}</div>
                {item.icon}
            </div>
            <div className={styles.cardName}>{item.label}</div>
        </div>
    );
}
const first_row: MenuItem[] = [
    { key: "1", label: "Tổng số phiếu nhập", icon: <MoneyCollectOutlined />, value: "100", color: "red" },
    { key: "2", label: "Tổng số phiếu mua", icon: <MoneyCollectOutlined />, value: "200" },
    { key: "3", label: "Tổng số hàng tồn", icon: <MoneyCollectOutlined />, value: "300", color: "blue" },
    { key: "4", label: "Nhà cung cấp", icon: <MoneyCollectOutlined />, value: "400" },
];
const second_row: MenuItem[] = [
    { key: "5", label: "Số lượng mua hàng", icon: <MoneyCollectOutlined />, value: "500" },
    { key: "6", label: "Doanh thu mua hàng", icon: <MoneyCollectOutlined />, value: "600" },
    { key: "7", label: "Số lượng bán hàng", icon: <MoneyCollectOutlined />, value: "700" },
    { key: "8", label: "Doanh thu bán hàng", icon: <MoneyCollectOutlined />, value: "800" },
]

interface LeftInvertory {
    key: React.Key;
    name: string;
    id: string;
    leftover: number;
    buyPrice: number;
    sellPrice: number;
}
const columns: TableColumnsType<LeftInvertory> = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'stt',
        width: 64,
        fixed: 'left',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => (a.name > b.name ? 1 : -1),
        fixed: 'left',
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Số lượng tồn',
        dataIndex: 'leftover',
        key: 'leftover',
        sorter: (a, b) => a.leftover - b.leftover,
    },
    {
        title: 'Giá mua',
        dataIndex: 'buyPrice',
        key: 'buyPrice',
        sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
        title: 'Giá bán',
        dataIndex: 'sellPrice',
        key: 'sellPrice',
        sorter: (a, b) => a.sellPrice - b.sellPrice,
    },
];
const invertory: LeftInvertory[] = [
    { key: "1", id: "ID-1", name: "A", leftover: 10, buyPrice: 100, sellPrice: 200 },
    { key: "2", id: "ID-2", name: "B", leftover: 20, buyPrice: 150, sellPrice: 250 },
    { key: "3", id: "ID-3", name: "C", leftover: 30, buyPrice: 200, sellPrice: 300 },
    { key: "4", id: "ID-4", name: "D", leftover: 40, buyPrice: 250, sellPrice: 400 },
    { key: "5", id: "ID-5", name: "E", leftover: 50, buyPrice: 300, sellPrice: 500 },
    { key: "6", id: "ID-6", name: "F", leftover: 60, buyPrice: 350, sellPrice: 600 },
    { key: "7", id: "ID-7", name: "G", leftover: 70, buyPrice: 400, sellPrice: 700 },
    { key: "8", id: "ID-8", name: "H", leftover: 80, buyPrice: 450, sellPrice: 800 },
    { key: "9", id: "ID-9", name: "I", leftover: 90, buyPrice: 500, sellPrice: 900 },
    { key: "10", id: "ID-10", name: "J", leftover: 100, buyPrice: 550, sellPrice: 1000 },
]


export default function DashboardPage() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<LeftInvertory> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <div className={styles.sectionOne}>
                <h1 className={styles.title}>TRANG CHỦ</h1>
                <div className={styles.cardContainer}>
                    {first_row.map(item => renderCard(item))}
                </div>
                <div className={styles.cardContainer}>
                    {second_row.map(item => renderCard(item))}
                </div>
            </div>
            <div className={styles.sectionTwo}>
                <h1 className={styles.title}>SỐ LƯỢNG HÀNG TỒN CÒN ÍT</h1>
                <Table<LeftInvertory>
                    scroll={{ x: 1500 }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={invertory}
                />
            </div>
        </>
    );
}