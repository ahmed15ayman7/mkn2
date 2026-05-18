-- Material color palette (after map section on project detail page)
ALTER TABLE "Project" ADD COLUMN "materialColorsIntroImageUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN "materialColors" JSONB NOT NULL DEFAULT '[]';
