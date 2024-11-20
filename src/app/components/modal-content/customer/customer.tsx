"use client";

import { ICustomer } from "@/services/customer";
import { Input, Select } from "@ui/input/input";
import { ChangeEvent } from "react";

interface CustomerFormProps {
  customer: ICustomer;
  onChange: (field: string, value: string) => void;
}

export default function CustomerForm({ customer, onChange }: CustomerFormProps) {
  return (
    <div>
      <Input
        label="Tên khách hàng"
        value={customer.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("name", e.target.value)
        }
      />
      <Input
        label="Ngày sinh"
        type="date"
        value={customer.birthDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("birthDate", e.target.value)
        }
      />
      <Select
        label="Giới tính"
        value={customer.sex}
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
        value={customer.address}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("address", e.target.value)
        }
      />
      <Input
        label="SĐT"
        value={customer.phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("phoneNumber", e.target.value)
        }
      />
      <Input
        label="Email"
        value={customer.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("email", e.target.value)
        }
      />
    </div>
  );
}
