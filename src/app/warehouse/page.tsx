"use client";

import styles from './warehouse.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody } from "../components/ui/table/table";
import Import from '../components/modal-content/import/import';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from '../components/ui/modal/modal';
import { Input } from '../components/ui/input/input';
import { useState, useEffect } from 'react';
import { fetchWarehouseItems, addWarehouseItem, updateWarehouseItem, deleteWarehouseItem } from '@services/warehouse/warehouse.api';

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [quant, setQuant] = useState(0);
  const [warehouseData, setWarehouseData] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    // Load warehouse data on mount
    const loadWarehouseData = async () => {
      const data = await fetchWarehouseItems();
      setWarehouseData(data);
    };
    loadWarehouseData();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditId(item.id);
      setName(item.ingredient);
      setQuant(item.quant);
    } else {
      setEditId(null);
      setName('');
      setQuant(0);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    if (editId) {
      // Update existing item
      await updateWarehouseItem(editId, { name, quant });
    } else {
      // Add new item
      await addWarehouseItem({ name, quant });
    }
    // Refresh data after saving
    const updatedData = await fetchWarehouseItems();
    setWarehouseData(updatedData);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteWarehouseItem(id);
    const updatedData = await fetchWarehouseItems();
    setWarehouseData(updatedData);
  };

  return (
    <div>
      <h1 className="title">KHO HÀNG</h1>
      <div style={{ margin: '2em 0' }}>
        <Table style={{ borderRadius: '0px' }} preHeader pagination
          modalAddContent={<Import />}
          modalTitle="Thêm phiếu nhập kho" addButtonTitle="Thêm phiếu nhập"
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
            {warehouseData.map((item, index) => (
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
                    <div style={{ color: '#624DE3', cursor: 'pointer' }} onClick={() => openModal(item)}>
                      <FaRegEdit />
                    </div>
                    <div style={{ color: '#A30D11', cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>
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
        title="Chỉnh sửa tồn kho"
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleSave}          // Use onAction instead of onSave
        action="Save"                  // Set action button label
        style={{ width: '50vw', background: "#FFCC99" }}
      >
        <Input label="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Số lượng tồn" value={quant} type="number" onChange={(e) => setQuant(parseInt(e.target.value))} />
      </Modal>
    </div>
  );
}
