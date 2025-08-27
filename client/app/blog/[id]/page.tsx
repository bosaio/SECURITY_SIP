import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { blogService } from "@/services/blogService"
import { getColorClasses, formatDate } from "@/utils/blogUtils"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postResult = await blogService.getPostById(parseInt(id))
  
  if (!postResult.success || !postResult.data) {
    notFound()
  }

  const post = postResult.data

  // Get related posts (excluding current post)
  const allPostsResult = await blogService.getPosts()
  const allPosts = allPostsResult.success ? allPostsResult.data?.posts || [] : []
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
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
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getColorClasses(post.color)}`}>
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{formatDate(post.date, 'long')}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </CardHeader>

          {/* Article Content */}
          <CardContent className="p-8">
            {post.content ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:text-gray-800 prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
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
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{relatedPost.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{relatedPost.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(relatedPost.date)}</span>
                        <Link 
                          href={`/blog/${relatedPost.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
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
