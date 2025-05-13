/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createCategoryMotivationService } from "@/services/dahsboardService/motivation/createCategory";
import { createCategoryMotivationSchema } from "@/validations/categoryMotivation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateCategoryMotivationSchemaType = z.infer<
  typeof createCategoryMotivationSchema
>;

const MotivationSection = () => {
  //   const [categories, setCategories] = useState<CategoryList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryMotivationSchemaType>({
    resolver: zodResolver(createCategoryMotivationSchema),
  });

  const onSubmit = async (data: CreateCategoryMotivationSchemaType) => {
    const formattedData = {
      name: data.name,
    };

    try {
      setLoading(true);
      const result = await createCategoryMotivationService(formattedData);

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
        <h2 className="text-xl font-bold mb-4">Kategori Motivasi</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              className="border px-3 py-2 rounded w-64"
              value={categoryInput}
              {...register("name")}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Nama Kategori"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>
        {/* <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center">
              <span>{cat.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingCategory(cat);
                    setCategoryInput(cat.name);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul> */}
      </section>
    </div>
  );
};

export default MotivationSection;
