/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { createCategoryMotivationService } from "@/services/dahsboardService/motivation/createCategory";
import { deleteCategoryMotivationService } from "@/services/dahsboardService/motivation/deleteCategoryMotivation";
import { getAllCategoryMotivation } from "@/services/dahsboardService/motivation/getAllCategoryMotivation";
import { CategoryList } from "@/types/categoryMotivation";
import { createCategoryMotivationSchema } from "@/validations/categoryMotivation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateCategoryMotivationSchemaType = z.infer<
  typeof createCategoryMotivationSchema
>;

const CategorySection = () => {
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);

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

    fetchCategory();
  }, []);

  useEffect(() => {
    if (error) {
      showErrorAlert("Terjadi Suatu Masalah", error);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryMotivationSchemaType>({
    resolver: zodResolver(createCategoryMotivationSchema),
  });

  const onSubmit = async (data: CreateCategoryMotivationSchemaType) => {
    setError(null);
    const formattedData = {
      name: data.name,
    };

    try {
      setLoading(true);
      const result = await createCategoryMotivationService(formattedData);

      if (result.status) {
        await showSuccessAlert(
          "Kategori Motivasi Berhasil Ditambahkan",
          result.message
        );
      } else {
        await showErrorAlert(
          "Kategori Motivasi Gagal Ditambahkan",
          result.message
        );
      }
    } catch (error: any) {
      await showErrorAlert("Terjadi Suatu Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (category_id: string) => {
    try {
      const result = await deleteCategoryMotivationService(category_id);

      if (result.status === true) {
        setCategories((prev) =>
          prev.filter(
            (category) => category.motivation_category_id !== category_id
          )
        );
        await showSuccessAlert("Delete Category Successfully", result.message);
      }
    } catch (error: any) {
      await showErrorAlert("Terjadi Suatu Kesalahan", error.message);
    }
  };

  return (
    <div className="space-y-10 p-6 bg-gray-50">
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Kategori Motivasi</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.name && (
            <div className="border border-dashed border-dangerColor text-dangerColor px-3 py-2 mb-4 rounded-lg">
              <span>{errors.name.message}</span>
            </div>
          )}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              className="border px-3 py-2 rounded w-64"
              value={categoryInput}
              {...register("name")}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Nama Kategori"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <li
              key={category.motivation_category_id}
              className="bg-white p-4 rounded shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {category.motivation_category_name}
                </h3>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setCategoryInput(category.motivation_category_name);
                    // setEditingCategory(category); // Uncomment jika edit mode digunakan
                  }}
                  className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteCategory(category.motivation_category_id)
                  }
                  className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CategorySection;
