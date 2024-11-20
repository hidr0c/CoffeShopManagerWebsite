"use client"

import { useState, useEffect } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@ui/table/table";
import { Input, Select } from '@ui/input/input'
import { Button } from "@ui/button/button";
import { formatCurrency } from "../../../helper/format";
import { IWarehouseItem } from "@services/warehouse";

interface ImportProps {
  onDataChange: (data: { customerName: string, phoneNumber: string, importDate: string, values: IWarehouseItem[] }) => void;
  initialData?: { customerName: string, phoneNumber: string, importDate: string, values: IWarehouseItem[] } | null;
}

export default function Import({ onDataChange, initialData }: ImportProps) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [importDate, setImportDate] = useState('');
  const [items, setItems] = useState<IWarehouseItem[]>([]);

  // Initialize form with existing data when editing
  useEffect(() => {
    if (initialData) {
      setCustomerName(initialData.customerName);
      setPhoneNumber(initialData.phoneNumber);
      setImportDate(initialData.importDate);
      setItems(initialData.values);
    } else {
      // Reset form for new entries
      setCustomerName('');
      setPhoneNumber('');
      setImportDate('');
      setItems([]);
    }
  }, [initialData]);

  const handleAddItem = () => {
    setItems([...items, {
      name: '',
      price: 0,
      quant: 0,
      unit: 'Thùng'
    }]);
  };

  const updateItem = (index: number, field: keyof IWarehouseItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);

    onDataChange({
      customerName,
      phoneNumber,
      importDate,
      values: newItems
    });
  };

  const handleTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quant), 0);
  };

  return (
    <div className="">
      <Select
        label="Tên nhà cung cấp"
        value={customerName}
        options={[{ value: 'Luu Minh Tri Supplier', label: 'Luu Minh Tri Supplier' }]}
        onChange={(value) => {
          setCustomerName(value.target.value);
          onDataChange({ customerName: value.target.value, phoneNumber, importDate, values: items });
        }}
      />
      <Input
        label='SĐT nhà cung cấp'
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          onDataChange({ customerName, phoneNumber: e.target.value, importDate, values: items });
        }}
      />
      <Input
        label='Ngày nhập kho'
        value={importDate}
        type='date'
        onChange={(e) => {
          setImportDate(e.target.value);
          onDataChange({ customerName, phoneNumber, importDate: e.target.value, values: items });
        }}
      />
      <Table style={{ borderRadius: '5px' }} >
        <TableHead style={{ background: '#D9DDEB' }}>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Đơn vị tính</TableCell>
            <TableCell>Giá nhập</TableCell>
            <TableCell>Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quant}
                  onChange={(e) => updateItem(index, 'quant', Number(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={item.unit}
                  options={[{ value: 'Thùng', label: 'Thùng' }, { value: 'Kg', label: 'Kg' }]}
                  onChange={(value) => updateItem(index, 'unit', value.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                />
              </TableCell>
              <TableCell>{formatCurrency(item.quant * item.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="" style={{ padding: '1em', fontWeight: '700' }}>
        <Button onClick={handleAddItem} style={{ background: 'transparent', color: 'black' }}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className="" style={{ padding: '1em 1em 1em 2em', fontWeight: '700', background: '#624DE3', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        Tổng tiền:
        <span>
          {formatCurrency(handleTotal())}
        </span>
      </div>
    </div>
  );
}

