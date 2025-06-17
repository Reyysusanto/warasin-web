/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CreatePsychologService } from "@/services/dahsboardService/doctor/createPsycholog";
import { getCityService, getProvincesService } from "@/services/province";
import { getRoleService } from "@/services/role";
import { City, Province } from "@/types/master";
import { Role } from "@/types/role";
import { createPsychologSchema } from "@/validations/psycholog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormDescription";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import Image from "next/image";

type CreatePsychologSchemaType = z.infer<typeof createPsychologSchema>;

const AddDoctorForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedProvince, setSelectedProvince] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRole, setSelectedRole] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState({
    name: "",
    str_number: "",
    email: "",
    image: null,
    password: "",
    work_year: "",
    description: "",
    phone_number: "",
    city_id: "",
    role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePsychologSchemaType>({
    resolver: zodResolver(createPsychologSchema),
    defaultValues: {
      psy_name: "",
      psy_phone_number: "",
      psy_email: "",
      psy_password: "",
      psy_work_year: "",
      psy_description: "",
      psy_str_number: "",
      city_id: "",
      role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
    },
  });

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

    // Validasi ukuran file
    if (file.size > 2 * 1024 * 1024) {
      await showErrorAlert("Ukuran gambar terlalu besar", "Maksimal 2MB");
      resetFileInput();
      return;
    }

    // Validasi tipe file
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      await showErrorAlert(
        "Format tidak valid",
        "Hanya menerima JPG/JPEG/PNG/WEBP"
      );
      resetFileInput();
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = URL.createObjectURL(file);
      if (!imageUrl) throw new Error("Gagal membuat preview gambar");

      const base64 = await fileToBase64(file);

      setPreview(imageUrl);
      setImageFile(file);
      setValue("psy_image", base64, { shouldValidate: true });
    } catch (error) {
      console.error("Error processing image:", error);
      await showErrorAlert("Error", "Gagal memproses gambar");
      resetFileInput();
    } finally {
      setIsUploading(false);
    }
  };

  // Fungsi untuk reset input file
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
    setImageFile(null);
    setValue("psy_image", null);
  };

  useEffect(() => {
    if (error) {
      showErrorAlert("Terjadi Suatu Masalah", error);
    }
  }, [error]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvincesService();
        if (response.status === true) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getRoleService();
        if (response && response.status === true) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data role", error);
      }
    };

    fetchProvinces();
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvince) return;

      try {
        const response = await getCityService(selectedProvince);
        if (response?.status === true) {
          setCities(response.data);
          setValue("city_id", "");
        }
      } catch (error) {
        console.error("Gagal mengambil data kota", error);
      }
    };

    fetchCities();
  }, [selectedProvince, setValue]);

  const onSubmit = async (data: CreatePsychologSchemaType) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = {
      name: data.psy_name,
      str_number: data.psy_str_number,
      email: data.psy_email,
      image: imageFile,
      password: data.psy_password,
      work_year: data.psy_work_year,
      description: data.psy_description,
      phone_number: data.psy_phone_number,
      city_id: data.city_id,
      role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
    };
    console.log(payload);

    try {
      const result = await CreatePsychologService(payload);
      console.log(result);
      if (result.status === true) {
        await showSuccessAlert("Create Psycholog Berhasil", result.message);
        setSelectedProvince("");
        setCities([]);
      } else {
        await showErrorAlert("Create Psycholog Gagal", result.message);
      }
    } catch (err: any) {
      await showErrorAlert("Terjadi Suatu Kesalahan", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md mb-6 p-6 rounded-lg space-y-5 w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Add New Doctor
      </h2>

      {success && <p className="text-green-500 text-sm">{success}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="w-32 h-32">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
            id="profile-image"
          />
          <label
            htmlFor="profile-image"
            className={`cursor-pointer w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 hover:shadow-md transition ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {preview && (
              <Image
                height={128}
                width={128}
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </label>
          {errors.psy_image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.psy_image.message}
            </p>
          )}
        </div>

        <FormInput
          label="Psycholog Name"
          id="name"
          placeholder="psycholog name"
          register={register("psy_name")}
          error={errors.psy_name}
          value={formData.name}
        />

        <FormInput
          label="Psycholog Email"
          id="email"
          placeholder="psycholog@gmail.com"
          register={register("psy_email")}
          error={errors.psy_email}
          value={formData.email}
        />

        <FormInput
          label="Psycholog Password"
          type="password"
          id="password"
          placeholder="*************"
          register={register("psy_password")}
          error={errors.psy_password}
          value={formData.password}
        />

        <FormInput
          label="Phone Number"
          id="phoneNumber"
          placeholder="08*********"
          register={register("psy_phone_number")}
          error={errors.psy_phone_number}
          value={formData.phone_number}
        />

        <FormInput
          label="STR Number"
          id="strNumber"
          placeholder="ST*******"
          register={register("psy_str_number")}
          error={errors.psy_str_number}
          value={formData.str_number}
        />

        <FormInput
          label="Work Year"
          id="workYear"
          placeholder="2005"
          register={register("psy_work_year")}
          error={errors.psy_work_year}
          value={formData.work_year}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Provinsi --</option>
            {provinces.map((prov) => (
              <option key={prov.province_id} value={prov.province_id}>
                {prov.province_name}
              </option>
            ))}
          </select>
        </div>

        <FormSelect
          label="Kota"
          id="city_id"
          options={cities.map((city) => ({
            label: `${city.city_type} ${city.city_name}`,
            value: city.city_id,
          }))}
          register={register("city_id")}
          error={errors.city_id}
        />

        <FormSelect
          label="Peran"
          id="role_id"
          options={roles.map((role) => ({
            label: role.role_name,
            value: role.role_id,
          }))}
          register={register("role_id")}
          value={formData.role_id}
          onChange={(e) => setSelectedRole(e.target.value)}
          disabled={true}
        />
      </div>

      <FormTextarea
        label="Description"
        id="psy_description"
        placeholder="Brief description about the doctor"
        register={register("psy_description")}
        error={errors.psy_description}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition"
        disabled={loading}
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctorForm;
