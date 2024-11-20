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

  const handleDelete = async (id: number) => {
    await EmployeeApi.deleteEmployee(id.toString());
    fetchEmployeeList();
  };

  return (
    <div>
      <h1>NHÂN VIÊN</h1>
      <table>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Ngày tháng năm</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.birthDate}</td>
              <td>{item.sex}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>
                <button onClick={() => openModal(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal title="Employee Form" isOpen={isModalOpen} onClose={closeModal}>
    <EmployeeForm
      employee={formData || { name: '', birthDate: '', sex: 'Nam', address: '', phone: '', password: '',isActive: false, isVerified:false, isFirstTime: true,checkins: []    }}
      onChange={(field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }}
      onSave={handleSave}
    />
  </Modal>
      )}
    </div>
  );
}

