import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <p className="text-gray-600 text-sm">Total Posts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-gray-600 text-sm">Published Posts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <p className="text-gray-600 text-sm">Draft Posts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <p className="text-gray-600 text-sm">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Link href="/admin/posts/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    + Create New Post
                  </Button>
                </Link>
                <Link href="/admin/categories">
                  <Button variant="outline">
                    Manage Categories
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline">
                    Site Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Posts</CardTitle>
              <Link href="/admin/posts">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">No posts yet. Create your first post!</p>
                <Link href="/admin/posts/new">
                  <Button className="mt-4">Create Post</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Categories Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">No categories yet. Categories will be created automatically when you create posts.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
