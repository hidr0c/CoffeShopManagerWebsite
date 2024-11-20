"use client";

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@ui/table/table";
import { Input, Select } from "@ui/input/input";
import { Button } from "@ui/button/button";
import { useState, useEffect } from "react";

export default function EmployeeForm({ employee }: any) {
  // Initialize state with prop values, if available
  const [name, setName] = useState(employee?.name || "");
  const [dob, setDob] = useState(employee?.dob || "");
  const [gender, setGender] = useState(employee?.gender || "Nam");
  const [address, setAddress] = useState(employee?.address || "");
  const [phone, setPhone] = useState(employee?.phone || "");

  useEffect(() => {
    // If employee data changes, update the form state
    if (employee) {
      setName(employee.name);
      setDob(employee.dob);
      setGender(employee.gender);
      setAddress(employee.address);
      setPhone(employee.phone);
    }
  }, [employee]); // Run this effect when the `employee` prop changes

  const handleSelect = (value) => {
    setGender(value);
  };

  return (
    <div className="" style={{ margin: "0 0 2em 0" }}>
      <Input
        label="Tên nhân viên"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update name state
      />
      <Input
        label="Ngày sinh"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)} // Update date of birth state
      />
      <Select
        label="Giới tính"
        value={gender}
        options={[
          { value: "Nam", label: "Nam" },
          { value: "Nữ", label: "Nữ" },
        ]}
        onChange={(e) => handleSelect(e.target.value)} // Update gender state
      />
      <Input
        label="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)} // Update address state
      />
      <Input
        label="SĐT"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Update phone state
      />
    </div>
  );
}
