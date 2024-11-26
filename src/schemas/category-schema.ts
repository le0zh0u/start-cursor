import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  slug: z.string().min(1, {
    message: "Slug is required",
  }),
  desc: z.string().optional(),
  icon: z.string().optional(),
  categoryCollectionId: z.number().min(1, {
    message: "Category collection is required",
  }),
});
