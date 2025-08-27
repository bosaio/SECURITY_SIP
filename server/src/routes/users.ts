import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireRole } from '../middleware/auth'

const router = Router()

// Get current user profile
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        image: true,
        createdAt: true
      }
    })

    res.json({
      success: true,
      data: {
        ...user,
        createdAt: user!.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get all users (admin only)
router.get('/', [
  requireRole(['ADMIN'])
], async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const transformedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString()
    }))

    res.json({
      success: true,
      data: transformedUsers
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router
