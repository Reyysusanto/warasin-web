import { z } from "zod";

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

export { psychologDetailSchema };
