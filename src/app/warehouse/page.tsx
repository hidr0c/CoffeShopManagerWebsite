"use client";

import { useState, useEffect } from "react";
import styles from "./warehouse.module.scss";
import { Table, TableCell, TableHead, TableRow, TableBody } from "../components/ui/table/table";
import Import from "../components/modal-content/import/import";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../components/ui/modal/modal";
import { Input, Select } from "../components/ui/input/input";
import WarehouseApi from "@services/warehouse";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [quant, setQuant] = useState<number | string>(0);
  const [ingredientType, setIngredientType] = useState("Hạt cà phê");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const ingredientTypeMapping: Record<string, string> = {
    "Hạt cà phê": "HCF",
    "Trà xanh": "TX",
    "Đường": "DU",
    "Sữa": "SU",
  };

  // Fetch warehouse data
  const fetchWarehouseList = async () => {
    const response = await WarehouseApi.getWarehouseList({ page: 1, limit: 10 }); // Adjust pagination
    if (response && response.exports) {
      setData(response.exports);
    }
  };

  useEffect(() => {
    fetchWarehouseList();
  }, []);

  const openModal = (item?: any) => {
    if (item) {
      setEditingId(item.id); // Set for editing
      setName(item.ingredient);
      setQuant(item.quant);
      setIngredientType(item.ingredientType);
      setDate(item.date);
      setId(item.id);
    } else {
      // Default values for new entry
      setDate(new Date().toLocaleString("vi-VN", { hour12: false }));
      setIngredientType("Hạt cà phê");
      const prefix = ingredientTypeMapping["Hạt cà phê"];
      const count = Math.floor(Math.random() * 1000) + 1;
      setId(`${prefix}${count.toString().padStart(3, "0")}`);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null); // Reset editing state
  };

  const handleIngredientTypeChange = (value: string) => {
    setIngredientType(value);
    const prefix = ingredientTypeMapping[value] || "UNK";
    const count = Math.floor(Math.random() * 1000) + 1;
    setId(`${prefix}${count.toString().padStart(3, "0")}`);
  };

  const handleSave = async () => {
    const entry = { name, quant, ingredientType, date, id };
    if (editingId) {
      // Update existing entry
      await WarehouseApi.updateWarehouseEntry(editingId, entry);
    } else {
      // Add new entry
      await WarehouseApi.addWarehouseEntry(entry);
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
          modalAddContent={<Import />}
          modalTitle={"Thêm phiếu nhập kho"}
          addButtonTitle="Thêm phiếu nhập"
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
        onSave={handleSave}
        style={{ width: "50vw", background: "#FFCC99" }}
      >
        <Input label="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Số lượng tồn"
          value={quant}
          type="number"
          onChange={(e) => setQuant(Number(e.target.value))}
        />
        <Select
          label="Loại nguyên liệu"
          options={Object.keys(ingredientTypeMapping).map((key) => ({
            value: key,
            label: key,
          }))}
          value={ingredientType}
          onChange={(e) => handleIngredientTypeChange(e.target.value)}
        />
        <Input label="Ngày tháng" value={date} readOnly />
        <Input label="ID" value={id} readOnly />
      </Modal>
    </div>
  );
}
