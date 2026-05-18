import { z } from "zod";

/** HTTPS absolute URLs for remote images and media (CMS / API validation). */
export const httpsUrlString = z
  .string()
  .trim()
  .url()
  .refine((u) => u.startsWith("https://"), "Must use https://");
