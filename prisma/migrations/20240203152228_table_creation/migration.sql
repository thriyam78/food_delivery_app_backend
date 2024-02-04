-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PERISHABLE', 'NON_PERISHABLE');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "organization_id" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "base_distance_in_kms" INTEGER NOT NULL DEFAULT 5,
    "km_price" DOUBLE PRECISION NOT NULL,
    "fix_price" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("organization_id","zone","item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_key" ON "Organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
