import Footer from "@/components/footer";
import { FaPaperPlane } from "react-icons/fa";
import OfferCard from "./_components/Offer";
import NavigationBar from "@/components/navbar";

const Offers = [
  {
    icon: "shinny_star",
    title: "Jelas dan Tepat",
    desc: "CHATIN memberikan jawaban akurat dan berbasis data.",
  },
  {
    icon: "target",
    title: "Jawaban yang dipersonlisasi",
    desc: "Respons disesuaikan dengan kebutuhan pengguna.",
  },
  {
    icon: "up",
    title: "Peningkatan Efisiensi",
    desc: "Akses cepat dengan respons instan.",
  },
];

const ChatBotPage = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white">
      <NavigationBar />

      <main className="flex h-screen flex-col mx-auto items-center justify-center text-center mt-12 w-4/5 md:w-2/3">
        <h1 className="text-4xl font-bold">
          Selamat Datang di{" "}
          <span className="text-primaryColor">Chatin Warasin</span>
        </h1>
        <p className="mt-2 text-primaryTextColor font-semibold">
          Kekuatan AI yang siap melayani anda - Menjinkan pengetahuan
        </p>
        <div className="mt-6 flex items-center border border-primaryColor bg-secondaryTextColor text-primaryTextColor rounded-xl p-1 text-lg w-full">
          <input
            type="text"
            className="flex-grow outline-none bg-transparent px-2"
            placeholder="Jelaskan pengertian kesehatan mental!"
          />
          <button className="bg-primaryColor text-white px-4 py-2 rounded-lg">
            <FaPaperPlane />
          </button>
        </div>
        <section className="flex flex-col sm:flex-row gap-4 justify-center sm:space-x-12 mt-12">
          {Offers.map((offer, index) => (
            <OfferCard
              key={index}
              icon={offer.icon}
              title={offer.title}
              desc={offer.desc}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ChatBotPage;
