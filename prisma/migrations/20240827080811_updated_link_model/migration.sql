/*
  Warnings:

  - Added the required column `pricePaidInCents` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `link` ADD COLUMN `pricePaidInCents` DOUBLE NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
