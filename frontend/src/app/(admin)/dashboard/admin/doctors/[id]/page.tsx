/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCityService, getProvincesService } from "@/services/province";
import { getRoleService } from "@/services/role";
import { City, Province } from "@/types/region";
import { Role } from "@/types/role";
import { getDetailPsychologSchema } from "@/validations/psycholog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./_components/FormInput";
import FormSelect from "./_components/FormSelect";
import FormTextarea from "./_components/FormDescription";
import { useParams } from "next/navigation";
import { getDetailPsychologService } from "@/services/dahsboardService/doctor/getDetailPsycholog";
import { updatePsychologAdminService } from "@/services/dahsboardService/doctor/updatePsycholog";
import { z } from "zod";
import { Education, Specialization } from "@/types/psycholog";

type GetDetailPsychologSchemaType = z.infer<typeof getDetailPsychologSchema>;

const DetailDoctorPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRole, setSelectedRole] = useState("");
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    str_number: "",
    email: "",
    password: "",
    work_year: "",
    description: "",
    phone_number: "",
    city_id: "",
    role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
    language_id: [] as string[],
    specialization: [] as Specialization[],
    education: [] as Education[],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GetDetailPsychologSchemaType>({
    resolver: zodResolver(getDetailPsychologSchema),
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

  useEffect(() => {
    const getPsychologData = async () => {
      const psy_id = params.id as string;
      try {
        const response = await getDetailPsychologService(psy_id);
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
            role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
            language_id: data.language.map((lang) => lang.lang_name),
            specialization: data.specialization,
            education: data.education,
          });

          setValue("psy_name", data.psy_name);
          setValue("psy_str_number", data.psy_str_number);
          setValue("psy_email", data.psy_email);
          setValue("psy_password", data.psy_password);
          setValue("psy_work_year", data.psy_work_year);
          setValue("psy_description", data.psy_description);
          setValue("psy_phone_number", data.psy_phone_number);
          setValue("city_id", data.city.city_id);
          setValue("role_id", "dc3f6a8e-4875-4297-a285-4f2439595ee2");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPsychologData();
  }, [setValue, params.id, formData]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const psy_id = params.id as string;
      try {
        const userResponse = await getDetailPsychologService(psy_id);

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

    fetchInitialData();
    fetchRoles();
  }, [params.id]);

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

  const onSubmit = async (data: GetDetailPsychologSchemaType) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    setFormData({
      name: data.psy_name,
      str_number: data.psy_str_number,
      email: data.psy_email,
      password: data.psy_password,
      work_year: data.psy_work_year,
      description: data.psy_description,
      phone_number: data.psy_phone_number,
      city_id: data.city_id,
      role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
      language_id: data.language,
      specialization: data.specialization,
      education: data.education,
    });

    console.log(formData);

    try {
      const id = params.id as string;

      const result = await updatePsychologAdminService(id, formData);
      if (result?.status === true) {
        setSuccess("Psycholog berhasil ditambahkan");
        const refresh = await getDetailPsychologService(id);
        if (refresh.status === true) {
          const newData = refresh.data;
          setFormData({
            name: newData.psy_name,
            str_number: newData.psy_str_number,
            email: newData.psy_email,
            password: newData.psy_password,
            work_year: newData.psy_work_year,
            description: newData.psy_description,
            phone_number: newData.psy_phone_number,
            city_id: newData.city.city_id,
            role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
            language_id: newData.language.map((lang) => lang.lang_id),
            specialization: newData.specialization,
            education: newData.education,
          });

          setValue("psy_name", newData.psy_name);
          setValue("psy_str_number", newData.psy_str_number);
          setValue("psy_email", newData.psy_email);
          setValue("psy_password", newData.psy_password);
          setValue("psy_work_year", newData.psy_work_year);
          setValue("psy_description", newData.psy_description);
          setValue("psy_phone_number", newData.psy_phone_number);
          setValue("city_id", newData.city.city_id);
          setValue("role_id", "dc3f6a8e-4875-4297-a285-4f2439595ee2");
        }
      } else {
        setError("Gagal menambahkan psycholog");
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
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
        <FormInput
          label="Psycholog Name"
          id="name"
          placeholder="psycholog name"
          register={register("psy_name")}
          error={errors.psy_name}
          onChange={handleInputChange}
          value={formData.name}
        />

        <FormInput
          label="Psycholog Email"
          id="email"
          placeholder="psycholog@gmail.com"
          register={register("psy_email")}
          error={errors.psy_email}
          onChange={handleInputChange}
          value={formData.email}
        />

        <FormInput
          label="Psycholog Password"
          type="password"
          id="password"
          placeholder="*************"
          register={register("psy_password")}
          error={errors.psy_password}
          onChange={handleInputChange}
          value={formData.password}
        />

        <FormInput
          label="Phone Number"
          id="phone_number"
          placeholder="08*********"
          onChange={handleInputChange}
          register={register("psy_phone_number")}
          error={errors.psy_phone_number}
          value={formData.phone_number}
        />

        <FormInput
          label="STR Number"
          id="strNumber"
          onChange={handleInputChange}
          placeholder="ST*******"
          register={register("psy_str_number")}
          error={errors.psy_str_number}
          value={formData.str_number}
        />

        <FormInput
          label="Work Year"
          id="workYear"
          placeholder="2005"
          onChange={handleInputChange}
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
          value={formData.city_id}
          options={cities.map((city) => ({
            label: `${city.city_type} ${city.city_name}`,
            value: city.city_id,
          }))}
          onChange={handleOptionChange}
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
          disabled={true}
        />
      </div>

      <FormTextarea
        label="Description"
        id="description"
        value={formData.description}
        onChange={handleTextAreaChange}
        placeholder="Brief description about the doctor"
        register={register("psy_description")}
        error={errors.psy_description}
      />

      {formData.language_id.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Bahasa yang Dikuasai
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            {formData.language_id.map((name) => (
              <input
                key={name}
                type="text"
                id={name}
                value={name}
                disabled={true}
                className="w-full px-3 py-2 border rounded-md shadow-sm text-primaryTextColor"
              />
            ))}
          </div>
        </div>
      )}

      {formData.specialization.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Spesialis Dokter
          </h3>
          <div className="flex flex-col gap-4 text-sm text-prima">
            {formData.specialization.map((spec) => (
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

      {formData.education.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Riwayat Pendidikan
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-prima">
            {formData.education.map((edu) => (
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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
};

export default DetailDoctorPage;
