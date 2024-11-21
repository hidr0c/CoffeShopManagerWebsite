"use client";

import { useState, useEffect } from "react";
import styles from "./warehouse.module.scss";
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import Import from "@components/modal-content/import/import";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "@components/ui/modal/modal";
import WarehouseApi from "../../services/warehouse";
import SupplierApi, { ISupplier } from "../../services/supplier"; // Add this import
import { IWarehouse, IWarehouseItem } from "@services/warehouse";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IWarehouse[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [formData, setFormData] = useState<IWarehouse | null>(null);
  const [suppliers, setSuppliers] = useState<{ value: string, label: string }[]>([]); // Add this state

  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setLimit] = useState<number>(10);


  // Fetch warehouse data with pagination
  const fetchWarehouseList = async (page: number = 1, limit: number = 10) => {
    const response = await WarehouseApi.getWarehouseList({ limit: currentLimit, page });
    console.log(response);
    if (response && response.imports) {
      console.log(response.imports);
      setData(response.imports);
    }
    if (response && response.pagination) {
      setTotalPages(response.pagination.pages);
    }
  };

  // Fetch supplier data
  const fetchSupplierList = async () => {
    const response = await SupplierApi.getAllSuppliers();
    if (response && response.suppliers) {
      setSuppliers(response.suppliers.map((supplier: ISupplier) => ({ value: supplier.name, label: supplier.name })));
    }
  };

  useEffect(() => {
    fetchSupplierList();
    fetchWarehouseList(currentPage);
  }, [currentPage]);

  const openModal = (item?: IWarehouse) => {
    if (item) {
      setEditingId(item._id || "");
      setFormData(item);
    } else {
      setFormData({
        supplierName: suppliers[0]?.value || "",
        phoneNumber: "",
        importDate: "",
        values: []
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
      await WarehouseApi.updateWarehouseEntry(editingId, formData);
    } else {
      await WarehouseApi.addWarehouseEntry(formData);
    }
    fetchWarehouseList(currentPage);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await WarehouseApi.deleteWarehouseEntry(id);
    fetchWarehouseList(currentPage);
  };

  return (
    <div className="warehouse-container">
      <h1 className="title">KHO HÀNG</h1>
      <div className="table-container" style={{ margin: "2em 0" }}>
        <Table
          style={{ borderRadius: "0px" }}
          preHeader={true}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => {
              setCurrentPage(page);
              fetchWarehouseList(page);
            },
            onLimitChange: (limit) => {
              setLimit(limit);
              fetchWarehouseList(currentPage, limit);
            }
          }}
          addButtonTitle="Thêm phiếu nhập"
          addButtonAction={() => openModal()}
        >
          <TableHead style={{ background: "white" }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Tổng số hàng</TableCell>
              <TableCell>Tổng số tiền</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.supplierName}</TableCell>
                <TableCell>{item.importDate}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.values.reduce((total, value) => total + value.quant, 0)}</TableCell>
                <TableCell>{item.values.reduce((total, value) => total + value.price * value.quant, 0)}</TableCell>
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
        style={{ maxHeight: "90vh" }}
        title={editingId ? "Chỉnh sửa kho hàng" : "Thêm mới kho hàng"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      >
        <Import
          warehouse={formData}
          suppliers={suppliers}
          onChange={(field, value) => {
            console.log(formData);
            setFormData(prev => ({ ...prev, [field]: value }));
          }}
        />
      </Modal>
    </div>
  );
}
