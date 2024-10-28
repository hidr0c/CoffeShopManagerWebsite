"use client"

import { Table, TableCell, TableHead, TableRow, TableBody } from "../../ui/table/table";
import { Input, Select} from '../../ui/input/input'
import { Button } from "../../ui/button/button";
import { useState } from "react";

export default function EmployeeForm () {
  const data = [ //Mock data
    {
      name: 'Hat',
      price: 300000,
      quant: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quant: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quant: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quant: 30,
      unit: 'Thùng',
    }
  ]
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Nam');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSelect = (value) => {
    setGender(value);
  };

  return (
    <div className="" style={{ margin: '0 0 2em 0' }}>
      <Input
        label='Tên nhân viên'
        value={name}
        onChange={(e) => setName(e.target.value)} // Cập nhật state cho Tên nhân viên
      />
      <Input
        label='Ngày sinh'
        type='date'
        value={dob}
        onChange={(e) => setDob(e.target.value)} // Cập nhật state cho Ngày sinh
      />
      <Select
        label="Giới tính"
        value={gender}
        options={[
          { value: 'Nam', label: 'Nam' },
          { value: 'Nữ', label: 'Nữ' }
        ]}
        onChange={(e) => handleSelect(e.target.value)} // Cập nhật state cho Giới tính
      />
      <Input
        label='Địa chỉ'
        value={address}
        onChange={(e) => setAddress(e.target.value)} // Cập nhật state cho Địa chỉ
      />
      <Input
        label='SĐT'
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Cập nhật state cho SĐT
      />
    </div>
  )
}

