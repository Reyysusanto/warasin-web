/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type FormTextareaProps = {
  label: string;
  id: string;
  placeholder: string;
  register: any;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  placeholder,
  register,
  error,
  value,
  onChange,
  rows = 4,
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
        rows={rows}
        {...register}
        defaultValue={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
