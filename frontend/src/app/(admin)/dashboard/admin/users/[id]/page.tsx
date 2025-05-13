"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getUserDetailService } from "@/services/detailUser";
import { z } from "zod";
import { userDetailAdminSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCityService, getProvincesService } from "@/services/province";
import { City, Province } from "@/types/region";
import dayjs from "dayjs";
import { UpdateUserAdminRequest } from "@/types/user";
import { updateUserAdminService } from "@/services/dahsboardService/user/updateUser";
import { useParams } from "next/navigation";
import Input from "./_components/Input";
import GenderOption from "./_components/GenderOption";
import Options from "./_components/Option";

type userDetailAdminSchemaType = z.infer<typeof userDetailAdminSchema>;

const EditProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const params = useParams();
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    user_gender: false,
    user_phone_number: "",
    province_id: "",
    city_id: "",
    user_birth_date: "",
    role_id: "",
  });

  const {
    register: formData,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userDetailAdminSchemaType>({
    resolver: zodResolver(userDetailAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      no_hp: "",
      province: "",
      city: "",
      birth_date: undefined,
      role: "",
    },
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserDetailService();
        if (response.status === true) {
          const data = response.data;
          console.log(data);
          setUserData({
            user_name: data.user_name,
            user_email: data.user_email,
            user_gender: false,
            user_phone_number: data.user_phone_number,
            province_id: data.city?.province?.province_id || "",
            city_id: data.city?.city_id || "",
            user_birth_date: data.user_birth_date,
            role_id: data.role.role_id,
          });

          setValue("name", data.user_name);
          setValue("email", data.user_email);
          setValue("gender", false);
          setValue("no_hp", data.user_phone_number);
          setValue("province", data.city?.province?.province_id || "");
          setValue("city", data.city?.city_id || "");
          if (data.user_birth_date) {
            setSelectedDate(new Date(data.user_birth_date));
            setValue("birth_date", new Date(data.user_birth_date));
          }
          setValue("role", data.role.role_id || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [setValue]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await getUserDetailService();

        if (userResponse.status && userResponse.data) {
          const userProvince = userResponse.data.city?.province;

          if (userProvince) {
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
      if (!userData.province_id) return;

      try {
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

  const onSubmit = async (data: userDetailAdminSchemaType) => {
    setLoading(true);
    try {
      const id = params.id as string;
      const formattedData: Partial<UpdateUserAdminRequest> = {};

      if (data.name !== userData.user_name) {
        formattedData.name = data.name;
      }

      if (data.email !== userData.user_email) {
        formattedData.email = data.email;
      }

      if (data.no_hp !== userData.user_phone_number) {
        formattedData.user_phone_number = data.no_hp;
      }

      if (data.city && data.city !== userData.city_id) {
        formattedData.city_id = data.city;
      }

      if (data.province !== userData.province_id) {
        formattedData.province_id = data.province;
      }

      const submittedBirthDate = dayjs(data.birth_date).toISOString();
      if (submittedBirthDate !== userData.user_birth_date) {
        formattedData.user_birth_date = submittedBirthDate;
      }

      if (data.role !== userData.role_id) {
        formattedData.role_id = data.role;
      }

      const result = await updateUserAdminService(id, formattedData);

      if (result?.status === true) {
        alert("User berhasil diupdate");
        const refresh = await getUserDetailService();
        if (refresh.status === true) {
          const newData = refresh.data;
          setUserData({
            user_name: newData.user_name,
            user_email: newData.user_email,
            user_gender: Boolean(newData.is_verified),
            user_phone_number: newData.user_phone_number,
            province_id: newData.city?.province?.province_id ?? "",
            city_id: newData.city?.city_id ?? "",
            user_birth_date: newData.user_birth_date,
            role_id: newData.role.role_id,
          });

          setValue("name", newData.user_name);
          setValue("email", newData.user_email);
          setValue("no_hp", newData.user_phone_number);
          setValue("province", newData.city?.province?.province_id ?? "");
          setValue("city", newData.city?.city_id ?? "");
          if (newData.user_birth_date) {
            const dt = new Date(newData.user_birth_date);
            setSelectedDate(dt);
            setValue("birth_date", dt);
          }
        }
      } else {
        alert("Gagal mengupdate user");
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
    <div className="w-full min-h-screen overflow-hidden bg-white scroll-smooth">
      <main className="flex flex-col items-center px-16 pt-10 pb-10 gap-14">
        <section className="flex flex-col w-full gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-1">
              <Input
                id="name"
                label="Nama Lengkap"
                type="text"
                value={userData.user_name}
                updateUser={formData("name")}
                onChange={handleInputChange}
                error={errors.name?.message}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                value={userData.user_email}
                updateUser={formData("email")}
                onChange={handleInputChange}
                error={errors.email?.message}
              />

              <Input
                id="no_hp"
                label="Nomor HP"
                type="text"
                value={userData.user_phone_number}
                updateUser={formData("no_hp")}
                onChange={handleInputChange}
                error={errors.no_hp?.message}
              />

              <GenderOption
                id="gender"
                label="Jenis Kelamin"
                value={userData.user_gender}
                updateUser={formData("gender")}
                error={errors.gender?.message}
                onChange={(id, value) => {
                  const booleanValue = value === "true";
                  setUserData((prev) => ({
                    ...prev,
                    user_gender: booleanValue,
                  }));
                  setValue("gender", booleanValue);
                }}
              />

              <Options
                id="province"
                label="Provinsi"
                value={userData.province_id}
                updateUser={formData("province")}
                onChange={(id, value) => {
                  handleOptionChange(id, value);
                  setSelectedProvince(value);
                  setValue("province", value);
                }}
                error={errors.province?.message}
                options={provinces.map((p) => ({
                  optionId: p.province_id,
                  optionName: p.province_name,
                }))}
              />

              <Options
                id="city"
                label="Kota"
                value={userData.city_id}
                updateUser={formData("city")}
                onChange={(id, value) => {
                  handleOptionChange(id, value);
                  setValue("city", value);
                }}
                error={errors.city?.message}
                options={cities.map((c) => ({
                  optionId: c.city_id,
                  optionName: `${c.city_type} ${c.city_name}`,
                }))}
              />
            </div>

            <button
              type="submit"
              className="flex items-center hover:bg-blue-500 gap-2 w-fit bg-primaryColor text-white py-3 px-4 rounded-md text-base font-semibold hover:bg-primaryColorDark"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            {/* <div>
              <label className="block">Nama</label>
              <input {...register("name")} className="px-3 py-2 input w-full" />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <label className="block">Email</label>
              <input
                type="email"
                {...register("email")}
                className="px-3 py-2 input w-full"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block">Password</label>
              <input
                type="password"
                {...register("password")}
                className="px-3 py-2 input w-full"
              />
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
              <input
                type="date"
                {...register("birth_date")}
                className="px-3 py-2 input w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.birth_date?.message}
              </p>
            </div>

            <div>
              <label className="block">Nomor HP</label>
              <input
                type="text"
                {...register("phone_number")}
                className="px-3 py-2 input w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.phone_number?.message}
              </p>
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
              <select
                {...register("city_id")}
                className="px-3 py-2 input w-full"
              >
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
            </button> */}
          </form>
        </section>
      </main>
    </div>
  );
};

export default EditProfilePage;
