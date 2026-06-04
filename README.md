# Entrega — _AV 3_

> Professor: _Gerson da Penha_ <br>
> Aluno: _Cauã Cursino_ <br>
> Turma: 3° ADS

## O relatório pode ser encontrado no diretório `docs`!

## Instalação

Para rodar o **Aerocode** localmente, siga os passos abaixo:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/CauaCurisno1446/AV3.git
   cd AV3
   ```

2. **Instale as dependências do frontend**

   ```bash
   npm install
   ```

3. **Crie o arquivo .env dentro da raíz do diretório `server/`**

   ```bash
    DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/aerocode"
    JWT_SECRET="SegredoSuperSecreto"
   ```

4. **Instale as dependências do backend**:
   ```bash
   cd AV3/server/
   npm install
   ```
5. **Gere o banco de dados**:
   ```bash
   cd AV3/server/prisma/
   npx prisma generate
   npx prisma migrate dev --name init
   ```
6. **Crie o usuário inicial**:
   ```bash
   cd AV3/server/
   node seedadmin.js
   (Dados: usuário = admin, senha = admin123)
   ```
7. **Inicie o servidor**:
   ```bash
   cd AV3/server/
   npm run dev
   ```
8. **Inicie o frontend**:

   ```bash
   cd AV3/
   npm run dev
   ```

9. **Acesse o sistema**:
   ```bash
   http://localhost:5173/
   ```
