"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { createUserSchema } from "@/validations/user";
import dayjs from "dayjs";
import { getCityService, getProvincesService } from "@/services/province";
import { createUserService } from "@/services/dahsboardService/user/createUser";
import { getRoleService } from "@/services/role";
import { City, Province } from "@/types/region";
import { Role } from "@/types/role";

type CreateUserSchemaType = z.infer<typeof createUserSchema>;

const AddUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
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
    
    const fetchRoles = async () => {
      try {
        const response = await getRoleService();
        if(response && response.status === true) {
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

  const onSubmit = async (data: CreateUserSchemaType) => {
    setLoading(true);
    const formattedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      phone_number: data.phone_number,
      city_id: data.city_id,
      birth_date: dayjs(data.birth_date).format("DD-MM-YYYY"),
      role_id: data.role_id,
    };
    console.log(formattedData)

    try {
      const result = await createUserService(formattedData);
      console.log(result)
      if (result) {
        alert("User berhasil ditambahkan");
        setSelectedProvince("");
        setSelectedRole("");
        setCities([]);
      } else {
        alert("Gagal menambahkan user");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Tambah User Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block">Nama</label>
          <input {...register("name")} className="px-3 py-2 input w-full" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block">Email</label>
          <input type="email" {...register("email")} className="px-3 py-2 input w-full" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block">Password</label>
          <input type="password" {...register("password")} className="px-3 py-2 input w-full" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label className="block">Jenis Kelamin</label>
          <select
            {...register("gender", {
              setValueAs: (value) =>
                value === "" ? undefined : value === "true",
            })}
            className="px-3 py-2 input w-full"
          >
            <option value="false">Laki-laki</option>
            <option value="true">Perempuan</option>
          </select>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        <div>
          <label className="block">Tanggal Lahir</label>
          <input type="date" {...register("birth_date")} className="px-3 py-2 input w-full" />
          <p className="text-red-500 text-sm">{errors.birth_date?.message}</p>
        </div>

        <div>
          <label className="block">Nomor HP</label>
          <input type="text" {...register("phone_number")} className="px-3 py-2 input w-full" />
          <p className="text-red-500 text-sm">{errors.phone_number?.message}</p>
        </div>

        <div>
          <label className="block">Provinsi</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3 py-2 input w-full"
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
          <select {...register("city_id")} className="px-3 py-2 input w-full">
            <option value="">-- Pilih Kota --</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_type} {city.city_name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.city_id?.message}</p>
        </div>

        <div>
          <label className="block">Peran</label>
          <select
            value={selectedRole}
            {...register("role_id")}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 input w-full"
          >
            <option value="">-- Pilih Peran --</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </select>
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
