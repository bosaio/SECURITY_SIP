import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export interface CreateUserRequest {
  email: string
  name: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export class UserService {
  // Create a new user
  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: 'USER'
      }
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      role: user.role,
      createdAt: user.createdAt.toISOString()
    }
  }

  // Get user by email
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  // Get user by ID
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    })
  }

  // Verify password
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  // Create admin user (for initial setup)
  async createAdminUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      role: user.role,
      createdAt: user.createdAt.toISOString()
    }
  }

  // Check if admin user exists
  async adminExists(): Promise<boolean> {
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    })
    return adminCount > 0
  }
}

export const userService = new UserService()
