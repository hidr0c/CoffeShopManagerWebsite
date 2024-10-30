"use client"

import { Table, TableCell, TableHead, TableRow, TableBody } from "../../ui/table/table";
import { Input, Select} from '../../ui/input/input'
import { Button } from "../../ui/button/button";
import { formatCurrency } from "../../../helper/format";

export default function Export () {
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
  const handleSelect = () => {
    // Select
  }
  const handleTotal = () => {
    let total = 0;
    data.forEach((item) => {
      total +=item.price*item.quant;
    })
    return total;
  }
  return (
    <div className="">
        <Select label="Tên khách hàng" value="Mai Gia Bao" options={[{value: 'Luu Minh Tri Supplier', label:'Luu Minh Tri Supplier'},{value: 'Test 2', label:'Test2'}]} onChange={() => handleSelect()}></Select>
        <Input label='SĐT nhà cung cấp' value='0888087856' onChange={() => {
          //Write code onChange here!
        }}></Input>
        <Input label='Ngày nhập kho' value='' type='date' onChange={() => {
          //Write code onChange here!
        }}></Input>
        <Table style={{borderRadius: '5px'}} >
          <TableHead style={{background:'#D9DDEB'}}>
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
            {data.map((item,index) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>{formatCurrency(item.quant*item.price)}</TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
        <div className="" style={{padding:'1em',fontWeight:'700'}}>
          <Button onClick={() => {}} style={{background:'transparent',color:'black'}}> Thêm sản phẩm</Button>

          </div>
        <div className="" style={{padding:'1em 1em 1em 2em', fontWeight:'700',background: '#624DE3',color:'white',display:'flex',justifyContent:'space-between'}}>
          Tổng tiền:
          <span >
            {formatCurrency(handleTotal())}
          </span>
        </div>
        </div>
  )
}

