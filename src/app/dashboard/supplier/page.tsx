// src/app/dashboard/menu/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import SupplierForm from '@components/modal-content/supplier/supplier';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@components/ui/modal/modal';
import SupplierApi from "../../services/supplier";
import { ISupplier } from "@services/supplier";

export default function Supplier() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ISupplier[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [formData, setFormData] = useState<ISupplier | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch supplier data with pagination
  const fetchSupplierList = async (page: number = 1) => {
    const response = await SupplierApi.getSupplierList({ limit: 10, page });
    if (response && response.suppliers) {
      setData(response.suppliers);
    }
    if (response && response.pagination) {
      setTotalPages(response.pagination.pages);
    }
  };

  useEffect(() => {
    fetchSupplierList(currentPage);
  }, [currentPage]);

  const openModal = (item?: ISupplier) => {
    if (item) {
      setEditingId(item._id || "");
      setFormData(item);
    } else {
      setFormData({
        name: "",
        field: "",
        phone: "",
        address: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId("");
    setFormData(null);
  };

  const handleSave = async () => {
    if (!formData) return;

    if (editingId) {
      await SupplierApi.updateSupplierEntry(editingId, formData);
    } else {
      await SupplierApi.addSupplierEntry(formData);
    }
    fetchSupplierList(currentPage);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await SupplierApi.deleteSupplierEntry(id);
    fetchSupplierList(currentPage);
  };

  return (
    <div>
      <h1 className="title">NHÀ CUNG CẤP</h1>
      <div style={{ margin: '2em 0' }}>
        <Table
          style={{ borderRadius: '0px' }}
          preHeader={true}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => {
              setCurrentPage(page);
            }
          }}
          addButtonTitle="Thêm nhà cung cấp"
          addButtonAction={() => openModal()}
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên nhà cung cấp</TableCell>
              <TableCell>Liên hệ</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '1em' }}>
                    <div
                      style={{ color: '#624DE3', cursor: 'pointer' }}
                      onClick={() => openModal(item)}
                    >
                      <FaRegEdit />
                    </div>
                    <div
                      style={{ color: '#A30D11', cursor: 'pointer' }}
                      onClick={() => handleDelete(item._id || "")}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        title={editingId ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
      >
        <SupplierForm formData={formData} onChange={(field, value) => {
          setFormData(prev => ({ ...prev, [field]: value }));
        }} />
      </Modal>
    </div>
  );
}
