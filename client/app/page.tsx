import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getLatestPosts } from "@/lib/sanity"
import { CTAButton, NewsletterCTA, BlogCTA, SecurityGuideCTA } from "@/components/cta-button"
import { NewsletterSubscription } from "@/components/newsletter-subscription"
import { getStudioUrl } from "@/lib/utils"

// Force dynamic rendering to fetch fresh data from Sanity
export const dynamic = 'force-dynamic'

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
          
          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <BlogCTA />
            {/* <SecurityGuideCTA /> */}
          </div>
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

        {/* Call-to-Action Section */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Level Up Your Security Game?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join me on this cybersecurity journey and get access to exclusive insights, 
              practical guides, and real-world security lessons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton
                text="Start Learning Now"
                href="/blog"
                variant="primary"
                icon="zap"
                size="lg"
                className="px-10 py-4"
              />
              {/* <CTAButton
                text="Get Free Security Guide"
                href="/security-guide"
                variant="outline"
                icon="download"
                size="lg"
                className="px-10 py-4"
              /> */}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <NewsletterSubscription />
      </div>
    </div>
  )
}

async function LatestPosts() {
  try {
    const posts = await getLatestPosts(3)
    
    if (!posts || posts.length === 0) {
      const studioUrl = getStudioUrl()
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-6">
            No posts yet. Create your first post through the Sanity Studio!
          </p>
          <a href={studioUrl} target="_blank" rel="noopener noreferrer">
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
