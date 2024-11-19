"use client";

import styles from "./invoice.module.scss";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "../components/ui/table/table";
import { FaEye } from "react-icons/fa";

export default function Invoice() {
  const data = [
    {
      id: "#20462",
      status: "Đã thanh toán",
      customerType: "Mới",
      customer: "Diddy",
      category: "Hat",
      date: "13/05/2024 00:00:00",
      quant: 144,
    },
    {
      id: "#20463",
      status: "Chưa thanh toán",
      customerType: "Cũ",
      customer: "John",
      category: "Shoes",
      date: "12/05/2024 00:00:00",
      quant: 55,
    },
    {
      id: "#20464",
      status: "Đã thanh toán",
      customerType: "Cũ",
      customer: "Sarah",
      category: "Shirt",
      date: "11/05/2024 00:00:00",
      quant: 30,
    },
    {
      id: "#20465",
      status: "Chưa thanh toán",
      customerType: "Mới",
      customer: "Mike",
      category: "Jacket",
      date: "10/05/2024 00:00:00",
      quant: 5,
    },
    {
      id: "#20466",
      status: "Đã thanh toán",
      customerType: "Mới",
      customer: "Anna",
      category: "Pants",
      date: "09/05/2024 00:00:00",
      quant: 100,
    },
  ];

  return (
    <div className="">
      <div className="" style={{ margin: "2em 0" }}>
        <Table
          style={{ borderRadius: "0px" }}
          preHeader={false}
          pagination={true}
        >
          <TableHead style={{ background: "white" }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Loại khách</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Số lượng sản phẩm</TableCell>
              <TableCell>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.customerType}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      gap: "1em",
                      cursor: "pointer",
                      color: "#007BFF",
                    }}
                  >
                    <FaEye /> {/* Icon xem chi tiết */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
