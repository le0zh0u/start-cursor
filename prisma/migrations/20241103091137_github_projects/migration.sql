-- CreateTable
CREATE TABLE "github_projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL,
    "cursor_rule_url" TEXT NOT NULL DEFAULT '',
    "rule_template_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "github_projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_projects_slug_key" ON "github_projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "github_projects_rule_template_id_key" ON "github_projects"("rule_template_id");

-- AddForeignKey
ALTER TABLE "github_projects" ADD CONSTRAINT "github_projects_rule_template_id_fkey" FOREIGN KEY ("rule_template_id") REFERENCES "rule_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
