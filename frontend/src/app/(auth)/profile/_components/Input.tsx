const Input = ({id, label, type, isRequired=false}: {id: string, label: string, type: string, isRequired: boolean}) => {

  return (
    <div className="flex flex-col gap-y-2">
      <label
        htmlFor={id}
        id={id}
        className="text-sm md:text-base text-primaryTextColor"
      >
        {label}
      </label>
      <div className="flex flex-col gap-6">
        <input
          type={type}
          name={id}
          id={id}
          required={isRequired}
          className={`flex p-2 items-center bg-transparent justify-between px-3 w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor`}
        />
      </div>
    </div>
  );
};

export default Input;
