// Shared types between client and server

export interface BlogPost {
  id: number
  title: string
  description: string
  category: string
  date: string
  readTime: string
  icon: string
  color: string
  content?: string
  slug?: string
  tags?: string[]
  author?: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface CreateBlogPostRequest {
  title: string
  description: string
  category: string
  date: string
  readTime: string
  icon: string
  color: string
  content?: string
  tags?: string[]
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  id: number
}

export interface BlogPostFilters {
  category?: string
  status?: 'draft' | 'published' | 'archived'
  search?: string
  page?: number
  limit?: number
}

export interface BlogPostResponse {
  posts: BlogPost[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Category {
  id: string
  name: string
  description?: string
  color: string
  postCount: number
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  user: User
  token: string
}
