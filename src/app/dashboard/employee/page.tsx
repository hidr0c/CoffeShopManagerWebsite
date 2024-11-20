'use client'

import styles from './employee.module.scss'
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import EmployeeForm from '@components/modal-content/employee/employee';
import { FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@/components/ui/modal/modal';
import { useState } from 'react';

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      birthDate: '13/05/1996',
      sex: 'Nam',
      address: '144 DHB',
      phone: '0123456789',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      birthDate: '22/09/1998',
      sex: 'Nữ',
      address: '34 XYZ',
      phone: '0987654321',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      birthDate: '05/11/1995',
      sex: 'Nam',
      address: '78 QWE',
      phone: '0912345678',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      birthDate: '10/01/1997',
      sex: 'Nữ',
      address: '56 ABC',
      phone: '0938765432',
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      birthDate: '19/07/1994',
      sex: 'Nam',
      address: '90 RST',
      phone: '0901234567',
    },
    {
      id: 6,
      name: 'Đỗ Thị F',
      birthDate: '03/12/2000',
      sex: 'Nữ',
      address: '123 UVW',
      phone: '0923456789',
    },
    {
      id: 7,
      name: 'Bùi Văn G',
      birthDate: '30/04/1993',
      sex: 'Nam',
      address: '67 DEF',
      phone: '0945678901',
    },
    {
      id: 8,
      name: 'Nguyễn Thị H',
      birthDate: '15/08/1999',
      sex: 'Nữ',
      address: '12 GHI',
      phone: '0967890123',
    },
    {
      id: 9,
      name: 'Lý Văn K',
      birthDate: '25/03/1992',
      sex: 'Nam',
      address: '89 JKL',
      phone: '0978901234',
    },
    {
      id: 10,
      name: 'Trương Thị M',
      birthDate: '01/06/1998',
      sex: 'Nữ',
      address: '45 MNO',
      phone: '0989012345',
    }
  ];
  return (
    <div className="">
      <h1 className="title">NHÂN VIÊN</h1>
      <div className="" style={{ margin: '2em 0' }}>

        <Table
          style={{ borderRadius: '0px' }}
          preHeader={true}
          pagination={true}
          addButtonAction={openModal}
          addButtonTitle="Thêm nhân viên">
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>
                Mã nhân viên
              </TableCell>
              <TableCell>
                Tên nhân viên
              </TableCell>
              <TableCell>
                Ngày tháng năm
              </TableCell>
              <TableCell>
                Giới tính
              </TableCell>
              <TableCell>
                Địa chỉ
              </TableCell>
              <TableCell>
                SĐT
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
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.birthDate}
                </TableCell>
                <TableCell>
                  {item.sex}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  {item.phone}
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
      <Modal
        title='Thêm nhân viên'
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={() => { }}  // TODO: Code cai nay cho tao
      >
        <EmployeeForm />
      </Modal>
    </div>
  )
}
