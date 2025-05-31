/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCityService, getProvincesService } from "@/services/province";
import { getRoleService } from "@/services/role";
import { City, Province } from "@/types/master";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import FormInput from "./_components/FormInput";
import FormSelect from "./_components/FormSelect";
import FormTextarea from "./_components/FormDescription";
import { useParams } from "next/navigation";
import { getDetailPsychologService } from "@/services/dahsboardService/doctor/getDetailPsycholog";
import { updatePsychologAdminService } from "@/services/dahsboardService/doctor/updatePsycholog";
import {
  Education,
  Language,
  PsychologRequest,
  Specialization,
} from "@/types/psycholog";
import { getAllLanguageService } from "@/services/dahsboardService/doctor/getAllLanguage";
import { FaTrashAlt } from "react-icons/fa";
import { getAllSpecializationService } from "@/services/dahsboardService/doctor/getAllSpecialization";
import EducationForm from "./_components/FormEducation";

const DetailDoctorPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [language, setLanguage] = useState<Language[]>([]);
  const [specialization, setSpecialization] = useState<Specialization[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [educationInput, setEducationInput] = useState({
    edu_degree: "",
    edu_major: "",
    edu_institution: "",
    edu_graduation_year: "",
  });

  const selectedDataSpecialization = specialization.find(
    (item) => item.spe_id === selectedSpecialization
  );

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
    language: [] as Language[] | null,
    specialization: [] as Specialization[] | null,
    education: [] as Education[] | null,
  });

  // Validation function
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    }

    if (!formData.str_number.trim()) {
      errors.str_number = "STR number is required";
    }

    if (!formData.work_year.trim()) {
      errors.work_year = "Work year is required";
    }

    if (!formData.city_id) {
      errors.city_id = "City is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
            role_id: data.role.role_id,
            language: data.language,
            specialization: data.specialization,
            education: data.education,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPsychologData();
  }, [params.id]);

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

    const fetchLanguage = async () => {
      try {
        const response = await getAllLanguageService();
        if (response.status === true) {
          setLanguage(response.data.language_master);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSpecialization = async () => {
      try {
        const response = await getAllSpecializationService();
        if (response.status === true) {
          setSpecialization(response.data.specialization);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();
    fetchRoles();
    fetchLanguage();
    fetchSpecialization();
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
  }, [selectedProvince, formData.city_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[id]) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[id]) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleOptionChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear validation error when user makes selection
    if (validationErrors[id]) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleAddLanguage = () => {
    const selected = language.find((lang) => lang.lang_id === selectedLanguage);
    if (!selected) return;

    setFormData((prev) => {
      const existing = prev.language || [];

      const alreadyExists = existing.some(
        (lang) => lang.lang_id === selected.lang_id
      );

      if (alreadyExists) return prev;

      return {
        ...prev,
        language: [...existing, selected],
      };
    });

    setSelectedLanguage("");
  };

  const handleAddSpecialization = () => {
    if (!selectedDataSpecialization) return;

    setFormData((prev) => {
      const existing = prev.specialization || [];

      const alreadyExists = existing.some(
        (spec) => spec.spe_id === selectedDataSpecialization.spe_id
      );

      if (alreadyExists) return prev;

      return {
        ...prev,
        specialization: [...existing, selectedDataSpecialization],
      };
    });

    setSelectedSpecialization("");
  };

  const handleDeleteLanguage = (langId: string) => {
    setFormData((prev) => ({
      ...prev,
      language: prev.language?.filter((lang) => lang.lang_id !== langId) || [],
    }));
  };

  const handleDeleteSpecialization = (specId: string) => {
    setFormData((prev) => ({
      ...prev,
      specialization:
        prev.specialization?.filter((spe) => spe.spe_id !== specId) || [],
    }));
  };

  const handleDeleteEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddEducation = () => {
    const { edu_degree, edu_major, edu_institution, edu_graduation_year } =
      educationInput;

    if (!edu_degree || !edu_major || !edu_institution || !edu_graduation_year) {
      alert("Harap lengkapi semua field pendidikan!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          edu_degree,
          edu_major,
          edu_institution,
          edu_graduation_year,
        },
      ],
    }));

    setEducationInput({
      edu_degree: "",
      edu_major: "",
      edu_institution: "",
      edu_graduation_year: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const id = params.id as string;
      const formattedData: Partial<PsychologRequest> = {};

      // Only include changed fields
      const originalData = await getDetailPsychologService(id);
      if (originalData.status === true) {
        const original = originalData.data;

        if (formData.name !== original.psy_name) {
          formattedData.name = formData.name;
        }

        if (formData.email !== original.psy_email) {
          formattedData.email = formData.email;
        }

        if (formData.str_number !== original.psy_str_number) {
          formattedData.str_number = formData.str_number;
        }

        if (formData.password !== original.psy_password) {
          formattedData.password = formData.password;
        }

        if (formData.phone_number !== original.psy_phone_number) {
          formattedData.phone_number = formData.phone_number;
        }

        if (formData.work_year !== original.psy_work_year) {
          formattedData.work_year = formData.work_year;
        }

        if (formData.description !== original.psy_description) {
          formattedData.description = formData.description;
        }

        if (formData.city_id && formData.city_id !== original.city.city_id) {
          formattedData.city_id = formData.city_id;
        }

        if (formData.role_id !== original.role.role_id) {
          formattedData.role_id = formData.role_id;
        }

        const isLanguageChanged =
          JSON.stringify(formData.language) !==
          JSON.stringify(original.language);

        const isSpecializationChanged =
          JSON.stringify(formData.specialization) !==
          JSON.stringify(original.specialization);

        const isEducationChanged =
          JSON.stringify(formData.education) !==
          JSON.stringify(original.education);

        if (isLanguageChanged && formData.language) {
          formattedData.language_master = formData.language.map(
            (lang: any) => lang.lang_id
          );
        }

        if (isSpecializationChanged && formData.specialization) {
          formattedData.specialization = formData.specialization.map(
            (spe: any) => spe.spe_id
          );
        }

        if (isEducationChanged && formData.education) {
          formattedData.education = formData.education;
        }
      }

      const result = await updatePsychologAdminService(id, formattedData);

      if (result?.status === true) {
        setSuccess("Psycholog berhasil diperbarui");
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
            role_id: newData.role.role_id,
            language: newData.language,
            specialization: newData.specialization,
            education: newData.education,
          });
        }
      } else {
        setError("Gagal memperbarui psycholog");
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md mb-6 p-6 rounded-lg space-y-5 w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Edit Doctor Details
      </h2>

      {success && <p className="text-green-500 text-sm">{success}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          label="Psycholog Name"
          id="name"
          type="text"
          error={validationErrors.name}
          onChange={handleInputChange}
          value={formData.name}
        />

        <FormInput
          label="Psycholog Email"
          id="email"
          type="email"
          error={validationErrors.email}
          onChange={handleInputChange}
          value={formData.email}
        />

        <FormInput
          label="Psycholog Password"
          type="password"
          id="password"
          error={validationErrors.password}
          onChange={handleInputChange}
          value={formData.password}
        />

        <FormInput
          label="Phone Number"
          id="phone_number"
          type="text"
          onChange={handleInputChange}
          error={validationErrors.phone_number}
          value={formData.phone_number}
        />

        <FormInput
          label="STR Number"
          id="str_number"
          onChange={handleInputChange}
          error={validationErrors.str_number}
          value={formData.str_number}
        />

        <FormInput
          label="Work Year"
          id="work_year"
          onChange={handleInputChange}
          error={validationErrors.work_year}
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
            <option value="">Pilih Provinsi</option>
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
        />

        <FormSelect
          label="Peran"
          id="role_id"
          options={roles.map((role) => ({
            label: role.role_name,
            value: role.role_id,
          }))}
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
        error={validationErrors.description}
      />

      <section className="flex flex-col border rounded-lg py-3 px-2">
        <h1 className="text-primaryTextColor text-xl font-semibold">Bahasa</h1>
        <div className="flex flex-col w-full gap-3 my-2 items-center">
          <div className="flex flex-col w-full mb-2">
            <label
              htmlFor="lang_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pilih Bahasa
            </label>
            <select
              id="lang_id"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Pilih Bahasa</option>
              {language.map((option) => (
                <option key={option.lang_id} value={option.lang_id}>
                  {option.lang_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddLanguage}
            type="button"
            className="rounded-lg bg-successColor w-full hover:scale-105 transition-all text-white px-3 py-2"
          >
            Tambahkan
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Bahasa yang Dikuasai
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            {formData.language?.map((lang) => (
              <div
                key={lang.lang_id}
                className="flex px-3 py-2 items-center justify-between border rounded-md"
              >
                <p id={lang.lang_id} className="w-full text-primaryTextColor">
                  {lang.lang_name}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteLanguage(lang.lang_id)}
                  className="p-2 bg-red-100 rounded hover:bg-red-200 transition-all hover:scale-105"
                >
                  <FaTrashAlt className="text-dangerColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col border rounded-lg py-3 px-2">
        <h1 className="text-primaryTextColor text-xl font-semibold">
          Spesialis Dokter
        </h1>
        <div className="flex flex-col gap-3 my-2 mb-4">
          <label
            htmlFor="spe_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Jenis Spesialisasi
          </label>
          <div className="flex flex-col w-full mb-2">
            <label
              htmlFor="spe_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pilih Jenis Spesialisasi
            </label>
            <select
              id="spe_id"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="" disabled={true}>
                Pilih Jenis Spesialisasi
              </option>
              {specialization.map((option) => (
                <option key={option.spe_id} value={option.spe_id}>
                  {option.spe_name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="spe_desc"
            id="spe_desc"
            value={selectedDataSpecialization?.spe_desc || ""}
            disabled={true}
            rows={4}
            placeholder="Deskripsi Spesialisasi"
            className="w-full px-3 py-2 border rounded-md shadow-sm text-primaryTextColor"
          ></textarea>
          <button
            type="button"
            onClick={handleAddSpecialization}
            className="rounded-lg bg-successColor hover:scale-105 transition-all text-white px-3 py-2"
          >
            Tambahkan
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-primaryTextColor mb-1">
            Daftar Spesialisasi
          </h3>
          <div className="flex flex-col gap-4 text-sm text-prima">
            {formData.specialization?.map((spec) => (
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
                <button
                  type="button"
                  onClick={() => handleDeleteSpecialization(spec.spe_id)}
                  className="flex items-center justify-center gap-2 p-2 bg-red-100 rounded hover:bg-red-200 transition-all hover:scale-105"
                >
                  <FaTrashAlt className="text-dangerColor" />
                  <p className="font-semibold text-primaryTextColor">
                    Delete Specialization
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col border rounded-lg py-3 px-2">
        <h1 className="text-primaryTextColor text-xl font-semibold">
          Riwayat Pendidikan
        </h1>
        <div className="flex flex-col my-3 gap-2">
          <div className="grid grid-cols-2 gap-3">
            <EducationForm
              id="edu_degree"
              label="Tingkat Pendidikan"
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
                  edu_degree: e.target.value,
                })
              }
              placeholder="S1"
              value={educationInput.edu_degree}
            />
            <EducationForm
              id="edu_major"
              label="Program Studi"
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
                  edu_major: e.target.value,
                })
              }
              placeholder="Sistem Informasi"
              value={educationInput.edu_major}
            />
          </div>
          <EducationForm
            id="edu_institution"
            label="Institusi"
            placeholder="Universitas Airlangga"
            value={educationInput.edu_institution}
            onChange={(e) =>
              setEducationInput({
                ...educationInput,
                edu_institution: e.target.value,
              })
            }
          />
          <EducationForm
            id="edu_graduation_year"
            label="Tahun Lulus"
            placeholder="2023"
            value={educationInput.edu_graduation_year}
            onChange={(e) =>
              setEducationInput({
                ...educationInput,
                edu_graduation_year: e.target.value,
              })
            }
          />
          <button
            className="rounded-lg bg-successColor hover:scale-105 transition-all text-white px-3 py-2"
            onClick={handleAddEducation}
            type="button"
          >
            Tambahkan
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-medium text-primaryTextColor mb-1">
            Riwayat Pendidikan {formData.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-prima">
            {formData.education?.map((edu, index) => (
              <div
                className="flex flex-col border-tertiaryTextColor border gap-2 px-2 py-3 rounded-md"
                key={`${edu.edu_degree}-${edu.edu_graduation_year}-${edu.edu_institution}`}
              >
                <textarea
                  rows={4}
                  disabled={true}
                  defaultValue={`${edu.edu_degree} ${edu.edu_major}\n${edu.edu_graduation_year}\n${edu.edu_institution}`}
                  className="w-full px-3 py-2 font-normal border rounded-md shadow-sm bg-orange-100"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteEducation(index)}
                  className="flex items-center justify-center gap-2 p-2 bg-red-100 rounded hover:bg-red-200 transition-all hover:scale-105"
                >
                  <FaTrashAlt className="text-dangerColor" />
                  <p className="font-semibold text-primaryTextColor">
                    Delete Education
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
