import { useState } from "react";
import { FaCalendarAlt, FaCircle, FaRegCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const times: string[] = [
  "06:30",
  "07:30",
  "08:30",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "18:30",
  "19:30",
  "20:30",
];

const hospitals = [
  {
    id: 1,
    name: "RS DR. Soetomo",
    address:
      "Jl. Prof. DR. Moestopo No.6-8, Airlangga, Kec. Gubeng, Surabaya, Jawa Timur 60286",
  },
  {
    id: 2,
    name: "RS UNAIR",
    address:
      "Jl. Dharmahusada Permai, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115",
  },
];

const KonsulSection = () => {
  const [selectedMethod, setSelectedMethod] = useState("kunjungan");
  const [selectedHospital, setSelectedHospital] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="flex flex-col py-10 px-6 md:px-16 gap-y-14">
      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
          Pilih Jenis Janji Temu
        </h2>
        <div className="flex w-full gap-2">
          {[
            { key: "kunjungan", label: "Kunjungan Langsung" },
            { key: "online", label: "Konsultasi Online" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg w-full border transition-all ${
                selectedMethod === key
                  ? "border-primaryColor bg-primaryColor"
                  : "border-primaryColor hover:border-primaryColor"
              }`}
              onClick={() => setSelectedMethod(key)}
            >
              {selectedMethod === key ? (
                <FaCircle className="text-blue-700 text-4xl md:text-2xl" />
              ) : (
                <FaRegCircle className="text-primaryColor text-4xl md:text-2xl" />
              )}
              <span
                className={`text-lg font-medium ${
                  selectedMethod === key
                    ? "text-secondaryTextColor"
                    : "text-primaryColor"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
          Pilih Klinik
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all border-primaryColor`}
              onClick={() => setSelectedHospital(hospital.id)}
            >
              {selectedHospital === hospital.id ? (
                <FaCircle className="text-blue-600 text-6xl md:text-2xl" />
              ) : (
                <FaRegCircle className="text-primaryColor text-6xl md:text-2xl" />
              )}
              <div className="flex flex-col">
                <h3 className="text-primaryTextColor text-xl font-medium">
                  {hospital.name}
                </h3>
                <p className="text-primaryTextColor text-base">
                  {hospital.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl md:text-3xl text-primaryColor font-semibold">
          Pilih Waktu
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-3 w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md p-3 bg-transparent focus:ring-0 focus:outline-none"
            />
            <FaCalendarAlt className="text-xl text-primaryColor" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 text-lg border rounded-md transition-all ${
                  selectedTime === time
                    ? "bg-primaryColor text-white"
                    : "border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 w-fit bg-primaryColor text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primaryColorDark">
            <FaCalendarAlt /> Pesan Janji Temu
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonsulSection;
