"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./_components/Input";
import Options from "./_components/Option";
import {
  getUserDetailService,
  updateDetailUserService,
} from "@/services/detailUser";
import { z } from "zod";
import { userDetailSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCityService, getProvincesService } from "@/services/province";
import { City, Province } from "@/types/master";
import dayjs from "dayjs";
import { UpdateDetailUserRequest } from "@/types/user";
import GenderOption from "./_components/GenderOption";
import { ConsultationUser } from "@/types/consultation";
import { getAllConsultationUserService } from "@/services/users/consultation/getAllConsultation";

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

type userDetailSchemaType = z.infer<typeof userDetailSchema>;

type UserData = {
  user_name: string;
  user_email: string;
  user_gender: boolean | null;
  user_phone_number: string;
  province_id: string;
  city_id: string;
  user_birth_date: string;
};

const getStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return "Menunggu Konsultasi";
    case 1:
      return "Dibatalkan";
    case 2:
      return "Selesai";
    default:
      return "Tidak Diketahui";
  }
};

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [consultations, setConsultations] = useState<ConsultationUser[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [userData, setUserData] = useState<UserData>({
    user_name: "",
    user_email: "",
    user_gender: null,
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
      birth_date: new Date(),
      gender: null as boolean | null,
    },
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserDetailService();
        if (response.status === true) {
          const data = response.data;
          setUserData({
            user_name: data.user_name,
            user_email: data.user_email,
            user_gender: data.user_gender || null,
            user_phone_number: data.user_phone_number,
            province_id: data.city?.province?.province_id || "",
            city_id: data.city?.city_id || "",
            user_birth_date: data.user_birth_date,
          });

          setValue("name", data.user_name);
          setValue("email", data.user_email);
          setValue("gender", data.user_gender);
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

  useEffect(() => {
    const fetchConsultations = async () => {
      const result = await getAllConsultationUserService();

      if (result.status === true) {
        setConsultations(result.data.consultation);
      }
    };

    fetchConsultations();
  }, []);

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
        formattedData.phone_number = data.no_hp;
      }

      if (data.city !== userData.city_id) {
        formattedData.city_id = data.city;
      }

      if (data.province !== userData.province_id) {
        formattedData.province_id = data.province;
      }

      if (data.gender !== userData.user_gender) {
        formattedData.gender = data.gender;
      }

      const submittedBirthDate = dayjs(data.birth_date).format("YYYY-MM-DD");
      if (submittedBirthDate !== userData.user_birth_date) {
        formattedData.birth_date = submittedBirthDate;
      }

      const result = await updateDetailUserService(formattedData);

      if (result.status === true) {
        alert("User berhasil diupdate");
        const refresh = await getUserDetailService();
        console.log(refresh);
        if (refresh.status === true) {
          const newData = refresh.data;
          setUserData({
            user_name: newData.user_name,
            user_email: newData.user_email,
            user_gender: newData.user_gender,
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
            setSelectedDate(new Date(newData.user_birth_date));
            setValue("birth_date", new Date(newData.user_birth_date));
          }
          setValue("gender", newData.user_gender);
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
            src={"/Images/default_profile.png"}
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
                      <input
                        type="date"
                        id="birth_date"
                        value={
                          selectedDate
                            ? dayjs(selectedDate).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          setSelectedDate(date);
                          setValue("birth_date", date || new Date());
                          setUserData((prev) => ({
                            ...prev,
                            birth_date: date
                              ? dayjs(date).format("YYYY-MM-DD")
                              : "",
                          }));
                        }}
                        className="w-full rounded-md p-2 bg-transparent focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  {errors.birth_date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birth_date.message}
                    </p>
                  )}
                </div>

                <GenderOption
                  id="gender"
                  label="Gender"
                  value={userData.user_gender}
                  onChange={(id, value) => {
                    setValue("gender", value);
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
                    setValue("city", "");
                    setUserData((prev) => ({
                      ...prev,
                      city_id: "",
                    }));
                    console.log(userData);
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
            <div className="rounded-md min-h-screen">
              <h1 className="text-3xl font-bold text-primaryTextColor mb-8">
                Riwayat Konsultasi
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {consultations.map((consultation) => {
                  const statusText = getStatusLabel(consultation.consul_status);
                  const dateFormatted = new Date(
                    consultation.consul_date
                  ).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <div
                      key={consultation.consul_id}
                      className={`
                      relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl 
                      transition-all duration-300 transform hover:-translate-y-1 
                      border-l-4 ${
                        consultation.consul_status === 0
                          ? "border-l-amber-400"
                          : consultation.consul_status === 1
                          ? "border-l-red-400"
                          : consultation.consul_status === 2
                          ? "border-l-green-400"
                          : ""
                      } group
                    `}
                    >
                      {/* Header with gradient background */}
                      <div
                        className={`${
                          consultation.consul_status === 0
                            ? "bg-gradient-to-r from-amber-50 to-orange-50"
                            : consultation.consul_status === 1
                            ? "bg-gradient-to-r from-red-50 to-pink-50"
                            : consultation.consul_status === 2
                            ? "bg-gradient-to-r from-green-50 to-emerald-50"
                            : ""
                        } px-6 pt-6 pb-4`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`
                              inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                              ${
                                consultation.consul_status === 0
                                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                                  : consultation.consul_status === 1
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : consultation.consul_status === 2
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : ""
                              }
                            `}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                consultation.consul_status === 0
                                  ? "bg-amber-400"
                                  : consultation.consul_status === 1
                                  ? "bg-red-400"
                                  : "bg-green-400"
                              }`}
                            ></div>
                            {statusText}
                          </div>

                          <div className="flex items-center text-yellow-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.291c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.291a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold">
                              {consultation.consul_rate}
                            </span>
                          </div>
                        </div>

                        {/* Psychologist Info */}
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              height={80}
                              width={80}
                              src={
                                consultation.psycholog.psy_image ||
                                "/Images/default_profile.png"
                              }
                              alt="Foto Psikolog"
                              className="object-cover w-20 h-20 rounded-xl ring-4 ring-white/50"
                            />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold text-gray-900 truncate">
                              {consultation.psycholog.psy_name}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {consultation.psycholog.psy_description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Psikolog Profesional
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Consultation Details */}
                      <div className="px-6 py-5 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                          Detail Konsultasi
                        </h3>

                        <div className="space-y-3">
                          {/* Date & Time */}
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {dateFormatted}
                              </p>
                              <p className="text-sm text-gray-600">
                                {consultation.available_slot.slot_start} -{" "}
                                {consultation.available_slot.slot_end} WIB
                              </p>
                            </div>
                          </div>

                          {/* Method */}
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                Online (Video Call)
                              </p>
                              <p className="text-sm text-gray-600">
                                Konsultasi virtual
                              </p>
                            </div>
                          </div>

                          {/* Comment */}
                          {consultation.consul_comment && (
                            <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300">
                              <p className="text-xs font-medium text-gray-700 mb-1">
                                Komentar:
                              </p>
                              <p className="text-sm text-gray-600 italic">
                                {consultation.consul_comment}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-6 pb-6">
                        {consultation.consul_status === 0 && (
                          <div className="flex space-x-3">
                            <button
                              className="
                        flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium 
                        py-3 px-4 rounded-xl transition-all duration-200 
                        transform hover:scale-105 hover:shadow-lg
                        flex items-center justify-center space-x-2
                      "
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              <span>Batalkan Konsultasi</span>
                            </button>
                          </div>
                        )}

                        {consultation.consul_status === 2 && (
                          <div className="flex space-x-3">
                            <button
                              className="
                        flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                        text-white text-sm font-medium py-3 px-4 rounded-xl 
                        transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                        flex items-center justify-center space-x-2
                      "
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span>Lihat Rekap Konsultasi</span>
                            </button>
                          </div>
                        )}

                        {consultation.consul_status === 1 && (
                          <div className="text-center py-2">
                            <p className="text-sm text-gray-500 italic">
                              Konsultasi dibatalkan
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
