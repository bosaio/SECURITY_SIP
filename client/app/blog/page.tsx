import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore my journey into cybersecurity through these articles covering various aspects of application and information security.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-6">
            No blog posts yet. Create your first post through the admin panel!
          </p>
          <Link href="/auth/signin">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Sign In to Admin
            </button>
          </Link>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-white border-2 border-gray-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated on My Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Get notified when I publish new articles about cybersecurity, application security, and my transition journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
