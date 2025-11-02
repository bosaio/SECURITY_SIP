import { NextRequest, NextResponse } from 'next/server'
import { newsletterStore } from '@/lib/newsletter-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if subscribed
    if (!newsletterStore.hasSubscriber(email)) {
      return NextResponse.json(
        { error: 'Email is not subscribed to the newsletter' },
        { status: 404 }
      )
    }

    // Remove from subscribers
    newsletterStore.removeSubscriber(email)

    // Log unsubscription
    console.log(`Newsletter unsubscribed: ${email}`)

    // Return success response
    return NextResponse.json(
      { 
        message: 'Successfully unsubscribed from newsletter',
        email: email,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter unsubscription error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
