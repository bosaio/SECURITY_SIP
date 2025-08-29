"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"

interface BlogFormProps {
  post?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
}

const categoryOptions = [
  "Web Security",
  "API Security", 
  "Vulnerability Assessment",
  "Code Security",
  "Penetration Testing",
  "Network Security",
  "Cloud Security",
  "Application Security"
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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "",
    icon: "🔒",
    color: "blue",
    content: "",
    tags: [] as string[],
    status: "draft" as "draft" | "published"
  })

  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        description: post.description || "",
        category: post.category || "",
        date: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        readTime: post.readTime || "",
        icon: post.icon || "🔒",
        color: post.color || "blue",
        content: post.content || "",
        tags: post.tags || [],
        status: post.status || "draft"
      })
    }
  }, [post])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }
    
    if (!formData.readTime.trim()) {
      newErrors.readTime = "Read time is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }
    
    onSubmit(formData)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
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
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the post"
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Publication Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time *</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => handleChange('readTime', e.target.value)}
                placeholder="e.g., 5 min read"
                className={errors.readTime ? "border-red-500" : ""}
              />
              {errors.readTime && <p className="text-sm text-red-500">{errors.readTime}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visual Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-8 gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleChange('icon', icon)}
                    className={`p-2 text-lg rounded border-2 transition-colors ${
                      formData.icon === icon
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Color Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleChange('color', color.value)}
                    className={`p-3 rounded border-2 transition-colors ${
                      formData.color === color.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg">{color.preview}</div>
                      <div className="text-xs text-gray-600">{color.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Post Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              rows={15}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            <p className="text-sm text-gray-500">
              Use markdown formatting for better content structure
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tags">Add Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type tag and press Enter"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  )
}
