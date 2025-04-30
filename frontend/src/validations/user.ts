import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(8, "Password minimal 8 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter")
})

const loginSchema = z.object({
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter")
})

export { registerSchema, loginSchema }