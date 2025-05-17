/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const Input = ({
  id,
  label,
  type,
  value,
  updateUser,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  type: string;
  updateUser: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [strValue, setStrValue] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) {
      setStrValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label 
        htmlFor={id} 
        id={id} 
        className="block"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={strValue}
        onChange={handleChange}
        {...updateUser} 
        className="px-3 py-2 input w-full" 
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
