import { z } from "zod";

const CreateNewsSchema = z.object({
    image_header: z.string().min(1, "Image harus diisi"),
    title: z.string().min(10, "Judul berita harus disertakan"),
    body: z.string().min(20, "Body harus diisi"),
})

export { CreateNewsSchema }