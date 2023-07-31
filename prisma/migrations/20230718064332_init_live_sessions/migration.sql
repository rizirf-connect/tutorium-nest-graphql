/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_id]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_id` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `courses_student_id_key` ON `courses`;

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    DROP COLUMN `student_id`,
    ADD COLUMN `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`course_id`);

-- CreateTable
CREATE TABLE `sessions` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course` VARCHAR(191) NOT NULL,
    `type` ENUM('LIVE', 'RECORDED') NOT NULL DEFAULT 'LIVE',
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_session_id_key`(`session_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `live_sessions` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_at` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `live_sessions_session_id_key`(`session_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `courses_course_id_key` ON `courses`(`course_id`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_course_fkey` FOREIGN KEY (`course`) REFERENCES `courses`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live_sessions` ADD CONSTRAINT `live_sessions_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`session_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
