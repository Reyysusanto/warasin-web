import { z } from "zod";

const CreateNewsSchema = z.object({
  image: z
    .union([
      z.instanceof(File, { message: "File gambar harus diunggah" }),
      z.string().min(1, "Image harus diisi"),
    ])
    .nullable(),
  title: z.string().min(10, "Judul berita harus disertakan"),
  body: z.string().min(20, "Body harus diisi"),
});

const UpdateNewsSchema = z.object({
  image: z.string().min(1, "Image harus diisi"),
  title: z.string().min(1, "title harus diisi"),
  body: z.string().min(1, "body harus diisi"),
});

const GetNewsSchema = z.object({
  image: z.string().min(1, "Image harus diisi").nullable(),
  title: z.string().min(1, "title harus diisi"),
  body: z.string().min(1, "body harus diisi"),
  date: z.string().min(1, "date harus diisi"),
});

export { CreateNewsSchema, UpdateNewsSchema, GetNewsSchema };
