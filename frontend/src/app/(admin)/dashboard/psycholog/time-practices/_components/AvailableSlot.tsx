import { AvailableSlot } from "@/types/master";
import { Clock } from "lucide-react";

const TimeSlotCard = ({slot}: {slot: AvailableSlot}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {slot.slot_start} - {slot.slot_end}
            </h3>
            <p className="text-gray-500 text-sm">Time Slot</p>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              slot.slot_is_booked
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {slot.slot_is_booked ? "Tidak Tersedia" : "Tersedia"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotCard;
