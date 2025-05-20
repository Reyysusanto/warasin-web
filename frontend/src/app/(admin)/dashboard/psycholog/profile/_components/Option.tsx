/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface options {
  optionId: string;
  optionName: string;
}

const Options = ({
  id,
  label,
  value,
  options,
  updateUser,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  updateUser: any;
  options: options[];
  error?: string;
  onChange: (id: string, value: string) => void;
}) => {
  const [strValue, setStrValue] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) {
      setStrValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStrValue(e.target.value);
    onChange(id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-sm md:text-base text-primaryTextColor">{label}</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full mb-1 border border-primaryColor rounded-md">
          <select
            name={id}
            id={id}
            value={strValue}
            {...updateUser}
            onChange={handleChange}
            className="appearance-none w-full rounded-md p-2 bg-transparent focus:ring-2 focus:ring-primaryColor"
          >
            <option value="" disabled>
              Pilih {label}
            </option>
            {options.map((option) => (
              <option
                key={option.optionId}
                value={option.optionId}
                className="w-full rounded-md p-3"
              >
                {option.optionName}
              </option>
            ))}
          </select>
          <FaAngleDown className="text-xl pr-2 text-primaryTextColor" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Options;
