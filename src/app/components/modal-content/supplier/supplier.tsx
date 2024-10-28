"use client";

import { useState } from 'react';
import { Input, Select } from '../../ui/input/input';
import { Button } from "../../ui/button/button";

export default function SupplierForm() {
  // Khởi tạo state cho từng trường
  const [supplierName, setSupplierName] = useState('');
  const [field, setField] = useState('Thiết bị điện tử'); // Mặc định là 'Thiết bị điện tử'
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSelect = (value) => {
    setField(value); // Cập nhật lĩnh vực khi người dùng chọn
  };

  return (
    <div className="" style={{ margin: '0 0 2em 0' }}>
      <Input
        label='Tên nhà cung cấp'
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)} // Cập nhật state cho Tên nhà cung cấp
      />
      <Select
        label="Lĩnh vực"
        value={field}
        options={[
          { value: 'Thiết bị điện tử', label: 'Thiết bị điện tử' },
          { value: 'Trang phục', label: 'Trang phục' }
        ]}
        onChange={(e) => handleSelect(e.target.value)} // Cập nhật state cho Lĩnh vực
      />
      <Input
        label='SĐT'
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Cập nhật state cho SĐT
      />
      <Input
        label='Địa chỉ'
        value={address}
        onChange={(e) => setAddress(e.target.value)} // Cập nhật state cho Địa chỉ
      />

    </div>
  );
}
