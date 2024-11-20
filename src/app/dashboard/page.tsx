'use client'

import Image from "next/image";
import styles from "@/page.module.scss";
import { Card } from "@ui/card/card";
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import { formatCurrency } from "@/helper/format";
import { useEffect, useState } from "react";
import { getWarehouseList } from "@/services/warehouse/warehouse.api";
import { getSupplierList } from "@/services/supplier/supplier.api";
import SellAPI from "@/services/sell/sell.api";
import { getMenuList } from "@/services/menu/menu.api";
import EmployeeAPI from "@/services/employee/employee.api";
import CustomerAPI from "@/services/customer/customer.api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalItems: 0,
    totalStock: 0,
    suppliers: 0,
    purchaseQuantity: 0,
    purchaseRevenue: 0,
    salesQuantity: 0,
    salesRevenue: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const warehouseData = await getWarehouseList({ page: 1, limit: 100 });
      const supplierData = await getSupplierList({ page: 1, limit: 100 });
      const sellData = await SellAPI.getSellList({ page: 1, limit: 100 });
      const menuData = await getMenuList({ page: 1, limit: 100 });
      const employeeCount = await EmployeeAPI.getEmployeeCount();
      const customerData = await CustomerAPI.getCustomerList({ page: 1, limit: 100 });

      setStats({
        totalRequests: warehouseData?.pagination.total || 0,
        totalItems: menuData?.pagination.total || 0,
        totalStock: warehouseData?.imports.reduce((acc, item) => acc + item.values.reduce((itm, i) => itm + i.quant, 0), 0) || 0,
        suppliers: supplierData?.pagination.total || 0,
        purchaseQuantity: warehouseData?.imports.reduce((acc, item) => acc + item.values.reduce((itm, i) => itm + i.quant, 0), 0) || 0,
        purchaseRevenue: warehouseData?.imports.reduce((acc, item) => acc + item.values.reduce((itm, i) => itm + i.quant, 0), 0) || 0,
        salesQuantity: sellData?.total || 0,
        salesRevenue: sellData?.total || 0, // Adjust this based on actual revenue data
      });
    }
    fetchData();
  }, []);

  const data = [
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    }
  ]

  return (

    <div className={styles.container}>
      <h1 className="title">TRANG CHỦ</h1>
      <div className={styles.statistic}>
        <Card number={stats.totalRequests} textColor="#8E7468" label="Tổng số phiếu nhập" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={stats.totalItems} textColor="#365CA0" label="Tổng loại hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={stats.totalStock} textColor="#539F8F" label="Tổng số hàng tồn" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={stats.suppliers} textColor="#E27F6A" label="Nhà cung cấp" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={stats.purchaseQuantity} textColor="#C94752" label="Số lượng mua hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={formatCurrency(stats.purchaseRevenue)} textColor="#365CA0" label="Doanh thu mua hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={stats.salesQuantity} textColor="#7F4783" label="Số lượng bán hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number={formatCurrency(stats.salesRevenue)} textColor="#C94752" label="Doanh thu bán hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />

      </div>
      <div className="">
        <h1 className="title">SỐ LƯỢNG HÀNG TỒN CÒN ÍT</h1>
        <Table style={{ width: '100%', marginTop: '2em' }}>
          <TableHead style={{ background: '#E5E6FA' }}>
            <TableRow>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Tên sản phẩm</TableCell>
              <TableCell sort={true} style={{ padding: '1em 1em 1em 2em' }}>Mã sản phẩm</TableCell>
              <TableCell sort={true} style={{ padding: '1em 1em 1em 2em' }}>Số lượng tồn</TableCell>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Giá mua</TableCell>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Giá bán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.name}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.id}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.quant}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{formatCurrency(item.purchase)}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{formatCurrency(item.sell)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
