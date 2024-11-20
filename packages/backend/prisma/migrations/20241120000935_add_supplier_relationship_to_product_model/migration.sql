/*
  Warnings:

  - You are about to drop the column `supplierId` on the `purchase_histories` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchase_histories` DROP FOREIGN KEY `purchase_histories_supplierId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `supplierId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `purchase_histories` DROP COLUMN `supplierId`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
