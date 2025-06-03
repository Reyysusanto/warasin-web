"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import ZoomIn from "@/components/animation/ZoomIn";
import FadeInFromBottom from "@/components/animation/FadeInFromBottom";
import FadeInFromLeft from "@/components/animation/FadeInFromLeft";
import { Psycholog } from "@/types/psycholog";
import { getAllPsychologUserService } from "@/services/users/psycholog/getAllPsycholog";
import PsychologCard from "./_components/DoctorCard";

const ConsultationPage = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [psychologs, setPsychologs] = useState<Psycholog[]>([]);

  useEffect(() => {
    const fetchPsycholog = async () => {
      const result = await getAllPsychologUserService({
        name: search,
        city,
      });

      if (result.status === true) {
        setPsychologs(result.data);
      }
    };

    fetchPsycholog();
  }, [search, city]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#ECEEFF] to-white">
      <NavigationBar />

      <section className="flex flex-col md:flex-row justify-center items-center px-8 md:px-20 py-20 md:pt-32 gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <ZoomIn>
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
          </ZoomIn>
        </div>

        <FadeInFromBottom>
          <div className="w-full flex justify-center md:justify-end">
            <Image
              src="/Images/landing_1.png"
              width={450}
              height={600}
              alt="landing_1"
              className="rounded-lg shadow-lg"
            />
          </div>
        </FadeInFromBottom>
      </section>

      <section className="px-8 md:px-24 py-8 md:py-16">
        <FadeInFromLeft>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="border p-3 rounded-lg flex-1 bg-gray-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-lg flex-1 bg-gray-100"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </FadeInFromLeft>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(psychologs) &&
            psychologs
              .filter(
                (psycholog) =>
                  psycholog.psy_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  psycholog.city.city_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((psycholog) => (
                <ZoomIn key={psycholog.psy_id}>
                  <PsychologCard
                    id={psycholog.psy_id}
                    name={psycholog.psy_name}
                    psy_image={
                      psycholog.psy_image || "/Images/default_profile.png"
                    }
                    specialty={
                      psycholog.specialization
                        ? psycholog.specialization.map((s) => s.spe_name)
                        : []
                    }
                    work_year={psycholog.psy_work_year}
                    location={psycholog.city.city_name}
                    language={
                      psycholog.language
                        ? psycholog.language.map((l) => l.lang_name)
                        : []
                    }
                    description={psycholog.psy_description}
                  />
                </ZoomIn>
              ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultationPage;
