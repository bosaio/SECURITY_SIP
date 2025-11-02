import { NextResponse } from 'next/server'
import { newsletterStore } from '@/lib/newsletter-store'

export async function GET() {
  try {
    const stats = {
      totalSubscribers: newsletterStore.getSubscriberCount(),
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Newsletter stats error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
