import { FaAngleDown } from "react-icons/fa";

interface options {
    optionId: string,
    optionName: string
}

const Options = ({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: options[];
}) => {
  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-sm md:text-base text-primaryTextColor">{label}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
          <select 
          name={id} 
          id={id}
          className="appearance-none w-full rounded-md p-2 bg-transparent focus:ring-2 focus:ring-primaryColor"
          >
            {options.map((option) => (
                <option 
                key={option.optionId} 
                value={option.optionId}
                className="w-full rounded-md p-3 bg-transparent focus:ring-0 focus:outline-none"
                >
                    {option.optionName}
                </option>
            ))}
          </select>
          <FaAngleDown className="text-xl pr-2 text-primaryTextColor" />
        </div>
      </div>
    </div>
  );
};

export default Options;
