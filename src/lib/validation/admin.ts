import { z } from "zod";

const slugSchema = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens");

const optionalUrl = z
  .string()
  .url()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v === "" ? null : v));

const seoSchema = z
  .object({
    metaTitleAr: z.string().min(1),
    metaTitleEn: z.string().min(1),
    metaDescAr: z.string().min(1),
    metaDescEn: z.string().min(1),
    keywordsAr: z.array(z.string()).optional(),
    keywordsEn: z.array(z.string()).optional(),
    ogImage: optionalUrl,
  })
  .optional();

export const projectBodySchema = z.object({
  slug: slugSchema,
  titleAr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  descAr: z.string().min(1),
  descEn: z.string().min(1),
  locationAr: z.string().min(1).max(200),
  locationEn: z.string().min(1).max(200),
  areaSqm: z.coerce.number().positive().nullable().optional(),
  completionDate: z
    .string()
    .optional()
    .transform((v) => (v && v.length > 0 ? new Date(v) : null)),
  investmentValue: z.coerce.number().positive().nullable().optional(),
  videoUrl: optionalUrl,
  coverImage: z.string().url(),
  images: z.array(z.string().url()).optional(),
  featured: z.boolean().optional(),
  seo: seoSchema,
});

export const partnerBodySchema = z.object({
  nameAr: z.string().min(1).max(200),
  nameEn: z.string().min(1).max(200),
  logoUrl: z.string().url(),
  websiteUrl: optionalUrl,
  sortOrder: z.coerce.number().int().optional(),
});

export const globalContentBodySchema = z.object({
  key: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9._-]+$/, "Use lowercase letters, numbers, dots, underscores, hyphens"),
  valueAr: z.string().min(1),
  valueEn: z.string().min(1),
});

export const inquiryBodySchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  subject: z.string().max(120).optional(),
  targetBudget: z.string().max(80).optional(),
  message: z.string().min(1).max(5000),
});

export const inquiryStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export function parseImageLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseKeywordLines(text: string): string[] {
  return text
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
