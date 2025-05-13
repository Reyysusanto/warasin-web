import { z } from "zod";

const createCategoryMotivationSchema = z.object({
    name: z.string().min(4, "Category minimal 4 karakter")
})

export { createCategoryMotivationSchema }