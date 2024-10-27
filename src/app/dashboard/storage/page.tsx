'use client'

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Table, TableColumnsType, TableColumnType, TableProps, Tag } from 'antd';
import styles from '../page.module.css';
import { useRef, useState } from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});

interface MenuItem {
    key: React.Key;
    stt: number;
    id: string;
    name: string;
    provider: string;
    quantity: number;
    date: string;
    type: string[];
    price: number;
}
type ItemIndex = keyof MenuItem;


export default function StoragePage() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const rowSelection: TableRowSelection<MenuItem> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: ItemIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: ItemIndex): TableColumnType<MenuItem> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm ${columns.find((col) => col.key === dataIndex)?.title.toString().toLowerCase() || ''}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                    className={styles.searchInput}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            close()
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            const r = record[dataIndex];

            if (typeof value === "string" && typeof r === "number") {
                value = value.trim();  // trim whitespace
                const matchOp = value.match(/[><=!]+/);
                if (!matchOp) {
                    return r == Number(value);
                }
                const operator = matchOp[0];
                const compValue = parseInt(value.match(/\s*(\d+)/)[1], 10);
                try {
                    return eval(`${r} ${operator} ${compValue}`);
                }
                catch (e) {
                    return false;
                }
            }

            if (Array.isArray(r)) {
                return r.some((r) => r.toString().toLowerCase().includes(value.toString().toLowerCase()));
            }

            return r
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const data: MenuItem[] = [
        {
            key: "1",
            stt: 1,
            id: "1",
            name: "1",
            provider: "1",
            quantity: 1,
            date: "1",
            type: ["1", "2"],
            price: 1000000
        },
        {
            key: "2",
            stt: 2,
            id: "2",
            name: "2",
            provider: "2",
            quantity: 2,
            date: "2",
            type: ["3", "4"],
            price: 2000000
        }
    ];

    const columns: TableColumnsType<MenuItem> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 64,
            fixed: 'left',
            sorter: (a, b) => a.stt - b.stt,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Tên nguyên liệu',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            ...getColumnSearchProps('quantity'),
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
        },
        {
            title: 'Loại nguyên liệu',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            render: (tags) => (
                <span>
                    {tags.map((tag) => {
                        return (
                            <Tag onClick={() => {
                                console.log(tag)
                                setSearchText(tag)
                                setSearchedColumn('type')
                            }} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            render: (price) => currencyFormatter.format(price),
        },
    ]

    return (
        <div className={styles.sectionOne}>
            <h1 className={styles.title}>KHO HÀNG</h1>
            <Table<MenuItem>
                size='middle'
                onRow={record => {  //placeholder
                    return {
                        onClick: () => {
                            console.log(record);
                        },
                    };
                }}
                bordered={true}
                scroll={{ x: 1500 }}
                dataSource={data}
                columns={columns}
                rowSelection={rowSelection}
            />
        </div>
    );
}