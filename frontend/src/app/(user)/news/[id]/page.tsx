/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { createNewsUserService } from "@/services/users/news/createNews";
import { getAllNewsUserService } from "@/services/users/news/getAllNews";
import { getAllNewsDetailUserService } from "@/services/users/news/getAllNewsDetailUser";
import { getDetailNewsService } from "@/services/users/news/getDetailNews";
import { HistoryNews, News } from "@/types/news";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewsDetailPage = () => {
  const params = useParams();
  const [allNews, setAllNews] = useState<News[]>([]);
  const [newsHistory, setNewsHistory] = useState<HistoryNews[]>([]);
  const [completeRead, setCompleteRead] = useState<boolean>(false);
  const [newsData, setNewsData] = useState({
    news_image: "",
    news_title: "",
    news_body: "",
    news_date: "",
  });
  const [createNews, setCreateNews] = useState({
    news_detail_date: "",
    news_id: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetailNews = async () => {
      const newsId = params.id as string;

      try {
        const newsResponse = await getDetailNewsService(newsId);

        if (newsResponse.status === true) {
          const data = newsResponse.data;
          setNewsData({
            news_image: data.news_image,
            news_title: data.news_title,
            news_body: data.news_body,
            news_date: data.news_date,
          });

          setCreateNews({
            news_detail_date: dayjs().format("YYYY-MM-DD"),
            news_id: data.news_id,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getAllNews = async () => {
      try {
        const allNewsResponse = await getAllNewsUserService();

        if (allNewsResponse.status === true) {
          setAllNews(allNewsResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDetailNews();
    getAllNews();
  }, [params.id]);

  useEffect(() => {
    const fetchHistory = async () => {
      const newsId = params.id as string;
      try {
        const result = await getAllNewsDetailUserService();

        if (result.status === true) {
          setNewsHistory(result.data);

          if (newsHistory.find((history) => history.news.news_id === newsId)) {
            setCompleteRead(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [params.id, newsHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      formatted: date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleComplete = async () => {
    try {
      const result = await createNewsUserService(createNews);

      if (result.status === true) {
        await showSuccessAlert(
          "History News Ditambahkan",
          "History news berhasil ditambahkan"
        );
      } else {
        await showErrorAlert(
          "Terjadi Suatu Masalah",
          "History news telah ditambahkan sebelumnya"
        );
      }
    } catch (error: any) {
      showErrorAlert("Terjadi Suatu Masalah", error.message);
    }
  };

  const dateInfo = formatDate(newsData.news_date);

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />
      <main className="px-6 md:px-10 py-4 md:py-4 mt-20">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <Image
                height={400}
                width={800}
                src={newsData.news_image || "/Images/default_image.jpg"}
                alt={newsData.news_title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{dateInfo.formatted}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>{dateInfo.time}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                {newsData.news_title}
              </h1>

              {/* Content Body */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div className="first-letter:text-5xl first-letter:font-bold first-letter:text-primaryColor first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:mt-1">
                  {newsData.news_body}
                </div>
              </div>

              {/* complete reading news */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleComplete()}
                  disabled={completeRead}
                  className="rounded-md bg-primaryColor text-white font-medium text-base px-4 py-3 disabled:bg-gray-500"
                >
                  Tandai selesai dibaca
                </button>
              </div>
            </div>
          </article>

          {/* Related News Section - Ready for implementation */}
          <div className="mt-12">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <h2 className="text-xl font-semibold text-primaryTextColor mb-4">
                Bacaan Menarik Lainnya
              </h2>
              <p className="text-gray-700">
                Masih banyak informasi penting yang bisa kamu jelajahi di sini.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allNews.map((news) => (
                  <div
                    key={news.news_id}
                    className="p-4 bg-white/60 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:bg-white/80 rounded-lg cursor-pointer"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={news.news_image || "/Images/default_image.jpg"}
                      alt={news.news_title}
                      className="w-full h-36 object-cover bg-gray-200 rounded-lg mb-3"
                    />
                    <Link
                      href={`/news/${news.news_id}`}
                      className=" font-semibold text-primaryTextColor mb-2 hover:text-primaryColor transition-colors text-md line-clamp-2"
                    >
                      {news.news_title}
                    </Link>

                    <p className="text-sm text-tertiaryTextColor line-clamp-2">
                      {news.news_body}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default NewsDetailPage;
