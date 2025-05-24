/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

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
    <div>
      <label className="block">{label}</label>
      <select
        name={id}
        id={id}
        value={strValue}
        {...updateUser}
        onChange={handleChange}
        className="px-3 py-2 input w-full"
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((option) => (
          <option key={option.optionId} value={option.optionId}>
            {option.optionName}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Options;
