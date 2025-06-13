/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { getDetailNewsService } from "@/services/dahsboardService/news/getDetailNews";
import { updateNewsAdminService } from "@/services/dahsboardService/news/updateNews";
import { useAuthRedirectLoginAdmin } from "@/services/useAuthRedirect";
import { UpdateNewsRequest } from "@/types/news";
import { GetNewsSchema } from "@/validations/news";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type GetNewsSchemaType = z.infer<typeof GetNewsSchema>;

type NewsData = {
  news_image: string;
  news_title: string;
  news_body: string;
  news_date: string;
};

const UpdateDetailNewsPage = () => {
  useAuthRedirectLoginAdmin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const params = useParams();
  const [newsData, setNewsData] = useState<NewsData>({
    news_image: "",
    news_title: "",
    news_body: "",
    news_date: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GetNewsSchemaType>({
    resolver: zodResolver(GetNewsSchema),
  });

  useEffect(() => {
    if (error) {
      showErrorAlert("Terjadi Suatu Masalah", error);
    }
  }, [error]);

  useEffect(() => {
    const getNewsData = async () => {
      const news_id = params.id as string;

      try {
        const newsResponse = await getDetailNewsService(news_id);

        if (newsResponse.status === true) {
          const data = newsResponse.data;
          setNewsData({
            news_image: data.news_image,
            news_title: data.news_title,
            news_body: data.news_body,
            news_date: data.news_date,
          });

          setValue("title", data.news_title);
          setValue("body", data.news_body);
          setValue("image", data.news_image);
          setValue("date", data.news_date);
        }
      } catch (error) {
        console.log("Gagal mengambil data ", error);
      }
    };

    getNewsData();
  }, [setValue, params.id]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setImageBase64(base64);
        setValue("image", base64);
      } catch (error) {
        console.error(error);
        setError("Gagal membaca gambar");
      }
    }
  };

  const onSubmit = async (data: GetNewsSchemaType) => {
    setError(null);
    setLoading(true);

    if (!imageBase64) {
      setError("Gambar harus diunggah");
      setLoading(false);
      return;
    }

    try {
      const id = params.id as string;
      const formattedData: Partial<UpdateNewsRequest> = {};

      if (data.title !== newsData.news_title) {
        formattedData.title = data.title;
      }

      if (data.body !== newsData.news_body) {
        formattedData.body = data.body;
      }

      if (data.image !== newsData.news_image) {
        formattedData.image = data.image;
      }

      if (data.date !== newsData.news_date) {
        formattedData.date = dayjs(data.date).format("YYYY-MM-DD");
      }

      const result = await updateNewsAdminService(id, formattedData);
      if (result?.status === true) {
        const refresh = await getDetailNewsService(id);
        if (refresh.status === true) {
          const newData = refresh.data;
          setNewsData({
            news_image: newData.news_image,
            news_title: newData.news_title,
            news_body: newData.news_body,
            news_date: newData.news_date,
          });

          setValue("title", newData.news_title);
          setValue("body", newData.news_body);
          setValue("image", newData.news_image);
          setValue("date", newData.news_date);
        }

        await showSuccessAlert("Berita Berhasil Diperbarui", result.message);
      } else {
        await showErrorAlert("Berita Gagal Diperbarui", result?.message);
      }
    } catch (error: any) {
      await showErrorAlert("Terjadi Suatu Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md mb-8 p-8 rounded-xl space-y-6 w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create News</h2>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Image Header
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
          {newsData.news_image && (
            <Image
              src={newsData.news_image}
              alt="Preview"
              width={200}
              height={100}
              className="mt-4 w-full max-h-60 object-cover rounded-md"
            />
          )}
        </div>

        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Judul Berita"
            className="px-4 py-3 border rounded-md w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block mb-1 font-medium">
            Body
          </label>
          <textarea
            rows={6}
            {...register("body")}
            placeholder="Isi berita..."
            className="px-4 py-3 border rounded-md w-full"
          />
          {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-primaryTextColor text-white rounded-lg hover:bg-opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default UpdateDetailNewsPage;
