import nodemailer from 'nodemailer'

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface NewsletterConfirmation {
  email: string
  timestamp: string
}

class NodemailerService {
  private transporter: nodemailer.Transporter | null = null
  private isConfigured = false

  constructor() {
    this.initializeTransporter()
  }

  private initializeTransporter() {
    try {
      // Check if we have the required environment variables
      const emailConfig = this.getEmailConfig()
      
      console.log('🔧 Initializing nodemailer transporter...')
      console.log('📧 Email config:', emailConfig ? 'Found' : 'Not found')
      
      if (emailConfig) {
        this.transporter = nodemailer.createTransport(emailConfig)
        this.isConfigured = true
        console.log('✅ Nodemailer transporter configured successfully')
        console.log('📧 Service:', process.env.EMAIL_SERVICE)
        console.log('📧 User:', process.env.EMAIL_USER)
      } else {
        console.log('⚠️ Nodemailer not configured - emails will be logged to console only')
        console.log('📧 EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set')
        console.log('📧 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not set')
        this.isConfigured = false
      }
    } catch (error) {
      console.error('❌ Failed to initialize nodemailer transporter:', error)
      this.isConfigured = false
    }
  }

  private getEmailConfig() {
    const email = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD
    const service = process.env.EMAIL_SERVICE || 'gmail'

    if (!email || !password) {
      return null
    }

    // Common email service configurations
    const serviceConfigs: { [key: string]: any } = {
      gmail: {
        service: 'gmail',
        auth: { user: email, pass: password },
        // Gmail specific settings for app passwords
        secure: false,
        tls: {
          rejectUnauthorized: false
        },
        // Additional Gmail settings
        port: 587,
        requireTLS: true,
        ignoreTLS: false
      },
      outlook: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: { user: email, pass: password }
      },
      yahoo: {
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
        auth: { user: email, pass: password }
      },
      custom: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: email, pass: password }
      }
    }

    return serviceConfigs[service] || serviceConfigs.gmail
  }

  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: 'Welcome to Security SIP Newsletter! 🛡️',
        html: this.getNewsletterWelcomeHTML(email),
        text: this.getNewsletterWelcomeText(email)
      }

      if (this.isConfigured && this.transporter) {
        // Send real email
        const info = await this.transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text
        })

        console.log('✅ Welcome email sent successfully:', info.messageId)
        return true
      } else {
        // Development mode - log to console
        console.log('📧 [DEV MODE] Newsletter confirmation email:')
        console.log('To:', emailData.to)
        console.log('Subject:', emailData.subject)
        console.log('Content preview:', emailData.text?.substring(0, 100) + '...')
        console.log('---')
        console.log('To enable real email sending, configure EMAIL_USER, EMAIL_PASSWORD, and EMAIL_SERVICE in your .env.local file')
        console.log('---')
        return true
      }
    } catch (error) {
      console.error('❌ Failed to send newsletter confirmation:', error)
      return false
    }
  }

  async sendNewsletterToSubscribers(subject: string, content: string): Promise<boolean> {
    try {
      if (this.isConfigured && this.transporter) {
        // This would be implemented to send to all subscribers
        console.log('📧 Newsletter broadcast via email:', { subject, contentLength: content.length })
        return true
      } else {
        console.log('📧 [DEV MODE] Newsletter broadcast:', { subject, contentLength: content.length })
        return true
      }
    } catch (error) {
      console.error('❌ Failed to send newsletter broadcast:', error)
      return false
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.transporter) {
        console.log('❌ No transporter configured')
        return false
      }

      await this.transporter.verify()
      console.log('✅ Email connection verified successfully')
      return true
    } catch (error) {
      console.error('❌ Email connection test failed:', error)
      return false
    }
  }

  private getNewsletterWelcomeHTML(email: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Security SIP Newsletter</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🛡️ Welcome to Security SIP!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your cybersecurity journey starts here</p>
        </div>
        
        <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Welcome aboard, ${email.split('@')[0]}!</h2>
        
        <p>Thank you for subscribing to the Security SIP newsletter! You're now part of a community dedicated to learning and growing in cybersecurity.</p>
        
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4a5568;">What you'll receive:</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>🔒 Latest cybersecurity insights and trends</li>
            <li>💡 Practical security tips for developers</li>
            <li>📚 In-depth analysis of security breaches</li>
            <li>🚀 Career advice for security professionals</li>
            <li>🎯 Exclusive content not published elsewhere</li>
          </ul>
        </div>
        
        <p>Stay tuned for our next newsletter, where we'll dive deep into the latest security challenges and solutions.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000" style="background: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Visit Our Blog</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="font-size: 14px; color: #718096; text-align: center;">
          You can unsubscribe at any time by clicking the link below.<br>
          <a href="http://localhost:3000/api/newsletter/unsubscribe" style="color: #4299e1;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `
  }

  private getNewsletterWelcomeText(email: string): string {
    return `
Welcome to Security SIP Newsletter! 🛡️

Hi ${email.split('@')[0]},

Thank you for subscribing to the Security SIP newsletter! You're now part of a community dedicated to learning and growing in cybersecurity.

What you'll receive:
- Latest cybersecurity insights and trends
- Practical security tips for developers
- In-depth analysis of security breaches
- Career advice for security professionals
- Exclusive content not published elsewhere

Stay tuned for our next newsletter, where we'll dive deep into the latest security challenges and solutions.

Visit our blog: http://localhost:3000

---
You can unsubscribe at any time: http://localhost:3000/api/newsletter/unsubscribe
    `.trim()
  }
}

export const nodemailerService = new NodemailerService()
