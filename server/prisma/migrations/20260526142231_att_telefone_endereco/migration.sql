/*
  Warnings:

  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telefone` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[telefone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endereco` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_userId_fkey`;

-- DropForeignKey
ALTER TABLE `telefone` DROP FOREIGN KEY `Telefone_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `endereco`;

-- DropTable
DROP TABLE `telefone`;

-- CreateIndex
CREATE UNIQUE INDEX `User_telefone_key` ON `User`(`telefone`);
