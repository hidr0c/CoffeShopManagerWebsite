'use client'

import styles from './menu.module.scss'
import { Table, TableCell, TableHead, TableRow, TableBody } from "../../components/ui/table/table";
import Export from '../../components/modal-content/export/export';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import AddDishModal from '@/components/modal-content/add-menu/addMenu';

export default function Menu() {
  const data = [
    {
      id: '#20462',
      name: 'Trà sữa trân châu',
      type: 'Đồ uống lạnh',
      date: '13/05/2024 00:00:00',
      quant: 144,
    },
    {
      id: '#20463',
      name: 'Cà phê sữa đá',
      type: 'Đồ uống lạnh',
      date: '14/05/2024 00:00:00',
      quant: 200,
    },
    {
      id: '#20464',
      name: 'Nước ép cam',
      type: 'Đồ uống lạnh',
      date: '15/05/2024 00:00:00',
      quant: 120,
    },
    {
      id: '#20465',
      name: 'Trà đào cam sả',
      type: 'Đồ uống lạnh',
      date: '16/05/2024 00:00:00',
      quant: 100,
    },
    {
      id: '#20466',
      name: 'Sinh tố bơ',
      type: 'Đồ uống lạnh',
      date: '17/05/2024 00:00:00',
      quant: 80,
    },
  ];

  return (
    <div className="">
      <div className="" style={{ margin: '2em 0' }}>
        <Table style={{ borderRadius: '0px' }} preHeader={true} pagination={true}
          modalAddContent={<AddDishModal />}
          modalStyle={{ width: '60vw' }}
          modalTitle={'Thêm món vào thực đơn'} addButtonTitle="Thêm món"
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại đồ uống</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>
                  <div className="" style={{ display: 'flex', gap: '1em' }}>
                    <div className="" style={{ color: '#624DE3', cursor: 'pointer' }} ><FaRegEdit /></div>
                    <div style={{ color: '#A30D11', cursor: 'pointer' }}>
                      <FaRegTrashAlt />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
