/*
  Warnings:

  - You are about to drop the `link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `link` DROP FOREIGN KEY `Link_userId_fkey`;

-- DropTable
DROP TABLE `link`;

-- CreateTable
CREATE TABLE `SheinOrder` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(2048) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `pricePaidInCents` DOUBLE NOT NULL,
    `shippingAddress` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SheinOrder` ADD CONSTRAINT `SheinOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
