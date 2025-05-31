/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CreatePsychologService } from "@/services/dahsboardService/doctor/createPsycholog";
import { getCityService, getProvincesService } from "@/services/province";
import { getRoleService } from "@/services/role";
import { City, Province } from "@/types/master";
import { Role } from "@/types/role";
import { createPsychologSchema } from "@/validations/psycholog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormDescription";

type CreatePsychologSchemaType = z.infer<typeof createPsychologSchema>;

const AddDoctorForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRole, setSelectedRole] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePsychologSchemaType>({
    resolver: zodResolver(createPsychologSchema),
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
    const fetchProvinces = async () => {
      try {
        const response = await getProvincesService();
        if (response.status === true) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi", error);
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

  const onSubmit = async (data: CreatePsychologSchemaType) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = {
      name: data.psy_name,
      str_number: data.psy_str_number,
      email: data.psy_email,
      password: data.psy_password,
      work_year: data.psy_work_year,
      description: data.psy_description,
      phone_number: data.psy_phone_number,
      city_id: data.city_id,
      role_id: "dc3f6a8e-4875-4297-a285-4f2439595ee2",
    };

    try {
      const result = await CreatePsychologService(payload);
      console.log(result);
      if (result.status === true) {
        setSuccess("Psycholog berhasil ditambahkan");
        setSelectedProvince("");
        setCities([]);
      } else {
        setError("Gagal menambahkan psycholog");
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Terjadi kesalahan");
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
          value={formData.name}
        />

        <FormInput
          label="Psycholog Email"
          id="email"
          placeholder="psycholog@gmail.com"
          register={register("psy_email")}
          error={errors.psy_email}
          value={formData.email}
        />

        <FormInput
          label="Psycholog Password"
          type="password"
          id="password"
          placeholder="*************"
          register={register("psy_password")}
          error={errors.psy_password}
          value={formData.password}
        />

        <FormInput
          label="Phone Number"
          id="phoneNumber"
          placeholder="08*********"
          register={register("psy_phone_number")}
          error={errors.psy_phone_number}
          value={formData.phone_number}
        />

        <FormInput
          label="STR Number"
          id="strNumber"
          placeholder="ST*******"
          register={register("psy_str_number")}
          error={errors.psy_str_number}
          value={formData.str_number}
        />

        <FormInput
          label="Work Year"
          id="workYear"
          placeholder="2005"
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
          options={cities.map((city) => ({
            label: `${city.city_type} ${city.city_name}`,
            value: city.city_id,
          }))}
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
          onChange={(e) => setSelectedRole(e.target.value)}
          disabled={true}
        />
      </div>

      <FormTextarea
        label="Description"
        id="psy_description"
        placeholder="Brief description about the doctor"
        register={register("psy_description")}
        error={errors.psy_description}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition"
        disabled={loading}
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctorForm;
