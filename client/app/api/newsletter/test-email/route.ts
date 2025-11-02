import { NextResponse } from 'next/server'
import { nodemailerService } from '@/lib/nodemailer-service'

export async function GET() {
  try {
    // Test the email connection
    const connectionTest = await nodemailerService.testConnection()
    
    if (connectionTest) {
      return NextResponse.json({
        status: 'success',
        message: 'Email connection verified successfully',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Email connection test failed',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Email test error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error during email test',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { testEmail } = body

    if (!testEmail) {
      return NextResponse.json({
        error: 'Test email address is required'
      }, { status: 400 })
    }

    // Send a test email
    const emailSent = await nodemailerService.sendNewsletterConfirmation(testEmail)
    
    if (emailSent) {
      return NextResponse.json({
        status: 'success',
        message: 'Test email sent successfully',
        email: testEmail,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to send test email',
        email: testEmail,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Test email error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error during test email',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
