# Security SIP - Cybersecurity Blog

A modern cybersecurity blog built with a **separated client-server architecture** for better scalability, maintainability, and deployment flexibility.

## 🏗️ Architecture Overview

The application has been completely restructured to separate concerns:

```
SECURITY_SIP/
├── client/                 # Frontend (Next.js 15)
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── lib/               # Client-side utilities
│   └── package.json       # Frontend dependencies
├── server/                 # Backend (Express.js + Prisma)
│   ├── src/               # Server source code
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   └── lib/           # Server utilities
│   ├── prisma/            # Database schema and migrations
│   └── package.json       # Backend dependencies
├── shared/                 # Shared code between client and server
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Common utility functions
└── package.json            # Root workspace configuration
```

## ✨ Key Benefits of Separation

### **🚀 Scalability**
- **Independent scaling** of frontend and backend
- **Load balancing** for API servers
- **CDN deployment** for static frontend assets

### **🔧 Maintainability**
- **Clear separation** of concerns
- **Independent versioning** and updates
- **Easier debugging** and testing

### **🌐 Deployment Flexibility**
- **Frontend**: Deploy to Vercel, Netlify, or any static hosting
- **Backend**: Deploy to Railway, Heroku, AWS, or any Node.js hosting
- **Database**: Use managed PostgreSQL services

### **👥 Team Collaboration**
- **Frontend developers** work on client
- **Backend developers** work on server
- **Shared types** ensure consistency

## 🚀 Getting Started

### **Prerequisites**
- **Node.js 18+**
- **PostgreSQL** database
- **npm** or **yarn**

### **Quick Start**

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd SECURITY_SIP
   npm run install:all
   ```

2. **Set up environment variables**:
   ```bash
   # Server environment
   cd server
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Initialize database**:
   ```bash
   npm run db:generate
   npm run db:push
   npm run setup
   ```

4. **Start development servers**:
   ```bash
   # From root directory
   npm run dev
   ```

   This starts both:
   - **Backend**: http://localhost:5000
   - **Frontend**: http://localhost:3000

## 📁 Project Structure

### **Client (Frontend)**
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Axios** for API communication

### **Server (Backend)**
- **Express.js** REST API
- **Prisma ORM** for database operations
- **JWT authentication** with bcrypt
- **Input validation** with express-validator
- **Rate limiting** and security middleware

### **Shared**
- **TypeScript interfaces** for API contracts
- **Utility functions** used by both client and server
- **Common constants** and configurations

## 🔧 Development Commands

### **Root Directory (Workspace)**
```bash
npm run dev              # Start both client and server
npm run build            # Build both client and server
npm run install:all      # Install all dependencies
npm run lint             # Lint both client and server
```

### **Client Only**
```bash
cd client
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run start            # Start production server
```

### **Server Only**
```bash
cd server
npm run dev              # Start Express dev server
npm run build            # Build TypeScript
npm run start            # Start production server
npm run setup            # Initialize database
```

## 🗄️ Database Management

### **Prisma Commands**
```bash
cd server
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create and run migrations
npm run db:studio        # Open Prisma Studio GUI
```

### **Database Schema**
- **Users**: Authentication and user management
- **Posts**: Blog posts with rich metadata
- **Categories**: Post categorization
- **Tags**: Post tagging system
- **Comments**: User comments on posts

## 🔐 Authentication System

### **Features**
- **JWT-based authentication**
- **Password hashing** with bcrypt
- **Role-based access control** (USER, MODERATOR, ADMIN)
- **Protected API routes**
- **Automatic token refresh**

### **Default Admin Account**
- **Email**: `admin@securitysip.com`
- **Password**: `admin123`
- **Role**: ADMIN

⚠️ **Important**: Change default password after first login!

## 🌐 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Blog Posts**
- `GET /api/posts` - List posts with filtering
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### **Categories & Users**
- `GET /api/categories` - List categories
- `GET /api/users/profile` - Get user profile
- `GET /api/users` - List users (admin only)

## 🚀 Deployment

### **Frontend Deployment**
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting service
```

**Recommended platforms**:
- **Vercel**: Optimized for Next.js
- **Netlify**: Great for static sites
- **AWS S3 + CloudFront**: Enterprise solution

### **Backend Deployment**
```bash
cd server
npm run build
npm start
# Deploy to your Node.js hosting service
```

**Recommended platforms**:
- **Railway**: Easy deployment with PostgreSQL
- **Heroku**: Traditional Node.js hosting
- **AWS EC2**: Full control and scalability
- **DigitalOcean App Platform**: Simple container deployment

### **Database Deployment**
- **Supabase**: Free tier with 500MB
- **Neon**: Free tier with 3GB
- **Railway**: Integrated with app deployment
- **AWS RDS**: Enterprise PostgreSQL

## 🧪 Testing

### **Client Testing**
```bash
cd client
npm run test              # Run frontend tests
npm run type-check        # TypeScript validation
```

### **Server Testing**
```bash
cd server
npm run test              # Run backend tests
npm run lint              # Code quality checks
```

## 📚 Learning Resources

This project demonstrates:
- **Microservices architecture** principles
- **API-first design** patterns
- **Type-safe** client-server communication
- **Modern fullstack** development practices
- **Production-ready** security features

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** both client and server
5. **Submit** a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🎉 Congratulations!** You now have a production-ready, scalable cybersecurity blog with a clean separation of concerns that makes it easy to deploy, maintain, and scale.

**Built with ❤️ for the cybersecurity community**
