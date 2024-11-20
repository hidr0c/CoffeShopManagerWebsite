"use client";

import { useState, ChangeEvent } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@ui/table/table";
import { Input, Select } from "@ui/input/input";
import { Button } from "@ui/button/button";

export default function EmployeeForm() {
  const data = [
    // Mock data
    {
      name: "Hat",
      price: 300000,
      quant: 30,
      unit: "Thùng",
    },
    {
      name: "Hat",
      price: 300000,
      quant: 30,
      unit: "Thùng",
    },
    {
      name: "Hat",
      price: 300000,
      quant: 30,
      unit: "Thùng",
    },
    {
      name: "Hat",
      price: 300000,
      quant: 30,
      unit: "Thùng",
    },
  ];

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Nam");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <Input
        label="Tên nhân viên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Ngày sinh"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <Select
        label="Giới tính"
        value={gender}
        onChange={handleSelect}
        options={[
          { label: "Nam", value: "Nam" },
          { label: "Nữ", value: "Nữ" },
        ]}
      />
      <Input
        label="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        label="SĐT"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button onClick={() => console.log({ name, dob, gender, address, phone })}>
        Submit
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Đơn vị</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quant}</TableCell>
              <TableCell>{item.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
