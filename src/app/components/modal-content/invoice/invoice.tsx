"use client";

import { useState, useEffect } from "react";
import { Input, Select } from "@ui/input/input";
import { Button } from "@ui/button/button";

export default function InvoiceForm({ invoice, onClose }: any) {
  // Initialize state with prop values, if available
  const [id, setId] = useState(invoice?.id || "");
  const [status, setStatus] = useState(invoice?.status || "Chưa thanh toán");
  const [customer, setCustomer] = useState(invoice?.customer || "");
  const [customerType, setCustomerType] = useState(
    invoice?.customerType || "Mới"
  );
  const [category, setCategory] = useState(invoice?.category || "");
  const [date, setDate] = useState(invoice?.date || "");
  const [quant, setQuant] = useState(invoice?.quant || 0);

  // Update state if invoice prop changes
  useEffect(() => {
    if (invoice) {
      setId(invoice.id);
      setStatus(invoice.status);
      setCustomer(invoice.customer);
      setCustomerType(invoice.customerType);
      setCategory(invoice.category);
      setDate(invoice.date);
      setQuant(invoice.quant);
    }
  }, [invoice]);

  const handleSelect = (value: string, field: string) => {
    switch (field) {
      case "status":
        setStatus(value);
        break;
      case "customerType":
        setCustomerType(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      id,
      status,
      customer,
      customerType,
      category,
      date,
      quant,
    });

    onClose(); // Close the modal after submitting
  };

  return (
    <div className="invoice-form" style={{ margin: "0 0 2em 0" }}>
      <Input
        label="ID Hóa đơn"
        value={id}
        onChange={(e) => setId(e.target.value)} // Update id state
      />
      <Select
        label="Trạng thái"
        value={status}
        options={[
          { value: "Đã thanh toán", label: "Đã thanh toán" },
          { value: "Chưa thanh toán", label: "Chưa thanh toán" },
        ]}
        onChange={(e) => handleSelect(e.target.value, "status")} // Update status state
      />
      <Input
        label="Khách hàng"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)} // Update customer state
      />
      <Select
        label="Loại khách"
        value={customerType}
        options={[
          { value: "Mới", label: "Mới" },
          { value: "Cũ", label: "Cũ" },
        ]}
        onChange={(e) => handleSelect(e.target.value, "customerType")} // Update customerType state
      />
      <Input
        label="Danh mục sản phẩm"
        value={category}
        onChange={(e) => setCategory(e.target.value)} // Update category state
      />
      <Input
        label="Ngày tạo"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} // Update date state
      />
      <Input
        label="Số lượng sản phẩm"
        type="number"
        value={quant}
        onChange={(e) => setQuant(Number(e.target.value))} // Update quant state
      />
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} style={{ backgroundColor: "#ccc" }}>
          Hủy
        </Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </div> */}
    </div>
  );
}
