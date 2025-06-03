"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import Roadmap from "./_components/education";
import KonsulSection from "./_components/konsul";

const profile = {
  name: "Dr. Nadira Pratama, M.Psi., Psikolog",
  str: "1234567890",
  spesialis: "Psikologi Klinis",
  pendidikan: "S2 Psikologi Klinis – Universitas Indonesia",
  experience: 7,
  language: "Bahasa Indonesia, Inggris",
  desc: "Dengan pengalaman lebih dari 7 tahun sebagai psikolog klinis, saya telah membantu banyak individu mengatasi kecemasan, stres, dan berbagai tantangan emosional. Saya percaya bahwa setiap orang memiliki kekuatan untuk bangkit, dan melalui terapi kognitif-perilaku, saya berupaya membimbing klien memahami pola pikir serta emosi mereka. Pendekatan saya bersifat empatik dan berbasis solusi, sehingga setiap sesi menjadi ruang aman bagi klien untuk bertumbuh dan menemukan keseimbangan dalam hidupnya.",
};

const specials = [
    "Manajemen Kecemasan & Stres", 
    "Gangguan Emosional",
    "Terapi Kognitif-Perilaku",
    "Kesehatan Mental Kerja",
    "Peningkatan Kesejahteraan Psikologis",
];


const DetailPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("info");

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />

      <main className="flex flex-col items-center px-16 py-32 md:py-0 gap-20">
        <div className="flex flex-col min-h-screen items-center justify-center md:flex-row w-fit gap-10 md:mx-20">
          <Image
            src={"/Images/FAQ.png"}
            width={200}
            height={200}
            alt="Doctor"
            className="w-full md:w-1/2 rounded-md"
          />
          <div className="flex flex-col w-full gap-4">
            <h2 className="text-primaryColor text-4xl font-medium">
              {profile.name}
            </h2>
            <div>
              <p className="text-base text-primaryTextColor font-regular">
                Nomor STR: {profile.str}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                Spesialis: {profile.spesialis}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                Pendidikan: {profile.pendidikan}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                {profile.experience} tahun pengalaman - {profile.language}
              </p>
            </div>
            <p className="text-base text-primaryTextColor font-regular">
              {profile.desc}
            </p>
          </div>
        </div>

        <section className="flex flex-col w-full">
          <div className="flex w-full justify-between border-b-2">
            {["info", "konsul"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-1/2 py-2 text-lg font-semibold ${
                  selectedTab === tab
                    ? "text-primaryColor border-b-4 border-primaryColor"
                    : "text-tertiaryTextColor hover:text-primaryColor text-lg"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {selectedTab === "info" && (
            <div className="flex flex-col py-6 gap-y-14">
              <div className="flex flex-col gap-y-4">
                <h2 className="text-2xl md:text-4xl text-primaryColor font-semibold">
                  Lokasi
                </h2>
                <div className="flex flex-col gap-2">
                  <Image
                    src={"/Images/hospital.png"}
                    width={200}
                    height={200}
                    alt="Hospital"
                    className="w-full md:w-1/2 rounded-md"
                  />
                  <h3 className="text-primaryTextColor font-medium text-2xl">
                    Klinik Mental, RSUD DR. Soetomo
                  </h3>
                  <p className="text-primaryTextColor font-normal text-sm md:text-lg">
                    Surabaya, Jawa Timur
                  </p>
                  <p className="text-primaryTextColor text-sm">
                    <span className="text-primaryColor font-medium text-lg">
                      Buka Sekarang
                    </span>{" "}
                    Hari ini: 7 AM - 7 PM
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-y-6">
                <h2 className="text-2xl md:text-4xl text-primaryColor font-semibold">
                  Profil
                </h2>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primaryTextColor font-medium text-xl">
                    Biografi
                  </h4>
                  <p className="text-primaryTextColor font-normal text-sm md:text-lg">
                  Dengan pengalaman lebih dari 7 tahun sebagai psikolog klinis, saya telah membantu banyak individu mengatasi kecemasan, stres, dan berbagai tantangan emosional. Saya percaya bahwa setiap orang memiliki kekuatan untuk bangkit, dan melalui terapi kognitif-perilaku, saya berupaya membimbing klien memahami pola pikir serta emosi mereka. Pendekatan saya bersifat empatik dan berbasis solusi, sehingga setiap sesi menjadi ruang aman bagi klien untuk bertumbuh dan menemukan keseimbangan dalam hidupnya.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primaryTextColor font-medium text-xl">
                    Spesialisasi
                  </h4>
                  {specials.map((special) => (
                    <div
                        className="flex items-center gap-3"
                        key={special}
                    >
                        <AiOutlineMedicineBox 
                        className="text-xl"
                        />
                        <p className="text-primaryTextColor text-base">{special}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primaryTextColor font-medium text-xl">
                    Pendidikan
                  </h4>
                  <Roadmap />
                </div>
              </div>
            </div>
          )}

          {selectedTab !== "info" && (
            <KonsulSection />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailPage;
