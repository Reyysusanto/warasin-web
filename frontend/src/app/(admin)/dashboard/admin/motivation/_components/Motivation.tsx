/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createMotivationService } from "@/services/dahsboardService/motivation/createMotivation";
import { getAllCategoryMotivation } from "@/services/dahsboardService/motivation/getAllCategoryMotivation";
import { GetAllMotivationsService } from "@/services/dahsboardService/motivation/getAllMotivation";
import { CategoryList } from "@/types/categoryMotivation";
import { MotivationList } from "@/types/motivation";
import { createMotivationSchema } from "@/validations/motivation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdDelete, MdModeEdit } from "react-icons/md";

type CreateMotivationSchemaType = z.infer<typeof createMotivationSchema>;

const MotivationSection = () => {
  const [motivations, setMotivations] = useState<MotivationList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [motivationForm, setMotivationForm] = useState({
    author: "",
    content: "",
    motivation_category_id: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMotivationSchemaType>({
    resolver: zodResolver(createMotivationSchema),
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCategoryMotivation();
        if (response.status === true) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch category motivation:", error);
      }
    };

    const fetchMotivation = async () => {
      try {
        const response = await GetAllMotivationsService();
        if (response.status === true) {
          setMotivations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch motivation:", error);
      }
    };

    fetchCategory();
    fetchMotivation();
  }, []);

  const onSubmit = async (data: CreateMotivationSchemaType) => {
    const formattedData = {
      author: data.author,
      content: data.content,
      motivation_category_id: data.motivation_category_id,
    };
    console.log(formattedData);

    try {
      setLoading(true);
      const result = await createMotivationService(formattedData);
      console.log(result);

      if (result.status) {
        setSuccess("Kategori motivasi berhasil ditambahkan");
      } else {
        setError("Kategori motivasi gagal ditambahkan");
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 p-6 bg-gray-50 min-h-screen">
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Pesan Motivasi</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="space-y-4 mb-4">
            <input
              type="text"
              className="border px-3 py-2 rounded w-full"
              placeholder="Penulis"
              {...register("author")}
              value={motivationForm.author}
              onChange={(e) =>
                setMotivationForm({ ...motivationForm, author: e.target.value })
              }
            />
            {errors.author && (
              <p className="text-red-500">{errors.author.message}</p>
            )}
            <textarea
              className="border px-3 py-2 rounded w-full"
              placeholder="Isi pesan motivasi"
              value={motivationForm.content}
              {...register("content")}
              onChange={(e) =>
                setMotivationForm({
                  ...motivationForm,
                  content: e.target.value,
                })
              }
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
            <select
              className="border px-3 py-2 rounded w-full"
              value={motivationForm.motivation_category_id}
              {...register("motivation_category_id")}
              onChange={(e) =>
                setMotivationForm({
                  ...motivationForm,
                  motivation_category_id: e.target.value,
                })
              }
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option
                  key={category.motivation_category_id}
                  value={category.motivation_category_id}
                >
                  {category.motivation_category_name}
                </option>
              ))}
            </select>
            {errors.motivation_category_id && (
              <p className="text-red-500">
                {errors.motivation_category_id.message}
              </p>
            )}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {motivations.map((motivation) => (
            <li
              key={motivation.motivation_id}
              className="bg-white border border-gray-200 rounded-lg shadow p-5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Author:{" "}
                  <span className="font-medium text-gray-700">
                    {motivation.motivation_author}
                  </span>
                </p>

                <p className="text-gray-800">{motivation.motivation_content}</p>

                <p className="text-xs text-gray-400">
                  Kategori:{" "}
                  <span className="inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">
                    {categories.find(
                      (category) =>
                        category.motivation_category_id ===
                        motivation.motivation_category.motivation_category_id
                    )?.motivation_category_name || "-"}
                  </span>
                </p>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    // setEditingMotivation(motivation);
                    setMotivationForm({
                      author: motivation.motivation_author,
                      content: motivation.motivation_content,
                      motivation_category_id:
                        motivation.motivation_category.motivation_category_id,
                    });
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  <MdModeEdit className="text-blue-600" />
                  <span className="text-blue-600">Edit</span>
                </button>

                <button
                  //   onClick={() =>
                  //     handleDeleteMotivation(motivation.motivation_id)
                  //   }
                  className="flex items-center gap-1 px-3 py-1 text-sm border border-red-200 rounded hover:bg-red-50 transition"
                >
                  <MdDelete className="text-red-600" />
                  <span className="text-red-600">Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MotivationSection;
