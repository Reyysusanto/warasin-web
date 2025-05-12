import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";

type BirthDateProps = {
  id: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
};

const BirthDate = ({ id, selected, onChange }: BirthDateProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-sm md:text-base text-primaryTextColor">
        Tanggal Lahir
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-3 w-full border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
          <DatePicker
            id={id}
            selected={selected}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className="w-full rounded-md p-2 bg-transparent focus:ring-0 focus:outline-none"
          />
          <FaCalendarAlt className="text-xl text-primaryTextColor" />
        </div>
      </div>
    </div>
  );
};

export default BirthDate;
