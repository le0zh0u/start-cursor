import { z } from "zod";

export enum TutorialSource {
  YOUTUBE = "YOUTUBE",
  TWITTER = "TWITTER",
  ARTICLE = "ARTICLE",
}

export enum Language {
  EN = "en",
  ZH = "zh",
}

export const TutorialFormSchema = z.object({
  link: z.string().min(1, {
    message: "Link is required",
  }),
  source: z.string().min(1, {
    message: "Source is required",
  }),

  title: z.string().default(""),
  slug: z.string().default(""),
  description: z.string().optional(),
  author: z.string().optional(),
  authorLink: z.string().optional(),
  authorAvatar: z.string().optional(),
  language: z.string().optional(),
  rawValue: z.string().optional(),
});
