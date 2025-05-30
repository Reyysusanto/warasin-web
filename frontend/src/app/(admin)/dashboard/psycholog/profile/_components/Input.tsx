/* eslint-disable @typescript-eslint/no-explicit-any */

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  updateData,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  type?: string;
  updateData: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} id={id} className="block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={value}
        onChange={onChange}
        {...updateData}
        className="px-3 py-2 input w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
