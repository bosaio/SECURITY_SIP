# 🚀 Complete Setup Guide for Security SIP

This guide will walk you through setting up the separated client-server architecture step by step.

## 📋 Prerequisites

- **Node.js 18+** installed
- **PostgreSQL** database server (local or cloud)
- **Git** for version control
- **npm** or **yarn** package manager

## 🗄️ Step 1: Database Setup

### **Option A: Local PostgreSQL (Development)**

1. **Install PostgreSQL**:
   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows: Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database and User**:
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE security_sip_db;
   CREATE USER security_sip_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE security_sip_db TO security_sip_user;
   
   # Exit
   \q
   ```

### **Option B: Cloud PostgreSQL (Production)**

**Recommended free tiers**:
- **Supabase**: 500MB database, easy setup
- **Neon**: 3GB database, serverless
- **Railway**: 1GB database, integrated deployment

## ⚙️ Step 2: Environment Configuration

1. **Create server environment file**:
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Edit `.env` with your database credentials**:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/security_sip_db"
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Secret (generate with: openssl rand -base64 32)
   JWT_SECRET="your-super-secret-jwt-key-here"
   
   # Client URL for CORS
   CLIENT_URL="http://localhost:3000"
   ```

3. **Create client environment file**:
   ```bash
   cd ../client
   echo 'NEXT_PUBLIC_API_URL="http://localhost:5000"' > .env.local
   ```

## 📦 Step 3: Install Dependencies

1. **Install all dependencies** (from root directory):
   ```bash
   npm run install:all
   ```

   This will install dependencies for:
   - Root workspace
   - Server (Express.js + Prisma)
   - Client (Next.js + React)

## 🗃️ Step 4: Database Initialization

1. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```

2. **Push database schema**:
   ```bash
   npm run db:push
   ```

3. **Run setup script** to create initial data:
   ```bash
   npm run setup
   ```

   This creates:
   - Admin user: `admin@securitysip.com` / `admin123`
   - Initial categories (Application Security, API Security, etc.)
   - Initial tags (security, cybersecurity, web, etc.)

## 🚀 Step 5: Start Development Servers

1. **Start both client and server** (from root directory):
   ```bash
   npm run dev
   ```

   This starts:
   - **Backend**: http://localhost:5000
   - **Frontend**: http://localhost:3000

2. **Verify everything is working**:
   - Backend health check: http://localhost:5000/health
   - Frontend homepage: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## 🔐 Step 6: First Login

1. **Navigate to sign-in page**: http://localhost:3000/auth/signin
2. **Use default admin credentials**:
   - **Email**: `admin@securitysip.com`
   - **Password**: `admin123`
3. **You'll be redirected to admin panel** after successful login

⚠️ **Important**: Change the default password after first login!

## 🧪 Step 7: Test the System

### **Test Backend API**
```bash
# Health check
curl http://localhost:5000/health

# Get posts (should return empty array initially)
curl http://localhost:5000/api/posts

# Get categories
curl http://localhost:5000/api/categories
```

### **Test Frontend**
1. **Create a blog post**:
   - Go to `/admin/posts/new`
   - Fill out the form
   - Submit and verify it appears in the posts list

2. **View the blog**:
   - Go to `/blog` to see all posts
   - Click on a post to view details
   - Verify the homepage shows latest posts

## 🚧 Troubleshooting

### **Common Issues**

1. **Database Connection Error**:
   ```bash
   # Verify PostgreSQL is running
   brew services list | grep postgresql
   
   # Check connection string in .env
   # Ensure database exists and user has permissions
   ```

2. **Port Already in Use**:
   ```bash
   # Check what's using port 5000
   lsof -i :5000
   
   # Kill process or change PORT in .env
   ```

3. **Prisma Client Error**:
   ```bash
   cd server
   npm run db:generate
   # Restart development server
   ```

4. **TypeScript Errors**:
   ```bash
   # Check types in client
   cd client
   npm run type-check
   
   # Check types in server
   cd ../server
   npx tsc --noEmit
   ```

### **Debug Mode**
Enable debug logging by adding to server `.env`:
```env
DEBUG="prisma:*"
NODE_ENV=development
```

## 📊 Development Workflow

### **Working on Frontend**
```bash
cd client
npm run dev
# Make changes to React components
# Hot reload will update automatically
```

### **Working on Backend**
```bash
cd server
npm run dev
# Make changes to Express routes
# Server will restart automatically
```

### **Database Changes**
```bash
cd server
# Edit prisma/schema.prisma
npm run db:push
# Or create migration
npm run db:migrate
```

## 🚀 Next Steps

After successful setup:

1. **Create your first blog post** using the admin interface
2. **Customize categories and tags** for your content
3. **Explore the API endpoints** using tools like Postman
4. **Set up production deployment** (see README.md)
5. **Add image uploads** and rich text editing
6. **Implement search functionality** and analytics

## 🆘 Getting Help

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review the logs** in your terminal
3. **Verify environment variables** are set correctly
4. **Check database connection** and permissions
5. **Ensure all dependencies** are installed

---

**🎉 Congratulations!** You now have a fully functional, separated client-server cybersecurity blog running locally.

**Next**: Explore the codebase, create content, and prepare for production deployment!
