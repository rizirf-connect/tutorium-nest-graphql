/*
  Warnings:

  - Added the required column `school` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `school` VARCHAR(191) NOT NULL;
