"use client";

import { ICustomer } from "@/services/customer";
import { Input, Select } from "@ui/input/input";
import { ChangeEvent } from "react";

interface CustomerFormProps {
  customer: ICustomer;
  isEdit?: boolean;
  onChange: (field: string, value: string) => void;
}

export default function CustomerForm({ customer, onChange, isEdit = false }: CustomerFormProps) {
  return (
    <div>
      <Input
        readOnly={!isEdit}
        label="Tên khách hàng"
        value={customer.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("name", e.target.value)
        }
      />
      <Input
        readOnly={!isEdit}
        label="Ngày sinh"
        type="date"
        value={customer.birthDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("birthDate", e.target.value)
        }
      />
      <Select
        readOnly={!isEdit}
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
        readOnly={!isEdit}
        label="Địa chỉ"
        value={customer.address}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("address", e.target.value)
        }
      />
      <Input
        readOnly={!isEdit}
        label="SĐT"
        value={customer.phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("phoneNumber", e.target.value)
        }
      />
      <Input
        readOnly={!isEdit}
        label="Email"
        value={customer.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange("email", e.target.value)
        }
      />
    </div>
  );
}
