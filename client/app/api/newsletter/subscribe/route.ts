import { NextRequest, NextResponse } from 'next/server'
import { newsletterStore } from '@/lib/newsletter-store'
import { nodemailerService } from '@/lib/nodemailer-service'

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

    // Check if already subscribed
    if (newsletterStore.hasSubscriber(email)) {
      return NextResponse.json(
        { error: 'Email is already subscribed' },
        { status: 409 }
      )
    }

    // Add to subscribers (in production, save to database)
    newsletterStore.addSubscriber(email)

    // Send welcome email
    try {
      await nodemailerService.sendNewsletterConfirmation(email)
      console.log(`✅ Welcome email sent to: ${email}`)
    } catch (emailError) {
      console.error(`❌ Failed to send welcome email to ${email}:`, emailError)
      // Don't fail the subscription if email fails
    }

    // Log subscription
    console.log(`📧 New newsletter subscriber: ${email}`)

    // Return success response
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
        email: email,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const isSubscribed = newsletterStore.hasSubscriber(email)

    return NextResponse.json({
      email: email,
      isSubscribed: isSubscribed,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Newsletter status check error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
