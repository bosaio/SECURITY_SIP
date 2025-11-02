import { NextResponse } from 'next/server'
import { nodemailerService } from '@/lib/nodemailer-service'

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set',
      EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'Not Set',
      NODE_ENV: process.env.NODE_ENV || 'Not Set'
    }

    // Check nodemailer service status
    const serviceStatus = {
      isConfigured: (nodemailerService as any).isConfigured,
      hasTransporter: (nodemailerService as any).transporter !== null
    }

    return NextResponse.json({
      status: 'success',
      message: 'Nodemailer service debug information',
      timestamp: new Date().toISOString(),
      environment: envVars,
      service: serviceStatus,
      note: 'In development mode, emails are logged to console instead of being sent'
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error during debug',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
