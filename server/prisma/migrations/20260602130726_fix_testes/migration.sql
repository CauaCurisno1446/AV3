/*
  Warnings:

  - A unique constraint covering the columns `[aeronaveid]` on the table `Testes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Testes_aeronaveid_key` ON `Testes`(`aeronaveid`);
