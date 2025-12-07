# Real App - Contract Management System

A modern web application for managing contracts with digital signatures, built with Next.js 16, NextAuth.js, and Prisma.

## 🚀 Features

- **User Authentication**: Secure sign-in/sign-out with NextAuth.js
- **Contract Management**: Create, view, send, and sign contracts
- **Digital Signatures**: Integrated signature canvas for contract signing
- **PDF Generation**: Generate PDFs from contracts
- **Role-based Access**: Admin and client user roles
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Live contract status updates

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Signature Canvas** - Digital signature component

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js v4** - Authentication library
- **Prisma ORM** - Database toolkit
- **SQLite** - Database (development)

### Additional Tools

- **Puppeteer** - PDF generation
- **PDF-lib** - PDF manipulation
- **bcryptjs** - Password hashing (planned)
- **ESLint** - Code linting

## 📋 Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Git** for version control

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/superdividenz/Real-App.git
   cd Real-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push

   # (Optional) Seed the database with sample data
   npm run db:seed
   ```

## 🚀 Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧹 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Seed database with sample data
npm run db:seed
```

## 📖 Usage Guide

### Authentication

- Visit the homepage and click "Sign In"
- Use default credentials: `admin@example.com` / `password` (created by `npm run db:seed`)
- Or create a new account through the registration process

**Note**: Run `npm run db:seed` to create the default admin and client users.

### Creating Contracts

1. Navigate to `/contracts/new`
2. Fill in contract title and content
3. Click "Create Contract"

### Managing Contracts

- **View All Contracts**: Visit `/contracts`
- **View Contract Details**: Click on any contract in the list
- **Send Contract**: Click "Send to Client" on draft contracts
- **Sign Contract**: Use the signature canvas to sign contracts

### Database Management

- **View Database**: Use DB Browser for SQLite
  ```bash
  open -a "DB Browser for SQLite" dev.db
  ```
- **Reset Database**: Delete `dev.db` and run `npx prisma db push`

## 🔌 API Endpoints

### Authentication

- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers
- `POST /api/users` - Create new user

### Contracts

- `GET /api/contracts` - Get all contracts
- `POST /api/contracts` - Create new contract
- `GET /api/contracts/[id]` - Get contract by ID
- `POST /api/contracts/[id]/send` - Send contract to client
- `POST /api/contracts/[id]/sign` - Sign contract

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  name      String?
  role      String   @default("client") // admin or client
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Contract Model

```prisma
model Contract {
  id          String   @id @default(cuid())
  title       String
  content     String
  createdById String
  status      String   @default("draft") // draft, sent, signed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  sentAt      DateTime?
  signedAt    DateTime?
}
```

## 🏗️ Project Structure

```
Real-App/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication routes
│   │   ├── contracts/     # Contract management routes
│   │   └── users/         # User management routes
│   ├── auth/              # Authentication pages
│   ├── contracts/         # Contract pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── temp-storage.ts   # Temporary in-memory storage
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema definition
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔍 Development Notes

### Current Implementation Status

✅ **Completed Features:**

- User authentication with NextAuth.js
- Contract CRUD operations
- Digital signature functionality
- PDF generation capabilities
- Responsive UI with Tailwind CSS
- Role-based access control

⚠️ **Known Issues & Temporary Solutions:**

- **Database**: Currently using temporary in-memory storage instead of Prisma
- **Authentication**: Passwords are stored in plain text (needs bcrypt implementation)
- **Session Management**: Basic JWT implementation (may need enhancement)

### Development Workflow

1. **Feature Development**

   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Make changes and test
   npm run dev

   # Commit changes
   git add .
   git commit -m "Add new feature"
   ```

2. **Database Changes**

   ```bash
   # Update schema.prisma
   # Then regenerate client
   npx prisma generate

   # Push changes to database
   npx prisma db push
   ```

### Testing

- **Manual Testing**: Use the application UI to test features
- **API Testing**: Use tools like Postman or curl for API endpoints
- **Database Testing**: Use DB Browser for SQLite to inspect data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- **Railway**: Supports SQLite databases
- **Render**: Good for full-stack applications
- **Heroku**: Traditional hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues:

- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js, Prisma, and modern web technologies**
