import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormTextareaProps = {
  label: string;
  id: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  rows?: number;
};

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  placeholder = "",
  register,
  error,
  rows = 5,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        {...register}
        rows={rows}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormTextarea;
