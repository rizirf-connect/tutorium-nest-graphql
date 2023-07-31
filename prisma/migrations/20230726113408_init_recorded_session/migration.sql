-- CreateTable
CREATE TABLE `recorded_sessions` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(18, 2) NOT NULL,

    UNIQUE INDEX `recorded_sessions_session_id_key`(`session_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recorded_sessions` ADD CONSTRAINT `recorded_sessions_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`session_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
