"use client"

import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import CustomerForm from '@components/modal-content/customer/customer';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@/components/ui/modal/modal';
import { useState, useEffect } from 'react';
import CustomerApi, { ICustomer } from '@/services/customer';

export default function Customer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [formData, setFormData] = useState<ICustomer | null>(null);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setLimit] = useState<number>(10);

  const fetchCustomersList = async (page: number = 1, limit: number = 10) => {
    const response = await CustomerApi.getCustomerList({ page, limit });
    if (response && response.customers) {
      setCustomers(response.customers);
    }
    if (response && response.pagination) {
      setTotalPages(response.pagination.pages);
    }
  };

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const openModal = () => {
    setFormData(
      {
        name: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        sex: "Nam",
        address: "",
      }
    )
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId("");
    setFormData(null);
  };

  const handleEdit = (item: ICustomer) => {
    setEditingId(item._id);
    setFormData(item);
    setIsModalOpen(true);
  }

  const handleSave = async () => {
    if (!formData) return;

    if (editingId) {
      await CustomerApi.updateCustomer(editingId, formData);
    } else {
      await CustomerApi.addCustomer(formData);
    }
    fetchCustomersList();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await CustomerApi.deleteCustomer(id);
    fetchCustomersList();
  };

  return (
    <div>
      <h1 className="title">KHÁCH HÀNG</h1>
      <Table
        style={{ borderRadius: '0px' }}
        preHeader={true}
        pagination={
          {
            currentPage,
            totalPages,
            onPageChange: (page) => {
              setCurrentPage(page);
              fetchCustomersList(page);
            },
            onLimitChange: (limit) => {
              setLimit(limit);
              fetchCustomersList(currentPage, limit);
            }
          }
        }
        addButtonTitle="Thêm khách hàng"
        addButtonAction={openModal}>
        <TableHead style={{ background: 'white' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell>Ngày sinh</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell sticky={true}>Chỉnh sửa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((item, index) => (
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
                    <FaRegTrashAlt onClick={() => handleDelete(item._id)} />
                  </div>
                  <div className="" style={{ color: '#A30D11', cursor: 'pointer' }}>
                    <FaRegEdit onClick={() => handleEdit(item)} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <Modal
          title="Customer Form"
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        >
          <CustomerForm
            customer={formData}
            onChange={(field, value) => {
              console.log(field, value);
              console.log(formData);
              setFormData((prev) => ({ ...prev, [field]: value }));
            }}
          />
        </Modal>
      )}
    </div>
  );
}
