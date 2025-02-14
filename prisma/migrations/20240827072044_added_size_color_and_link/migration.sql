/*
  Warnings:

  - You are about to drop the column `material` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `product` table. All the data in the column will be lost.
  - Made the column `size` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `material`,
    DROP COLUMN `stockQuantity`,
    MODIFY `size` VARCHAR(191) NOT NULL,
    MODIFY `color` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Link` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(2048) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
