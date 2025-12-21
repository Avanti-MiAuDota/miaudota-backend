# 🐾 MiAuDota? - Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**[🇧🇷 Português](README.md)** | **[🇺🇸 English](README.en.md)**

</div>

## 📋 About the Project

This is the backend of **MiAuDota**, a complete pet adoption management system, developed in **Node.js** with **Express** and **Prisma ORM** connected to **PostgreSQL**. The system offers a robust RESTful API to manage the entire adoption process, from pet registration to approval of adoption requests.

## ✨ Features

### 🐶 Pet Management

- ✅ Complete pet registration (dogs and cats)
- ✅ Pet photo upload
- ✅ Listing with filters by species, gender, and status
- ✅ Information updates
- ✅ Status control (available, under review, adopted)

### 👥 User Management

- ✅ User registration
- ✅ JWT authentication
- ✅ Permission control (user/admin)
- ✅ Password hashing with bcrypt

### 📝 Adoption Management

- ✅ Adoption request with complete data
- ✅ Adopter address registration
- ✅ Responsibility acceptance term
- ✅ Status control (pending, approved, rejected)
- ✅ Data validation with Joi

### 🔒 Security

- ✅ JWT authentication
- ✅ Role-based authorization middleware
- ✅ Data validation on all routes
- ✅ Encrypted passwords

## 🚀 Technologies Used

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express](https://expressjs.com/)** - Web framework
- **[Prisma ORM](https://www.prisma.io/)** - ORM for PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[JWT](https://jwt.io/)** - Authentication
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[Multer](https://github.com/expressjs/multer)** - File upload
- **[Joi](https://joi.dev/)** - Data validation
- **[Nodemon](https://nodemon.io/)** - Development auto-reload
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variables

## 📋 Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)
- [Git](https://git-scm.com/)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Avanti-MiAuDota/miaudota-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/miaudota_db"
   PORT=8080
   JWT_SECRET=your_secret_key_here
   ```

   > ⚠️ **Important:** Replace `user`, `password`, and `JWT_SECRET` with your actual values.

## 💾 Database Configuration

The backend uses **PostgreSQL** and **Prisma ORM** to manage the database.

### 1. Create the Database (if it doesn't exist)

In PostgreSQL, create the `miaudota_db` database:

```sql
CREATE DATABASE miaudota_db;
```

> **Note:** Adjust the name if you prefer another, but remember to update the `DATABASE_URL` variable in `.env`.

### 2. Run Migrations

```bash
npm run migrate
```

### 3. Populate the Database (Seed)

To create the initial admin user and sample data:

```bash
npm run seed
```

**Admin Credentials:**

- 📧 **Email:** admin@admin.com
- 🔑 **Password:** admin123

> 💡 **Tip:** Change the admin password after first login!

## ▶️ Running the Project

### Development Mode (recommended)

```bash
npm run dev
```

> 🔄 Runs migrations, seed, and starts the server with auto-reload

### Production Mode

```bash
npm start
```

The server will be available at: **http://localhost:8080**

## 📁 Project Structure

```
miaudota-backend/
├── 📁 prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.js                    # Initial data
│   ├── migrations/                # Migration history
│   └── pet_images_seed/           # Sample images
├── 📁 src/
│   ├── 📁 config/                 # Configurations (DB, Multer)
│   ├── 📁 controllers/            # Route controllers
│   ├── 📁 middlewares/            # Middlewares (auth, role, etc)
│   ├── 📁 models/                 # Data models
│   ├── 📁 repositories/           # Database access layer
│   ├── 📁 routes/                 # Route definitions
│   ├── 📁 services/               # Business logic
│   ├── 📁 utils/                  # Utilities
│   └── 📁 validations/            # Joi validations
├── 📁 uploads/                    # User uploaded files
├── 📁 docs/                       # Documentation (Insomnia)
├── .env                           # Environment variables
├── index.js                       # Application entry point
├── package.json                   # Project dependencies
└── README.md                      # Documentation
```

## 🗂️ Architecture

The project follows a layered architecture:

```
Routes → Controllers → Services → Repositories → Database
                ↓
          Middlewares
          Validations
```

## 📚 Useful Commands

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `npm install`         | 📦 Install all dependencies              |
| `npm run dev`         | 🚀 Migrations + Seed + Server (dev mode) |
| `npm start`           | ▶️ Start the server                      |
| `npm run migrate`     | 🔄 Run Prisma migrations                 |
| `npm run seed`        | 🌱 Populate database with initial data   |
| `npx prisma studio`   | 🎨 Open database visual interface        |
| `npx prisma generate` | ⚙️ Generate Prisma client                |

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration

### Users

- `GET /api/usuarios` - List all users (Admin)
- `GET /api/usuarios/:id` - Get user by ID
- `PUT /api/usuarios/:id` - Update user
- `DELETE /api/usuarios/:id` - Delete user (Admin)

### Pets

- `GET /api/pets` - List all pets
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets` - Register new pet (Admin)
- `PUT /api/pets/:id` - Update pet (Admin)
- `DELETE /api/pets/:id` - Delete pet (Admin)

### Adoptions

- `GET /api/adocoes` - List all adoptions (Admin)
- `GET /api/adocoes/:id` - Get adoption by ID
- `POST /api/adocoes` - Request adoption (Authenticated)
- `PUT /api/adocoes/:id/status` - Update adoption status (Admin)

> 📄 **Complete documentation:** Import the `docs/Insomnia_MiAuDota.yaml` file into Insomnia to test all endpoints.

## 🗄️ Database Modeling

<div align="center">
  <img width="1095" alt="Database Diagram" src="https://github.com/user-attachments/assets/040fc5d7-d6ad-469b-a21c-003a13b43ad3" />
</div>

### Main Entities

- **Usuario** (User): User information and permissions
- **Pet**: Data of animals available for adoption
- **Adocao** (Adoption): Adoption requests and records
- **Endereco** (Address): Complete adopter address

## 🧪 Tests

To run tests (when implemented):

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📝 License

This project is under the ISC license. See the [LICENSE](LICENSE) file for more details.

## 👥 Development Team

- [André](https://github.com/Mordev-tech)
- [Daniel](https://github.com/danielcooder)
- [Danielle](https://github.com/daniellesena)
- [Flávia](https://github.com/flaviare1s)
- [Juliano](https://github.com/julianohbl)
- [Vittoria](https://github.com/Vittoriaalopes)
