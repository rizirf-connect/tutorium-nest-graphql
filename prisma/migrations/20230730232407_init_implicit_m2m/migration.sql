/*
  Warnings:

  - You are about to drop the `students_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `students_sessions` DROP FOREIGN KEY `students_sessions_session_id_fkey`;

-- DropForeignKey
ALTER TABLE `students_sessions` DROP FOREIGN KEY `students_sessions_student_id_fkey`;

-- DropTable
DROP TABLE `students_sessions`;

-- CreateTable
CREATE TABLE `_SessionToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SessionToUser_AB_unique`(`A`, `B`),
    INDEX `_SessionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SessionToUser` ADD CONSTRAINT `_SessionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `sessions`(`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SessionToUser` ADD CONSTRAINT `_SessionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
