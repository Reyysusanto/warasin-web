import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(8, "Password minimal 8 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
      .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const userDetailSchema = z.object({
  name: z.string().min(8, "Password minimal 8 karakter"),
  no_hp: z
    .string()
    .min(10, "No Handphone tidak valid")
    .max(16, "No Hanphone tidak valid"),
  birth_date: z.date(),
  gender: z.boolean(),
  province: z.string(),
  city: z.string(),
  email: z.string().email("Format email tidak valid"),
});

const userDetailAdminSchema = z.object({
  name: z.string().min(8, "Password minimal 8 karakter"),
  no_hp: z
    .string()
    .min(10, "No Handphone tidak valid")
    .max(16, "No Hanphone tidak valid"),
  birth_date: z.date(),
  gender: z.boolean(),
  province: z.string(),
  city: z.string(),
  email: z.string().email("Format email tidak valid"),
  role: z.string()
});

const updateUserSchema = z.object({
  user_name: z.string().min(8, "Password minimal 8 karakter"),
  user_phone_number: z.optional(
    z
      .string()
      .min(10, "No Handphone tidak valid")
      .max(16, "No Hanphone tidak valid")
  ),
  user_email: z.string().email("Format email tidak valid"),
  user_birth_date: z.optional(z.date()),
  user_gender: z.optional(z.boolean()),
  province_id: z.optional(z.string()),
  city_id: z.optional(z.string()),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
  gender: z.boolean(),
  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
  phone_number: z.optional(z.string().min(1, "Nomor telepon wajib diisi")),
  city_id: z.string(),
  role_id: z.string(),
});

const updateUserAdminSchema = z.object({
  user_name: z.string().min(8, "Password minimal 8 karakter"),
  user_phone_number: z.optional(
    z
      .string()
      .min(10, "No Handphone tidak valid")
      .max(16, "No Hanphone tidak valid")
  ),
  user_email: z.string().email("Format email tidak valid"),
  user_birth_date: z.optional(z.date()),
  user_gender: z.optional(z.boolean()),
  province_id: z.optional(z.string()),
  city_id: z.optional(z.string()),
  role_id: z.string(),
});

export {
  registerSchema,
  loginSchema,
  userDetailSchema,
  updateUserSchema,
  createUserSchema,
  updateUserAdminSchema,
  userDetailAdminSchema,
};
