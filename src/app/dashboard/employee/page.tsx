'use client';

import styles from './employee.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import EmployeeForm from '@components/modal-content/employee/employee';
import { FaRegEdit, FaRegTrashAlt, FaRegEye } from 'react-icons/fa';
import Modal from '@/components/ui/modal/modal';
import { useState } from 'react';
import EmployeeApi, { IEmployee } from '@/services/employee';
import { useEffect } from "react";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [formData, setFormData] = useState<IEmployee | null>(null);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setLimit] = useState<number>(10);
  const [isModalEdit, setModalEdit] = useState(false);


  const fetchEmployeeList = async (page: number = 1, limit: number = 10) => {
    const response = await EmployeeApi.getEmployeeList({ page, limit });
    console.log(response);
    if (response) {
      if (response.employees) {
        setEmployees(response.employees);
      }
      if (response.pagination) {
        setTotalPages(response.pagination.pages);
      }
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const setModalDefault = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      role: "Employee",
      password: "",
      isActive: true,
      isVerified: true,
      isFirstTime: true,
      checkins: [],
      birthDate: "",
      sex: "Nam",
      address: "",
    });
  }

  // Mở modal và reset nhân viên mới
  const openModal = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      role: "Employee",
      password: "",
      isActive: true,
      isVerified: true,
      isFirstTime: true,
      checkins: [],
      birthDate: "",
      sex: "Nam",
      address: "",
    });
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId("");
    setFormData(null);
  };

  const handleView = (item: IEmployee) => {
    setFormData(item);
    setModalEdit(false);
    setIsModalOpen(true);
  }

  const handleEdit = (item: IEmployee) => {
    setEditingId(item._id);
    setFormData(item);
    setModalEdit(true);
    setIsModalOpen(true);
  }

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
    debugger;
    await EmployeeApi.deleteEmployee(id.toString());
    fetchEmployeeList();
  };

  return (
    <div>
      <h1>NHÂN VIÊN</h1>
      <Table
        style={{ borderRadius: '0px' }}
        preHeader={true}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: (page) => {
            setCurrentPage(page);
            fetchEmployeeList(page);
          },
          onLimitChange: (limit) => {
            setLimit(limit);
            fetchEmployeeList(currentPage, limit);
          }
        }}
        addButtonAction={openModal}
        addButtonTitle="Thêm nhân viên">
        <TableHead style={{ background: 'white' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên nhân viên</TableCell>
            <TableCell>Ngày tháng năm</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell sticky={true}>Chỉnh sửa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.birthDate}</TableCell>
              <TableCell>{item.sex}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell sticky={true}>
                <div className="" style={{ display: 'flex', gap: '1.5em' }}>
                  <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                    <FaRegEye onClick={() => handleView(item)} />
                  </div>
                  <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                    <FaRegTrashAlt
                      onClick={() => {
                        handleDelete(item._id);
                      }} />
                  </div>
                  <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                    <FaRegEdit
                      onClick={() => {
                        handleEdit(item);
                      }} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <Modal
          title="Employee Form"
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}>
          <EmployeeForm
            employee={formData}
            isEdit={isModalEdit}
            onChange={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }));
            }}
          />
        </Modal>
      )}
    </div>
  );
}

