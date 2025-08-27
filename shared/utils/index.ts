// Shared utility functions between client and server

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const estimateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const formatDate = (dateString: string, format: 'short' | 'long' = 'short') => {
  const date = new Date(dateString)
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export const getColorClasses = (color: string) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    red: "bg-red-100 text-red-800 border-red-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200"
  }
  return colors[color as keyof typeof colors] || colors.blue
}

export const getPostStatusColor = (status: string) => {
  const colors = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  }
  return colors[status as keyof typeof colors] || colors.draft
}

export const getPostStatusLabel = (status: string) => {
  const labels = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived'
  }
  return labels[status as keyof typeof labels] || 'Unknown'
}
