// src/app/dashboard/menu/page.tsx
'use client';

import { useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import SupplierForm from '@components/modal-content/supplier/supplier';
import { FaRegTrashAlt } from 'react-icons/fa';
import Modal from '@components/ui/modal/modal';

interface SupplierFormProps {
  formData: {
    supplierName: string;
    field: string;
    phone: string;
    address: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function Supplier() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: '',
    field: 'Thiết bị điện tử',
    phone: '',
    address: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Logic lưu thông tin nhà cung cấp (formData)
    console.log('Saved Supplier Data:', formData);

    // Sau khi lưu xong, đóng modal và reset form
    setIsModalOpen(false);
    setFormData({
      supplierName: '',
      field: 'Thiết bị điện tử',
      phone: '',
      address: ''
    });
  };

  const data = [
    { name: 'TGDĐ', domain: 'Thiết bị điện tử', phone: '012345678', address: '123 ABC' },
    { name: 'TGDĐ', domain: 'Thiết bị điện tử', phone: '012345678', address: '123 ABC' },
    { name: 'TGDĐ', domain: 'Thiết bị điện tử', phone: '012345678', address: '123 ABC' },
    { name: 'TGDĐ', domain: 'Thiết bị điện tử', phone: '012345678', address: '123 ABC' }
  ];

  return (
    <div>
      <h1 className="title">NHÀ CUNG CẤP</h1>
      <div style={{ margin: '2em 0' }}>
        <Table style={{ borderRadius: '0px' }} preHeader={true} pagination={true} addButtonTitle="Thêm nhà cung cấp" addButtonAction={openModal}>
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>Tên nhà cung cấp</TableCell>
              <TableCell>Lĩnh vực</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.domain}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '1em' }}>
                    <div style={{ color: '#A30D11', cursor: 'pointer' }}><FaRegTrashAlt /></div>
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
        onSave={handleSave} // Lưu thông tin khi nhấn "Lưu"
        title="Thêm nhà cung cấp"
      >
        <SupplierForm formData={formData} onChange={handleFormChange} />
      </Modal>
    </div>
  );
}
