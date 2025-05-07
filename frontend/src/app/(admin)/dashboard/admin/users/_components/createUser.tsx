"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { createUserSchema } from "@/validations/user";
import { getCityService, getProvincesService } from "@/services/province";
import { createUserService } from "@/services/dahsboardService/createUser";

type CreateUserSchemaType = z.infer<typeof createUserSchema>;

type Province = {
  province_id: string;
  province_name: string;
};

type City = {
  city_id: string;
  city_name: string;
  city_type: string;
};

const AddUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvincesService();
        if(response.status === true) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi", error);
      }
    };

    fetchProvinces();
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

  const onSubmit = async (data: CreateUserSchemaType) => {
    setLoading(true);

    const formattedData = {
      ...data,
    };

    console.log(formattedData)

    try {
      const result = await createUserService(formattedData);
      if (result) {
        alert("User berhasil ditambahkan");
        reset();
        setSelectedProvince("");
        setCities([]);
      } else {
        alert("Gagal menambahkan user");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Tambah User Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block">Nama</label>
          <input {...register("name")} className="input" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block">Email</label>
          <input type="email" {...register("email")} className="input" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block">Password</label>
          <input type="password" {...register("password")} className="input" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label className="block">Jenis Kelamin</label>
          <select
            {...register("gender", {
              setValueAs: (value) =>
                value === "" ? undefined : value === "true",
            })}
            className="input"
          >
            <option value="false">Laki-laki</option>
            <option value="true">Perempuan</option>
          </select>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        <div>
          <label className="block">Tanggal Lahir</label>
          <input type="date" {...register("birth_date")} className="input" />
          <p className="text-red-500 text-sm">{errors.birth_date?.message}</p>
        </div>

        <div>
          <label className="block">Nomor HP</label>
          <input type="text" {...register("phone_number")} className="input" />
          <p className="text-red-500 text-sm">{errors.phone_number?.message}</p>
        </div>

        <div>
          <label className="block">Provinsi</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="input"
          >
            <option value="">-- Pilih Provinsi --</option>
            {provinces.map((prov) => (
              <option key={prov.province_id} value={prov.province_id}>
                {prov.province_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Kota</label>
          <select {...register("city_id")} className="input">
            <option value="">-- Pilih Kota --</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_type} {city.city_name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.city_id?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Tambah User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
