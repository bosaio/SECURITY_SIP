import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getLatestPosts } from "@/lib/sanity"

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Documenting a transition into Application and Information Security
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Follow my journey from Fullstack developer to securing a role in the cybersecurity industry. 
            I share knowledge and insights gained through a hands-on approach to learning.
          </p>
        </div>

        {/* Latest Posts Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            <Link href="/blog">
              <Button variant="outline" className="hover:bg-gray-100">
                View All Posts →
              </Button>
            </Link>
          </div>
          <LatestPosts />
        </div>

        {/* Newsletter Subscription Section */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Stay updated on my journey
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="text-gray-600 mb-6">Subscribe to the mailing list</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8">
                SUBSCRIBE
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function LatestPosts() {
  try {
    const posts = await getLatestPosts(3)
    
    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-6">
            No posts yet. Create your first post through the Sanity Studio!
          </p>
          <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Open Sanity Studio
            </Button>
          </a>
        </div>
      )
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Card key={post._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</span>
                <Link href={`/blog/${post.slug.current}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg mb-6">
          Error loading posts. Please try again later.
        </p>
      </div>
    )
  }
}
