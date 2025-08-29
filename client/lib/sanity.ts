import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rb9cpc3o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-08-27', // Use today's date
  useCdn: false, // Set to false for development, true for production
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Image URL builder
export const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to get all posts
export async function getAllPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      content,
      publishedAt
    }
  `)
}

// Helper function to get post by slug
export async function getPostBySlug(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      publishedAt
    }
  `, { slug })
}

// Helper function to get all categories
export async function getAllCategories() {
  return await client.fetch(`
    *[_type == "category"] | order(name asc) {
      _id,
      name,
      description,
      color,
      slug,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `)
}

// Helper function to get latest posts
export async function getLatestPosts(limit: number = 3) {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      description,
      publishedAt
    }
  `, { limit })
}
