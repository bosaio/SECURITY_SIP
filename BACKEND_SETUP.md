# 🚀 Backend Setup Guide for Security SIP

This guide will walk you through setting up a real backend for your cybersecurity blog using PostgreSQL, Prisma ORM, and NextAuth.js for authentication.

## 📋 Prerequisites

- **Node.js 18+** installed
- **PostgreSQL** database server (local or cloud)
- **Git** for version control

## 🗄️ Database Setup

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL**
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

2. **Create Database**
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE security_sip_db;
   CREATE USER security_sip_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE security_sip_db TO security_sip_user;
   
   # Exit
   \q
   ```

### Option 2: Cloud PostgreSQL (Recommended for Production)

- **Supabase**: Free tier with 500MB database
- **Neon**: Free tier with 3GB database
- **Railway**: Free tier with 1GB database
- **PlanetScale**: Free tier with 1GB database

## ⚙️ Environment Configuration

1. **Update `.env` file** with your database credentials:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/security_sip_db"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-here-change-in-production"
   
   # JWT
   JWT_SECRET="your-jwt-secret-key-here-change-in-production"
   
   # Environment
   NODE_ENV="development"
   ```

2. **Generate secure secrets**:
   ```bash
   # Generate NextAuth secret
   openssl rand -base64 32
   
   # Generate JWT secret
   openssl rand -base64 32
   ```

## 🗃️ Database Initialization

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

   This will create:
   - Admin user: `admin@securitysip.com` / `admin123`
   - Initial categories (Application Security, API Security, etc.)
   - Initial tags (security, cybersecurity, web, etc.)

## 🔐 Authentication Setup

The application now includes:

- **NextAuth.js** with credentials provider
- **Password hashing** with bcryptjs
- **JWT sessions** for secure authentication
- **Role-based access control** (USER, ADMIN, MODERATOR)
- **Protected admin routes**

### Default Admin Account
- **Email**: `admin@securitysip.com`
- **Password**: `admin123`
- **Role**: ADMIN

⚠️ **Important**: Change the default password after first login!

## 🚀 Running the Application

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   - **Homepage**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **Sign In**: http://localhost:3000/auth/signin

## 📊 Database Management

### Prisma Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Database Schema
The application includes these models:

- **User**: Authentication and user management
- **Post**: Blog posts with rich metadata
- **Category**: Post categorization
- **Tag**: Post tagging system
- **Comment**: User comments on posts
- **Newsletter**: Email subscription management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out

### Blog Posts
- `GET /api/posts` - List posts with filtering
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Categories
- `GET /api/categories` - List categories

## 🛡️ Security Features

- **Password hashing** with bcryptjs
- **JWT token validation**
- **Role-based access control**
- **SQL injection prevention** with Prisma
- **CSRF protection** with NextAuth.js
- **Secure session management**

## 📝 Content Management

### Creating Posts
1. Sign in as admin
2. Navigate to `/admin/posts/new`
3. Fill out the form with:
   - Title, description, content
   - Category and tags
   - Icon and color theme
   - Read time estimate

### Managing Categories
- Categories are automatically created when posts use them
- Colors can be customized per category
- Categories show post counts

### User Roles
- **USER**: Can view posts and comment
- **MODERATOR**: Can moderate comments and edit posts
- **ADMIN**: Full access to all features

## 🚧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL in `.env`
   - Check if PostgreSQL is running
   - Ensure database exists and user has permissions

2. **Prisma Client Error**
   - Run `npm run db:generate`
   - Restart development server

3. **Authentication Issues**
   - Check NEXTAUTH_SECRET in `.env`
   - Verify NEXTAUTH_URL matches your domain

4. **Permission Denied**
   - Ensure user has proper database permissions
   - Check if tables exist in database

### Debug Mode
Enable debug logging by adding to `.env`:
```env
DEBUG="prisma:*"
```

## 🚀 Production Deployment

### Environment Variables
Update `.env` for production:
```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
```

### Database Migrations
```bash
# Create production migration
npm run db:migrate

# Deploy to production
npm run build
npm start
```

### Security Checklist
- [ ] Change default admin password
- [ ] Use strong, unique secrets
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging

## 📚 Next Steps

After setting up the backend:

1. **Create your first blog post** using the admin interface
2. **Customize categories and tags** for your content
3. **Set up email notifications** for new posts
4. **Add image uploads** for post thumbnails
5. **Implement search functionality**
6. **Add analytics and tracking**
7. **Set up automated backups**

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Prisma and NextAuth.js documentation
3. Check the application logs for error messages
4. Verify all environment variables are set correctly

---

**🎉 Congratulations!** You now have a production-ready backend for your cybersecurity blog with full authentication, database management, and content management capabilities.
