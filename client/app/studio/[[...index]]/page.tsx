'use client'

import { useEffect } from 'react'
import { getStudioUrl } from '@/lib/utils'

export default function StudioPage() {
  const studioUrl = getStudioUrl()
  
  useEffect(() => {
    // Redirect to the standalone Sanity Studio
    window.location.href = studioUrl
  }, [studioUrl])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Opening Sanity Studio...</h2>
        <p className="text-gray-600">Redirecting you to the content management system</p>
        <p className="text-sm text-gray-500 mt-4">
          If you're not redirected automatically,{' '}
          <a 
            href={studioUrl} 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}
