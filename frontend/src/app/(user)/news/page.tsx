"use client";

import { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import NavigationBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/footer";
import { getAllNewsUserService } from "@/services/users/news/getAllNews";
import { NewsLlist } from "@/types/news";

const dummyRating = {
  average: 4.6,
  totalReviews: 94,
  summary: [
    { stars: 5, count: 62 },
    { stars: 4, count: 20 },
    { stars: 3, count: 8 },
    { stars: 2, count: 3 },
    { stars: 1, count: 1 },
  ],
};

const UserNewsPage = () => {
  const [newsList, setNewsList] = useState<NewsLlist[]>([]);
  const [ratingStats] = useState(dummyRating);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const result = await getAllNewsUserService();

        if (result.status === true) {
          setNewsList(result.data);
        }
      } catch (error) {
        alert(`Failed to fetch news: ${error}`);
      }
    };

    getAllNews();
  }, []);

  const handleViewMore = (id: string) => {
    router.push(`/news/${id}`)
  }

  const filteredNews = newsList.filter(
    (news) =>
      news.news_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.news_body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />
      {/* Hero Section dengan animasi */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-10 md:pt-32 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Jelajahi Berita Kesehatan Mental
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Warasin hadir dengan informasi terpercaya untuk mendukung
              perjalanan kesehatan mentalmu.
            </p>

            {/* Search Bar dengan animasi */}
            <div
              className={`relative max-w-md mx-auto transition-all duration-300 ${
                isSearchFocused ? "scale-105" : ""
              }`}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari artikel kesehatan mental..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-transparent bg-white/80 backdrop-blur-sm shadow-lg focus:border-blue-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 space-y-16 py-10">
        {/* Semua Berita */}
        <section>
          <h2 className="text-2xl font-semibold text-successColor mb-6">
            Semua Berita
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <div
                key={news.news_id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <Image
                  height={200}
                  width={200}
                  src={news.news_image || "/Images/default_image.jpg"}
                  alt={news.news_image}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  {/* Badge tanggal */}
                  <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {new Date(news.news_date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <h3 className="text-lg font-semibold text-primaryTextColor mb-2 group-hover:text-blue-700 transition-colors">
                    {news.news_title}
                  </h3>

                  <p className="text-sm text-tertiaryTextColor line-clamp-2">
                    {news.news_body}
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={() =>
                        handleViewMore(news.news_id)
                      }
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Lihat Selengkapnya →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* testimoni */}
        <section>
          <h2 className="text-2xl font-semibold text-successColor mb-6">
            Pendapat Pembaca
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-primaryColor text-4xl font-bold">
                {ratingStats.average}
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(ratingStats.average)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-gray-500 ml-2">
                {ratingStats.totalReviews} ulasan
              </span>
            </div>

            {ratingStats.summary.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2 text-sm mb-2">
                <span>{stars} ★</span>
                <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full"
                    style={{
                      width: `${(count / ratingStats.totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Topik Populer */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Topik Populer
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Kecemasan",
              "Self Healing",
              "Remaja",
              "Keluarga",
              "Tidur Sehat",
            ].map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm hover:bg-purple-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative bg-gradient-to-br from-blue-100 to-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-fit h-full rounded-full bg-transparent flex items-center justify-center border">
                <Image
                  height={200}
                  width={200}
                  src="/Images/chatbot.png"
                  alt="WaraBot"
                />
              </div>
              <div className="flex flex-col w-4/5">
                <h2 className="text-lg font-semibold text-primaryTextColor">
                  Mengapa Tidur Cukup Penting?
                </h2>
                <p className="text-sm text-tertiaryTextColor mt-1">
                  Kurang tidur bisa ganggu mentalmu. Yuk kenali kenapa kamu
                  butuh istirahat...
                </p>
                <Button
                  onClick={() => router.push(`/chatbot`)}
                  className="mt-3 w-fit"
                >
                  Lihat lebih lengkap & ngobrol
                </Button>
              </div>
            </div>
            <span className="text-xs mt-2 text-gray-400">
              WaraBot siap mendengarkan kamu hari ini
            </span>
          </div>
          <div className="relative bg-gradient-to-br from-blue-100 to-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-fit h-full rounded-full bg-transparent flex items-center justify-center border">
                <Image
                  height={200}
                  width={200}
                  src="/Images/consultation.png"
                  alt="WaraBot"
                />
              </div>
              <div className="flex flex-col w-4/5">
                <h2 className="text-lg font-semibold text-primaryTextColor">
                  Merasa Lelah Secara Mental? Yuk Cerita Bareng Ahli!
                </h2>
                <p className="text-sm text-tertiaryTextColor mt-1">
                  Kadang, lelah itu bukan cuma soal fisik. Pikiran yang penuh,
                  emosi yang tak menentu, dan tekanan hidup bisa membuat
                  hari-hari terasa berat.
                </p>
                <Button
                  onClick={() => router.push(`/concultation`)}
                  className="mt-3 w-fit"
                >
                  Temukan psikolog terbaikmu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserNewsPage;
