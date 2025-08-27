"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPost, CreateBlogPostRequest } from "@/types/blog"

interface BlogFormProps {
  post?: BlogPost
  onSubmit: (data: CreateBlogPostRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

const categoryOptions = [
  "Application Security",
  "API Security", 
  "Vulnerability Assessment",
  "Web Security",
  "Code Security",
  "Penetration Testing",
  "Network Security",
  "Cloud Security"
]

const colorOptions = [
  { value: "blue", label: "Blue", preview: "🔵" },
  { value: "green", label: "Green", preview: "🟢" },
  { value: "red", label: "Red", preview: "🔴" },
  { value: "purple", label: "Purple", preview: "🟣" },
  { value: "indigo", label: "Indigo", preview: "🟦" },
  { value: "orange", label: "Orange", preview: "🟠" }
]

const iconOptions = [
  "🔒", "⚡", "⚠️", "🛡️", "🔍", "🎯", "🚀", "💡", 
  "📚", "🔐", "🛠️", "📱", "🌐", "⚙️", "📊", "🎨"
]

export default function BlogForm({ post, onSubmit, onCancel, isLoading = false }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogPostRequest>({
    title: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "",
    icon: "🔒",
    color: "blue",
    content: "",
    tags: []
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        category: post.category,
        date: new Date(post.date).toISOString().split('T')[0],
        readTime: post.readTime,
        icon: post.icon,
        color: post.color,
        content: post.content || "",
        tags: post.tags || []
      })
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof CreateBlogPostRequest, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the post"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Publication Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time *</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => handleChange('readTime', e.target.value)}
                placeholder="e.g., 8 min read"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('color', color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl">{color.preview}</div>
                  <div className="text-xs text-gray-600 mt-1">{color.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags?.join(', ') || ''}
              onChange={(e) => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
              placeholder="Enter tags separated by commas"
            />
            <p className="text-xs text-gray-500">
              Separate multiple tags with commas (e.g., security, web, api)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="content">Post Content (HTML)</Label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter your post content in HTML format..."
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;code&gt;, etc.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
        </Button>
      </div>
    </form>
  )
}
