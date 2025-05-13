"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./_components/Input";
import Options from "./_components/Option";
import HistoryConsultation from "./_components/historyConsultation";
import { getUserDetailService, updateDetailUser } from "@/services/detailUser";
import { z } from "zod";
import { userDetailSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCityService, getProvincesService } from "@/services/province";
import { City, Province } from "@/types/region";
import dayjs from "dayjs";
import { UpdateDetailUserRequest } from "@/types/user";
import GenderOption from "./_components/GenderOption";

const options = [
  {
    key: "personal",
    label: "Personal",
  },
  {
    key: "history",
    label: "Consultation History",
  },
];

// const genderOptions = [
//   { optionId: "male", optionName: "Laki-laki" },
//   { optionId: "female", optionName: "Perempuan" },
//   { optionId: "other", optionName: "Lainnya" },
// ];

type userDetailSchemaType = z.infer<typeof userDetailSchema>;

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    user_gender: false,
    user_phone_number: "",
    province_id: "",
    city_id: "",
    user_birth_date: "",
  });

  const {
    register: formData,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userDetailSchemaType>({
    resolver: zodResolver(userDetailSchema),
    defaultValues: {
      name: "",
      email: "",
      no_hp: "",
      province: "",
      city: "",
      birth_date: undefined,
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

  const onSubmit = async (data: userDetailSchemaType) => {
    setLoading(true);

    try {
      const formattedData: Partial<UpdateDetailUserRequest> = {};

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

      const result = await updateDetailUser(formattedData);

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
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white scroll-smooth">
      <NavigationBar />

      <main className="flex flex-col items-center px-16 pt-32 pb-20 gap-20">
        <div className="flex flex-col md:w-1/2 items-center gap-6">
          <Image
            src={"/Images/FAQ.png"}
            height={250}
            width={250}
            alt="Profile"
            className="rounded-full object-cover size-60"
          />
          <div className="flex flex-col text-center">
            <h3 className="text-primaryTextColor font-bold text-xl">
              {userData.user_name}
            </h3>
            <p className="text-primaryTextColor text-sm">
              {userData.user_email}
            </p>
          </div>
        </div>

        <section className="flex flex-col w-full gap-10">
          <div className="flex w-full md:w-1/2 justify-between border-b-2">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedTab(option.key)}
                className={`w-1/2 py-2 text-lg font-semibold ${
                  selectedTab === option.key
                    ? "text-primaryColor border-b-4 border-primaryColor"
                    : "text-tertiaryTextColor hover:text-primaryColor text-lg"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {selectedTab == "personal" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6"
            >
              <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                <Input
                  id="name"
                  label="Nama Lengkap"
                  type="text"
                  updateUser={formData("name")}
                  value={userData.user_name}
                  onChange={handleInputChange}
                  error={errors.name?.message}
                  isRequired={true}
                />

                <Input
                  id="email"
                  label="Email"
                  type="email"
                  updateUser={formData("email")}
                  error={errors.email?.message}
                  onChange={handleInputChange}
                  value={userData.user_email}
                  isRequired={false}
                />

                <Input
                  id="no_hp"
                  label="Nomor Handphone"
                  type="text"
                  value={userData.user_phone_number}
                  error={errors.no_hp?.message}
                  updateUser={formData("no_hp")}
                  onChange={handleInputChange}
                  isRequired={true}
                />
                <div className="flex flex-col gap-y-3">
                  <h3 className="text-sm md:text-base text-primaryTextColor">
                    Tanggal Lahir
                  </h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between px-3 w-full border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
                      <DatePicker
                        id="birth_date"
                        selected={selectedDate}
                        onChange={(date: Date | null) => {
                          setSelectedDate(date);
                          setUserData((prev) => ({
                            ...prev,
                            birth_date: date
                              ? dayjs().format("YYYY-MM-DD")
                              : "",
                          }));
                        }}
                        dateFormat="dd/MM/yyyy"
                        className="w-full rounded-md p-2 bg-transparent focus:ring-0 focus:outline-none"
                      />
                      <FaCalendarAlt className="text-xl text-primaryTextColor" />
                    </div>
                  </div>
                </div>

                <GenderOption
                  id="gender"
                  label="Gender"
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
                  updateUser={formData("province")}
                  onChange={(id, value) => {
                    handleOptionChange(id, value);
                    setSelectedProvince(value);
                    setValue("province", value);
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
                  updateUser={formData("city")}
                  value={userData.city_id}
                  onChange={(id, value) => {
                    handleOptionChange(id, value);
                    setValue("city", value);
                  }}
                  options={cities.map((c) => ({
                    optionId: c.city_id,
                    optionName: c.city_name,
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
          )}

          {selectedTab !== "personal" && (
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
              <HistoryConsultation />
              <HistoryConsultation />
              <HistoryConsultation />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
