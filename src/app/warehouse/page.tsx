"use client";

import styles from "./warehouse.module.scss";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "../components/ui/table/table";
import Import from "../components/modal-content/import/import";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../components/ui/modal/modal";
import { Input, Select } from "../components/ui/input/input";
import { useState } from "react";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [name, setName] = useState("");
  const [quant, setQuant] = useState(0);

  const data = [
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
    {
      id: "#20462",
      ingredient: "Hat",
      supplier: "Midori",
      quant: 144,
      date: "13/05/2024 00:00:00",
      ingredientType: "Hạt cà phê",
    },
  ];
  return (
    <div className="">
      <h1 className="title">KHO HÀNG</h1>
      <div className="" style={{ margin: "2em 0" }}>
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
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.ingredient}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.quant}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.ingredientType}</TableCell>
                <TableCell>
                  <div className="" style={{ display: "flex", gap: "1em" }}>
                    <div
                      className=""
                      style={{ color: "#624DE3", cursor: "pointer" }}
                      onClick={() => openModal()}
                    >
                      <FaRegEdit />
                    </div>
                    <div
                      className=""
                      style={{ color: "#A30D11", cursor: "pointer" }}
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
        title="Chỉnh sửa tồn kho"
        isOpen={isModalOpen}
        onClose={closeModal}
        style={{ width: "50vw", background: "#FFCC99" }}
      >
        <Input
          label="Tên sản phẩm"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Số lượng tồn"
          value={quant}
          type="number"
          onChange={(e) => {
            setQuant(parseInt(e.target.value));
          }}
        />
      </Modal>
    </div>
  );
}
