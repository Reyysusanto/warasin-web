import { z } from "zod";

const specializationSchema = z.object({
  spe_id: z.string().uuid(),
  spe_name: z.string().min(1, "Nama spesialisasi wajib diisi"),
  spe_desc: z.string().min(1, "Deskripsi wajib diisi"),
});

const educationSchema = z.object({
  edu_id: z.string().min(1, "ID education tidak boleh kosong"),
  edu_degree: z.string().min(1, "Jenjang tidak boleh kosong"),
  edu_major: z.string().min(1, "major tidak boleh kosong"),
  edu_institution: z.string().min(1, "Institusi tidak boleh kosong"),
  edu_graduation_year: z.string().min(1, "Tahun lulus tidak boleh kosong"),
});

const psychologDetailSchema = z.object({
  psy_name: z.string().min(1, "Nama tidak boleh kosong"),
  psy_str_number: z.string().min(1, "Nomor STR tidak boleh kosong"),
  psy_email: z.string().email("Email tidak valid"),
  psy_work_year: z.string().min(1, "Tahun kerja tidak boleh kosong"),
  psy_description: z.string().min(1, "Deskripsi tidak boleh kosong"),
  psy_phone_number: z.string().min(8, "Nomor telepon tidak valid"),
  psy_image: z.string().url("URL gambar tidak valid"),
  city_id: z.string().min(1, "ID kota tidak boleh kosong"),
  province_id: z.string().min(1, "ID provinsi tidak boleh kosong"),
});

const createPsychologSchema = z.object({
  psy_name: z.string().min(1, "Nama tidak boleh kosong"),
  psy_str_number: z.string().min(1, "Nomor STR tidak boleh kosong"),
  psy_email: z.string().email("Email tidak valid"),
  psy_password: z.string().min(8, "Password harus minimal 8 karakter"),
  psy_work_year: z.string().min(1, "Tahun kerja tidak boleh kosong"),
  psy_description: z.string().min(1, "Deskripsi tidak boleh kosong"),
  psy_phone_number: z.string().min(8, "Nomor telepon tidak valid"),
  city_id: z.string().min(1, "ID kota tidak boleh kosong"),
  role_id: z.string().min(1, "ID role tidak boleh kosong"),
});

const getDetailPsychologSchema = z.object({
  psy_name: z.string().min(1, "Nama tidak boleh kosong"),
  psy_str_number: z.string().min(1, "Nomor STR tidak boleh kosong"),
  psy_email: z.string().email("Email tidak valid"),
  psy_password: z.string().min(8, "Password harus minimal 8 karakter"),
  psy_work_year: z.string().min(1, "Tahun kerja tidak boleh kosong"),
  psy_description: z.string().min(1, "Deskripsi tidak boleh kosong"),
  psy_phone_number: z.string().min(8, "Nomor telepon tidak valid"),
  city_id: z.string().min(1, "ID kota tidak boleh kosong"),
  role_id: z.string().min(1, "ID role tidak boleh kosong"),
  language: z.array(z.string().min(1, "ID language tidak boleh kosong")),
  specialization: z.array(specializationSchema).nonempty(),
  education: z.array(educationSchema).nonempty(),
});

export {
  psychologDetailSchema,
  createPsychologSchema,
  getDetailPsychologSchema,
};
