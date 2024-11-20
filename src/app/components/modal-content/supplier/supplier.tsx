'use client';

import { useState, useEffect } from 'react';
import { Input, Select } from '@ui/input/input';
import { Button } from "@ui/button/button";

// Define the types for the props
interface SupplierFormProps {
  formData: {
    supplierName: string;
    field: string;
    phone: string;
    address: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function SupplierForm({ formData, onChange }: SupplierFormProps) {
  const { supplierName, field, phone, address } = formData;

  // Using the props directly instead of local state
  const handleSelect = (value: string) => {
    onChange('field', value); // Update field using onChange
  };

  return (
    <div style={{ margin: '0 0 2em 0' }}>
      <Input
        label='Tên nhà cung cấp'
        value={supplierName}
        onChange={(e) => onChange('supplierName', e.target.value)} // Update supplierName using onChange
      />
      <Select
        label="Lĩnh vực"
        value={field}
        options={[
          { value: 'Thiết bị điện tử', label: 'Thiết bị điện tử' },
          { value: 'Trang phục', label: 'Trang phục' }
        ]}
        onChange={(e) => handleSelect(e.target.value)} // Handle select field change
      />
      <Input
        label='SĐT'
        value={phone}
        onChange={(e) => onChange('phone', e.target.value)} // Update phone using onChange
      />
      <Input
        label='Địa chỉ'
        value={address}
        onChange={(e) => onChange('address', e.target.value)} // Update address using onChange
      />
    </div>
  );
}
