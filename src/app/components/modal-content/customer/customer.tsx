"use client";

import { useState } from 'react';
import { Input, Select } from '../../ui/input/input';
import { Button } from "../../ui/button/button";

export default function CustomerForm() {
  // Khởi tạo state cho từng trường
  const [customerName, setCustomerName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Nam'); // Mặc định là Nam
  const [address, setAddress] = useState('');

  const handleSelect = (value) => {
    setGender(value); // Cập nhật giới tính khi người dùng chọn
  };

  return (
    <div className="" style={{ margin: '0 0 2em 0' }}>
      <Input
        label='Tên khách hàng'
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)} // Cập nhật state cho Tên khách hàng
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
    </div>
  );
}
