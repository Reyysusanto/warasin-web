import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  updateMotivation: UseFormRegisterReturn;
  error?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  placeholder,
  updateMotivation,
  error,
  type = "text",
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
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...updateMotivation}
        defaultValue={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
