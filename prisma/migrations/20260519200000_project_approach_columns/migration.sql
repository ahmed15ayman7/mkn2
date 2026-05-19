-- Approach columns grid (before map on project detail page)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "approachColumns" JSONB NOT NULL DEFAULT '[]';

-- Restore coastal summary columns if missing
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "coastalCol3En" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "coastalCol3Ar" TEXT;
