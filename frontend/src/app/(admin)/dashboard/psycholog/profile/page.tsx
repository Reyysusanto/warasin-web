/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Input from "./_components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetPsychologDetailService } from "@/services/dashboardPsychologService/profile/getDetailProfile";
import { getCityService, getProvincesService } from "@/services/province";
import Options from "./_components/Option";
import { psychologDetailSchema } from "@/validations/psycholog";
import { City, Province } from "@/types/region";

type psychologDetailAdminSchemaType = z.infer<typeof psychologDetailSchema>;

export default function AdminPsychologProfile() {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [userData, setUserData] = useState({
    psy_name: "",
    psy_str_number: "",
    psy_email: "",
    psy_work_year: "",
    psy_description: "",
    psy_phone_number: "",
    psy_image: "",
    city_id: "",
    province_id: "",
  });

  const {
    register: formData,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<psychologDetailAdminSchemaType>({
    resolver: zodResolver(psychologDetailSchema),
    defaultValues: {
      psy_name: "",
      psy_str_number: "",
      psy_email: "",
      psy_work_year: "",
      psy_description: "",
      psy_phone_number: "",
      psy_image: "",
      city_id: "",
      province_id: "",
    },
  });

  useEffect(() => {
    const getPsychologData = async () => {
      try {
        const response = await GetPsychologDetailService();
        if (response.status === true) {
          const data = response.data;
          setUserData({
            psy_name: data.psy_name,
            psy_str_number: data.psy_str_number,
            psy_email: data.psy_email,
            psy_work_year: data.psy_work_year,
            psy_description: data.psy_description,
            psy_phone_number: data.psy_phone_number,
            psy_image: data.psy_image,
            city_id: data.city.city_id || "",
            province_id: data.city.province.province_id || "",
          });
          setValue("psy_name", data.psy_name);
          setValue("psy_email", data.psy_email);
          setValue("psy_str_number", data.psy_str_number);
          setValue("psy_work_year", data.psy_work_year);
          setValue("psy_description", data.psy_description);
          setValue("psy_phone_number", data.psy_phone_number);
          setValue("psy_image", data.psy_image);
          setValue("city_id", data.city.city_id);
          setValue("province_id", data.city.province.province_id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPsychologData();
  }, [setValue]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await GetPsychologDetailService();

        if (userResponse.status && userResponse.data) {
          const userProvince = userResponse.data.city?.province;

          if (userProvince?.province_id) {
            const provinceId = userProvince.province_id ?? "";
            setSelectedProvince(provinceId);
            setUserData((prev) => ({
              ...prev,
              province: userProvince.province_id,
            }));
          }
        }

        const provincesResponse = await getProvincesService();
        if (provincesResponse?.status === true) {
          setProvinces(provincesResponse.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data awal provinsi dan user", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvince) return;

      try {
        console.log(userData.province_id);
        const response = await getCityService(selectedProvince);
        if (response?.status === true) {
          setCities(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data kota", error);
      }
    };

    fetchCities();
  }, [selectedProvince, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOptionChange = (id: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: psychologDetailAdminSchemaType) => {
    setLoading(true);

    try {
      console.log("hai");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Profil Psikolog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="Nama Lengkap"
          type="text"
          updateUser={formData("psy_name")}
          value={userData.psy_name}
          onChange={handleInputChange}
          error={errors.psy_name?.message}
          isRequired={true}
        />
        <Input
          id="strId"
          label="Nomor STR"
          type="text"
          updateUser={formData("psy_str_number")}
          value={userData.psy_str_number}
          onChange={handleInputChange}
          error={errors.psy_str_number?.message}
          isRequired={true}
        />
        <Input
          id="email"
          label="Email"
          type="text"
          updateUser={formData("psy_email")}
          value={userData.psy_email}
          onChange={handleInputChange}
          error={errors.psy_email?.message}
          isRequired={true}
        />
        <Input
          id="workYear"
          label="Tahun Praktik"
          type="text"
          updateUser={formData("psy_work_year")}
          value={userData.psy_work_year}
          onChange={handleInputChange}
          error={errors.psy_work_year?.message}
          isRequired={true}
        />
        <Input
          id="description"
          label="Deskripsi"
          type="text"
          updateUser={formData("psy_description")}
          value={userData.psy_description}
          onChange={handleInputChange}
          error={errors.psy_description?.message}
          isRequired={false}
        />
        <Input
          id="phoneNumber"
          label="Nomer Telepon"
          type="text"
          updateUser={formData("psy_phone_number")}
          value={userData.psy_phone_number}
          onChange={handleInputChange}
          error={errors.psy_phone_number?.message}
          isRequired={true}
        />

        {/* <Input
          label="Gambar"
          name="image"
          type="file"
          onChange={userData.psy_image}
          previewUrl={imagePreview ?? ""}
        /> */}

        <Options
          id="province"
          label="Provinsi"
          updateUser={formData("province_id")}
          onChange={(id, value) => {
            handleOptionChange(id, value);
            setSelectedProvince(value);
            setValue("province_id", value);
            setValue("city_id", "");
            setUserData((prev) => ({
              ...prev,
              city_id: "",
            }));
          }}
          value={userData.province_id}
          options={provinces.map((p) => ({
            optionId: p.province_id,
            optionName: p.province_name,
          }))}
        />

        <Options
          id="city"
          label="Kota"
          updateUser={formData("city_id")}
          value={userData.city_id}
          onChange={(id, value) => {
            handleOptionChange(id, value);
            setValue("city_id", value);
          }}
          options={cities.map((c) => ({
            optionId: c.city_id,
            optionName: c.city_name,
          }))}
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
