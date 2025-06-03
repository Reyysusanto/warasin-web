import { Practice } from "@/types/master";
import { Calendar, Edit, MapPin, Phone, Trash2 } from "lucide-react";

const PracticeCard = ({
  practice,
  onEdit,
  onDelete,
}: {
  practice: Practice;
  onEdit: (practice: Practice) => void;
  onDelete: (pracId: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                practice.prac_type === "Konsultasi Online"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {practice.prac_type}
            </span>
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">
            {practice.prac_name}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">{practice.prac_address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">{practice.prac_phone_number}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Jadwal Praktik
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {practice.practice_schedule.map((schedule) => (
                <div
                  key={schedule.prac_sched_id}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      {schedule.prac_sched_day}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {schedule.prac_sched_open} - {schedule.prac_sched_close}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={() => onEdit(practice)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(practice.prac_id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;
