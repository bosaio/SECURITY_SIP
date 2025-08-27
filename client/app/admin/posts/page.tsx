import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
            <Link href="/admin/posts/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Create New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts (0)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-6">
                No blog posts yet. Create your first post to get started!
              </p>
              <Link href="/admin/posts/new">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin">
                  <Button variant="outline">
                    ← Back to Admin
                  </Button>
                </Link>
                <Link href="/admin/categories">
                  <Button variant="outline">
                    Manage Categories
                  </Button>
                </Link>
                <Button variant="outline">
                  Export Posts
                </Button>
                <Button variant="outline">
                  Bulk Actions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
