"use client"

import { Table, TableCell, TableHead, TableRow, TableBody } from "@ui/table/table";
import { Input, Select } from '@ui/input/input'
import { Button } from "@ui/button/button";
import { formatCurrency } from "@/helper/format";

import { ExportItem, ExportData } from "@/models/ExportModel";
import type { IExportSelect, IExportInput, IExport } from "./types";


const selectData: IExportSelect = {
  label: "Select Label ABC",
  value: "Select Value ABC",
  onChange: () => { },
  options: [
    { key: "1", value: "Select Value ABC", label: "Select Label ABC" },
    { key: "2", value: "Select Value DEF", label: "Select Label DEF" },
    { key: "3", value: "Select Value GHI", label: "Select Label GHI" },
    { key: "4", value: "Select Value XYZ", label: "Select Label XYZ" },
  ]
}

const inputData: IExportInput = {
  label: "Input Label ABC",
  value: "Input Value ABC",
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
  },
}

const options: IExport = {
  info: {
    inputs: [inputData],
    selects: [selectData]
  },
}

const data: ExportData = {
  customerName: "Mai Gia Bao",
  phoneNumber: "0123456789",
  importDate: "13/05/2024 00:00:00",
  values: [
    {
      name: 'Hat',
      price: 300000,
      quantity: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quantity: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quantity: 30,
      unit: 'Thùng',
    },
    {
      name: 'Hat',
      price: 300000,
      quantity: 30,
      unit: 'Thùng',
    }
  ]
}


export default function Export() {
  const handleSelect = () => {
    // Select
  }
  const handleTotal = () => {
    let total = 0;
    data.values.forEach((item: ExportItem) => {
      total += item.price * item.quantity;
    })
    return total;
  }
  return (
    <div className="">
      {options.info.selects.map((item) => (
        <Select
          key={item.key || item.label}
          label={item.label}
          value={item.value}
          onChange={item.onChange}
          options={item.options}
        ></Select>
      ))}

      {options.info.inputs.map((item) => (
        <Input
          key={item.key || item.label}
          label={item.label}
          value={item.value}
          onChange={item.onChange}
        ></Input>
      ))}
      <Table style={{ borderRadius: '5px' }} >
        <TableHead style={{ background: '#D9DDEB' }}>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Đơn vị tính</TableCell>
            <TableCell>Giá bán</TableCell>
            <TableCell>Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.values.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>{formatCurrency(item.quantity * item.price)}</TableCell>
            </TableRow>
          ))}

        </TableBody>

      </Table>
      <div className="" style={{ padding: '1em', fontWeight: '700' }}>
        <Button onClick={options.onSubmit} style={{ background: 'transparent', color: 'black' }}> Thêm sản phẩm</Button>

      </div>
      <div className="" style={{ padding: '1em 1em 1em 2em', fontWeight: '700', background: '#624DE3', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        Tổng tiền:
        <span >
          {formatCurrency(handleTotal())}
        </span>
      </div>
    </div>
  )
}

