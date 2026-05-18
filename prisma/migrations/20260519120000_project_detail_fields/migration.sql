-- Align project detail page with Sea Point design (brochure, map logo, facilities list)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "brochureUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "mapLogoUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "facilitiesTitleEn" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "facilitiesTitleAr" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "facilitiesEn" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "facilitiesAr" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
