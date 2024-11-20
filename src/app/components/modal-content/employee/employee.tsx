"use client";

import { Input, Select } from "@ui/input/input";
import { ChangeEvent } from "react";

export default function EmployeeForm({
  employee,
  onChange,
}: {
  employee: { name: string; birthDate: string; sex: string; address: string; phone: string };
  onChange: (field: string, value: string) => void;
}) {
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChange("sex", e.target.value)
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
        value={employee.phone}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("phone", e.target.value)
        }
      />
    </div>
  );
}
