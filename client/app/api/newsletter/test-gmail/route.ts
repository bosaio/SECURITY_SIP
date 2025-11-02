import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { testEmail } = body

    if (!testEmail) {
      return NextResponse.json({
        error: 'Test email address is required'
      }, { status: 400 })
    }

    // Get environment variables
    const email = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD
    const service = process.env.EMAIL_SERVICE

    if (!email || !password) {
      return NextResponse.json({
        error: 'Email credentials not configured',
        email: email ? 'Set' : 'Not set',
        password: password ? 'Set' : 'Not set'
      }, { status: 400 })
    }

    // Create a test transporter
    const testTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: email, pass: password },
      secure: false,
      tls: {
        rejectUnauthorized: false
      },
      port: 587,
      requireTLS: true,
      ignoreTLS: false
    })

    try {
      // Test the connection
      await testTransporter.verify()
      console.log('✅ Gmail connection verified successfully')

      // Try to send a test email
      const info = await testTransporter.sendMail({
        from: email,
        to: testEmail,
        subject: 'Gmail Test Email from Security SIP',
        text: 'This is a test email to verify Gmail SMTP configuration.',
        html: '<h1>Gmail Test Email</h1><p>This is a test email to verify Gmail SMTP configuration.</p>'
      })

      return NextResponse.json({
        status: 'success',
        message: 'Gmail test email sent successfully',
        messageId: info.messageId,
        email: testEmail,
        timestamp: new Date().toISOString()
      })

    } catch (emailError: any) {
      console.error('❌ Gmail test failed:', emailError)
      
      // Provide detailed error information
      let errorMessage = 'Gmail authentication failed'
      let suggestions = []

      if (emailError.code === 'EAUTH') {
        errorMessage = 'Gmail authentication failed - check your app password'
        suggestions = [
          'Make sure 2-Factor Authentication is enabled on your Gmail account',
          'Generate a new App Password specifically for "Mail"',
          'Use the 16-character app password, not your regular Gmail password',
          'Check if your Gmail account allows "less secure app access"'
        ]
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage = 'Gmail connection failed'
        suggestions = [
          'Check your internet connection',
          'Verify Gmail SMTP settings',
          'Try using port 465 with secure: true'
        ]
      } else if (emailError.code === 'ETIMEDOUT') {
        errorMessage = 'Gmail connection timed out'
        suggestions = [
          'Check firewall settings',
          'Try again in a few minutes',
          'Verify Gmail is accessible'
        ]
      }

      return NextResponse.json({
        status: 'error',
        message: errorMessage,
        error: emailError.message,
        code: emailError.code,
        suggestions: suggestions,
        email: testEmail,
        timestamp: new Date().toISOString()
      }, { status: 500 })

    } finally {
      // Close the test transporter
      testTransporter.close()
    }

  } catch (error) {
    console.error('Gmail test endpoint error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error during Gmail test',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
