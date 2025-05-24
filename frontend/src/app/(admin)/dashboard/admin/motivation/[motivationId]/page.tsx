/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllCategoryMotivation } from "@/services/dahsboardService/motivation/getAllCategoryMotivation";
import { CategoryList } from "@/types/categoryMotivation";
import { createMotivationSchema } from "@/validations/motivation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDetailMotivationService } from "@/services/dahsboardService/motivation/getDetailMotivation";
import { useParams } from "next/navigation";
import { updateMotivationService } from "@/services/dahsboardService/motivation/updateMotivation";
import Input from "./_components/FormInput";
import Textarea from "./_components/FormTextArea";
import Options from "./_components/FormSelect";

type CreateMotivationSchemaType = z.infer<typeof createMotivationSchema>;

const UpdateMotivation = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [motivationForm, setMotivationForm] = useState({
    author: "",
    content: "",
    motivation_category_id: "",
  });

  const {
    register: formData,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMotivationSchemaType>({
    resolver: zodResolver(createMotivationSchema),
  });

  useEffect(() => {
    const fetchMotivation = async () => {
      const id = params.motivationId as string;

      try {
        const response = await getDetailMotivationService(id);
        if (response.status === true) {
          const motivationData = response.data;
          setMotivationForm({
            author: motivationData.motivation_author,
            content: motivationData.motivation_content,
            motivation_category_id:
              motivationData.motivation_category.motivation_category_id,
          });

          setValue("author", motivationData.motivation_author);
          setValue("content", motivationData.motivation_content);
          setValue(
            "motivation_category_id",
            motivationData.motivation_category.motivation_category_id
          );
        }
      } catch (error) {
        console.error("Failed to fetch motivation:", error);
      }
    };

    fetchMotivation();
  }, [setValue, params.motivationId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const id = params.motivationId as string;

      try {
        const motivationResponse = await getDetailMotivationService(id);
        if (motivationResponse.status === true) {
          const motivationCategory =
            motivationResponse.data.motivation_category;

          if (motivationCategory) {
            const categoryId = motivationCategory.motivation_category_id;
            setSelectedCategory(categoryId);
            setMotivationForm((prev) => ({
              ...prev,
              motivation_category_id: motivationCategory.motivation_category_id,
            }));
          }
        }

        const categoryResponse = await getAllCategoryMotivation();
        if (categoryResponse.status === true) {
          setCategories(categoryResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch category motivation:", error);
      }
    };

    fetchCategory();
  }, [params.motivationId]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getAllCategoryMotivation();
        if (response.status === true) {
          setCategories(response.data);

          if (!motivationForm.motivation_category_id) {
            setValue("motivation_category_id", "");
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data kategori", error);
      }
    };

    getCategory();
  }, [setValue, motivationForm.motivation_category_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMotivationForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOptionChange = (id: string, value: string) => {
    setMotivationForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMotivationForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = async (data: CreateMotivationSchemaType) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const id = params.motivationId as string;

      const result = await updateMotivationService(id, data);
      console.log("data diubah");
      console.log(result);
      if (result.status === true) {
        setSuccess("Motivasi berhasil diperbarui");
        const refresh = await getDetailMotivationService(id);
        if (refresh.status === true) {
          const newData = refresh.data;
          setMotivationForm({
            content: newData.motivation_content,
            author: newData.motivation_author,
            motivation_category_id:
              newData.motivation_category.motivation_category_id,
          });

          setValue("author", newData.motivation_author);
          setValue("content", newData.motivation_content);
          setValue(
            "motivation_category_id",
            newData.motivation_category.motivation_category_id
          );
        }
      } else {
        setError("Gagal memperbarui motivasi");
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
            <Input
              id="author"
              label="Author"
              type="text"
              placeholder="Elena Nad"
              updateMotivation={formData("author")}
              onChange={handleInputChange}
              error={errors.author?.message}
            />
            <Textarea
              label="Content"
              id="content"
              onChange={handleTextAreaChange}
              placeholder="Isi pesan motivasi"
              updateMotivation={formData("content")}
              error={errors.content?.message}
            />
            <Options
              id="category"
              label="Category"
              value={selectedCategory}
              updateUser={formData("motivation_category_id")}
              onChange={(id, value) => {
                handleOptionChange(id, value);
                setSelectedCategory(value);
                setValue("motivation_category_id", value);
              }}
              error={errors.motivation_category_id?.message}
              options={categories.map((category) => ({
                optionId: category.motivation_category_id,
                optionName: category.motivation_category_name,
              }))}
            />
            {/* <select
              className="border px-3 py-2 rounded w-full"
              {...formData("motivation_category_id")}
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
            </select> */}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Mengirim..." : "Perbarui Data"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateMotivation;
