const Input = ({
  title,
  type,
  placeHolder,
  icon,
  Addtionalicon = <p></p>
}: {
  title: string;
  type: string;
  placeHolder: string;
  icon: React.ReactNode;
  Addtionalicon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="flex justify-between items-center relative">
        {icon}
        <input
            type={type}
            placeholder={placeHolder}
            className=" py-2 px-8 flex rounded-md border-tertiaryTextColor border"
        />
        {Addtionalicon}
      </div>
    </div>
  );
};

export default Input;
