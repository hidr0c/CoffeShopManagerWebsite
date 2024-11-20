'use client';

import styles from './employee.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import EmployeeForm from '@components/modal-content/employee/employee';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@/components/ui/modal/modal';
import { useState } from 'react';
import EmployeeApi, { IEmployee } from '@/services/employee';
import {useEffect } from "react";
import Import from '@/components/modal-content/import/import';

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<IEmployee | null>(null);
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

  const fetchEmployeeList = async () => {
    const response = await EmployeeApi.getEmployeeList({ page: 1, limit: 10 });
    if (response && response.employees) {
      setData(response.employees);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  // Mở modal và reset nhân viên mới
    // Open modal for add or edit
    const openModal = (item?: any) => {
      if (item) {
        setEditingId(item.id);
        const editData: IEmployee = {
          name: item.name || '',
          email: item.email || '',
          phoneNumber: item.phoneNumber || '',
          role:item.role || '',
          password: item.password || '',
          isActive: item.isActive || false,
          isVerified: item.isVerified || false,
          isFirstTime: item.isFirstTime || true,
          checkins: item.checkins || []
        };
        setFormData(editData);
  } else {
    setFormData(null);
  }
  setIsModalOpen(true);
};



  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Lưu nhân viên mới
  const handleSave = async () => {
    if (!formData) return;

    if (editingId) {
      await EmployeeApi.updateEmployee(editingId, formData);
    } else {
      await EmployeeApi.addEmployee(formData);
    } 
    fetchEmployeeList();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await EmployeeApi.deleteEmployee(id);
    fetchEmployeeList();
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
       <Import onDataChange={setFormData} initialData={formData} />
      </Modal>
    </div>
  );
}

