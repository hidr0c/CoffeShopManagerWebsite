'use client';

import { useState, useEffect } from 'react';
import { Input, Select } from '@ui/input/input';
import { Button } from "@ui/button/button";

// Define the types for the props
interface SupplierFormProps {
  formData: {
    name: string;
    field: string;
    phone: string;
    address: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function SupplierForm({ formData, onChange }: SupplierFormProps) {
  return (
    <div style={{ margin: '0 0 2em 0' }}>
      <Input
        label='Tên nhà cung cấp'
        value={formData.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <Input
        label="Lĩnh vực"
        value={formData.field}
        onChange={(e) => onChange('field', e.target.value)}
      />
      <Input
        label='SĐT'
        value={formData.phone}
        onChange={(e) => onChange('phone', e.target.value)}
      />
      <Input
        label='Địa chỉ'
        value={formData.address}
        onChange={(e) => onChange('address', e.target.value)}
      />
    </div>
  );
}
