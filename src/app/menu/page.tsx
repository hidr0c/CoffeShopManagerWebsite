"use client";

import styles from "./menu.module.scss";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "../components/ui/table/table";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import AddDishModal from "@/components/modal-content/add-menu/addMenu";
import { Modal as ModalAnt, message } from "antd";

import { useState } from "react";
import Modal from "@/components/ui/modal/modal";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDishData, setModalDishData] = useState(null);
  const [menuData, setMenuData] = useState([
    {
      id: "#20462",
      name: "Trà sữa trân châu",
      type: "Đồ uống lạnh",
      date: "13/05/2024 00:00:00",
      quant: 144,
    },
    {
      id: "#20463",
      name: "Cà phê sữa đá",
      type: "Đồ uống lạnh",
      date: "14/05/2024 00:00:00",
      quant: 200,
    },
    {
      id: "#20464",
      name: "Nước ép cam",
      type: "Đồ uống lạnh",
      date: "15/05/2024 00:00:00",
      quant: 120,
    },
    {
      id: "#20465",
      name: "Trà đào cam sả",
      type: "Đồ uống lạnh",
      date: "16/05/2024 00:00:00",
      quant: 100,
    },
    {
      id: "#20466",
      name: "Sinh tố bơ",
      type: "Đồ uống lạnh",
      date: "17/05/2024 00:00:00",
      quant: 80,
    },
  ]);

  const openEditModal = (item) => {
    setModalTitle("Chỉnh sửa món");
    setModalDishData(item); // Lưu thông tin món cần chỉnh sửa
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Lọc món bị xóa ra khỏi danh sách menuData
    setMenuData((prevData) => {
      const updatedData = prevData.filter((item) => item.id !== id);
      if (updatedData.length === prevData.length) {
        message.error("Không tìm thấy món để xóa!");
      }
      return updatedData;
    });
  };

  const openDeleteModal = (item) => {
    ModalAnt.confirm({
      title: "Xóa món",
      content: `Bạn có chắc chắn muốn xóa món "${item.name}"?`,
      okText: "Có",
      cancelText: "Không",
      onOk: () => {
        handleDelete(item.id);
        message.success("Món đã được xóa!"); // Moved message.success to here, to avoid duplication
      },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDishData(null);
  };

  return (
    <div className="">
      <div className="" style={{ margin: "2em 0" }}>
        <Table
          style={{ borderRadius: "0px" }}
          preHeader={true}
          pagination={true}
          modalAddContent={<AddDishModal dishData={{}} />}
          modalStyle={{ width: "60vw" }}
          modalTitle={"Thêm món vào thực đơn"}
          addButtonTitle="Thêm món"
        >
          <TableHead style={{ background: "white" }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại đồ uống</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>
                  <div className="" style={{ display: "flex", gap: "1em" }}>
                    <div
                      className=""
                      style={{ color: "#624DE3", cursor: "pointer" }}
                      onClick={() => openEditModal(item)}
                    >
                      <FaRegEdit />
                    </div>
                    <div
                      style={{ color: "#A30D11", cursor: "pointer" }}
                      onClick={() => openDeleteModal(item)}
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
        title={modalTitle}
        action={"Lưu"}
      >
        <AddDishModal dishData={modalDishData} />
      </Modal>
    </div>
  );
}
