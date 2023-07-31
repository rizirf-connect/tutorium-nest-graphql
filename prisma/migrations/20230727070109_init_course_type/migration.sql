/*
  Warnings:

  - You are about to drop the column `name` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_name,course_type]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_name` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_type` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_course_fkey`;

-- DropIndex
DROP INDEX `courses_name_key` ON `courses`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `name`,
    ADD COLUMN `course_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `course_type` ENUM('VCE', 'IB') NOT NULL;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `course`,
    DROP COLUMN `type`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    ADD COLUMN `session_type` ENUM('LIVE', 'RECORDED') NOT NULL DEFAULT 'LIVE';

-- CreateIndex
CREATE UNIQUE INDEX `courses_course_name_course_type_key` ON `courses`(`course_name`, `course_type`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
