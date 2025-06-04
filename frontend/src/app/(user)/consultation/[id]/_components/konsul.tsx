import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCircle, FaRegCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AvailableSlot, Practice } from "@/types/master";
import { useParams } from "next/navigation";
import { getAllPracticeUserService } from "@/services/users/consultation/getAllPractice";
import { getAvailableSlotUserService } from "@/services/users/consultation/getAvailableSlot";
import { CreateConsultation } from "@/types/consultation";
import { createConsultationService } from "@/services/users/consultation/createConsultation";
import { format } from "date-fns";

const KonsulSection = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [method, setMethod] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [practices, setPractices] = useState<Practice[]>([]);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const psyId = params.id as string;

        const practiceResult = await getAllPracticeUserService(psyId);
        if (practiceResult.status === true) {
          setPractices(practiceResult.data);
          if (practiceResult.data.length > 0) {
            setSelectedMethod(practiceResult.data[1].prac_id);
            setSelectedHospital(practiceResult.data[0].prac_id);
          }
        }

        // Fetch available slots
        const slotResult = await getAvailableSlotUserService(psyId);
        if (slotResult.status === true) {
          setSlots(slotResult.data);
        }
      } catch (error) {
        console.log(error);
        setError("Gagal memuat data praktik dan slot waktu");
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!selectedMethod || !selectedHospital || !selectedSlot) {
      setError("Harap lengkapi semua field");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      const consultationData: CreateConsultation = {
        consul_date: formattedDate,
        slot_id: selectedSlot,
        prac_id: selectedHospital,
      };

      const result = await createConsultationService(consultationData);

      if (result.status === true) {
        setSuccess("Janji temu berhasil dibuat!");
        // Reset form after successful submission
        setSelectedSlot("");
      } else {
        setError(result.message || "Gagal membuat janji temu");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat membuat janji temu");
      console.error("Error creating consultation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-10 px-6 md:px-16 gap-y-14">
      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
          Pilih Jenis Janji Temu
        </h2>
        <div className="flex w-full gap-2">
          {practices.map((practice) => (
            <div
              key={practice.prac_id}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg w-full border transition-all ${
                selectedMethod === practice.prac_id
                  ? "border-primaryColor bg-primaryColor"
                  : "border-primaryColor hover:border-primaryColor"
              }`}
              onClick={() => {
                setMethod(practice.prac_type);
                setSelectedMethod(practice.prac_id);
                setSelectedHospital(practice.prac_id);
              }}
            >
              {selectedMethod === practice.prac_id ? (
                <FaCircle className="text-blue-700 text-4xl md:text-2xl" />
              ) : (
                <FaRegCircle className="text-primaryColor text-4xl md:text-2xl" />
              )}
              <span
                className={`text-lg font-medium ${
                  selectedMethod === practice.prac_id
                    ? "text-secondaryTextColor"
                    : "text-primaryColor"
                }`}
              >
                {practice.prac_type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {method !== "Konsultasi Online" && (
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
            Pilih Klinik
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {practices.map((practice) => (
              <div
                key={practice.prac_id}
                className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${
                  selectedHospital === practice.prac_id ? "bg-blue-50" : ""
                } border-primaryColor`}
                onClick={() => setSelectedHospital(practice.prac_id)}
              >
                {selectedHospital === practice.prac_id ? (
                  <FaCircle className="text-blue-600 text-2xl md:text-2xl" />
                ) : (
                  <FaRegCircle className="text-primaryColor text-2xl md:text-2xl" />
                )}
                <div className="flex flex-col">
                  <h3 className="text-primaryTextColor text-xl font-medium">
                    {practice.prac_name}
                  </h3>
                  <p className="text-primaryTextColor text-base">
                    {practice.prac_address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
          Pilih Waktu
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-3 w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                  setSelectedSlot("");
                }
              }}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md p-3 bg-transparent focus:ring-0 focus:outline-none"
            />
            <FaCalendarAlt className="text-xl text-primaryColor" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            {slots.map((slot) => (
              <button
                key={slot.slot_id}
                disabled={slot.slot_is_booked}
                onClick={() => setSelectedSlot(slot.slot_id)}
                className={`p-3 text-lg border rounded-md transition-all ${
                  slot.slot_is_booked && "disabled:bg-gray-400"
                } ${
                  selectedSlot === slot.slot_id
                    ? `bg-primaryColor text-white`
                    : `border-primaryColor text-primaryColor hover:bg-primaryColor ${
                        slot.slot_is_booked && "disabled:text-white font-medium"
                      } hover:text-white`
                }`}
              >
                {slot.slot_start}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded-md">{error}</div>
          )}

          {success && (
            <div className="text-green-500 bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || !selectedSlot}
            className="flex items-center gap-2 w-fit bg-primaryColor text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primaryColorDark disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "Memproses..."
            ) : (
              <>
                <FaCalendarAlt />
                <p>Booking Sekarang</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonsulSection;
