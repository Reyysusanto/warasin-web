"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
// import { FaMapMarkerAlt, FaSearch, FaThumbsUp } from "react-icons/fa";
import Footer from "@/components/footer";
import { FaThumbsUp } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Andini Prameswari, M.Psi.",
    specialty: "Stres & Kecemasan",
    experience: "10 Tahun pengalaman di bidang ini",
    location: "Lamongan, Jawa Timur",
    schedule: "Senin - Jumat",
    rating: 80,
    totalPatients: 93,
  },
  {
    id: 2,
    name: "Dr. Andini Prameswari, M.Psi.",
    specialty: "Stres & Kecemasan",
    experience: "10 Tahun pengalaman di bidang ini",
    location: "Lumajang, Jawa Timur",
    schedule: "Senin - Jumat",
    rating: 80,
    totalPatients: 93,
  },
  {
    id: 3,
    name: "Dr. Andini Prameswari, M.Psi.",
    specialty: "Stres & Kecemasan",
    experience: "10 Tahun pengalaman di bidang ini",
    location: "Lamongan, Jawa Timur",
    schedule: "Senin - Jumat",
    rating: 80,
    totalPatients: 93,
  },
];

const ConsultationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "patients") return b.totalPatients - a.totalPatients;
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#ECEEFF] to-white">
      <nav className="flex flex-wrap items-center justify-between p-4 md:px-10">
        <div className="flex items-center gap-4">
          <Image src="/Images/logo.png" width={50} height={50} alt="Logo" />
          <div>
            <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
            <p className="text-gray-600 text-sm">
              Mental Health and Recovery Center
            </p>
          </div>
        </div>

        <button
          className="md:hidden text-primaryTextColor focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        <div
          className={`$ {isOpen ? "block" : "hidden"} md:flex w-full md:w-auto mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row gap-4 text-primaryTextColor font-normal text-base">
            <Link href="/" className="hover:text-primaryColor">
              Home
            </Link>
            <Link href="#" className="hover:text-primaryColor">
              About
            </Link>
            <Link href="#" className="hover:text-primaryColor">
              Services
            </Link>
            <Link href="#" className="hover:text-primaryColor">
              Our Team
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center px-4 md:px-10 py-8 md:py-16 gap-10">
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
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4"
              >
                <Image
                  src="/Images/Landing_1.png"
                  width={80}
                  height={80}
                  alt="Doctor"
                  className="rounded-full border"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-blue-900">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">Spesialis: {doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.experience}</p>
                  <p className="text-gray-800 font-semibold">
                    {doctor.location}
                  </p>
                  <p className="text-gray-600">Praktek: {doctor.schedule}</p>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm flex items-center">
                      <FaThumbsUp className="mr-1" /> {doctor.rating}%
                    </span>
                    <span className="text-gray-600 text-sm">
                      {doctor.totalPatients} Total Pasien
                    </span>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600">
                  Jadwalkan Bertemu
                </button>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultationPage;
