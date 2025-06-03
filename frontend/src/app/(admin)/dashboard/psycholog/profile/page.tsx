"use client";

import { getCityService, getProvincesService } from "@/services/province";
import { City, Province } from "@/types/master";
import {
  psychologSchema,
} from "@/validations/psycholog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Education, Language, Specialization } from "@/types/psycholog";
import FormInput from "./_components/Input";
import FormSelect from "./_components/Option";
import FormTextarea from "./_components/TextArea";
import { getPsychologDetailService } from "@/services/dashboardPsychologService/profile/getDetailProfile";

type GetDetailPsychologSchemaType = z.infer<typeof psychologSchema>;

const UpdateProfilePage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    str_number: "",
    email: "",
    password: "",
    work_year: "",
    description: "",
    phone_number: "",
    city_id: "",
    language: [] as Language[] | null,
    specialization: [] as Specialization[] | null,
    education: [] as Education[] | null,
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<GetDetailPsychologSchemaType>({
    resolver: zodResolver(psychologSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      password: "",
      work_year: "",
      description: "",
      str_number: "",
      city_id: "",
      language: [] as Language[] | null,
      specialization: [] as Specialization[] | null,
      education: [] as Education[] | null,
    },
  });

  useEffect(() => {
    const getPsychologData = async () => {
      try {
        const response = await getPsychologDetailService();
        if (response.status === true) {
          const data = response.data;
          setFormData({
            name: data.psy_name,
            str_number: data.psy_str_number,
            email: data.psy_email,
            password: data.psy_password,
            work_year: data.psy_work_year,
            description: data.psy_description,
            phone_number: data.psy_phone_number,
            city_id: data.city.city_id,
            language: data.language,
            specialization: data.specialization,
            education: data.education,
          });

          setValue("name", data.psy_name);
          setValue("str_number", data.psy_str_number);
          setValue("email", data.psy_email);
          setValue("password", data.psy_password);
          setValue("work_year", data.psy_work_year);
          setValue("description", data.psy_description);
          setValue("phone_number", data.psy_phone_number);
          setValue("city_id", data.city.city_id);
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
        const userResponse = await getPsychologDetailService();

        if (userResponse.status && userResponse.data) {
          const userProvince = userResponse.data.city?.province;

          if (userProvince) {
            const provinceId = userProvince.province_id ?? "";
            setSelectedProvince(provinceId);
            setFormData((prev) => ({
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

          if (!formData.city_id) {
            setValue("city_id", "");
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data kota", error);
      }
    };

    fetchCities();
  }, [selectedProvince, setValue, formData.city_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOptionChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="bg-white shadow-md mb-6 p-6 rounded-lg space-y-5 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        My Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          label="Psycholog Name"
          id="name"
          type="text"
          updateData={register("name")}
          error={errors.name?.message}
          onChange={handleInputChange}
          value={formData.name}
        />

        <FormInput
          label="Psycholog Email"
          id="email"
          type="text"
          updateData={register("email")}
          error={errors.email?.message}
          onChange={handleInputChange}
          value={formData.email}
        />

        <FormInput
          label="Phone Number"
          id="phone_number"
          type="text"
          onChange={handleInputChange}
          updateData={register("phone_number")}
          error={errors.phone_number?.message}
          value={formData.phone_number}
        />

        <FormInput
          label="STR Number"
          id="str_number"
          onChange={handleInputChange}
          updateData={register("str_number")}
          error={errors.str_number?.message}
          value={formData.str_number}
        />

        <FormInput
          label="Work Year"
          id="work_year"
          onChange={handleInputChange}
          updateData={register("work_year")}
          error={errors.work_year?.message}
          value={formData.work_year}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <select
            disabled={true}
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
          value={formData.city_id}
          options={cities.map((city) => ({
            label: `${city.city_type} ${city.city_name}`,
            value: city.city_id,
          }))}
          onChange={handleOptionChange}
          register={register("city_id")}
          error={errors.city_id}
        />
      </div>

      <FormTextarea
        label="Description"
        id="description"
        value={formData.description}
        onChange={handleTextAreaChange}
        placeholder="Brief description about the doctor"
        register={register("description")}
        error={errors.description?.message}
      />

      {/* Language Section */}
      <section id="language">
        {formData.language!.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-primaryTextColor mb-1">
              Bahasa yang Dikuasai
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              {formData.language!.map((lang) => (
                <input
                  key={lang.lang_id}
                  type="text"
                  id={lang.lang_id}
                  value={lang.lang_name}
                  disabled={true}
                  className="w-full px-3 py-2 border rounded-md shadow-sm text-primaryTextColor"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {formData.specialization!.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Spesialis Dokter
          </h3>
          <div className="flex flex-col gap-4 text-sm text-prima">
            {formData.specialization!.map((spec) => (
              <div
                className="flex flex-col border-tertiaryTextColor border gap-2 px-2 py-3 rounded-md"
                key={spec.spe_id}
              >
                <input
                  type="text"
                  id={spec.spe_id}
                  value={spec.spe_name}
                  disabled={true}
                  className="w-full px-3 py-2 border rounded-md shadow-sm font-semibold bg-blue-200 text-primaryTextColor"
                />
                <textarea
                  rows={3}
                  disabled={true}
                  defaultValue={spec.spe_desc}
                  className="w-full px-3 py-2 border rounded-md shadow-sm bg-purple-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.education!.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Riwayat Pendidikan
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-prima">
            {formData.education!.map((edu) => (
              <div
                className="flex flex-col border-tertiaryTextColor border gap-2 px-2 py-3 rounded-md"
                key={edu.edu_id}
              >
                <textarea
                  rows={3}
                  disabled={true}
                  defaultValue={`${edu.edu_degree} ${edu.edu_major}\n${edu.edu_graduation_year}\n${edu.edu_institution}`}
                  className="w-full px-3 py-2 font-normal border rounded-md shadow-sm bg-red-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfilePage;
