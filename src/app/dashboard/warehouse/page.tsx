// page.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./warehouse.module.scss";
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import Import from "@components/modal-content/import/import";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "@components/ui/modal/modal";
import { Input, Select } from "@components/ui/input/input";
import WarehouseApi from "../../services/warehouse";
import { IWarehouse, IWarehouseItem } from "@services/warehouse";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<IWarehouse | null>(null);

  const ingredientTypeMapping: Record<string, string> = {
    "Hạt cà phê": "HCF",
    "Trà xanh": "TX",
    "Đường": "DU",
    "Sữa": "SU",
  };

  // Fetch warehouse data
  const fetchWarehouseList = async () => {
    const response = await WarehouseApi.getWarehouseList({ page: 1, limit: 10 });
    if (response && response.exports) {
      setData(response.exports);
    }
  };

  useEffect(() => {
    fetchWarehouseList();
  }, []);

  const openModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      const editData: IWarehouse = {
        customerName: item.supplier || '',
        phoneNumber: item.phoneNumber || '',
        importDate: item.date || '',
        values: [{
          name: item.ingredient,
          price: item.price || 0,
          quant: item.quant || 0,
          unit: item.unit || 'Thùng'
        }]
      };
      setFormData(editData);
    } else {
      setFormData(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };


  const handleSave = async () => {
    if (!formData) return;

    if (editingId) {
      await WarehouseApi.updateWarehouseEntry(editingId, formData);
    } else {
      await WarehouseApi.addWarehouseEntry(formData);
    }
    fetchWarehouseList();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await WarehouseApi.deleteWarehouseEntry(id);
    fetchWarehouseList();
  };

  return (
    <div className="warehouse-container">
      <h1 className="title">KHO HÀNG</h1>
      <div className="table-container" style={{ margin: "2em 0" }}>
        <Table
          style={{ borderRadius: "0px" }}
          preHeader={true}
          pagination={true}
          addButtonTitle="Thêm phiếu nhập"
          addButtonAction={openModal}
        >
          <TableHead style={{ background: "white" }}>
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
              <TableRow key={item.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.ingredient}</TableCell>
                <TableCell>{item.supplier || "Unknown"}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.ingredientType}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "1em" }}>
                    <div
                      style={{ color: "#624DE3", cursor: "pointer" }}
                      onClick={() => openModal(item)}
                    >
                      <FaRegEdit />
                    </div>
                    <div
                      style={{ color: "#A30D11", cursor: "pointer" }}
                      onClick={() => handleDelete(item.id)}
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
        title={editingId ? "Chỉnh sửa kho hàng" : "Thêm mới kho hàng"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}>
        <Import onDataChange={setFormData} initialData={formData} />
      </Modal>
    </div>
  );
}
