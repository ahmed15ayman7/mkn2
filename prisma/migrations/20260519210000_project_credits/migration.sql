-- Credits section (after material colors on project detail page)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "creditsTitleEn" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "creditsTitleAr" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "projectCredits" JSONB NOT NULL DEFAULT '[]';
