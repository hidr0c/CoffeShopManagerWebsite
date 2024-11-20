"use client"

import { Table, TableCell, TableHead, TableRow, TableBody } from "@ui/table/table";
import { Input, Select } from '@ui/input/input'
import { Button } from "@ui/button/button";
import { formatCurrency } from "../../../helper/format";
import { IWarehouse, IWarehouseItem } from "@services/warehouse";

interface ImportProps {
  warehouse: IWarehouse | null;
  onChange: (field: keyof IWarehouse, value: any) => void;
  suppliers: { value: string, label: string }[]; // Add this prop
}

export default function Import({ warehouse, onChange, suppliers }: ImportProps) {
  const handleAddItem = () => {
    const newItems = [...(warehouse?.values || []), {
      name: '',
      price: 0,
      quant: 0,
      unit: 'Thùng'
    }];
    onChange('values', newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...(warehouse?.values || [])];
    newItems.splice(index, 1);
    onChange('values', newItems);
  }

  const updateItem = (index: number, field: keyof IWarehouseItem, value: string | number) => {
    const newItems = [...(warehouse?.values || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange('values', newItems);
  };

  const handleTotal = () => {
    return (warehouse?.values || []).reduce((total, item) => total + (item.price * item.quant), 0);
  };

  return (
    <>
      <Select
        label="Tên nhà cung cấp"
        value={warehouse?.supplierName || suppliers[0]?.value || ''}
        options={suppliers}
        onChange={(e) => onChange('supplierName', e.target.value)}
      />
      <Input
        label='SĐT nhà cung cấp'
        value={warehouse?.phoneNumber || ''}
        onChange={(e) => onChange('phoneNumber', e.target.value)}
      />
      <Input
        label='Ngày nhập kho'
        value={warehouse?.importDate || ''}
        type='date'
        onChange={(e) => onChange('importDate', e.target.value)}
      />
      <div style={{ maxHeight: "30vh", overflow: "auto" }}>
        <Table style={{ borderRadius: '5px' }} >
          <TableHead style={{ background: '#D9DDEB' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Đơn vị tính</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell sticky={true}><></></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(warehouse?.values || []).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    style={{ gridTemplateColumns: "unset" }}
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    style={{ gridTemplateColumns: "unset" }}
                    type="number"
                    value={item.quant}
                    onChange={(e) => updateItem(index, 'quant', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    style={{ gridTemplateColumns: "unset" }}
                    value={item.unit}
                    options={[{ value: 'Thùng', label: 'Thùng' }, { value: 'Kg', label: 'Kg' }]}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    style={{ gridTemplateColumns: "unset" }}
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>{formatCurrency(item.quant * item.price)}</TableCell>
                <TableCell sticky={true}>
                  <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                    <Button onClick={() => handleRemoveItem(index)} style={{ background: 'transparent', color: 'black' }}>
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
    </>
  );
}

