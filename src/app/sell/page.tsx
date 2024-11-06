'use client'

import styles from './sell.module.scss'
import { Table, TableCell, TableHead, TableRow, TableBody } from "../components/ui/table/table";
import Export from '../components/modal-content/export/export';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Sell() {
  const data = [
    {
      id: '#20462',
      quant: 144,
      name: 'Hat',
      date: '13/05/2024 00:00:00',
      customer: 'Diddy',
      address: '123 ABC XYZ',

    },
    {
      id: '#20462',
      quant: 144,
      name: 'Hat',
      date: '13/05/2024 00:00:00',
      customer: 'Diddy',
      address: '123 ABC XYZ',

    },
    {
      id: '#20462',
      quant: 144,
      name: 'Hat',
      date: '13/05/2024 00:00:00',
      customer: 'Diddy',
      address: '123 ABC XYZ',

    },
    {
      id: '#20462',
      quant: 144,
      name: 'Hat',
      date: '13/05/2024 00:00:00',
      customer: 'Diddy',
      address: '123 ABC XYZ',

    },

    {
      id: '#20462',
      quant: 144,
      name: 'Hat',
      date: '13/05/2024 00:00:00',
      customer: 'Diddy',
      address: '123 ABC XYZ',

    },
  ]
  return (
    <div className="">
      <h1 className="title">BÁN HÀNG</h1>
      <div className="" style={{ margin: '2em 0' }}>

        <Table style={{ borderRadius: '0px' }} preHeader={true} pagination={true}
          modalAddContent={<Export />}
          modalTitle={'Thêm phiếu xuất kho'} addButtonTitle="Thêm phiếu xuất"
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>
                STT
              </TableCell>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Tên sản phẩm
              </TableCell>
              <TableCell>
                Khách hàng
              </TableCell>
              <TableCell>
                Địa chỉ
              </TableCell>
              <TableCell>
                Ngày tháng
              </TableCell>
              <TableCell>
                Số lượng
              </TableCell>
              <TableCell>
                Chỉnh sửa
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index}
                </TableCell>
                <TableCell>
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.customer}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  {item.date}
                </TableCell>
                <TableCell>
                  {item.quant}
                </TableCell>
                <TableCell>
                  <div className="" style={{ display: 'flex', gap: '1em' }}>

                    <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}><FaRegTrashAlt /></div>
                  </div>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
