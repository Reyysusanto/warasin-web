/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { userDetailAdminSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCityService, getProvincesService } from "@/services/province";
import { City, Province } from "@/types/master";
import { UpdateUserAdminRequest } from "@/types/user";
import { updateUserAdminService } from "@/services/dahsboardService/user/updateUser";
import { useParams } from "next/navigation";
import Input from "./_components/Input";
import Options from "./_components/Option";
import { getUserDetailAdminService } from "@/services/dahsboardService/user/getDetailUser";
import BooleanOption from "./_components/BooleanOption";
import { Role } from "@/types/role";
import { getRoleService } from "@/services/role";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { useAuthRedirectLoginAdmin } from "@/services/useAuthRedirect";

type userDetailAdminSchemaType = z.infer<typeof userDetailAdminSchema>;

const genderOptions = [
  { label: "Laki-laki", value: false },
  { label: "Perempuan", value: true },
];

type UserData = {
  name: string;
  email: string;
  gender: boolean | null;
  phone_number: string;
  province_id: string;
  city_id: string;
  role_id: string;
};

const EditProfilePage = () => {
  useAuthRedirectLoginAdmin();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const params = useParams();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    gender: null,
    phone_number: "",
    province_id: "",
    city_id: "",
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
      phone_number: "",
      province: "",
      gender: null as boolean | null,
      city: "",
      role: "",
    },
  });

  useEffect(() => {
    const getUserData = async () => {
      const user_id = params.id as string;
      try {
        const response = await getUserDetailAdminService(user_id);
        if (response.status === true) {
          const data = response.data;
          setUserData({
            name: data.user_name,
            email: data.user_email,
            gender: data.user_gender,
            phone_number: data.user_phone_number,
            province_id: data.city?.province?.province_id || "",
            city_id: data.city?.city_id || "",
            role_id: data.role.role_id,
          });

          setValue("name", data.user_name);
          setValue("email", data.user_email);
          setValue("gender", data.user_gender);
          setValue("phone_number", data.user_phone_number);
          setValue("province", data.city?.province?.province_id || "");
          setValue("city", data.city?.city_id || "");
          setValue("role", data.role.role_id || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [setValue, params.id]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const user_id = params.id as string;
      try {
        const userResponse = await getUserDetailAdminService(user_id);

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

    fetchRoles();
    fetchInitialData();
  }, [params.id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvince) return;

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

      if (data.name !== userData.name) {
        formattedData.name = data.name;
      }

      if (data.email !== userData.email) {
        formattedData.email = data.email;
      }

      if (data.phone_number !== userData.phone_number) {
        formattedData.phone_number = data.phone_number;
      }

      if (data.city && data.city !== userData.city_id) {
        formattedData.city_id = data.city;
      }

      if (data.gender !== userData.gender) {
        formattedData.gender = data.gender;
      }

      if (data.province !== userData.province_id) {
        formattedData.province_id = data.province;
      }

      if (data.role !== userData.role_id) {
        formattedData.role_id = data.role;
      }

      const result = await updateUserAdminService(id, formattedData);

      if (result?.status === true) {
        await showSuccessAlert("User Berhasil Diperbarui", result.message);
        const refresh = await getUserDetailAdminService(id);
        if (refresh.status === true) {
          const newData = refresh.data;
          setUserData({
            name: newData.user_name,
            email: newData.user_email,
            gender: newData.user_gender,
            phone_number: newData.user_phone_number,
            province_id: newData.city?.province?.province_id ?? "",
            city_id: newData.city?.city_id ?? "",
            role_id: newData.role.role_id,
          });

          setValue("name", newData.user_name);
          setValue("email", newData.user_email);
          setValue("gender", newData.user_gender);
          setValue("phone_number", newData.user_phone_number);
          setValue("province", newData.city?.province?.province_id ?? "");
          setValue("city", newData.city?.city_id ?? "");
          setValue("role", newData.role.role_id ?? "");
        }
      } else {
        await showErrorAlert("User Gagal Diperbarui", result?.message);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        await showErrorAlert("User Gagal Diperbarui", error.message);
      } else {
        await showErrorAlert("Terjadi Suatu Kesalahan", error.message);
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
                value={userData.name}
                updateUser={formData("name")}
                onChange={handleInputChange}
                error={errors.name?.message}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                value={userData.email}
                updateUser={formData("email")}
                onChange={handleInputChange}
                error={errors.email?.message}
              />

              <Input
                id="phone_number"
                label="Nomor HP"
                type="text"
                value={userData.phone_number}
                updateUser={formData("phone_number")}
                onChange={handleInputChange}
                error={errors.phone_number?.message}
              />

              <BooleanOption
                id="gender"
                label="Gender"
                value={userData.gender}
                onChange={(id, value) => {
                  setValue("gender", value);
                }}
                options={genderOptions}
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

              <Options
                id="role"
                label="Role"
                value={userData.role_id}
                updateUser={formData("role")}
                onChange={(id, value) => {
                  handleOptionChange(id, value);
                  setValue("role", value);
                }}
                error={errors.role?.message}
                options={roles.map((role) => ({
                  optionId: role.role_id,
                  optionName: `${role.role_name}`,
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
          </form>
        </section>
      </main>
    </div>
  );
};

export default EditProfilePage;
