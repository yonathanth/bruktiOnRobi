/*
  Warnings:

  - You are about to drop the column `pricePaid` on the `order` table. All the data in the column will be lost.
  - Added the required column `pricePaidInCents` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `pricePaid`,
    ADD COLUMN `pricePaidInCents` DOUBLE NOT NULL;
