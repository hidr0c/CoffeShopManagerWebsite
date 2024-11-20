// components/Input.tsx

"use client";

import React from 'react';
import styles from './input.module.scss';

export interface InputProps {
  label?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: any;
  labelStyle?: any;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  style,
  labelStyle,
  required,
  readOnly, // Thêm readOnly vào destructuring
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setInputValue(e.target.value);
      onChange(e);
    }
  };

  return (
    <div className={styles.inputContainer} style={style}>
      {label && (
        <label className={styles.label} style={labelStyle}>
          {label}
          <span style={{ color: '#CF0000', marginLeft: '0.5em' }}>
            {required ? '(*)' : ''}
          </span>
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
        readOnly={readOnly} // Truyền thuộc tính readOnly vào đây
      />
    </div>
  );
};



interface SelectProps {
  label?: string;
  value: string;
  style?: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, value, style, onChange, options }) => {
  return (
    <div className={styles.inputContainer} style={style}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
