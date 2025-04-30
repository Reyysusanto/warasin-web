"use client";

import { useState } from "react";
import { FaCalendarAlt, FaCircle, FaRegCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const times: string[] = [
  "06:30", "07:30", "08:30", "10:00", "11:00", "13:00",
  "14:00", "15:00", "16:00", "18:30", "19:30", "20:30",
];

const CreateConsultation = () => {
  const [selectedMethod, setSelectedMethod] = useState("kunjungan");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [formData, setFormData] = useState({
    patientEmail: "",
    doctorEmail: "",
    location: "",
    date: "",
    time: "",
    method: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor Data:");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md mb-8 p-8 rounded-xl space-y-6 w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add Consultation
        </h2>

        <div>
          <label htmlFor="patientEmail" className="block text-base font-medium text-primaryTextColor mb-1">
            Patient Email
          </label>
          <input
            type="email"
            name="patientEmail"
            id="patientEmail"
            placeholder="Email Pasien"
            value={formData.patientEmail}
            onChange={handleChange}
            className="px-4 py-3 input text-base w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="doctorEmail" className="block text-base font-medium text-primaryTextColor mb-1">
            Doctor Email
          </label>
          <input
            type="email"
            name="doctorEmail"
            id="doctorEmail"
            placeholder="Email Dokter"
            value={formData.doctorEmail}
            onChange={handleChange}
            disabled
            className="px-4 py-3 input text-base w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-base font-medium text-primaryTextColor mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Lokasi Konsultasi"
            value={formData.location}
            onChange={handleChange}
            className="px-4 py-3 input text-base w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-6">
          <label htmlFor="date" className="text-base font-medium text-primaryTextColor">
            Date
          </label>
          <div className="flex items-center justify-between px-3 w-full mb-6 border border-primaryTextColor/10 rounded-md focus:outline-none focus:ring-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md p-3 text-base bg-transparent focus:ring-0 focus:outline-none"
            />
            <FaCalendarAlt className="text-2xl text-primaryTextColor" />
          </div>

          <label htmlFor="time" className="text-base font-medium text-primaryTextColor">
            Time
          </label>
          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                type="button"
                className={`p-3 text-base border rounded-md transition-all ${
                  selectedTime === time
                    ? "text-white bg-primaryTextColor"
                    : "border-primaryTextColor text-primaryTextColor hover:bg-tertiaryTextColor hover:text-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="method" className="block text-base font-medium text-primaryTextColor mb-2">
          Method
        </label>
        <div className="flex w-full gap-4">
          {[
            { key: "kunjungan", label: "Kunjungan Langsung" },
            { key: "online", label: "Konsultasi Online" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg w-full border transition-all ${
                selectedMethod === key
                  ? "border-primaryTextColor bg-primaryTextColor"
                  : "border-primaryTextColor hover:bg-tertiaryTextColor"
              }`}
              onClick={() => setSelectedMethod(key)}
            >
              {selectedMethod === key ? (
                <FaCircle className="text-backgroundSecondaryColor text-2xl" />
              ) : (
                <FaRegCircle className="text-primaryTextColor text-2xl" />
              )}
              <span
                className={`text-base font-semibold ${
                  selectedMethod === key
                    ? "text-secondaryTextColor"
                    : "text-primaryTextColor"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default CreateConsultation;
