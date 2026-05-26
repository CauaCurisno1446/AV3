-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'OPERARIO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aeronave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(191) NOT NULL DEFAULT 'COMERCIAL',
    `capacidade` VARCHAR(191) NOT NULL,
    `alcance` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aerodinamico` VARCHAR(191) NOT NULL DEFAULT 'REPROVADO',
    `eletrico` VARCHAR(191) NOT NULL DEFAULT 'REPROVADO',
    `hidraulico` VARCHAR(191) NOT NULL DEFAULT 'REPROVADO',
    `aeronaveid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rua` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etapa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `prazo` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'EM_ANDAMENTO',
    `aeronaveid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'EM_TRANSITO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AeronavePecas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AeronavePecas_AB_unique`(`A`, `B`),
    INDEX `_AeronavePecas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EtapaFuncionarios` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtapaFuncionarios_AB_unique`(`A`, `B`),
    INDEX `_EtapaFuncionarios_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testes` ADD CONSTRAINT `Testes_aeronaveid_fkey` FOREIGN KEY (`aeronaveid`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etapa` ADD CONSTRAINT `Etapa_aeronaveid_fkey` FOREIGN KEY (`aeronaveid`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AeronavePecas` ADD CONSTRAINT `_AeronavePecas_A_fkey` FOREIGN KEY (`A`) REFERENCES `Aeronave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AeronavePecas` ADD CONSTRAINT `_AeronavePecas_B_fkey` FOREIGN KEY (`B`) REFERENCES `Peca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtapaFuncionarios` ADD CONSTRAINT `_EtapaFuncionarios_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etapa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtapaFuncionarios` ADD CONSTRAINT `_EtapaFuncionarios_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
