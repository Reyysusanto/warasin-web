import { z } from "zod";

const LoginAdminSchema = z.object({
    email: z.string().email().min(6, "Email minimal 6 karakter"),
    password: z.string().min(6, "Password minimal 8 karakter")
})

export { LoginAdminSchema }