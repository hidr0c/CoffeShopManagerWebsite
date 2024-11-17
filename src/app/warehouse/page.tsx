"use client";

import styles from './warehouse.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody } from "../components/ui/table/table";
import Import from '../components/modal-content/import/import';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from '../components/ui/modal/modal';
import { Input, Select, InputProps } from '../components/ui/input/input';
import { useState } from 'react';

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [quant, setQuant] = useState(0);
  const [ingredientType, setIngredientType] = useState('Hạt cà phê');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

  const ingredientTypeMapping: Record<string, string> = {
    'Hạt cà phê': 'HCF',
    'Trà xanh': 'TX',
    'Đường': 'DU',
    'Sữa': 'SU',
  };

  const openModal = () => {
    setDate(new Date().toLocaleString('vi-VN', { hour12: false })); // Set ngày giờ hiện tại
    setIngredientType('Hạt cà phê'); // Reset về mặc định
    setId(`${ingredientTypeMapping['Hạt cà phê']}001`); // ID mặc định ban đầu
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleIngredientTypeChange = (value: string) => {
    setIngredientType(value);
    const prefix = ingredientTypeMapping[value] || 'UNK'; // Mã tiền tố
    const count = Math.floor(Math.random() * 1000) + 1; // Tạo số ngẫu nhiên
    setId(`${prefix}${count.toString().padStart(3, '0')}`);
  };

  const data = [
    {
      id: '#20462',
      ingredient: 'Hat',
      supplier: 'Midori',
      quant: 144,
      date: '13/05/2024 00:00:00',
      ingredientType: 'Hạt cà phê',
    },
    // ... Các dòng dữ liệu khác
  ];

  return (
    <div className="warehouse-container">
      <h1 className="title">KHO HÀNG</h1>
      <div className="table-container" style={{ margin: '2em 0' }}>
        <Table
          style={{ borderRadius: '0px' }}
          preHeader={true}
          pagination={true}
          modalAddContent={<Import />}
          modalTitle={'Thêm phiếu nhập kho'}
          addButtonTitle="Thêm phiếu nhập"
        >
          <TableHead style={{ background: 'white' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên nguyên liệu</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Loại nguyên liệu</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.ingredient}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.ingredientType}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '1em' }}>
                    <div
                      style={{ color: '#624DE3', cursor: 'pointer' }}
                      onClick={() => openModal()}
                    >
                      <FaRegEdit />
                    </div>
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
      <Modal
        title="Chỉnh sửa kho hàng"
        isOpen={isModalOpen}
        onClose={closeModal}
        style={{ width: '50vw', background: '#FFCC99' }}
      >
        <Input
          label="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Số lượng tồn"
          value={quant}
          type="number"
          onChange={(e) => setQuant(parseInt(e.target.value))}
        />
        <Select
        label="Loại nguyên liệu"
        options={Object.keys(ingredientTypeMapping).map(key => ({
        value: key,
        label: key, 
        }))}
        value={ingredientType}
        onChange={(e) => handleIngredientTypeChange(e.target.value)}
        />
        <Input label="Ngày tháng" value={date} readOnly onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } />
        <Input label="ID" value={id} readOnly onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } />
      </Modal>
    </div>
  );
}
