'use client';

import styles from './employee.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import EmployeeForm from '@components/modal-content/employee/employee';
import { FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@/components/ui/modal/modal';
import { useState } from 'react';

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([
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
    // ... Các nhân viên khác
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    birthDate: '',
    sex: 'Nam',
    address: '',
    phone: '',
  });

  // Mở modal và reset nhân viên mới
  const openModal = () => {
    setIsModalOpen(true);
    setNewEmployee({
      name: '',
      birthDate: '',
      sex: 'Nam',
      address: '',
      phone: '',
    });
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Lưu nhân viên mới
  const handleSave = () => {
    const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id: nextId }]);
    closeModal();
  };

  // Xử lý thay đổi trong form
  const handleChange = (field: string, value: string) => {
    setNewEmployee({ ...newEmployee, [field]: value });
  };

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
              <TableCell>Mã nhân viên</TableCell>
              <TableCell>Tên nhân viên</TableCell>
              <TableCell>Ngày tháng năm</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.birthDate}</TableCell>
                <TableCell>{item.sex}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <div className="" style={{ display: 'flex', gap: '1em' }}>
                    <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                      <FaRegTrashAlt />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        title="Thêm nhân viên"
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}>
        <EmployeeForm employee={newEmployee} onChange={handleChange} />
      </Modal>
    </div>
  );
}
