/*
  Warnings:

  - You are about to drop the column `createdOn` on the `account` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `createdOn`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('BASIC', 'ADMIN') NOT NULL DEFAULT 'BASIC';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `User_lastName_fullName_firstName_idx` ON `User`(`lastName`, `fullName`, `firstName`);
