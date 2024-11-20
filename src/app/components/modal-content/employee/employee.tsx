"use client";

import { IEmployee } from "@/services/employee";
import { Input, Select } from "@ui/input/input";
import { ChangeEvent } from "react";


interface EmployeeFormProps {
  employee: IEmployee;
  onChange: (field: string, value: string) => void;
}

export default function EmployeeForm(
  {
    employee,
    onChange
  }: EmployeeFormProps) {
  return (
    <div>
      <Input
        label="Tên nhân viên"
        value={employee.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("name", e.target.value)
        }
      />
      <Input
        label="Ngày sinh"
        value={employee.birthDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("birthDate", e.target.value)
        }
      />
      <Select
        label="Giới tính"
        value={employee.sex}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          onChange("sex", e.target.value)
        }
        }
        options={[
          { label: "Nam", value: "Nam" },
          { label: "Nữ", value: "Nữ" },
        ]}
      />
      <Input
        label="Địa chỉ"
        value={employee.address}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("address", e.target.value)
        }
      />
      <Input
        label="SĐT"
        value={employee.phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("phoneNumber", e.target.value)
        }
      />
      <Input
        label="Email"
        value={employee.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("email", e.target.value)
        }
      />
      <Input
        label="Mật khẩu"
        value={employee.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("password", e.target.value)
        }
      />
      <Select
        label="Chức vụ"
        value={employee.role}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChange("role", e.target.value)
        }
        options={[
          { label: "Nhân viên", value: "Employee" },
          { label: "Kế toán", value: "Accounting" },
          { label: "Quản lý kho", value: "WarehouseManager" },
          { label: "Quản lý nhân viên", value: "EmployeeManager" },
          { label: "Admin", value: "Admin" },
        ]}
      />
    </div>
  );
}
