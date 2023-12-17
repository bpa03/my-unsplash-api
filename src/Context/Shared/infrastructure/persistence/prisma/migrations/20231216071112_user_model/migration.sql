-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(96) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
