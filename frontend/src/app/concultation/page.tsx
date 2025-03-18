"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMapMarkerAlt, FaSearch, FaThumbsUp } from "react-icons/fa";
import Footer from "@/components/footer";

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

const ConctultationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "patients") return b.totalPatients - a.totalPatients;
    return 0;
  });

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white">
      <nav className="flex flex-col md:flex-row px-6 md:px-10 pt-4 pb-2 justify-between items-center relative">
        <div className="flex items-center w-full justify-between md:justify-start">
          <div className="flex gap-4 items-center">
            <Image src={"/Images/logo.png"} width={60} height={60} alt="Logo" />
            <div className="flex flex-col">
              <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
              <p className="text-tertiaryTextColor text-sm font-semibold">
                Mental Health and Recovery Center
              </p>
            </div>
          </div>

          <button
            className="md:hidden text-primaryTextColor focus:outline-none transition-transform duration-200 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 md:gap-10 text-primaryTextColor font-normal text-base mt-4 md:mt-0 w-full md:bg-transparent z-10`}
        >
          <Link
            className="text-primaryColor underline font-semibold hover:text-primaryColor/80 transition-colors duration-200"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:text-primaryColor transition-colors duration-200"
            href={""}
          >
            About
          </Link>
          <Link
            className="hover:text-primaryColor transition-colors duration-200"
            href={""}
          >
            Services
          </Link>
          <Link
            className="hover:text-primaryColor transition-colors duration-200"
            href={""}
          >
            Our Team
          </Link>
        </div>

        {/* <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex gap-x-3 mt-4 md:mt-0 w-full md:w-auto`}
        >
          <Link
            href={"/login"}
            className="pointer rounded-lg bg-primaryColor text-backgroundPrimaryColor px-6 md:px-10 py-2 w-full md:w-auto text-center hover:bg-primaryColor/90 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="pointer rounded-lg bg-transparent text-primaryColor border-primaryColor px-6 md:px-10 py-2 border-2 w-full md:w-auto text-center hover:bg-primaryColor/10 transition-colors duration-200"
          >
            Register
          </Link>
        </div> */}
      </nav>

      <section className="flex px-4 md:px-10 py-8 md:py-16 flex-col md:flex-row items-center md:items-start gap-10">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-primaryTextColor font-bold text-2xl md:text-5xl">
              Konsultasi dengan Ahli yang Tepat untuk{" "}
              <span className="text-primaryColor">Mental Health</span> Anda
            </h2>
            <p className="text-primaryTextColor text-base md:text-xl mt-2">
              Mencari dukungan profesional untuk kesehatan mental Anda? Temukan
              psikolog terbaik sesuai kebutuhan Anda dan mulai perjalanan menuju
              kesejahteraan mental yang lebih baik. Konsultasi mudah, aman, dan
              nyaman dari mana saja.
            </p>
          </div>
          <Link
            href={"#"}
            className="bg-primaryColor flex items-center w-fit px-4 py-2 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
          >
            Mulai Konsultasi
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={"/Images/landing_1.png"}
            width={450}
            height={600}
            alt="landing_1"
            className="rounded-lg shadow-lg w-full md:w-auto"
          />
        </div>
      </section>

      <section className="flex px-4 md:px-10 py-8 md:py-16 flex-col items-center md:items-start gap-10">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-wrap items-center gap-4 w-full">
          <div className="flex items-center border p-3 rounded-lg w-full md:w-1/3 bg-gray-100">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Set your location"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border p-3 rounded-lg w-full md:w-1/3 bg-gray-100">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Ex. Doctor, Hospital"
              className="w-full outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border p-3 rounded-lg bg-gray-100"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Highest Rating</option>
            <option value="patients">Most Patients</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>

        {/* Doctor List */}
        <div className="mt-6 space-y-6">
          {sortedDoctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 w-full"
              >
                <img
                  src="/doctor-avatar.jpg"
                  alt="Doctor"
                  className="w-24 h-24 rounded-full border"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-900">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">Spesialis: {doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.experience}</p>
                  <p className="font-semibold text-gray-800">
                    {doctor.location}
                  </p>
                  <p className="text-gray-600">Praktek: {doctor.schedule}</p>
                  <div className="flex items-center gap-3 mt-3">
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

export default ConctultationPage;
