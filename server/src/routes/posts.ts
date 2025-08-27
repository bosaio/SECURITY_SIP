import { Router, Request, Response } from 'express'
import { body, validationResult, query } from 'express-validator'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireRole } from '../middleware/auth'
import { generateSlug } from '../../../shared/utils'

const router = Router()

// Get all posts with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isString(),
  query('status').optional().isIn(['draft', 'published', 'archived']),
  query('search').optional().isString()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const {
      page = 1,
      limit = 10,
      category,
      status,
      search
    } = req.query

    const where: any = {}

    // Apply filters
    if (category) {
      where.category = { name: category as string }
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    // Get total count
    const total = await prisma.post.count({ where })

    // Get posts with relations
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    })

    // Transform to response format
    const transformedPosts = posts.map(post => ({
      id: parseInt(post.id),
      title: post.title,
      description: post.description,
      category: post.category.name,
      date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      readTime: post.readTime,
      icon: post.icon,
      color: post.category.color,
      content: post.content || undefined,
      slug: post.slug,
      tags: post.tags.map(tag => tag.name),
      author: post.author.name || post.author.email,
      status: post.status.toLowerCase(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }))

    res.json({
      success: true,
      data: {
        posts: transformedPosts,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get posts error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get single post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }

    // Transform to response format
    const transformedPost = {
      id: parseInt(post.id),
      title: post.title,
      description: post.description,
      category: post.category.name,
      date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      readTime: post.readTime,
      icon: post.icon,
      color: post.category.color,
      content: post.content || undefined,
      slug: post.slug,
      tags: post.tags.map(tag => tag.name),
      author: post.author.name || post.author.email,
      status: post.status.toLowerCase(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }

    res.json({
      success: true,
      data: transformedPost
    })
  } catch (error) {
    console.error('Get post error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Create new post (requires authentication)
router.post('/', [
  requireRole(['ADMIN', 'MODERATOR']),
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('description').trim().isLength({ min: 1, max: 500 }),
  body('category').trim().isLength({ min: 1 }),
  body('readTime').trim().isLength({ min: 1 }),
  body('icon').trim().isLength({ min: 1 }),
  body('color').trim().isLength({ min: 1 }),
  body('content').optional().isString(),
  body('tags').optional().isArray()
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const {
      title,
      description,
      category,
      readTime,
      icon,
      color,
      content,
      tags
    } = req.body

    // Check if category exists, create if it doesn't
    let categoryRecord = await prisma.category.findUnique({
      where: { name: category }
    })

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          color,
          slug: generateSlug(category)
        }
      })
    }

    // Create or find tags
    const tagIds: string[] = []
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName }
        })

        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              slug: generateSlug(tagName)
            }
          })
        }
        tagIds.push(tag.id)
      }
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        slug: generateSlug(title),
        description,
        content,
        icon,
        color,
        readTime,
        status: 'DRAFT',
        authorId: req.user!.id,
        categoryId: categoryRecord.id,
        tags: {
          connect: tagIds.map(id => ({ id }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    // Transform to response format
    const transformedPost = {
      id: parseInt(post.id),
      title: post.title,
      description: post.description,
      category: post.category.name,
      date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      readTime: post.readTime,
      icon: post.icon,
      color: post.category.color,
      content: post.content || undefined,
      slug: post.slug,
      tags: post.tags.map(tag => tag.name),
      author: post.author.name || post.author.email,
      status: post.status.toLowerCase(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }

    res.status(201).json({
      success: true,
      data: transformedPost,
      message: 'Post created successfully'
    })
  } catch (error) {
    console.error('Create post error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Update post (requires authentication and ownership)
router.put('/:id', [
  requireRole(['ADMIN', 'MODERATOR']),
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  body('description').optional().trim().isLength({ min: 1, max: 500 }),
  body('category').optional().trim().isLength({ min: 1 }),
  body('readTime').optional().trim().isLength({ min: 1 }),
  body('icon').optional().trim().isLength({ min: 1 }),
  body('color').optional().trim().isLength({ min: 1 }),
  body('content').optional().isString(),
  body('tags').optional().isArray()
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { id } = req.params
    const updates = req.body

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    })

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }

    // Only allow admins or the post author to update
    if (req.user!.role !== 'ADMIN' && existingPost.authorId !== req.user!.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to update this post'
      })
    }

    // Update category if changed
    let categoryId = existingPost.categoryId
    if (updates.category && updates.category !== existingPost.category?.name) {
      let category = await prisma.category.findUnique({
        where: { name: updates.category }
      })

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: updates.category,
            color: updates.color || existingPost.color,
            slug: generateSlug(updates.category)
          }
        })
      }
      categoryId = category.id
    }

    // Update tags if changed
    let tagConnections = {}
    if (updates.tags) {
      const tagIds: string[] = []
      for (const tagName of updates.tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName }
        })

        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              slug: generateSlug(tagName)
            }
          })
        }
        tagIds.push(tag.id)
      }

      tagConnections = {
        set: tagIds.map(id => ({ id }))
      }
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: updates.title,
        description: updates.description,
        content: updates.content,
        icon: updates.icon,
        color: updates.color,
        readTime: updates.readTime,
        categoryId,
        tags: tagConnections,
        ...(updates.title && { slug: generateSlug(updates.title) })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    // Transform to response format
    const transformedPost = {
      id: parseInt(updatedPost.id),
      title: updatedPost.title,
      description: updatedPost.description,
      category: updatedPost.category.name,
      date: updatedPost.publishedAt?.toISOString() || updatedPost.createdAt.toISOString(),
      readTime: updatedPost.readTime,
      icon: updatedPost.icon,
      color: updatedPost.category.color,
      content: updatedPost.content || undefined,
      slug: updatedPost.slug,
      tags: updatedPost.tags.map(tag => tag.name),
      author: updatedPost.author.name || updatedPost.author.email,
      status: updatedPost.status.toLowerCase(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString()
    }

    res.json({
      success: true,
      data: transformedPost,
      message: 'Post updated successfully'
    })
  } catch (error) {
    console.error('Update post error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Delete post (requires authentication and ownership)
router.delete('/:id', [
  requireRole(['ADMIN', 'MODERATOR'])
], async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    })

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }

    // Only allow admins or the post author to delete
    if (req.user!.role !== 'ADMIN' && existingPost.authorId !== req.user!.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to delete this post'
      })
    }

    await prisma.post.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Delete post error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router
