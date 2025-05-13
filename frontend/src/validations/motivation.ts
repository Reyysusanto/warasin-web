import { z } from "zod";

const createMotivationSchema = z.object({
  author: z.string().min(4, "Author minimal 4 karakter"),
  content: z.string().min(14, "Author minimal 14 karakter"),
  motivation_category_id: z.string().min(1, "Author minimal 1 karakter"),
});

export { createMotivationSchema };
