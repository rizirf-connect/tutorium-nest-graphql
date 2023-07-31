-- CreateTable
CREATE TABLE `courses` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `courses_student_id_key`(`student_id`),
    UNIQUE INDEX `courses_name_key`(`name`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
