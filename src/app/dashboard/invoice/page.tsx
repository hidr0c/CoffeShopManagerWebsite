"use client";

import { useState, useEffect } from "react";
import styles from "./invoice.module.scss";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "../../components/ui/table/table";
import { FaEye } from "react-icons/fa";

export default function Invoice() {
  const data = [
    {
      stt: 1,
      id: 'KH001',
      name: 'Nguyen Van A',
      phoneNumber: '0901234567',
      createdAt: '2024-11-20',
    },
    {
      stt: 2,
      id: 'KH002',
      name: 'Tran Thi B',
      phoneNumber: '0987654321',
      createdAt: '2024-11-19',
    },
    {
      stt: 3,
      id: 'KH003',
      name: 'Le Van C',
      phoneNumber: '0912345678',
      createdAt: '2024-11-18',
    },
    {
      stt: 4,
      id: 'KH004',
      name: 'Pham Thi D',
      phoneNumber: '0938765432',
      createdAt: '2024-11-17',
    },
    {
      stt: 5,
      id: 'KH005',
      name: 'Hoang Van E',
      phoneNumber: '0923456789',
      createdAt: '2024-11-16',
    },
  ];

  return (
    <div className={styles.invoice}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Khách hàng</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <FaEye />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}