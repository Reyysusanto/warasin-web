"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import Roadmap from "./_components/education";
import KonsulSection from "./_components/konsul";
import { Psycholog } from "@/types/psycholog";
import { useParams } from "next/navigation";
import { getDetailPsychologUserService } from "@/services/users/psycholog/getDetailPsycholog";
import { getAllPracticeUserService } from "@/services/users/consultation/getAllPractice";
import { Practice } from "@/types/master";

const DetailPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("info");
  const [psycholog, setPsycholog] = useState<Psycholog>();
  const [practice, setPractice] = useState<Practice[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id as string;
      const result = await getDetailPsychologUserService(id);

      if (result.status === true) {
        setPsycholog(result.data);
      }
    };

    const fetchPractice = async () => {
      const id = params.id as string;
      const result = await getAllPracticeUserService(id);

      if (result.status === true) {
        setPractice(result.data);
      }
    };

    fetchData();
    fetchPractice();
  }, [params.id]);

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
              {psycholog?.psy_name}
            </h2>
            <div>
              <p className="text-base text-primaryTextColor font-regular">
                Nomor STR: {psycholog?.psy_str_number}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                Spesialis:{" "}
                {psycholog?.specialization
                  ? psycholog.specialization.map((s) => s.spe_name)
                  : []}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                Pendidikan:{" "}
                {psycholog?.education && psycholog.education.length > 0
                  ? psycholog.education
                      .map(
                        (e) =>
                          `${e.edu_degree} ${e.edu_major} – ${e.edu_institution} (${e.edu_graduation_year})`
                      )
                      .join(", ")
                  : "-"}
              </p>
              <p className="text-base text-primaryTextColor font-regular">
                {psycholog?.psy_work_year} tahun pengalaman -{" "}
                {psycholog?.language
                  ? psycholog.language.map((l) => l.lang_name)
                  : []}
              </p>
            </div>
            <p className="text-base text-primaryTextColor font-regular">
              {psycholog?.psy_description}
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
                  Lokasi Praktik
                </h2>

                {practice.length > 0 ? (
                  <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                    {practice.map((p) => (
                      <div
                        key={p.prac_id}
                        className="border border-gray-300 bg-blue-50 rounded-xl shadow-sm p-4 w-full md:w-[48%]"
                      >
                        <h3 className="text-primaryTextColor font-semibold text-lg">
                          {p.prac_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {p.prac_address}
                        </p>
                        <p className="text-sm text-gray-500">
                          {p.prac_phone_number}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base text-tertiaryTextColor">
                    Belum ada alamat praktik yang tersedia.
                  </p>
                )}

                <div className="mt-6">
                  <h4 className="text-xl text-primaryTextColor font-medium">
                    Domisili Psikolog
                  </h4>
                  <p className="text-base text-gray-600">
                    {psycholog?.city.city_name},{" "}
                    {psycholog?.city.province.province_name}
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
                    {psycholog?.psy_description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primaryTextColor font-medium text-xl">
                    Spesialisasi
                  </h4>
                  {psycholog?.specialization?.map((special) => (
                    <div
                      className="flex items-center gap-3"
                      key={special.spe_id}
                    >
                      <AiOutlineMedicineBox className="text-xl" />
                      <p className="text-primaryTextColor text-base">
                        {special.spe_name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primaryTextColor font-medium text-xl">
                    Pendidikan
                  </h4>
                  <Roadmap education={psycholog?.education ?? null} />
                </div>
              </div>
            </div>
          )}

          {selectedTab !== "info" && <KonsulSection />}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailPage;
