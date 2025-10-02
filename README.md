# MiAuDota? - Backend

Este é o backend do **MiAuDota**, um sistema de gerenciamento de adoção de pets, desenvolvido em **Node.js** com **Express** e **Prisma ORM** conectado ao **PostgreSQL**.

## Funcionalidades

O backend permite:

- Cadastro e listagem de **pets**
- Cadastro de **usuários**
- Registro de **adoções**
- Autenticação básica (usuário/admin)
- Seed inicial com usuário administrador

---

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Avanti-MiAuDota/miaudota-backend.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:

- Copie o `.env.example` e renomeie para `.env`.
- Configure sua URL de conexão com o banco:

  ```env
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/miaudota_db"
  PORT=8080
  ```

- Substitua `usuario`, `senha` e `localhost` conforme seu ambiente.

---

## Banco de Dados

O backend utiliza **PostgreSQL** e **Prisma ORM** para gerenciar o banco.

### 1. Criar o banco (se ainda não existir)

No PostgreSQL, crie o banco `miaudota_db`:

```sql
CREATE DATABASE miaudota_db;
```

> **Nota:** Ajuste o nome se preferir outro, mas lembre-se de atualizar a variável `DATABASE_URL` no `.env`.

### 2. Rodar Migrations

```bash
npx prisma migrate dev --name init
```

### 3. Seed Inicial

Para criar o usuário administrador inicial, rode:

```bash
node prisma/seed.js
```

Usuário admin criado:

- **Email:** admin@admin.com
- **Senha:** admin123

> Caso o admin já exista, o script apenas mostrará uma mensagem informando.

---

## Rodando o Servidor

### Desenvolvimento com recarregamento automático

```bash
npm run dev
```

> Executa a migration, seed e inicia o servidor em modo desenvolvimento com **Nodemon**.

O servidor roda na porta definida no `.env` (padrão `8080`):

[http://localhost:8080](http://localhost:8080)

### Apenas iniciar o servidor

```bash
npm start
```

> Inicia o servidor normalmente, sem rodar migrations ou seed.

---

## Estrutura de Pastas

```plaintext
miaudota-backend/
├─ node_modules/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
├─ src/
│  ├─ config/           # Configurações gerais, como database.js
│  ├─ controllers/      # Lógica das rotas
│  ├─ middlewares/      # Middlewares (autenticação, validações, etc.)
│  ├─ models/           # Modelos JS, se necessário
│  ├─ repositories/     # Acesso direto ao banco (opcional)
│  ├─ routes/           # Rotas (pet.routes.js, usuario.routes.js, adocao.routes.js, index.js)
│  └─ services/         # Regras de negócio
├─ .env.example
├─ .env
├─ index.js
├─ package.json
└─ README.md
```

---

## Comandos Úteis

| Comando                  | Descrição                                  |
| ------------------------ | ------------------------------------------ |
| `npm install`            | Instala dependências                       |
| `npm run dev`            | Migration + Seed + servidor em modo dev    |
| `npm start`              | Inicia apenas o servidor                   |
| `npx prisma migrate dev` | Executa migrations                         |
| `node prisma/seed.js`    | Popula o banco com dados iniciais (admin)  |
| `npx prisma studio`      | Abre interface web para visualizar o banco |

---

## Tecnologias

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (hash de senhas)
- [Multer](https://github.com/expressjs/multer) (upload de fotos de pets)
- [Nodemon](https://nodemon.io/) (reload automático)
- [dotenv](https://github.com/motdotla/dotenv) (variáveis de ambiente)

## Modelagem do Banco de Dados

<img width="987" height="634" alt="Captura de tela 2025-10-01 091011" src="https://github.com/user-attachments/assets/12c63dfd-7726-4724-813a-537efe022ce7" />

## Equipe de Desenvolvimento

- [André](https://github.com/Mordev-tech)
- [Daniel](https://github.com/danielcooder)
- [Danielle](https://github.com/daniellesena)
- [Flávia](https://github.com/flaviare1s)
- [Juliano](https://github.com/julianohbl)
- [Vittoria](https://github.com/Vittoriaalopes)
