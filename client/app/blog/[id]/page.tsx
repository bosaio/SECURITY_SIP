import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/sanity"
import PortableTextRenderer from "@/components/PortableTextRenderer"

// Force dynamic rendering to fetch fresh data from Sanity
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostBySlug(id)
  
  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter((p: any) => p.slug.current !== post.slug.current)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              ← Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Draft'}</span>
            </div>
          </CardHeader>

          {/* Article Content */}
          <CardContent className="p-8">
            {post.content ? (
              <PortableTextRenderer content={post.content} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Content coming soon...</p>
                <p className="text-gray-400 text-sm mt-2">This article is being prepared</p>
              </div>
            )}
          </CardContent>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <Card key={relatedPost._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <Link href={`/blog/${relatedPost.slug.current}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{relatedPost.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedPost.publishedAt ? new Date(relatedPost.publishedAt).toLocaleDateString() : 'Draft'}</span>
                      <Link 
                        href={`/blog/${relatedPost.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
