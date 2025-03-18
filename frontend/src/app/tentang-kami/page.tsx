"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import CardValue from "./_components/Card";

const visi = [
  {
    icon: "community",
    title: "Pengguna adalah prioritas",
    text: "Mendukung dan memberikan layanan terbaik bagi setiap pengguna",
  },
  {
    icon: "community",
    title: "Selalu Berkembang",
    text: "Kami terus berinovasi dan mencoba hal baru untuk menghadirkan solusi terbaik dalam kesehatan mental.",
  },
  {
    icon: "community",
    title: "Tanpa Alasan & Rintangan",
    text: "Kami mengambil tanggung jawab penuh untuk membantu pengguna mendapatkan dukungan yang mereka butuhkan.",
  },
  {
    icon: "community",
    title: "Motivasi dari dalam",
    text: "Kami bekerja dengan penuh semangat dan dedikasi untuk menciptakan perubahan nyata dalam kesehatan mental.",
  },
  {
    icon: "community",
    title: "Siap Belajar",
    text: "Kami selalu terbuka terhadap wawasan baru, berpikir proaktif, dan terus meningkatkan kualitas layanan.",
  },
  {
    icon: "community",
    title: "Motivasi dari dalam",
    text: "Kami merayakan setiap langkah kecil dalam perjalanan kesehatan mental dan menciptakan lingkungan yang penuh dukungan.",
  },
];

export default function AboutPage() {
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

      <main className="px-6 md:px-10 gap-y-20">
        <section className="flex flex-col items-center text-center py-32 px-20 md:px-40 lg:px-72 gap-3">
          <p className="text-xs text-primaryTextColor">TENTANG KAMI</p>
          <h1 className="text-4xl md:text-5xl font-medium text-primaryTextColor leading-tight">
            Kesehatan Mental dalam Genggaman{" "}
            <span className="text-primaryColor">Warasin</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-primaryTextColor">
            Di Warasin, kami berkomitmen untuk memberikan akses mudah dan
            terpercaya bagi setiap individu dalam menjaga kesehatan mental
            mereka. Kami percaya bahwa kesejahteraan psikologis adalah kunci
            untuk mencapai kehidupan yang lebih seimbang, produktif, dan
            bahagia.
          </p>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col max-w-lg gap-4 w-full md:w-1/2 mx-auto">
            <p className="text-base text-primaryTextColor">
              Warasin adalah platform digital yang menghadirkan solusi inovatif
              untuk mendukung kesehatan mental. Kami menyediakan konsultasi
              dengan psikolog profesional, AI Chatbot untuk menjawab pertanyaan
              mental health, serta konten edukatif dan terapi berbasis musik.
            </p>
            <p className="text-base text-primaryTextColor">
              Dibangun oleh tim ahli di bidang psikologi, teknologi, dan
              kesehatan, Warasin berkomitmen untuk memberikan layanan yang aman,
              nyaman, dan mudah diakses. Kami percaya bahwa setiap individu
              berhak mendapatkan dukungan mental yang tepat, dan tidak ada yang
              harus menghadapi tantangan emosional sendirian.
            </p>
          </div>
          <div className="flex gap-6 relative w-full md:w-1/2 top-12 px-10 md:px-0">
            {/* Founder */}
            <div className="text-start relative z-10">
              <Image
                src="/Images/landing_1.png"
                width={400}
                height={400}
                className="object-cover rounded-lg flex w-fit h-fit border-2 border-white"
                alt="Founder"
              />
              <p className="font-semibold mt-2">Ahmad Mirza Rafiq Azmi</p>
              <p className="text-sm text-gray-500">Founder</p>
            </div>

            {/* Co-Founder */}
            <div className="md:text-end relative md:absolute md:right-0 md:-top-16">
              <Image
                src="/Images/landing_2.png"
                width={400}
                height={400}
                className="object-cover rounded-lg flex h-fit border-2 border-white"
                alt="Co-Founder"
              />
              <p className="font-semibold mt-2">Rheinaldy Susanto</p>
              <p className="text-sm text-gray-500">Co-Founder</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col mt-40 items-center gap-20">
          <div className="flex flex-col text-center mx-auto w-3/5 gap-4">
            <h2 className="font-medium text-2xl text-primaryTextColor">
              Nilai Utama Kami
            </h2>
            <p className="text-base text-primaryTextColor">
              Kami percaya bahwa kesehatan mental adalah hak semua orang. Budaya
              Warasin mengedepankan empati, inovasi, dan komitmen dalam
              memberikan layanan terbaik bagi kesejahteraan psikologis setiap
              individu.
            </p>
          </div>

          <div className="grid grid-cols-3 px-10 gap-12">
            {visi.map((item, index) => (
              <CardValue 
                key={index} 
                icon={item.icon}
                title={item.title} 
                text={item.text}
              />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
