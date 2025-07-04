"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllNewsService } from "@/services/dahsboardService/news/getAllNews";
import { News } from "@/types/news";
import dayjs from "dayjs";
import { deleteNewsService } from "@/services/dahsboardService/news/deleteNews";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { assetsURL } from "@/config/api";

const ViewNewsPage = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return "/Images/default_image.jpg";

    if (imagePath.startsWith("http")) return imagePath;

    return `${assetsURL}/news/${imagePath}`;
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await getAllNewsService();
      if (result.status) {
        console.log(result.data);
        setNewsList(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteNewsService(id);
      if (result.status) {
        setNewsList((prev) => prev.filter((news) => news.news_id !== id));
        await showSuccessAlert("Berita Berhasil Dihapus", result.message);
      } else {
        await showErrorAlert("Berita Gagal Dihapus", result.message);
      }
    } catch (error) {
      alert(error || "Terjadi kesalahan saat menghapus berita");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Daftar Berita</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : newsList.length === 0 ? (
        <p>Tidak ada berita.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {newsList.map((news) => (
            <div
              key={news.news_id}
              className="border rounded-md p-4 flex flex-col gap-3"
            >
              <Image
                src={
                  getFullImageUrl(news.news_image) ||
                  "/Images/default_image.jpg"
                }
                alt={news.news_image}
                width={600}
                height={300}
                className="object-cover w-full h-52 rounded-md"
              />
              <h3 className="font-bold text-lg text-primaryTextColor">
                {news.news_title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {news.news_body}
              </p>
              <p className="text-xs text-gray-400">
                {dayjs(news.news_date).format("DD/MM/YYYY")}
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/admin/news/${news.news_id}`}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(news.news_id)}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewNewsPage;
