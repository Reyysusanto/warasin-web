/* eslint-disable @typescript-eslint/no-explicit-any */
type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ElementType;
  rightIcon?: React.ElementType;
  register: any;
  error?: string;
  onRightIconClick?: () => void;
  isValid?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  rightIcon: RightIcon,
  register,
  error,
  onRightIconClick,
  isValid = false,
}) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 p-2 border border-tertiaryTextColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
          {...register}
        />
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiaryTextColor">
            <Icon />
          </div>
        )}
        {RightIcon && onRightIconClick && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={onRightIconClick}
          >
            <RightIcon />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {isValid && !error && (
        <p className="text-green-500 text-sm">✓ Password cocok</p>
      )}
    </div>
  );
};

export default Input;
