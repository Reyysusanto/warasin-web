/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Gender {
  genderName: string;
  genderType: string; // "true" | "false"
}

const genderList: Gender[] = [
  {
    genderName: "Laki-laki",
    genderType: "false",
  },
  {
    genderName: "Perempuan",
    genderType: "true",
  },
];

const GenderOption = ({
  id,
  label,
  value,
  updateUser,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value?: boolean;
  updateUser: any;
  error?: string;
  onChange: (id: string, value: string) => void;
}) => {
  const [strValue, setStrValue] = useState<string>("");

  useEffect(() => {
    if (typeof value === "boolean") {
      setStrValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setStrValue(selectedValue);
    onChange(id, selectedValue);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-sm md:text-base text-primaryTextColor">{label}</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full border border-primaryColor rounded-md">
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
            {genderList.map((gender) => (
              <option
                key={gender.genderName}
                value={gender.genderType}
                className="w-full rounded-md p-3"
              >
                {gender.genderName}
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

export default GenderOption;
