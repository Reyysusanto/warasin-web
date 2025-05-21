import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface BooleanOptionType {
  label: string;
  value: boolean;
}

const BooleanOption = ({
  id,
  label,
  value,
  error,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value?: boolean | null;
  options: BooleanOptionType[];
  error?: string;
  onChange: (id: string, value: boolean) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    String(value) ?? ""
  );

  useEffect(() => {
    if (typeof value === "boolean") {
      setSelectedValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);

    if (newValue === "true" || newValue === "false") {
      const boolValue = newValue === "true";
      onChange(id, boolValue);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <label
        htmlFor={id}
        className="text-sm md:text-base text-primaryTextColor"
      >
        {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full border border-primaryColor rounded-md">
          <select
            name={id}
            id={id}
            value={selectedValue}
            onChange={handleChange}
            className="appearance-none w-full rounded-md p-2 bg-transparent focus:ring-2 focus:ring-primaryColor"
          >
            <option value="" disabled>
              Pilih {label}
            </option>
            {options.map((option) => (
              <option
                key={option.label}
                value={option.value.toString()}
                className="w-full rounded-md p-3"
              >
                {option.label}
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

export default BooleanOption;
