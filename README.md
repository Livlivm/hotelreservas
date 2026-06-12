# SISTEMA DE HOTEL

---

## 1. SOBRE O SISTEMA

O sistema foi desenvolvido para gerenciar quartos e reservas de um hotel.

Ele permite o controle completo de:
- Cadastro de quartos
- Listagem de quartos
- Criação de reservas
- Consulta de reservas por quarto
- Exclusão de quartos e reservas

A aplicação funciona no modelo cliente-servidor, com API REST e banco de dados MySQL.

---

##  2. TECNOLOGIAS UTILIZADAS

### Front-end
- HTML
- CSS
- JavaScript

### Back-end
- Node.js
- Express.js
- Prisma

###  Banco de Dados
- MySQL

###  Ambiente de Desenvolvimento
- Visual Studio Code

---

##  3. ARQUITETURA DO SISTEMA

O sistema é dividido em:

### Front-end
Responsável pela interface do usuário (telas de quartos, reservas e sobre).

### Back-end
Responsável pelas regras de negócio e comunicação com o banco de dados.

### Banco de Dados
Armazena todas as informações de quartos e reservas.

---

## 4. MODELO DE DADOS

### Quartos
- id (int)
- numero (string)
- tipo (string)

### Reservas
- id (int)
- hospede (string)
- dataEntrada (datetime)
- dataSaida (datetime)
- quartoId (int)

### Relacionamento
- Um quarto pode ter várias reservas
- Cada reserva pertence a um único quarto

---

## 5. ROTAS DA API

### Quartos
- POST /quartos/cadastrar
- GET /quartos/listar
- GET /quartos/buscar/:id
- PUT /quartos/atualizar/:id
- DELETE /quartos/excluir/:id

### Reservas
- POST /reservas/cadastrar
- GET /reservas/listar
- GET /reservas/buscar/:id
- PUT /reservas/atualizar/:id
- DELETE /reservas/excluir/:id

---

## 6. TELAS DO SISTEMA

### Tela Principal
- Lista de quartos
- Botão de cadastro
- Botão de exclusão
- Acesso às reservas

### Cadastro de Quarto
- Número do quarto
- Tipo do quarto
- Botão cadastrar

### Reservas
- Dados do quarto selecionado
- Cadastro de reserva
- Lista de reservas
- Exclusão de reservas

### Sobre
- Informações do sistema
- Tecnologias utilizadas
- Desenvolvedor

---

## 8. PRINTS DO SISTEMA

- Tela principal
- Cadastro de quarto
- Tela de reservas
- Tela sobre

---

## 9. COMO EXECUTAR

### 1. Clonar o projeto
git clone https://github.com/Livlivm/hotelreservas.git

### 2. Instalar dependências
npm install

### 3. Criar banco de dados
CREATE DATABASE hotel;

### 4. Configurar .env
DATABASE_URL="mysql://root:@localhost:3306/hotel_db"
PORT_APP=3000

### 5. Rodar migrations
npx prisma migrate dev

### 6. Gerar client
npx prisma generate

### 7. Iniciar servidor
node server.js

### 8. Abrir front-end
Abrir index.html ou usar Live Server

---
