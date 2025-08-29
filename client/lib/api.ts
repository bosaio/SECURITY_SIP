import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('authToken')
      window.location.href = '/auth/signin'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  }
}

// Posts API
export const postsAPI = {
  getAll: async (params?: any) => {
    const response = await api.get('/posts', { params })
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },
  
  create: async (postData: any) => {
    const response = await api.post('/posts', postData)
    return response.data
  },
  
  update: async (id: number, postData: any) => {
    const response = await api.put(`/posts/${id}`, postData)
    return response.data
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  },
  
  publish: async (id: number) => {
    const response = await api.patch(`/posts/${id}/publish`)
    return response.data
  },
  
  unpublish: async (id: number) => {
    const response = await api.patch(`/posts/${id}/unpublish`)
    return response.data
  }
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories')
    return response.data
  },
  
  create: async (categoryData: any) => {
    const response = await api.post('/categories', categoryData)
    return response.data
  },
  
  update: async (id: number, categoryData: any) => {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  }
}

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users')
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
  
  update: async (id: number, userData: any) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  }
}

export default api
