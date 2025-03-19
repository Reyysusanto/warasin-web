"use client";

import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import Footer from "@/components/footer";
import CardService from "./_components/Card";

const Services = [
    {
        icon: "konsulin",
        service: "Konsulin",
        desc: "Layanan konsultasi dengan psikolog profesional.",
    },
    {
        icon: "tanyain",
        service: "Tanyain",
        desc: "AI Chatbot yang menjawab pertanyaan kesehatan mental.",
    },
    {
        icon: "ajarin",
        service: "Ajarin",
        desc: "Konten edukatif terkait kesehatan mental.",
    },
    {
        icon: "dopamin",
        service: "Dopamin",
        desc: "Pesan motivasi harian untuk meningkatkan kesehatan mental pengguna.",
    },
    {
        icon: "terapiin",
        service: "Terapiin",
        desc: "Lagu terapi yang dapat membantu meredakan stres dan depresi berat.",
    },
    {
        icon: "emosiin",
        service: "Emosiin",
        desc: "Pendeteksi emosi untuk menagani anxiety berdasarkan data Kesehatan.",
    },
]

const ServicePage = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            href={"/tentang-kami"}
          >
            About
          </Link>
          <Link
            className="hover:text-primaryColor transition-colors duration-200"
            href={"/layanan"}
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

        <div
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
        </div>
      </nav>

      <section className="flex flex-col items-center text-center py-20 md:py-32 gap-20">
        <div className="flex flex-col px-20 md:px-40 text-center mx-auto w-full md:w-3/5 gap-4">
          <h1 className="text-5xl font-medium text-primaryTextColor leading-tight">
            Layanan yang Tersedia
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg text-primaryTextColor">
            Kami menyediakan layanan kesehatan mental yang dapat diakses kapan
            saja dan di mana saja, dirancang untuk memberikan dukungan yang
            aman, nyaman, dan terpercaya bagi setiap pengguna.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 px-10 gap-6 md:gap-12">
          {Services.map((service, index) => (
            <CardService 
                key={index}
                icon={service.icon}
                service={service.service}
                desc={service.desc}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
