import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
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

// Response interceptor to handle errors
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
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
  },

  register: async (email: string, name: string, password: string) => {
    const response = await api.post('/api/auth/register', { email, name, password })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('authToken')
  }
}

// Posts API
export const postsAPI = {
  getAll: async (filters?: any) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value))
        }
      })
    }
    
    const response = await api.get(`/api/posts?${params.toString()}`)
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/posts/${id}`)
    return response.data
  },

  create: async (postData: any) => {
    const response = await api.post('/api/posts', postData)
    return response.data
  },

  update: async (id: number, postData: any) => {
    const response = await api.put(`/api/posts/${id}`, postData)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/posts/${id}`)
    return response.data
  }
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/api/categories')
    return response.data
  }
}

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await api.get('/api/users/profile')
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/api/users')
    return response.data
  }
}

export default api
