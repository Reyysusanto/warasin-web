/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

interface Gender {
  genderName: string;
  genderType: string;
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default GenderOption;
