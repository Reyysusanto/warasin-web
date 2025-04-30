"use client";

import Footer from "@/components/footer";
import CardService from "./_components/Card";
import NavigationBar from "@/components/navbar";
import FadeInFromRight from "@/components/animation/FadeInFromRight";
import FadeInFromLeft from "@/components/animation/FadeInFromLeft";

const Services = [
  {
    icon: "konsulin",
    link: "/concultation",
    service: "Konsulin",
    desc: "Layanan konsultasi dengan psikolog profesional.",
  },
  {
    icon: "tanyain",
    link: "/chatbot",
    service: "Tanyain",
    desc: "AI Chatbot yang menjawab pertanyaan kesehatan mental.",
  },
  {
    icon: "ajarin",
    link: "",
    service: "Ajarin",
    desc: "Konten edukatif terkait kesehatan mental.",
  },
  {
    icon: "dopamin",
    link: "",
    service: "Dopamin",
    desc: "Pesan motivasi harian untuk meningkatkan kesehatan mental pengguna.",
  },
  {
    icon: "terapiin",
    link: "",
    service: "Terapiin",
    desc: "Lagu terapi yang dapat membantu meredakan stres dan depresi berat.",
  },
  {
    icon: "emosiin",
    link: "",
    service: "Emosiin",
    desc: "Pendeteksi emosi untuk menagani anxiety berdasarkan data Kesehatan.",
  },
];

const ServicePage = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white">
      <NavigationBar />

      <section className="flex flex-col items-center text-center py-20 md:py-32 gap-20">
        <div className="flex flex-col px-20 md:px-40 text-center mx-auto w-full md:w-3/5 gap-4">
          <FadeInFromRight>
            <h1 className="text-5xl font-medium text-primaryTextColor leading-tight">
              Layanan yang Tersedia
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-primaryTextColor">
              Kami menyediakan layanan kesehatan mental yang dapat diakses kapan
              saja dan di mana saja, dirancang untuk memberikan dukungan yang
              aman, nyaman, dan terpercaya bagi setiap pengguna.
            </p>
          </FadeInFromRight>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 px-10 md:w-3/4 gap-6 md:gap-12">
          {Services.map((service, index) => (
            <FadeInFromLeft key={index}>
              <CardService
                link={service.link}
                icon={service.icon}
                service={service.service}
                desc={service.desc}
              />
            </FadeInFromLeft>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
