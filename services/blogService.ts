import { 
  BlogPost, 
  CreateBlogPostRequest, 
  UpdateBlogPostRequest, 
  BlogPostFilters, 
  BlogPostResponse,
  ApiResponse 
} from '@/types/blog'
import { prisma } from '@/lib/prisma'

class BlogService {
  // Get all posts with optional filtering
  async getPosts(filters: BlogPostFilters = {}): Promise<ApiResponse<BlogPostResponse>> {
    try {
      const where: any = {}
      
      // Apply filters
      if (filters.category) {
        where.category = { name: filters.category }
      }

      if (filters.status) {
        where.status = filters.status
      }

      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { content: { contains: filters.search, mode: 'insensitive' } }
        ]
      }

      // Get total count
      const total = await prisma.post.count({ where })

      // Pagination
      const page = filters.page || 1
      const limit = filters.limit || 10
      const skip = (page - 1) * limit

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
        skip,
        take: limit
      })

      // Transform to BlogPost format
      const transformedPosts: BlogPost[] = posts.map(post => ({
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
        status: post.status.toLowerCase() as 'draft' | 'published' | 'archived',
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }))

      const response: BlogPostResponse = {
        posts: transformedPosts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }

      return {
        success: true,
        data: response
      }
    } catch (error) {
      console.error('Error getting posts:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get a single post by ID
  async getPostById(id: number): Promise<ApiResponse<BlogPost>> {
    try {
      const post = await prisma.post.findUnique({
        where: { id: id.toString() },
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
        return {
          success: false,
          error: 'Post not found'
        }
      }

      // Transform to BlogPost format
      const transformedPost: BlogPost = {
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
        status: post.status.toLowerCase() as 'draft' | 'published' | 'archived',
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }

      return {
        success: true,
        data: transformedPost
      }
    } catch (error) {
      console.error('Error getting post:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get latest posts
  async getLatestPosts(count: number = 3): Promise<ApiResponse<BlogPost[]>> {
    try {
      const posts = await prisma.post.findMany({
        where: { status: 'PUBLISHED' },
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
        orderBy: { publishedAt: 'desc' },
        take: count
      })

      // Transform to BlogPost format
      const transformedPosts: BlogPost[] = posts.map(post => ({
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
        status: post.status.toLowerCase() as 'draft' | 'published' | 'archived',
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }))

      return {
        success: true,
        data: transformedPosts
      }
    } catch (error) {
      console.error('Error getting latest posts:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Create a new post
  async createPost(postData: CreateBlogPostRequest, authorId: string): Promise<ApiResponse<BlogPost>> {
    try {
      // Check if category exists, create if it doesn't
      let category = await prisma.category.findUnique({
        where: { name: postData.category }
      })

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: postData.category,
            color: postData.color,
            slug: postData.category.toLowerCase().replace(/\s+/g, '-')
          }
        })
      }

      // Create or find tags
      const tagIds: string[] = []
      if (postData.tags && postData.tags.length > 0) {
        for (const tagName of postData.tags) {
          let tag = await prisma.tag.findUnique({
            where: { name: tagName }
          })

          if (!tag) {
            tag = await prisma.tag.create({
              data: {
                name: tagName,
                slug: tagName.toLowerCase().replace(/\s+/g, '-')
              }
            })
          }
          tagIds.push(tag.id)
        }
      }

      // Create the post
      const post = await prisma.post.create({
        data: {
          title: postData.title,
          slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          description: postData.description,
          content: postData.content,
          icon: postData.icon,
          color: postData.color,
          readTime: postData.readTime,
          status: 'DRAFT',
          authorId,
          categoryId: category.id,
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

      // Transform to BlogPost format
      const transformedPost: BlogPost = {
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
        status: post.status.toLowerCase() as 'draft' | 'published' | 'archived',
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }

      return {
        success: true,
        data: transformedPost,
        message: 'Post created successfully'
      }
    } catch (error) {
      console.error('Error creating post:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Update an existing post
  async updatePost(id: number, updates: UpdateBlogPostRequest, authorId: string): Promise<ApiResponse<BlogPost>> {
    try {
      // Check if post exists and user has permission
      const existingPost = await prisma.post.findUnique({
        where: { id: id.toString() },
        include: { author: true }
      })

      if (!existingPost) {
        return {
          success: false,
          error: 'Post not found'
        }
      }

      if (existingPost.authorId !== authorId) {
        return {
          success: false,
          error: 'Unauthorized to update this post'
        }
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
              slug: updates.category.toLowerCase().replace(/\s+/g, '-')
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
                slug: tagName.toLowerCase().replace(/\s+/g, '-')
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
        where: { id: id.toString() },
        data: {
          title: updates.title,
          description: updates.description,
          content: updates.content,
          icon: updates.icon,
          color: updates.color,
          readTime: updates.readTime,
          categoryId,
          tags: tagConnections,
          ...(updates.title && { slug: updates.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
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

      // Transform to BlogPost format
      const transformedPost: BlogPost = {
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
        status: updatedPost.status.toLowerCase() as 'draft' | 'published' | 'archived',
        createdAt: updatedPost.createdAt.toISOString(),
        updatedAt: updatedPost.updatedAt.toISOString()
      }

      return {
        success: true,
        data: transformedPost,
        message: 'Post updated successfully'
      }
    } catch (error) {
      console.error('Error updating post:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Delete a post
  async deletePost(id: number, authorId: string): Promise<ApiResponse<void>> {
    try {
      // Check if post exists and user has permission
      const existingPost = await prisma.post.findUnique({
        where: { id: id.toString() },
        include: { author: true }
      })

      if (!existingPost) {
        return {
          success: false,
          error: 'Post not found'
        }
      }

      if (existingPost.authorId !== authorId) {
        return {
          success: false,
          error: 'Unauthorized to delete this post'
        }
      }

      await prisma.post.delete({
        where: { id: id.toString() }
      })

      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get categories with post counts
  async getCategories(): Promise<ApiResponse<{ name: string; count: number; color: string }[]>> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true }
          }
        }
      })

      const transformedCategories = categories.map(category => ({
        name: category.name,
        count: category._count.posts,
        color: category.color
      }))

      return {
        success: true,
        data: transformedCategories
      }
    } catch (error) {
      console.error('Error getting categories:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
}

// Export a singleton instance
export const blogService = new BlogService()
