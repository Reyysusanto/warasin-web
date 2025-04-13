"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./_components/Input";
import Options from "./_components/Option";
import HistoryConsultation from "./_components/historyConsultation";

const options = [
  {
    key: "personal",
    label: "Personal",
  },
  {
    key: "history",
    label: "Consultation History",
  },
];

const genderOptions = [
  { optionId: "male", optionName: "Laki-laki" },
  { optionId: "female", optionName: "Perempuan" },
  { optionId: "other", optionName: "Lainnya" },
];

const provinceOptions = [
  { optionId: "jatim", optionName: "Jawa Timur" },
  { optionId: "jakarta", optionName: "Jakarta" },
  { optionId: "other", optionName: "Lainnya" },
];

const cityOptions = [
  { optionId: "lumajang", optionName: "Lumajang" },
  { optionId: "lamongan", optionName: "Lamongan" },
  { optionId: "other", optionName: "Lainnya" },
];

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("personal");

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />

      <main className="flex flex-col items-center px-16 py-20 md:py-0 gap-20">
        <div className="flex flex-col md:w-1/2 items-center gap-6">
          <Image
            src={"/Images/FAQ.png"}
            height={250}
            width={250}
            alt="Profile"
            className="rounded-full object-cover size-60"
          />
          <div>
            <h3 className="text-primaryTextColor font-bold text-xl">
              Andre Kessler
            </h3>
            <p className="text-primaryTextColor text-sm">George31@gmail.com</p>
          </div>
        </div>

        <section className="flex flex-col w-full gap-10">
          <div className="flex w-full md:w-1/2 justify-between border-b-2">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedTab(option.key)}
                className={`w-1/2 py-2 text-lg font-semibold ${
                  selectedTab === option.key
                    ? "text-primaryColor border-b-4 border-primaryColor"
                    : "text-tertiaryTextColor hover:text-primaryColor text-lg"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {selectedTab == "personal" && (
            <form action="">
              <div className="grid grid-cols-2 gap-x-5">
                <Input
                  id="name"
                  label="Nama Lengkap"
                  type="text"
                  isRequired={true}
                />
                <Input
                  id="phone"
                  label="Nomor Handphone"
                  type="number"
                  isRequired={true}
                />
                <div className="flex flex-col gap-y-3">
                  <h3 className="text-sm md:text-base text-primaryTextColor">
                    Tanggal Lahir
                  </h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between px-3 w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full rounded-md p-2 bg-transparent focus:ring-0 focus:outline-none"
                      />
                      <FaCalendarAlt className="text-xl text-primaryTextColor" />
                    </div>
                  </div>
                </div>
                <Options id="gender" label="Gender" options={genderOptions} />
                <Options
                  id="province"
                  label="Provinsi"
                  options={provinceOptions}
                />
                <Options id="city" label="Kota" options={cityOptions} />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  isRequired={false}
                />
              </div>

              <button className="flex items-center gap-2 w-fit bg-primaryColor text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-primaryColorDark">
                Simpan Perubahan
              </button>
            </form>
          )}

          {selectedTab !== "personal" && (
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
              <HistoryConsultation />
              <HistoryConsultation />
              <HistoryConsultation />
            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
