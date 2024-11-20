'use client';

import { useState, useEffect } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import MenuForm from '@components/modal-content/menu/menu';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@components/ui/modal/modal';
import MenuApi from "../../services/menu";
import { IMenuItem } from "@services/menu";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IMenuItem[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [formData, setFormData] = useState<IMenuItem | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchMenuList = async (page: number = 1) => {
    const response = await MenuApi.getMenuList({ limit: 10, page });
    if (response && response.items) {
      setData(response.items);
    }
    if (response && response.pagination) {
      setTotalPages(response.pagination.pages);
    }
  };

  useEffect(() => {
    fetchMenuList(currentPage);
  }, [currentPage]);

  const openModal = (item?: IMenuItem) => {
    if (item) {
      setEditingId(item._id || "");
      setFormData(item);
    } else {
      setFormData({
        name: "",
        type: "",
        price: 0,
        isAvailable: true,
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
      await MenuApi.updateMenuItem(editingId, formData);
    } else {
      await MenuApi.addMenuItem(formData);
    }
    fetchMenuList(currentPage);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await MenuApi.deleteMenuItem(id);
    fetchMenuList(currentPage);
  };

  return (
    <div>
      <h1 className="title">THỰC ĐƠN</h1>
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
          addButtonTitle="Thêm món"
          addButtonAction={() => openModal()}
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên món</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Có sẵn</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.isAvailable ? "Có" : "Không"}</TableCell>
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        title={editingId ? "Chỉnh sửa món" : "Thêm món"}
      >
        <MenuForm formData={formData} onChange={(field, value) => {
          setFormData(prev => ({ ...prev, [field]: value }));
        }} />
      </Modal>
    </div>
  );
}
