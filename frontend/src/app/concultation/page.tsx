"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Footer from "@/components/footer";
import DoctorCard from "./_components/DoctorCard";
import NavigationBar from "@/components/navbar";

const doctors = [
  {
    id: 1,
    name: "Dr. Andini Prameswari, M.Psi.",
    specialty: "Stres & Kecemasan",
    experience: 10,
    location: "Jakarta, DKI Jakarta",
    schedule: "Senin - Jumat",
    rating: 90,
    totalPatients: 150,
  },
  {
    id: 2,
    name: "Dr. Budi Santoso, Sp.KJ.",
    specialty: "Gangguan Tidur",
    experience: 8,
    location: "Surabaya, Jawa Timur",
    schedule: "Selasa - Sabtu",
    rating: 85,
    totalPatients: 120,
  },
  {
    id: 3,
    name: "Dr. Cindy Halim, M.Psi.",
    specialty: "Depresi & Trauma",
    experience: 12,
    location: "Bandung, Jawa Barat",
    schedule: "Senin - Kamis",
    rating: 95,
    totalPatients: 180,
  },
  {
    id: 4,
    name: "Dr. Daniel Prasetyo, Sp.KJ.",
    specialty: "Gangguan Bipolar",
    experience: 7,
    location: "Yogyakarta, DIY",
    schedule: "Rabu - Minggu",
    rating: 80,
    totalPatients: 98,
  },
  {
    id: 5,
    name: "Dr. Erika Wijaya, M.Psi.",
    specialty: "Psikologi Anak & Remaja",
    experience: 15,
    location: "Denpasar, Bali",
    schedule: "Senin - Jumat",
    rating: 92,
    totalPatients: 200,
  },
  {
    id: 6,
    name: "Dr. Fajar Setiawan, Sp.KJ.",
    specialty: "Gangguan Kecanduan",
    experience: 9,
    location: "Semarang, Jawa Tengah",
    schedule: "Selasa - Sabtu",
    rating: 88,
    totalPatients: 130,
  },
  {
    id: 7,
    name: "Dr. Grace Natalia, M.Psi.",
    specialty: "Psikologi Pernikahan & Keluarga",
    experience: 11,
    location: "Medan, Sumatera Utara",
    schedule: "Senin - Kamis",
    rating: 89,
    totalPatients: 170,
  },
  {
    id: 8,
    name: "Dr. Hendra Kusuma, Sp.KJ.",
    specialty: "Gangguan Makan",
    experience: 6,
    location: "Makassar, Sulawesi Selatan",
    schedule: "Rabu - Minggu",
    rating: 82,
    totalPatients: 110,
  },
];


const ConsultationPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "patients") return b.totalPatients - a.totalPatients;
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#ECEEFF] to-white">
      <NavigationBar />

      <section className="flex flex-col md:flex-row items-center px-4 md:px-10 py-20 md:py-32 gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-bold text-primaryTextColor">
            Konsultasi dengan Ahli yang Tepat untuk{" "}
            <span className="text-primaryColor">Mental Health</span> Anda
          </h2>
          <p className="mt-4 text-gray-700 md:text-lg">
            Mencari dukungan profesional untuk kesehatan mental Anda? Temukan
            psikolog terbaik sesuai kebutuhan Anda dan mulai perjalanan menuju
            kesejahteraan mental yang lebih baik. Konsultasi mudah, aman, dan
            nyaman dari mana saja.
          </p>
          <Link
            href="#"
            className="mt-6 inline-block bg-primaryColor text-white px-6 py-3 rounded-lg hover:bg-primaryColor/90"
          >
            Mulai Konsultasi
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Images/landing_1.png"
            width={450}
            height={600}
            alt="landing_1"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="px-4 md:px-10 py-8 md:py-16">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Set your location"
            className="border p-3 rounded-lg flex-1 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Search Doctor"
            className="border p-3 rounded-lg flex-1 bg-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-3 rounded-lg bg-gray-100"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Highest Rating</option>
            <option value="patients">Most Patients</option>
          </select>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedDoctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((doctor) => (
              <DoctorCard 
                key={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                experience={doctor.experience}
                location={doctor.location}
                schedule={doctor.schedule}
                rating={doctor.rating}
                totalPatients={doctor.totalPatients}
              />
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultationPage;
