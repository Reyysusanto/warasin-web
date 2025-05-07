import { useEffect, useState } from "react";

const Input = ({
  id,
  label,
  type,
  value,
  updateUser,
  isRequired = false,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  type: string;
  updateUser: any;
  error?: string;
  isRequired: boolean;
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
        className="text-sm md:text-base text-primaryTextColor"
      >
        {label}
      </label>
      <div className="flex flex-col">
        <input
          type={type}
          name={id}
          id={id}
          value={strValue}
          {...updateUser}
          onChange={handleChange}
          required={isRequired}
          className="flex p-2 items-center bg-transparent justify-between px-3 w-full mb-1 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
