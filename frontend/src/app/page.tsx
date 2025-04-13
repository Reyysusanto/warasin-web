"use client";

import FadeInFromLeft from "@/components/animation/FadeInFromLeft";
import FadeInFromRight from "@/components/animation/FadeInFromRight";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoArrowDownRight } from "react-icons/go";
import { TbCalendarCheck } from "react-icons/tb";

const faqs = [
  {
    question: "Bagaimana cara melakukan konsultasi?",
    answer:
      "Anda bisa memilih psikolog, menentukan jadwal, dan mulai konsultasi langsung di platform kami.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Ya, data Anda dijaga dengan enkripsi tingkat tinggi dan tidak akan dibagikan kepada pihak lain tanpa izin Anda.",
  },
  {
    question: "Berapa biaya konsultasi?",
    answer:
      "Biaya konsultasi bervariasi tergantung psikolog yang dipilih. Detail harga dapat dilihat di halaman pemesanan.",
  },
  {
    question: "Apakah saya bisa mengganti psikolog jika tidak cocok?",
    answer:
      "Ya, Anda bisa mengganti psikolog kapan saja jika merasa tidak cocok dengan yang sebelumnya.",
  },
  // {
  //   question: "Apakah saya bisa berkonsultasi secara anonim?",
  //   answer:
  //     "Tentu! Kami menyediakan opsi untuk berkonsultasi secara anonim demi kenyamanan dan privasi Anda.",
  // },
];

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setDecoded(jwtDecode(token));
        } catch (error) {
          console.error("Token tidak valid", error);
        }
      }
    }
  }, []);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />

      <main className="px-6 md:px-10 py-4 md:py-4 mt-20">
        <FadeInFromRight>
          <section
            id="home"
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-primaryTextColor leading-tight">
                Konsultasi dengan Ahli yang Tepat untuk{" "}
                <span className="text-primaryColor">Mental Health</span> Anda
              </h1>
              <p className="text-primaryTextColor mt-4 text-base md:text-lg">
                Kami menyediakan layanan kesehatan mental dengan mencarikan
                daftar psikolog terkemuka di seluruh Indonesia
              </p>

              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href={"/layanan"}
                  className="bg-primaryColor text-white px-6 py-2 md:py-3 rounded-lg text-base font-normal hover:bg-primaryColor/90 transition-colors duration-200 flex items-center justify-center text-center"
                >
                  Layanan Kami
                </Link>
                <Link
                  href={decoded ? "/concultation" : "/login"}
                  className="border-primaryColor flex text-primaryColor border-2 px-6 py-2 md:py-3 rounded-lg items-center gap-2 hover:bg-primaryColor/10 transition-colors duration-200"
                >
                  <TbCalendarCheck className="text-3xl" />
                  <p className="text-base font-normal">Buat Janji Temu</p>
                </Link>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-10 text-primaryTextColor text-xl font-semibold justify-center md:justify-start">
                <Experience count={800} detail="Pelanggan Puas" />
                <Experience count={10} detail="Tahun Pengalaman" />
                <Experience count={5} detail="Pemenang Penghargaan" />
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
        </FadeInFromRight>

        <FadeInFromLeft>
          <section
            id="about"
            className="flex px-4 md:px-10 py-8 md:py-16 flex-col md:flex-row items-center md:items-start gap-10"
          >
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
                  Kami berdedikasi untuk memberikan layanan kesehatan mental
                  yang luar biasa dalam lingkungan yang hangat dan ramah. Tim
                  kami yang terdiri dari para profesional yang berpengalaman,
                  penuh kasih, dan sangat terampil ada di sini untuk memastikan
                  pengalaman pemulihan kesehatan mental anda nyaman dan lancar.
                </p>
              </div>
              <div>
                <h4 className="text-primaryTextColor font-medium text-lg">
                  Visi & Misi Kami
                </h4>
                <p className="text-primaryTextColor text-sm md:text-base mt-2">
                  Warasin hadir untuk memberikan akses mudah dan terjangkau ke
                  layanan kesehatan mental, meningkatkan kesadaran akan
                  pentingnya kesejahteraan psikologis, serta membantu individu
                  mencapai pemulihan yang optimal melalui teknologi, edukasi,
                  dan dukungan profesional. Kami berkomitmen menciptakan
                  lingkungan yang positif, penuh motivasi, dan mendukung setiap
                  langkah perjalanan mental pengguna.
                </p>
              </div>
              <Link
                href={"/tentang-kami"}
                className="bg-primaryColor flex items-center w-fit px-4 py-2 rounded-2xl text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Tentang Kami
                <GoArrowDownRight className="text-lg ml-2" />
              </Link>
            </div>
          </section>
        </FadeInFromLeft>

        <FadeInFromRight>
          <section
            id="services"
            className="md:px-10 py-8 md:py-16 flex flex-col-reverse md:flex-row items-center gap-10"
          >
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

            <div className="relative w-full md:w-1/2 flex flex-col justify-center gap-4">
              <Image
                src={"/Images/landing_2.png"}
                width={500}
                height={600}
                alt="services_image"
                className="rounded-lg shadow-lg w-full md:w-auto"
              />
              <Link
                href={"/layanan"}
                className="bg-primaryColor w-full flex justify-center items-center px-4 py-2 rounded-2xl text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Selengkapnya
              </Link>
            </div>
          </section>
        </FadeInFromRight>

        <FadeInFromLeft>
          <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-12">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-semibold text-primaryTextColor">
                Mulailah Penyembuhan <br /> Anda Hari Ini
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-lg">
                Tidak ada kata terlalu dini atau terlambat untuk mencari
                bantuan. Para spesialis kami siap memandu Anda di setiap
                langkah.
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
        </FadeInFromLeft>

        <FadeInFromRight>
          <section
            id="FAQ"
            className="flex px-4 md:px-10 py-8 md:py-16 flex-col md:flex-row items-center md:items-start gap-10"
          >
            <Image
              src={"/Images/FAQ.png"}
              width={500}
              height={600}
              alt="services_image"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
            <div className="space-y-4 w-full md:w-1/2">
              <h2 className="px-4 text-3xl font-bold">
                Pertanyaan yang Sering Diajukan
              </h2>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 shadow-sm bg-transparent cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-primaryTextColor">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openIndex === index && (
                    <p className="mt-2 text-primaryTextColor text-sm">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeInFromRight>

        <Footer />
      </main>
    </div>
  );
}
