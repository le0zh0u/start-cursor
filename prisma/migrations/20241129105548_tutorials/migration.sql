-- CreateTable
CREATE TABLE "tutorials" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "slug" VARCHAR(255) NOT NULL DEFAULT '',
    "description" VARCHAR(1024) NOT NULL DEFAULT '',
    "link" VARCHAR(512) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'YOUTUBE',
    "raw_value" TEXT NOT NULL DEFAULT '',
    "author" VARCHAR(255) NOT NULL DEFAULT '',
    "author_link" VARCHAR(512) NOT NULL DEFAULT '',
    "author_avatar" VARCHAR(512) NOT NULL DEFAULT '',
    "language" VARCHAR(16) NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutorials_slug_key" ON "tutorials"("slug");
