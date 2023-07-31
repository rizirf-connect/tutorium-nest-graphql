-- CreateTable
CREATE TABLE `students_sessions` (
    `student_id` INTEGER NOT NULL,
    `session_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`student_id`, `session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students_sessions` ADD CONSTRAINT `students_sessions_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students_sessions` ADD CONSTRAINT `students_sessions_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`session_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
