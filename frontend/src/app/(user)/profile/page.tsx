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
import { Province } from "@/types/region";

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

const genderOptions = [
  { optionId: "male", optionName: "Laki-laki" },
  { optionId: "female", optionName: "Perempuan" },
  { optionId: "other", optionName: "Lainnya" },
];

type userDetailSchemaType = z.infer<typeof userDetailSchema>;

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const [provinceOptions, setProvinceOptions] = useState<
    { optionId: string; optionName: string }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    { optionId: string; optionName: string }[]
  >([]);
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    phone: "",
    gender: "",
    province: "",
    city: "",
    birth_date: "",
  });

  const {
    register: formData,
    handleSubmit,
    formState: { errors },
  } = useForm<userDetailSchemaType>({
    resolver: zodResolver(userDetailSchema),
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserDetailService();
        if (response?.data) {
          setUserData({
            user_name: response.data.user_name,
            user_email: response.data.user_email,
            phone: response.data.role.role_name,
            gender: response.data.user_name || "",
            province: response.data.city?.province?.province_id || "",
            city: response.data.city?.city_id || "",
            birth_date: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await getProvincesService();
        if (res.status == true) {
          const province = res.data.map(
            (prov: {
              province_id: string;
              province_name: string;
            }): Province => ({
              id: prov.province_id,
              name: prov.province_name,
            })
          );

          const formattedProvinces = province.map((prov) => ({
            optionId: prov.id,
            optionName: prov.name,
          }));

          setProvinceOptions(formattedProvinces);
        }
      } catch (error) {
        console.error("Gagal fetch provinsi:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!userData.province) return;

      console.log("🟡 Province ID yang dikirim:", userData.province);

      try {
        const res = await getCityService(userData.province);
        if (res?.status == true) {
          const city = res.data.map(
            (city: { city_id: string; city_name: string }) => ({
              id: city.city_id,
              name: city.city_name,
            })
          );

          const formattedCity = city.map((city) => ({
            optionId: city.id,
            optionName: city.name,
          }));

          setCityOptions(formattedCity);
        }
      } catch (error) {
        console.error("Gagal fetch kota:", error);
      }
    };

    fetchCities();
  }, [userData.province]);

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
    console.log("Form data before submit:", data);
    
    try {
      const finalData = {
        ...userData,
        ...data,
        birth_date: selectedDate?.toISOString() || "",
      };
      const success = await updateDetailUser(finalData);

      if (success?.status == true) {
        console.log("Data berhasil diperbarui");
      } else {
        console.log("Data gagal diperbarui");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Terjadi kesalahan yang tidak diketahui");
      }
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
                  id="user_name"
                  label="Nama Lengkap"
                  type="text"
                  updateUser={formData("name")}
                  value={userData.user_name}
                  onChange={handleInputChange}
                  error={errors.name?.message}
                  isRequired={true}
                />
                <Input
                  id="phone"
                  label="Nomor Handphone"
                  type="text"
                  value={userData.phone}
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
                    <div className="flex items-center justify-between px-3 w-full mb-6 border border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor">
                      <DatePicker
                        id="birth_date"
                        selected={selectedDate}
                        onChange={(date: Date | null) => {
                          setSelectedDate(date);
                          setUserData((prev) => ({
                            ...prev,
                            birth_date: date ? date.toISOString() : "",
                          }));
                        }}
                        dateFormat="dd/MM/yyyy"
                        className="w-full rounded-md p-2 bg-transparent focus:ring-0 focus:outline-none"
                      />
                      <FaCalendarAlt className="text-xl text-primaryTextColor" />
                    </div>
                  </div>
                </div>
                <Options
                  id="gender"
                  label="Gender"
                  onChange={handleOptionChange}
                  options={genderOptions}
                />
                <Options
                  id="province"
                  label="Provinsi"
                  onChange={handleOptionChange}
                  value={userData.province}
                  options={provinceOptions}
                />
                <Options
                  id="city"
                  label="Kota"
                  value={userData.city}
                  onChange={handleOptionChange}
                  options={cityOptions}
                />
                <Input
                  id="user_email"
                  label="Email"
                  type="email"
                  updateUser={formData("email")}
                  error={errors.email?.message}
                  onChange={handleInputChange}
                  value={userData.user_email}
                  isRequired={false}
                />
              </div>

              <button
                type="submit"
                className="flex items-center hover:bg-blue-500 gap-2 w-fit bg-primaryColor text-white py-3 px-4 rounded-md text-base font-semibold hover:bg-primaryColorDark"
              >
                Simpan Perubahan
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
