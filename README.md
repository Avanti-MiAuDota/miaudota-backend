# 🐾 MiAuDota? - Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**[🇧🇷 Português](README.md)** | **[🇺🇸 English](README.en.md)**

</div>

## 📋 Sobre o Projeto

Este é o backend do **MiAuDota**, um sistema completo de gerenciamento de adoção de pets, desenvolvido em **Node.js** com **Express** e **Prisma ORM** conectado ao **PostgreSQL**. O sistema oferece uma API RESTful robusta para gerenciar todo o processo de adoção, desde o cadastro de pets até a aprovação de solicitações de adoção.

## ✨ Funcionalidades

### 🐶 Gerenciamento de Pets

- ✅ Cadastro completo de pets (cães e gatos)
- ✅ Upload de fotos dos pets
- ✅ Listagem com filtros por espécie, sexo e status
- ✅ Atualização de informações
- ✅ Controle de status (disponível, em análise, adotado)

### 👥 Gerenciamento de Usuários

- ✅ Cadastro de usuários
- ✅ Autenticação com JWT
- ✅ Controle de permissões (usuário/admin)
- ✅ Hash de senhas com bcrypt

### 📝 Gerenciamento de Adoções

- ✅ Solicitação de adoção com dados completos
- ✅ Registro de endereço do adotante
- ✅ Termo de aceite de responsabilidade
- ✅ Controle de status (pendente, aprovada, rejeitada)
- ✅ Validação de dados com Joi

### 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Middleware de autorização por role
- ✅ Validação de dados em todas as rotas
- ✅ Senhas criptografadas

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Express](https://expressjs.com/)** - Framework web
- **[Prisma ORM](https://www.prisma.io/)** - ORM para PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas
- **[Multer](https://github.com/expressjs/multer)** - Upload de arquivos
- **[Joi](https://joi.dev/)** - Validação de dados
- **[Nodemon](https://nodemon.io/)** - Auto-reload em desenvolvimento
- **[dotenv](https://github.com/motdotla/dotenv)** - Variáveis de ambiente

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)

## 🔧 Instalação

1. Clone o repositório:

   ````bashas variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/miaudota_db"
   PORT=8080
   JWT_SECRET=sua_chave_secreta_aqui
   ````

   > ⚠️ **Importante:** Substitua `usuario`, `senha` e `JWT_SECRET` pelos seus valores reais.

## 💾 Configuração do

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

> \*\*NotPopular o Banco (Seed)

Para criar o usuário administrador inicial e dados de exemplo:

```bash
npm run seed
```

**Credenciais do Admin:**

- 📧 **Email:** admin@admin.com
- 🔑 **Senha:** admin123

> 💡 **Dica:** Altere a senha do administrador após o primeiro login!

## ▶️ Executando o Projeto

- **Email:** admin@admin.com
- **Senha:** admin123

> Caso o admin já exista, o script apenas mostrará uma mensagem informando.
> Modo Desenvolvimento (recomendado)

```bash
npm run dev
```

> 🔄 Executa migrations, seed e inicia o servidor com auto-reload

### Modo Produção

```bash
npm start
```

O servidor estará disponível em: **http://localhost:8080**

## 📁 Estrutura do Projeto

> Inicia o servidor normalmente, sem rodar migrations ou seed.

---

## Estrutura de Pastas

```plaintext
mia
miaudota-backend/
├── 📁 prisma/
│   ├── schema.prisma              # Schema do banco de dados
│   ├── seed.js                    # Dados iniciais
│   ├── migrations/                # Histórico de migrações
│   └── pet_images_seed/           # Imagens de exemplo
├── 📁 src/
│   ├── 📁 config/                 # Configurações (DB, Multer)
│   ├── 📁 controllers/            # Controladores das rotas
│   ├── 📁 middlewares/            # Middlewares (auth, role, etc)
│   ├── 📁 models/                 # Modelos de dados
│   ├── 📁 repositories/           # Camada de acesso ao banco
│   ├── 📁 routes/                 # Definição de rotas
│   ├── 📁 services/               # Regras de negócio
│   ├── 📁 utils/                  # Utilitários
│   └── 📁 validations/            # Validações com Joi
├── 📁 uploads/                    # Arquivos enviados pelos usuários
├── 📁 docs/                       # Documentação (Insomnia)
├── .env                           # Variáveis de ambiente
├── index.js                       # Ponto de entrada da aplicação
├── package.json                   # Dependências do projeto
└── README.md                      # Documentação
```

## 🗂️ Arquitetura | Descrição |

|---------------------------|------------------------------------------------|
| `npm install` | 📦 Instala todas as dependências |
| `npm run dev` | 🚀 Migrations + Seed + Servidor (modo dev) |
| `npm start` | ▶️ Inicia o servidor |
| `npm run migrate` | 🔄 Executa migrations do Prisma |
| `npm run seed` | 🌱 Popula o banco com dados iniciais |
| `npx prisma studio` | 🎨 Abre interface visual do banco |
| `npx prisma generate` | ⚙️ Gera o cliente Prisma |

## 🔌 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário

### Usuários

- `GET /api/usuarios` - Listar todos os usuários (Admin)
- `GET /api/usuarios/:id` - Buscar usuário por ID
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário (Admin)

### Pets

- `GET /api/pets` - Listar todos os pets
- `GET /api/pets/:id` - Buscar pet por ID
- `POST /api/pets` - Cadastrar novo pet (Admin)
- `PUT /api/pets/:id` - Atualizar pet (Admin)
- `DELETE /api/pets/:id` - Deletar pet (Admin)

### Adoções

- `GET /api/adocoes` - Listar todas as adoções (Admin)
- `🗄️ Modelagem do Banco de Dados

<div align="center">
  <img width="1095" alt="Diagrama do Banco de Dados" src="https://github.com/user-attachments/assets/040fc5d7-d6ad-469b-a21c-003a13b43ad3" />
</div>

### Principais Entidades

- **Usuario**: Informações dos usuários e suas permissões
- **Pet**: Dados dos animais disponíveis para adoção
- **Adocao**: Registros de solicitações e adoções
- **Endereco**: Endereço completo do adotante

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Modelagem do Banco de Dados

<img width="1095" height="408" alt="diagrama" src="https://github.com/user-attachments/assets/040fc5d7-d6ad-469b-a21c-003a13b43ad3" />

## 👥 Equipe de Desenvolvimento

- [André](https://github.com/Mordev-tech)
- [Daniel](https://github.com/danielcooder)
- [Danielle](https://github.com/daniellesena)
- [Flávia](https://github.com/flaviare1s)
- [Juliano](https://github.com/julianohbl)
- [Vittoria](https://github.com/Vittoriaalopes)
