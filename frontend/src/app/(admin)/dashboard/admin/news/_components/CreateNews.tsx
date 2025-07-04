/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { createNewsService } from "@/services/dahsboardService/news/createNews";
import { CreateNewsSchema } from "@/validations/news";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateNewsSchemaType = z.infer<typeof CreateNewsSchema>;

const CreateNews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateNewsSchemaType>({
    resolver: zodResolver(CreateNewsSchema),
  });

  useEffect(() => {
    if (error) {
      showErrorAlert("Terjadi Suatu Masalah", error);
    }
  }, [error]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar (Maksimal 2MB)");
      return;
    }

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      setError("Format file tidak didukung (Hanya JPG/JPEG/PNG/WEBP)");
      return;
    }

    try {
      const imageUrl = URL.createObjectURL(file);
      if (!imageUrl) throw new Error("Gagal membuat preview gambar");

      const base64 = await fileToBase64(file);

      setPreviewUrl(imageUrl);
      setImageFile(file);
      setValue("image", base64, { shouldValidate: true });
    } catch (error) {
      console.error("Error processing image:", error);
      await showErrorAlert("Error", "Gagal memproses gambar");
    }
  };

  const onSubmit = async (data: CreateNewsSchemaType) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formattedData = {
      title: data.title,
      body: data.body,
      image: imageFile,
      date: dayjs().format("YYYY-MM-DD"),
    };

    try {
      const result = await createNewsService(formattedData);
      if (result?.status) {
        await showSuccessAlert("Berita Berhasil Ditambahkan", result.message);
        location.reload();
      } else {
        await showErrorAlert("Berita Gagal Ditambahkan", result?.message);
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

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

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

          {previewUrl && (
            <Image
              height={80}
              width={200}
              src={previewUrl}
              alt="Preview"
              className="max-w-xs max-h-40"
            />
          )}
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
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
          {loading ? "Mengirim..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
