"use client";

import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoArrowDownRight } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { TbCalendarCheck } from "react-icons/tb";

export default function Home() {
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

      <main className="px-6 md:px-10 py-4 md:py-4">
        <section className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-primaryTextColor leading-tight">
              Konsultasi dengan Ahli yang Tepat untuk{" "}
              <span className="text-primaryColor">Mental Health</span> Anda
            </h1>
            <p className="text-primaryTextColor mt-4 text-base md:text-lg">
              We provide mental health services by finding a list of reputable
              psychologists throughout Indonesia
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-primaryColor text-white px-6 py-2 md:py-3 rounded-lg text-base font-normal hover:bg-primaryColor/90 transition-colors duration-200">
                Our Services
              </button>
              <button className="border-primaryColor flex text-primaryColor border-2 px-6 py-2 md:py-3 rounded-lg items-center gap-2 hover:bg-primaryColor/10 transition-colors duration-200">
                <TbCalendarCheck className="text-3xl" />
                <p className="text-base font-normal">Book an Appointment</p>
              </button>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-10 text-primaryTextColor text-xl font-semibold justify-center md:justify-start">
              <Experience count={800} detail="Happy customers" />
              <Experience count={10} detail="Years of experience" />
              <Experience count={5} detail="Award winning" />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0">
            <Image
              className="relative z-10 w-[80%] md:w-[800px] h-auto translate-x-10"
              src={"/Images/concultation.png"}
              width={700}
              height={600}
              alt="Doctor and Patient"
            />
          </div>
        </section>

        <section className="flex px-4 md:px-10 py-8 md:py-16 flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={"/Images/landing_1.png"}
              width={450}
              height={600}
              alt="landing_1"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h3 className="text-primaryColor font-medium text-lg md:text-xl">
              Tentang Kami
            </h3>
            <div>
              <h2 className="text-primaryTextColor font-semibold text-2xl md:text-3xl">
                Perawatan yang Berpusat pada Pasien
              </h2>
              <p className="text-primaryTextColor text-sm md:text-base mt-2">
                Kami berdedikasi untuk memberikan layanan kesehatan mental yang
                luar biasa dalam lingkungan yang hangat dan ramah. Tim kami yang
                terdiri dari para profesional yang berpengalaman, penuh kasih,
                dan sangat terampil ada di sini untuk memastikan pengalaman
                pemulihan kesehatan mental anda nyaman dan lancar.
              </p>
            </div>
            <div>
              <h4 className="text-primaryTextColor font-medium text-lg">
                Visi & Misi Kami
              </h4>
              <p className="text-primaryTextColor text-sm md:text-base mt-2">
                Warasin hadir untuk memberikan akses mudah dan terjangkau ke
                layanan kesehatan mental, meningkatkan kesadaran akan pentingnya
                kesejahteraan psikologis, serta membantu individu mencapai
                pemulihan yang optimal melalui teknologi, edukasi, dan dukungan
                profesional. Kami berkomitmen menciptakan lingkungan yang
                positif, penuh motivasi, dan mendukung setiap langkah perjalanan
                mental pengguna.
              </p>
            </div>
            <Link
              href={"#"}
              className="bg-primaryColor flex items-center w-fit px-4 py-2 rounded-2xl text-white font-semibold hover:shadow-lg transition-all duration-200"
            >
              Learn More
              <GoArrowDownRight className="text-lg ml-2" />
            </Link>
          </div>
        </section>

        <section className="md:px-10 py-8 md:py-16 flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h3 className="text-primaryColor font-medium text-lg md:text-xl">
              Layanan Kami
            </h3>
            <h2 className="text-primaryTextColor font-semibold text-2xl md:text-3xl">
              Layanan kesehatan mental yang komprehensif
            </h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Konsulin",
                  desc: "Konsultasi langsung dengan psikolog profesional melalui chat atau video call",
                },
                {
                  title: "Tanyain",
                  desc: "AI Chatbot yang siap menjawab pertanyaan seputar kesehatan mental kapan saja",
                },
                {
                  title: "Ajarkan",
                  desc: "Konten edukatif berupa artikel, video, dan webinar untuk meningkatkan pemahaman kesehatan mental",
                },
                {
                  title: "Dopamin",
                  desc: "Pesan motivasi harian yang membantu meningkatkan semangat dan kesejahteraan emosional",
                },
                {
                  title: "Terapiin",
                  desc: "Koleksi lagu terapi dan suara relaksasi untuk mengurangi stres dan kecemasan",
                },
                {
                  title: "Emosin",
                  desc: "Pendeteksi emosi berbasis data untuk membantu mengelola kecemasan dan menjaga keseimbangan mental",
                },
              ].map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-primaryColor text-xl mt-1" />
                  <span className="text-primaryTextColor text-base md:text-lg">
                    <strong>{service.title}:</strong> {service.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center">
            <Image
              src={"/Images/landing_2.png"}
              width={500}
              height={600}
              alt="services_image"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-12">
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-primaryTextColor">
              Mulailah Penyembuhan <br /> Anda Hari Ini
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg">
              Tidak ada kata terlalu dini atau terlambat untuk mencari bantuan.
              Para spesialis kami siap memandu Anda di setiap langkah.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href={""}
              className="bg-primaryColor text-white px-20 py-2 rounded-lg text-base hover:bg-primaryColor/90 transition-colors duration-200"
            >
              Jadwal
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
