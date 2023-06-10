-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "password" VARCHAR(10000) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "no_dupe_name" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "no_dupe_email" ON "users"("email");

