import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// Get all categories with post counts
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })

    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      postCount: category._count.posts
    }))

    res.json({
      success: true,
      data: transformedCategories
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router
