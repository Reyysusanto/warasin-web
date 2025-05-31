import { FieldError } from "react-hook-form";

const EducationForm = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  type?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md shadow-sm text-primaryTextColor"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default EducationForm;
