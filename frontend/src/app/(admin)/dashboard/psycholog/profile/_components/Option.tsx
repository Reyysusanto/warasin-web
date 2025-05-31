import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

type FormSelectProps = {
  label: string;
  id: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  value?: string;
  onChange?: (id: string, value: string) => void;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
  register,
  error,
  placeholder = "-- Pilih --",
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...register}
        value={value}
        onChange={(e) => {
          register.onChange(e);
          onChange?.(id, e.target.value);
        }}
        disabled={true}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
